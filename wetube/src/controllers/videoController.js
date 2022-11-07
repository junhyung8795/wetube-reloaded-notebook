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
    const video= new Video({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word)=>`#${word}`),
        meta: {
            views:0,
            rating:0,
        },
    })
    const dbVideo = await video.save();//video object를 db에 저장하고 javascript obj을 반환해서 dbVideo에 저장하고 dbVideo를 콘솔로그하는것 
    console.log(dbVideo);
    /*await Video.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word)=>`#${word}`),
        meta: {
            views:0,
            rating:0,
        },
    })위와같이 쓰면 video.save의 역할도 동시에할 수 있다. 앞에 await도 잊지말아야한다. save가 promise계열 함수이기때문에 위에서 await video.save()를 
    변수애 저장하지않아도 db에 저장은 가능하다. terminal 에 mongosh -> use wetube -> show collections를 하면 현재 document들의 묶음들을 볼 수 있는데,
    이때 videos라고 뜨는 이유는 db의 이름이 원래 Video인데 Mongoose는 자동으로 모델을 찾고 해당 모델의 첫 대문자를 소문자로 바구고 's'를 붙인 뒤 컬렉션을
    생성하기때문에 videos라고 뜬다. 모델명을 Tank라고 쓰면 컬렌션명은 tanks가 된다.*/
    return res.redirect("/")
}

