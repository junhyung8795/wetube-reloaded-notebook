import express from "express";
import {getEditProfile,postEditProfile, remove, see, logout} from "../controllers/userController"
import { avatarUploads } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/pro-file").get(getEditProfile).post(avatarUploads.single("avatar"),postEditProfile);
userRouter.get("/remove", remove);
userRouter.get("/:id", see);

export default userRouter;