const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    newComment.className = "video__comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    newComment.appendChild(icon);
    newComment.appendChild(span);
    videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id; //watch에서 videoContainer를 보면 data-id=video._id를 볼 수 있는데 videoContainer.dataset.id를 하면 data-"id"의 정보를 가져올 수 있다.
    if (text === "") {
        return;
    }
    const { status } = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), //videoController의 경우 req.body가 렌더링된 html element애서 입력된 정보로 이루어져있는데 프론트엔드 자바스크립트에서는 fetch로 post request를 보낼 때,
        //직접 body:{text,}라는 오브젝트형식을 직접 만들어서 보내줄 수 있다.-> fetch를 이용하면 url변경없이 post request를 보낼 수 있다.
        //body: {text}라고 안하고 body: JSON.stringify({ text })로 보내는 이유는 브라우저와 서버는 javascript로코드로 보내진 것을 "텍스트"형식으로 받아들이기때문.
        //JS로 만든 것을 온전히 JS Obj로써 브라우저와 서버 모두가 이해하게 하기 위해서는 몇가지 과정이 필요하다.
        //먼저 JSON.stringify({ text })을 이용하여 원하는 정보를 담은 obj를 stringify에 넣는다.
        //이는 body에 String형식의 파일을 준다는 것을 의미한다.
        //두번째는 headers:{"Content-Type": "application/json",}를 추가해야한다.
        //이 것은 브라우저에게 이 String은 단순한 String이 아니고 JSON.parse()를 적용하여 Obj로 변환할 수 있는 특수한 String임(JSON String)을 알려주는 것이다.
        //express.json()은 위와같이 JSON Stirng이 브라우저로 보내질 때, header에 Content-Type이 express.json()의 기본 값인 "application/json"과 일치하는 request만 미들웨어를 이용하여 Obj를 반환한다.
        //다시 말해, headers: { "Content-type": "application/json" }인 request만 express.json()을 실행한다.
        //index.js에서 app.use(express.json())을 하면 videoController에서 req.body를 통해 데이터접근이 가능하다.
    });
    textarea.value = "";
    if (status === 201) {
        addComment(text);
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}
