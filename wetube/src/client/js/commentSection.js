const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (event) => {
    event.preventDefault();
    const text = textarea.value;
    const videoId = videoContainer.dataset.id; //watch에서 videoContainer를 보면 data-id=video._id를 볼 수 있는데 videoContainer.dataset.id를 하면 data-"id"의 정보를 가져올 수 있다.
};

form.addEventListener("submit", handleSubmit);
