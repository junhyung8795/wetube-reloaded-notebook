import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle:"Join"});
export const postJoin = async(req,res) => {
    console.log(req.body);
    const {email, username, password, password2, location ,name} = req.body;
    const exists = await User.exists({$or:[{username:req.body.username},{email}]});
    const pageTitle = "Join";
    if(password !== password2){
        return res.status(400).render("join", {pageTitle, errorMessage:"Password confirmation does not match."});        
    }
    if(exists){
        return res.status(400).render("join", {pageTitle, errorMessage:"This username or email is already taken."});
    }// 만약 username이 이미 사용중이라면 return이되어 밑에있는 db에 Usermodel에 정보를 저장하는일은 없어진다.
    try {
        await User.create({
            name,
            email,
            username,
            password,
            location,
        });
        return res.redirect("/login");
    }
    catch(error) {
            console.log(error);
            return res.status(400).render("Join", {pageTitle: "Join", errorMessage: error._message,});
        };
    };
export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:"Login",});
}
export const postLogin = async(req,res)=> {
    //check if account exists
    //check if password correct
    const pageTitle="Login";
    const {username, password}= req.body;
    const user= await User.findOne({username});
    if(!user) {
        res.status(400).render("login", {pageTitle, errorMessage:"An accout with this username doesn't exist"})
    }
    console.log(user.password);
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        res.status(400).render("login", {pageTitle, errorMessage:"Wrong Password"})
    }
    req.session.loggedIn=true;
    req.session.user=user;
    return res.redirect("/");
};
export const getEditProfile = (req, res) => {
    return res.render("editProfile", {pageTitle:"Edit Profile"});
}

export const postEditProfile= async(req, res) => {
    const {
        session: {
          user: { _id , avatarUrl},
        },
        body: { name, email, username, location },
        file
      } = req;
      console.log(file);
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { 
          avatarUrl: file ? file.path : avatarUrl, //이때 파일을 아예 안보낼 때도 있을 수 있는데 아예 안보내면 undefined가 되고 express는 에러로 인식한다
          name,     //그래서 file이 존재하면 file안에 있는 path로 정의하고 file이 없으면 이전에 쓰던 avatarUrl을 그대로 사용한다.
          email,
          username,
          location,
        },
        { new: true }
      );
      req.session.user = updatedUser;
      return res.redirect("/users/pro-file");
    };
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  };

