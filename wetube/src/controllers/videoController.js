import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    
    console.log(videos);
    return res.render("home", {pageTitle: "Home", videos })
};

export const watch =(req, res) => {
    const id = req.params.id;/*get의 request로부터 id를 받고*/
    /*const { id }= req.param도 똑같은 의미이다.*/ 
    const video = videos[id-1];/*id를 통해 video를 받는다.
    라우터애서 id를 받고-> 그 아이디를 request정보로 받고 -> 그 id로 video가 어떤애인지 배열에서 찾고 저장하는것*/
    return res.render("watch", {pageTitle: `Watching`/*video라고만써도됨 video라는 오브젝트 그대로 보낸다는 의미*/});
}
export const getEdit =(req, res) => {
    const {id}= req.params;

    return res.render("edit", {pageTitle : `Editing: `, });
}

export const postEdit= (req, res) => {
    const {id } = req.params;
    console.log(req.body);
    const {title} = req.body;
 
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
            createdAt: Date.now(),//createdAt:"alal"라고 일부러 에러를 만든다면, createdAt은 Date를 받기때문에 영어가 들어갈 수 없어서 upload할때마다 무조건 에러가생김
            hashtags: hashtags.split(",").map((word)=>`#${word}`),
        });//await 되는 함수가 에러가 생기면 javascript는 코드를 더 실행하지않고 catch로감, catch가 없으면 계속 로딩만하고 멈춤상태가됨.
        return res.redirect("/")
    } catch(error) {
        console.log(error);
        return res.render("upload", {pageTitle: "Upload Video", errorMessage: error._message,});
    }//에러가 발생하면 upload페이지를 다시 만들음. 에러를 다루시 위해 try catch를 사용. console.log(error);를하면 error의 object가나오는데 그중 _message를 errorMessage로써 전달


}

