import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatarUrl: String,
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});
userSchema.pre("save", async function () {
    console.log("Users password:", this.password);
    this.password = await bcrypt.hash(this.password, 5); //this는 저장이라는 이벤트가 생겨나는 객체 "User"를 가리킨다. user가 form에 입력한 password-> this.password
    //그리고 5는 saltRound인데 해쉬하는회수를 나타냄, 뒤에 원래는 callback함수도오지만
    //이 경우에는 promise를 써서 callback함수가 따로 없다.
    console.log("Hashed password:", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
