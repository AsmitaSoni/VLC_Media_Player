const SpeedUp = document.querySelector("#SpeedUp");
const SpeedDown = document.querySelector("#SpeedDown");
const VolumeUp = document.querySelector("#VolumeUp");
const VolumeDown = document.querySelector("#VolumeDown");
const PlaybackVolumeUp = document.querySelector("#PlaybackVolumeUp");
const PlaybackVolumeDown = document.querySelector("#PlaybackVolumeDown");
const videoBtn = document.querySelector("#videoBtn");
const videoInput = document.querySelector("#videoInput");
const videoPlayer = document.querySelector("#main");
const toast = document.querySelector(".toast");

const SpeedUpHandler = () =>{
   // alert("Speed up was clicked");
   const videoElement = document.querySelector("#main video");
   if(videoElement ==null){
      return;
   }
   if(videoElement.playbackRate > 3){
      return;
   }
   const increaseSpeed = videoElement.playbackRate += 0.25;
   videoElement.playbackRate = increaseSpeed;

   showToast(increaseSpeed+"X");
}
const SpeedDownHandler = () =>{
   const videoElement = document.querySelector("#main video");
   if(videoElement ==null){
      return;
   }
   if(videoElement.playbackRate > 0 ){
   const decreasedSpeed = videoElement.playbackRate -0.5;
   videoElement.playbackRate = decreasedSpeed;
   showToast(decreasedSpeed + "x");
   }
}
const VolumeUpHandler = () =>{
   const videoElement = document.querySelector("#main video");
   if(videoElement == null){
      return;
   }
   console.log("Volume before:", videoElement.volume);
   if(videoElement.volume >= 1){
      return;
   } 
   else {
      const increasedVolume = videoElement.volume + 0.1;
      videoElement.volume = increasedVolume;
      console.log("Volume after:", videoElement.volume);
      console.log("No video element found");
      const percentage = (increasedVolume * 100) + "%";
      showToast(percentage);
   }
}
const VolumeDownHandler = () =>{
   const videoElement = document.querySelector("#main video");
   console.log("Volume before:", videoElement.volume);
   if(videoElement ==null){
      return;
   } 
   if(videoElement.volume <= 0.1){
      videoElement.volume=0;
      return;

   }
   else {
      const decreasedVolume = videoElement.volume - 0.1;
      videoElement.volume =decreasedVolume;
      console.log("Volume after:", videoElement.volume);
      console.log("No video element found");
      const percentage = (decreasedVolume * 100) + "%";
      showToast(percentage);
   }
}
function showToast(message){
   toast.textContent = message;
   toast.style.display ="block";
   setTimeout(() => {
      toast.style.display = "none";
   },1000);
}
const handleInput=()=>{
    console.log("Input is clicked");
    videoInput.click();
}
const acceptInputHandler =(obj) => {
   // console.log("file selected");
    const selectedVideo = obj.target.files[0];
    const link = URL.createObjectURL(selectedVideo);

    const videoElement= document.createElement("video");
    videoElement.src= link; 

    videoElement.setAttribute("class","video");
    videoElement.controls="true";
    videoPlayer.appendChild(videoElement);
    videoElement.play();
    videoElement.volume = 0.5;  // Set initial volume
    videoElement.addEventListener("loadedmetadata",function(){

    });
}

SpeedUp.addEventListener("click",SpeedUpHandler);
SpeedDown.addEventListener("click",SpeedDownHandler);
VolumeUp.addEventListener("click", VolumeUpHandler);
VolumeDown.addEventListener("click",VolumeDownHandler);
videoBtn.addEventListener("click",handleInput);
videoInput.addEventListener("change",acceptInputHandler);


   /*****controls**********/
   const handleFullScreen = () => {
      videoPlayer.requestFullscreen();
   }
   const fullScreenElement = document.querySelector("#fullScreen");
   fullScreenElement.addEventListener("click", handleFullScreen);


   const playPauseBtn = document.querySelector("#playPause");
   const backwardBtn = document.querySelector("#backward");
   const stopBtn = document.querySelector("#square");
   const forwardBtn = document.querySelector("#forward");
   
   playPauseBtn.addEventListener("click", () => {
       const videoElement = document.querySelector("#main video");
       if (!videoElement) return;
   
       if (videoElement.paused) {
           videoElement.play();
           showToast("Play");
       } else {
           videoElement.pause();
           showToast("Pause");
       }
   });
   
   backwardBtn.addEventListener("click", () => {
       const videoElement = document.querySelector("#main video");
       if (!videoElement) return;
   
       videoElement.currentTime -= 10; // Go back 10 seconds
       showToast(" 10s");
   });
   
   forwardBtn.addEventListener("click", () => {
       const videoElement = document.querySelector("#main video");
       if (!videoElement) return;
   
       videoElement.currentTime += 10; // Forward 10 seconds
       showToast(" 10s");
   });
   
   stopBtn.addEventListener("click", () => {
       const videoElement = document.querySelector("#main video");
       if (!videoElement) return;
   
       videoElement.pause();
       videoElement.currentTime = 0;
       showToast(" Stopped");
   });
   
   const videoProgress = document.querySelector("#videoProgress");

// Update progress bar as video plays
const updateProgress = () => {
    const videoElement = document.querySelector("#main video");
    if (!videoElement) return;

    videoProgress.max = videoElement.duration;
    videoProgress.value = videoElement.currentTime;
};

// Seek video when progress bar is changed
videoProgress.addEventListener("input", () => {
    const videoElement = document.querySelector("#main video");
    if (!videoElement) return;

    videoElement.currentTime = videoProgress.value;
});
