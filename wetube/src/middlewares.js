import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {}; //||{}은 로그인이 안된 상태에서 url에 직접
    //users/pro-file페이지에 가면 에러가 생기기에 혹시 이런일이 일어나도 {}을 넣어 아무것도 텍스트가 안들어간
    //profile update페이지를 만들기 위함임.
    next();
};

export const avatarUploads = multer({ dest: "uploads/avatars/" });
export const videoUploads = multer({ dest: "uploads/videos/" });
