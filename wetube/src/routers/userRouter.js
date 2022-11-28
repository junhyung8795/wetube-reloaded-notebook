import express from "express";
import {
    getEditProfile,
    postEditProfile,
    remove,
    see,
    logout,
} from "../controllers/userController";
import { avatarUploads, protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
    .route("/pro-file")
    .all(protectorMiddleware)
    .get(getEditProfile)
    .post(avatarUploads.single("avatar"), postEditProfile);
userRouter.get("/remove", remove);
userRouter.get("/:id", see);

export default userRouter;
