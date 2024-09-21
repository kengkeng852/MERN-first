import express from "express";
import * as UsersController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UsersController.getAuthenticatedUser); //to check that the user is authenticated

router.post("/signup", UsersController.signUpUser);
router.post("/login", UsersController.loginUser);
router.post("/logout", UsersController.logoutUser);

router.get("/", UsersController.getUsers);

export default router;
