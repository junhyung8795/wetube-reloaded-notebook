import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", {pageTitle: "Home", videos })
};

export const watch =async(req, res) => {
    const id = req.params.id;/*get의 request로부터 id를 받고*/
    /*const { id }= req.param도 똑같은 의미이다.*/ 
    const video= await Video.findById(id);//Video모델안에서 id를 통해서 특정 비디오를 검색해서 가져옴
    if(!video) {
        return res.render("404", {pageTitle: "Video not Found."});
    }
    return res.render("watch", {pageTitle: video.title, video/*video라고만써도됨 video라는 오브젝트 그대로 보낸다는 의미*/});
};
export const getEdit =async (req, res) => {
    const {id}= req.params;
    const video= await Video.findById(id);
    if(!video) {
        return res.render("404", {pageTitle: "Video not Found."});
    }
    return res.render("edit", {pageTitle : `Editing: ${video.title}`, video});
};

export const postEdit= async(req, res) => {
    const {id } = req.params;
    const {title, description, hashtags}= req.body;
    const video= await Video.findById(id);
    if(!video) {
        return res.render("404", {pageTitle: "Video not Found."});
    }
    video.title= title;
    video.description=description;
    video.hashtags= hashtags.split(",").map((word)=>word.startsWith("#") ? word: `#${word}`),
    await video.save();
    return res.redirect(`/videos/${id}`);
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
}

export const postUpload = async (req, res) => {
//here we will add a video to the videos array
    const {title, description, hashtags}= req.body;
    try{
        await Video.create({
            title,
            description,
            //어차피 schema에서 default로 Date.now()를 주니 삭제함.
            hashtags: hashtags.split(",").map((word)=>word.startsWith("#") ? word: `#${word}`),
        });//await 되는 함수가 에러가 생기면 javascript는 코드를 더 실행하지않고 catch로감, catch가 없으면 계속 로딩만하고 멈춤상태가됨.
        return res.redirect("/")
    } catch(error) {
        console.log(error);
        return res.render("upload", {pageTitle: "Upload Video", errorMessage: error._message,});
    }//에러가 발생하면 upload페이지를 다시 만들음. 에러를 다루시 위해 try catch를 사용. console.log(error);를하면 error의 object가나오는데 그중 _message를 errorMessage로써 전달


}

