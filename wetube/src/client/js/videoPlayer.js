const video = document.querySelector("video");
const playBtn =document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");
const time = document.getElementById("time");


const handlePlayClick = () => {
    if(video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
    playBtn.innerText= video.paused ? "Pause" : "Play";
}

const handleMuteClick = () => {
    if(video.muted) {
        video.muted= false;
    }
    else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
}


playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);