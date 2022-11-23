const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
    startBtn.innerText = "Start Recording";
    startBtn.addEventListener("click", handleStart);
    startBtn.removeEventListener("click", handleStop);
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        console.log(event);
        console.log(event.data);
      };
    console.log(recorder);
    recorder.start();
    console.log(recorder);
    setTimeout(()=>{
        recorder.stop();
    }, 5000);
};

const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();
startBtn.addEventListener("click", handleStart);