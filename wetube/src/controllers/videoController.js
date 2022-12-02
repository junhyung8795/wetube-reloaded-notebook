import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
    const id = req.params.id; /*get의 request로부터 id를 받고*/
    /*const { id }= req.param도 똑같은 의미이다.*/
    const video = await Video.findById(id)
        .populate("owner")
        .populate("comments"); //Video모델안에서 id를 통해서 특정 비디오를 검색해서 가져옴
    if (!video) {
        return res.render("404", { pageTitle: "Video not Found." });
    }
    return res.render("watch", {
        pageTitle: video.title,
        video /*video라고만써도됨 video라는 오브젝트 그대로 보낸다는 의미*/,
    });
};
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(400).render("404", { pageTitle: "Video not Found." });
    }
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    //Video모델(videos 컬렉션)안의 각 video obj의 _id와 parameter로 받은 id가 같은지 검사하여 boolean 반환
    //exist함수는 filter를 받는데, 어떤조건이든가능하다.
    //예를 들어 {title: "Hello"}라고하면 Hello라는 타이틀을가진 obj이있으면 true 없으면 false이다.
    if (!video) {
        return res.render("404", { pageTitle: "Video not Found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    } //해당 비디오의 주인이 아닌 사람이 edit하는것을 백엔드 차원에서 방지. url만 똑같이 한다고해서 해당 영상을 편집하는 기능을 발현시키지않도록 보호.
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });

    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
    //here we will add a video to the videos array
    const { _id } = req.session.user; //현재 로그인중인 유저의 _id
    const { title, description, hashtags } = req.body;
    const { file } = req;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: file.path,
            //어차피 schema에서 default로 Date.now()를 주니 삭제함.
            hashtags: Video.formatHashtags(hashtags),
            owner: _id, //현재 로그인한 사람이 업로드를 한다면 업로드한 사람이 비디오의 주인이고 그 주인의 _id를 해당 비디오 모델에 ObjectId로써 저장하여 DB에서 해당 비디오의 주인을 찾을 수 있게함.
        }); //await 되는 함수가 에러가 생기면 javascript는 코드를 더 실행하지않고 catch로감, catch가 없으면 계속 로딩만하고 멈춤상태가됨.
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save(); //이때 그냥 save만 하면 userSchema에서 presave에 의해 hash됐던 비밀번호가 한번 더 hash 되는데 이를 thsi.isModified로 비밀번호를 수정한 상태로 저장할때만 hash 되도록 UserModel파일에서 변경
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    } //에러가 발생하면 upload페이지를 다시 만들음. 에러를 다루시 위해 try catch를 사용. console.log(error);를하면 error의 object가나오는데 그중 _message를 errorMessage로써 전달
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    const user = await User.findById(_id);
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    } //postEdit와 마찬가지로 해당 비디오의 주인이 아닌 사람이 delete하는것을 백엔드 차원에서 방지. url만 똑같이 한다고해서 해당 영상을 지우는 기능을 발현시키지않도록 보호.
    if (!video) {
        return res.render("404", { pageTitle: "Video not Found." });
    }
    await Video.findByIdAndDelete(id);
    user.videos.splice(user.videos.indexOf(id), 1); //
    user.save(); //위줄과 이 줄의 의미는 해당 영상을 지우면 해당 영상의 owner인 user의 video array중에서도 삭제하고 이를 저장한다는 의미.
    return res.redirect("/");
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"), //i는 대소문자 구분이 없다는 뜻, keyword를 포함하는 title검색
                //$regex: new RegExp(`^${keyword}`, "i")이면 keyword로 '시작하는' title만 검색
                //$regex: new RegExp(`^${keyword}`, "i")이면 keyword로 '끝나는' title만 검색
            },
        });
    }
    return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404); //sendStatus 하면 status코드를 보냄과동시에 연결을 끝낼 수 있다.
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
};

export const createComment = async (req, res) => {
    const {
        params: { id },
        session: { user },
        body: { text },
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        owner: user._id,
        video: id,
    });
    video.comments.push(comment._id);
    video.save();
    return res.sendStatus(201);
};
