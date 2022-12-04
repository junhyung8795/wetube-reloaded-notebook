import express from "express";
import {
    getEditProfile,
    postEditProfile,
    remove,
    see,
    logout,
    getChangePassword,
    postChangePassword,
} from "../controllers/userController";
import { avatarUploads, protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
    .route("/pro-file")
    .all(protectorMiddleware)
    .get(getEditProfile)
    .post(avatarUploads.single("avatar"), postEditProfile); //logout과 pro-file은 로그인상태에서만 보여줘야하는 페이지라 protectorMiddleware적용
userRouter
    .route("/change-password")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);

userRouter.get("/remove", remove);
userRouter.get("/:id", see);

export default userRouter;
