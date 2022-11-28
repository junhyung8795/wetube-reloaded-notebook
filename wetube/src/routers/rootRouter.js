import express from "express";
import { home, search } from "../controllers/videoController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
} from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
    .route("/login")
    .all(publicOnlyMiddleware)
    .get(getLogin)
    .post(postLogin); //login과 join은 로그인이 안된사용자만 볼 수 있고 session에 로그인상태라면 해당 url이 아니라 홈화면으로 넘어가 접근을 제한함.
rootRouter.get("/search", search);

export default rootRouter;
