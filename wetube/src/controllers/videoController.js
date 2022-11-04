
let videos = [
    {
        title: "First Video",
        rating: 5,
        comments:2,
        createdAt:"2 minutes ago",
        views: 1,
        id:1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments:2,
        createdAt:"2 minutes ago",
        views: 59,
        id:2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments:2,
        createdAt:"2 minutes ago",
        views: 59,
        id:3,
    },
];
export const trending = (req, res) => {
    console.log(videos);
    return res.render("home", {pageTitle: "Home", videos})
};

export const watch =(req, res) => {
    const id = req.params.id;/*get의 request로부터 id를 받고*/
    /*const { id }= req.param도 똑같은 의미이다.*/ 
    const video = videos[id-1];/*id를 통해 video를 받는다.
    라우터애서 id를 받고-> 그 아이디를 request정보로 받고 -> 그 id로 video가 어떤애인지 배열에서 찾고 저장하는것*/
    return res.render("watch", {pageTitle: `Watching: ${video.title}`, video:video/*video라고만써도됨 video라는 오브젝트 그대로 보낸다는 의미*/});
}
export const getEdit =(req, res) => {
    const {id}= req.params;
    const video = videos[id-1];
    return res.render("edit", {pageTitle : `Editing: ${video.title}`, video});
}

export const postEdit= (req, res) => {
    const {id } = req.params;
    console.log(req.body);
    const {title} = req.body;
    videos[id-1].title=title; 
    return res.redirect(`/videos/${id}`);
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
}

export const postUpload = (req, res) => {
//here we will add a video to the videos array
    const {title}= req.body;
    const newVideo={
        title: title,//title이라고만 써도 작동가능
        rating: 0,
        comments:0,
        createdAt:"2 minutes ago",
        views: 0 ,
        id:videos.length+1,
    }
    videos.push(newVideo);
    return res.redirect("/")
}

