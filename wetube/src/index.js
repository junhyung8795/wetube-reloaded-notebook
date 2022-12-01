import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares.js";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        }),
    })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); //avatarUrl의 형식은 "uploads/avatars/많은문자들" 으로 돼있는데,() video는 uploads/videos/많은문자들
//처음에 업로드만 하면 그림이 보이지않는다.
//inspect에 들어가 해당 html element에 들어가면 링크가 localhost:4000/users/uploads/avatars/많은문자들
//로 돼있을건데, 이는 상대적 url로 돼있는것으로 일단
// editProfile.pug에서 절대적 url로바꾸면 localhost:4000/uploads/avatars/많은문자들로간다.
//이때 브라우저는 위와같은 형식의 url을 request할때 어디로갈지모른다.
//따라서 /avatarUploads라는 url로 시작하면 괄호안에 있는 폴더의 내용물을 보여주라는걸 알려줘야한다.
//()안에는 avatarUploads라는 폴더명이 들어있고 이것이 있으면 폴더안에있는 사진을 프로필로서 보여줄 수 있다
app.use("/static" /*/assets*/, express.static("assets")); //위와 마찬가지로 /assets로 url이 시작하면(/assets/js/main.js면) main.js에 있는 내용물을 보여주라는 뜻
//이때 "/assets" 부분이 굳이 /assets가 아니라 /static이여도 됨. 다만 브라우저에서는 /static/js/main.js일때 assets의 내용물을 보여줄것임.
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
