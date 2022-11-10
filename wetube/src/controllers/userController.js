import User from "../models/User.js";

export const getJoin = (req, res) => res.render("join", {pageTitle:"Join"});
export const postJoin = async(req,res) => {
    console.log(req.body);
    const {email, username, password, password2, location ,name} = req.body;
    const exists = await User.exists({$or:[{username:req.body.username},{email}]});
    const pageTitle = "Join";
    if(password !== password2){
        return res.render("join", {pageTitle, errorMessage:"Password confirmation does not match."});        
    }
    if(exists){
        return res.render("join", {pageTitle, errorMessage:"This username or email is already taken."});
    }// 만약 username이 이미 사용중이라면 return이되어 밑에있는 db에 Usermodel에 정보를 저장하는일은 없어진다.
    await User.create({
        name,
        email,
        username,
        password,
        location,
    })
    return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const see = (req, res) => res.send("See User");
export const logout = (req, res) => res.send("Logout");

