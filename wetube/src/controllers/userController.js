import User from "../models/User.js";
import Video from "../models/Video.js";

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
    const {username, password}= req.body;
    const exists = await User.exists({username});
    if(!exists) {
        res.status(400).render("login", {pageTitle:"Login", errorMessage:"An accout with this username doesn't exist"})
    }
    const user= await User.find({username});
    return res.end();
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
export const logout = (req, res) => res.send("Logout");

