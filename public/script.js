console.log("Hore Krishno");

const socket = io('/');

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

//its like promises either resolved or rejected
//this below line will fetch the user video and audio from the chrome
let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

socket.emit('join-room', ROOM_ID);

socket.on('user_connected', () => {
    connectToNewUser();
})

const connectToNewUser = () => {
    console.log("New User");
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}