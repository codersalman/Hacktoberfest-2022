const music = document.getElementById("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");


const songs = [
    {name: "1", title: "Insane", artist: "Ap Dillion"},
    {name: "2",title: "Tere Te", artist: "Ap Dillion" },
    {name: "3",title: "Ma Belle", artist: "Ap Dillion" },
    {name: "4",title: "Toxic",  artist: "Ap Dillion"},
    {name: "5",title: "Sadda Pyaar", artist: "Ap Dillion"},
    {name: "6",title: "Chances", artist: "Ap Dillion"},
    {name: "7",title: "Faraar", artist: "Ap Dillion"},
    {name: "8",title: "Hustlin'", artist: "Ap Dillion"},
    {name: "9",title: "Desire", artist: "Ap Dillion"},
    {name: "10",title: "Top Boy", artist: "Ap Dillion"},
    {name: "11",title: "Fake", artist: "Ap Dillion"},
]

let isPlaying = false;

const playMusic = ()=>{
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("anime");
}; 


const pauseMusic = () =>{
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove("anime");
};

play.addEventListener('click', ()=>{
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
});

// <-------------change music-------------------->

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "Song/"+songs.name + ".mp3";
    img.src = "Cover/" + songs.name + ".jpeg";
};

// loadSong(songs[1]);

songIndex = 0;

const nextSong = () =>{
    songIndex = (songIndex+1)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();

};

const prevSong = () =>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

//    <-----------pgogress bar---------------------->
music.addEventListener("timeupdate",(event) => {

    const {currentTime, duration} = event.srcElement;
    let progress_time = ( currentTime / duration )*100;
    progress.style.width=`${progress_time}%`;
    
    // ------------------total durat---------------------->
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    if(sec_duration < 10){
        sec_duration=`${sec_duration}0`
    }

    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }  
    


    //----------------current time---------------------->
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime < 10){
        sec_currentTime=`0${sec_currentTime}`
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;    
});   

progress_div.addEventListener("click", (event) => {
   const {duration} = music;
   let move_progress = (event.offsetX /event.srcElement.clientWidth) * duration;
   music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong);

next.addEventListener('click' , nextSong);
prev.addEventListener('click' , prevSong);







                      