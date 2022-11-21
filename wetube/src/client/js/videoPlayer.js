const video = document.querySelector("video");
const playBtn =document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");


let volumeValue = 0.5;
video.volume= volumeValue;

const handlePlayClick = () => {
    if(video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
    playBtn.innerText= video.paused ? "Play" : "Pause";
}

const handleMuteClick = () => {
    if(video.muted) {
        video.muted= false;
    }
    else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {
    const {target:{value},} = event;
    if(video.muted){
        muteBtn.innerText="Mute";
        video.muted=false;
    } 
    volumeValue=value;
    video.volume=value;
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(11, 19);

const handleCurrentTime = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
}

const handleTotalTime = () => {
    
    totalTime.innerText = formatTime(Math.floor(video.duration));
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.readyState ? handleTotalTime() : video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleCurrentTime);