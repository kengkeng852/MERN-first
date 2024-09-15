import express from "express";
import * as UsersController from "../controllers/users";

const router = express.Router();

router.get("/", UsersController.getAuthenticatedUser); //to check that the user is authenticated

router.post("/signup", UsersController.signUpUser);
router.post("/login", UsersController.loginUser);
router.post("/logout", UsersController.logoutUser);

router.get("/", UsersController.getUsers);


export default router;
