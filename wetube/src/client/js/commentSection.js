const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id; //watch에서 videoContainer를 보면 data-id=video._id를 볼 수 있는데 videoContainer.dataset.id를 하면 data-"id"의 정보를 가져올 수 있다.
    fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        body: { text }, //videoController의 경우 req.body가 렌더링된 html element애서 입력된 정보로 이루어져있는데 프론트엔드 자바스크립트에서는 fetch로 post request를 보낼 때,
        //직접 body:{text,}라는 오브젝트형식을 직접 만들어서 보내줄 수 있다.-> fetch를 이용하면 url변경없이 post request를 보낼 수 있다.
    });
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}
