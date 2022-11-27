import mongoose from "mongoose";

//export const formatHashtags = (hashtags) => {
//return hashtags.split(",").map((word)=> word.startsWith("#") ? word: `#${word}`);
//} 각 hashtags들을 쪼개서 반환시키는 함수를 만들어 그 리턴값을 hashtags: {여기에 넣어도된다.}

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 20 },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    } /*form상에서 required되어 필수적으로 적히는 부분이 아니기에 postUpload부분에서 createdAt오브젝트에
    아무것도 안보내면 에러없이 작동하게된다. 그러나 에러를 발생시켜 실수를 방지할 수 있어야하므로  Video스키마를 정의할 때 required:true를 붙인다.
    또한 오브젝트를 post할때마다 createdAt은 Date.now()를 안써도되도록 디폴트값으로 Date.now를 쓴다. 이때 ()를 붙이지않음으로써 지금 실행하는것이 아님을
    티내야한다.*/,
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
    fileUrl: { type: String, required: true },
});
videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
