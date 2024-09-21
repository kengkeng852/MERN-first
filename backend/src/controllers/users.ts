import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUpUser: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const newusername = req.body.username;
  const newpasswordRaw = req.body.password; // raw because when save in to DB it must be hash first
  const newemail = req.body.email;

  try {
    if (!newusername || !newemail || !newpasswordRaw) {
      throw createHttpError(400, "Missing required fields");
    }

    const existingUsername = await UserModel.findOne({
      username: newusername,
    }).exec(); //to check if username already exists

    if (existingUsername) {
      throw createHttpError(409, "Username already exists");
    }

    const existingEmail = await UserModel.findOne({ email: newemail }).exec(); //to check if email already exists

    if (existingEmail) {
      throw createHttpError(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(newpasswordRaw, 10);

    const newUser = await UserModel.create({
      username: newusername,
      email: newemail,
      password: hashedPassword,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const loginUser: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Missing required fields");
    }

    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); //take given raw password and compare with hashed password

    if (!isPasswordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};
