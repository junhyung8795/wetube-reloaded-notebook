import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    console.log(req.body);
    const { email, username, password, password2, location, name } = req.body;
    const exists = await User.exists({
        $or: [{ username: req.body.username }, { email }],
    });
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match.",
        });
    }
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username or email is already taken.",
        });
    } // 만약 username이 이미 사용중이라면 return이되어 밑에있는 db에 Usermodel에 정보를 저장하는일은 없어진다.
    try {
        await User.create({
            name,
            email,
            username,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.status(400).render("Join", {
            pageTitle: "Join",
            errorMessage: error._message,
        });
    }
};
export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
    //check if account exists
    //check if password correct
    const pageTitle = "Login";
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An accout with this username doesn't exist",
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong Password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
export const getEditProfile = (req, res) => {
    return res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
    const {
        session: {
            user: { _id, avatarUrl },
        },
        body: { name, email, username, location },
        file,
    } = req;
    if (
        req.session.user.username !== username ||
        req.session.user.email !== email
    ) {
        const exists = await User.exists({
            $or: [{ username }, { email }],
        });
        if (exists) {
            return res.render("editProfile", {
                pageTitle: "Edit Profile",
                errorMessage: "The same username or email already exists",
            });
        }
    }
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            avatarUrl: file ? file.path : avatarUrl, //이때 파일을 아예 안보낼 때도 있을 수 있는데 아예 안보내면 undefined가 되고 express는 에러로 인식한다
            name, //그래서 file이 존재하면 file안에 있는 path로 정의하고 file이 없으면 이전에 쓰던 avatarUrl을 그대로 사용한다.
            email,
            username,
            location,
        },
        { new: true } //await User.findByIdAndUpdate은 default로 update이전의 모델을 리턴하는데, new:true라는 옵션을 주면 가장최근에 업데이트된 모델을 리턴한다.
    );
    req.session.user = updatedUser; //이 코드가 없으면 프로필을 바꿔도 다시 편집창에 들어갔을 때 수정된 사항이 반영이 안됨
    //왜냐하면 localMiddleware를 통해 session에서 유저의 정보를 받고 loggedInUser.name 등으로쓰기 때문에,
    //login 당시의 user정보를 잘 받아와 session에 저장하고 이를 input value에 써주지만, 프로필 편집을 하고 나면 DB에 user 정보는 업데이트가된다.
    //하지만, User모델의 DB가 업데이트 돼도 그 업데이트된 정보가 session에 반영되지 않아 브라우저는 "login 당시의 정보를 input value에 넣어야지!"
    //가 돼버려서 분명 프로필 편집은 했지만 편집완료 후 다시 프로필 편집창에 와보면 input value가 이를 반영하지 않는다. 따라서 session에도 업데이트된 정보를 넣어야한다.
    //이를 안써도 프로필편집완료 -> 로그아웃-> 다시 프로필편집창을 돌아오면 반영돼있겠지만 프로필을 연속으로 여러번 할때도 잘 반영돼야
    //정상적인 작동이라 생각되기에 req.session.user = updatedUser;를 작성함.
    return res.redirect("/users/pro-file");
};
export const getChangePassword = (req, res) => {
    if (req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", {
        pageTitle: "Change Password",
    });
};
export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { oldPassword, newPassword, newPasswordConfirmation },
    } = req;
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        });
    }
    if (newPassword !== newPasswordConfirmation) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        });
    }
    user.password = newPassword;
    await user.save();
    req.session.user.password = user.password;
    return res.redirect("/users/logout");
};
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
