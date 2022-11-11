export const localsMiddleware = (req, res, next) => {
    console.log(req.session);
    res.locals.siteName="Wetube";
    next();
}