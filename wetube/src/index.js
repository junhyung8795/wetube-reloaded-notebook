
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import { localsMiddleware } from "./middlewares.js";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"Hello",
    resave:true,
    saveUninitialized: true,
}))

app.use((req, res, next) => {
    res.locals.sexy="you";//res오브젝트의 locals라는 이름의 오브젝트가 있는데, 이는 pug에서 직접적으로 접근할 수 있다.
    //미들웨어에서 적혀진 locals{sexy:"you"}가 다른 Controller까지도 전해지고 이것이 pug템플릿에도 전달된다.
    //pug에서 사용하는 변수이름은 res.locals.변수이고 이경우에는 #{sexy}라고만 말하면 알아먹는다.
    //모든 라우터 전에 미들웨어로써 정의된 상태에서 res.locals.sexy를 사용하면 이는 전역변수로써 다른 템플릿에서도 그냥 사용할 수 있다.
    req.sessionStore.all((error, sessions) => {
      console.log(sessions);
      next();
    });
  });
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;


