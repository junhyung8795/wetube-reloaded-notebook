const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleDownload = () => {

};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.addEventListener("click", handleDownload);
    startBtn.removeEventListener("click", handleStop);
    recorder.stop();//handleStart에서 만들어진 레코더라는 녀석을 그대로 써야하는데
    //recorder라는 놈은 handleStart라는 함수 안에 있어서 전역변수로서 한번 선언해주고 handleStart에서 지정된 recorder를 가져옴.
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        console.log(event.data);
        videoFile= URL.createObjectURL(event.data);//레코딩을 스탑하는 순간 event.data를 받는데 이안에는 동영상파일이있다. 그 파일을 argument에 넣으면 
        //그 파일에 대한 url을 브라우저내에서 만들 수 있고(실제 localhost:4000/blabla처럼 치면 나오진않는다. 서버가 아닌 브라우저 메모리안에 있기때문.)
        //그 url은 파일의 경로와도 같다. 그래서 videoFile이라고 저장했다. 그 url을 통해서 저장된 동영상 파일에 접근할 수 있다.
        video.srcObject = null;//이미 스트리밍 중인 비디오를 없애고
        video.src = videoFile;//저장된 videoFile을 src에 넣을 수 있고
        video.play();//그상태로 동영상을 재생하면 레코딩한 동영상을 재생할 수 있다.
      };
    recorder.start();

};

const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;//srcObject에 stream을 저장하면 현재 노트북 카메라로 레코드하는 모습을 볼 수 있다.
  video.play();
};

init();
startBtn.addEventListener("click", handleStart);