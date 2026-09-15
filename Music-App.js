const Musics = [
    {id: 1, title: "Where s My Love" , src: "./Songs/SYML - Where s My Love Alternate Version (320).mp3", singer: "SYML",
         cover: "https://i1.sndcdn.com/artworks-000602261089-7n47af-t500x500.jpg"},

    {id: 2, title: "We Are Still Here" , src: "./Songs/We Are Still Here.mp3", singer: "Jess fire", 
        cover: "https://i.scdn.co/image/ab67616d00001e02f11a4c8f32a59d16adc3274a"},

    {id: 3, title: "Hello" , src: "./Songs/1-01 Hello.mp3", singer: "Adele", 
        cover: "https://i1.sndcdn.com/artworks-000162935592-9umuya-t500x500.jpg"},

    {id: 4, title: "Bagh" , src: "./Songs/Bagh ~ TajMusics.com.mp3", singer: "Yas", 
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrIQnW_0hIqILnZFZCXEuZJnBU-ZHvgBOXuDAna5dMOdnlv6SAD9Jl1kk&s=10"},

    {id: 5, title: "Game Of Thrones" , src: "./Songs/Game Of Thrones ~ UpMusic.mp3", singer: "Ramin", 
        cover: "https://img-www.tf-cdn.com/show/2/game-of-thrones.jpeg?auto=compress&fm=pjpg&fit=crop&crop=faces%2Centropy%20312&dpr=1&w=500&h=360"},

    {id: 6, title: "Hailey & Elijah" , src: "./Songs/for-Test.mp3", singer: "Hailey & Elijah", 
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq_mSnC_m-kUlFsurVfAcr41jqdNBxQyMfUawRK9I7fmGKBo_kRB0bOHg&s=10"},
    
    {id: 7, title: "Set Fire To The Rain" , src: "./Songs/Adele - Set Fire To The Rain - 320.mp3", singer: "Adele", 
        cover: "https://i.scdn.co/image/ab67616d0000b2733434e8f068a2b1f154cd979f"},
    {id:8, title: "Khodaye Binahayat" , src: "./Songs/Mehrad Hidden - Khodaye Binahayat.mp3.mp3" , singer: "Mehrad Hidden" ,
        cover: "https://i.scdn.co/image/ab67616d0000b27349d9f46088b1655292fb25e1"},
]

const addplaylist = [];

function showmusics () {
    const musics = document.querySelector(".musics");
    musics.innerHTML = ``;
    const songdetails = document.querySelector(".song-details");

    Musics.forEach( function (eachofsong) {
        musics.insertAdjacentHTML("beforeend" ,
        `
        <header>
            <article>
                <img src="${eachofsong.cover}" alt="">
                <h3>${eachofsong.title}</h3>
                <p>${eachofsong.singer}</p>
            </article>
            <span class="fa-solid fa-circle-play btn" data-audio-src="${eachofsong.src}"></span>
            <span class="bi bi-bookmark-plus playlist" title = "Add-Playlist" onclick = "findmusic(${eachofsong.id}, this)"></span>
        </header>
        `
        )
    });

const Music = document.querySelector("audio");
const quickplay = document.querySelectorAll(".btn");
const Play = document.querySelector(".playbtn");
const volumebar = document.querySelector("#volume-bar")
const volumeIcone = document.querySelector(".volume");
let musicduration = document.querySelector(".finalTime");
let musiccurrentTime = document.querySelector(".currentTime");
const timeline = document.querySelector(".timeline");
const progressBar = document.querySelector("#progress");
const previousSong = document.querySelector(".previous");
const nextSong = document.querySelector(".next");
const repeat = document.querySelector(".repeat");

// ! Fast Play
let counter = 0;
quickplay.forEach( function (quickbtn) {
    quickbtn.addEventListener("click" , function (event) {

        const MainSrcAudio = event.target.dataset.audioSrc;
        Music.setAttribute("src" , `${MainSrcAudio}`);
        
        let songcover = event.target.parentElement.firstElementChild.firstElementChild.src;
        let songname = event.target.parentElement.firstElementChild.lastElementChild.previousElementSibling.innerHTML;
        let singer = event.target.parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = songname;
        document.querySelector(".songtitle").innerHTML = singer;

        // * Before Change to Pause ==> Changing Mode to Play▶️
        quickplay.forEach(function (inPlaymode) {
            inPlaymode.classList.remove("fa-circle-pause");
            inPlaymode.classList.add("fa-circle-play");

            Music.pause();
        });

        // * After Change to Play ==> Changing Mode to  Pause⏸️
        if (quickbtn.className.includes("fa-circle-play")) {
            quickbtn.classList.remove("fa-circle-play");
            quickbtn.classList.add("fa-circle-pause");
            Play.classList.remove("fa-circle-play");
            Play.classList.add("fa-circle-pause");

            Music.play();
        }
    });
});

// ! Play or Pause
let wichPlayed;
Play.addEventListener("click" ,  function (event) {
    
    // * Wich Music is Pause ==> Music.play()
    quickplay.forEach( function (quickbtn) {
        if (quickbtn.className.includes("fa-circle-pause")) {
            wichPlayed = quickbtn;

            wichPlayed.classList.remove("fa-circle-pause");
            wichPlayed.classList.add("fa-circle-play");
        }
    });

    // * We Are Only Supervising Here ==> Play() or Pause()
    if (Play.className.includes("fa-circle-pause")) {

        Play.classList.remove("fa-circle-pause");
        Play.classList.add("fa-circle-play");
        
        Music.pause();
    } else {
        Play.classList.remove("fa-circle-play");
        Play.classList.add("fa-circle-pause");
        wichPlayed.classList.remove("fa-circle-play");
        wichPlayed.classList.add("fa-circle-pause");

        Music.play();
    }

});

// ! Music Sound
volumebar.addEventListener("input", function () {

    let volumerange = volumebar.value;

    Music.volume = volumerange / 100;

    volumebar.style.background = `
        linear-gradient(
            to left,
            gray 0%,
            gray ${volumerange}%,
            rgba(100, 0, 0, 0.58) ${volumerange}%
        )
    `;

});
let volumeicon = false;
volumeIcone.addEventListener("click" , function (event) {

    if (volumeicon) {
        volumeIcone.classList.remove("fa-volume-mute");
        volumeIcone.classList.add("fa-volume");
        volumebar.value = 100;
        Music.volume = volumebar.value / 100;
        let volumerange = volumebar.value;
        volumebar.style.background = `
            linear-gradient(
                to left,
                gray 0%,
                gray ${volumerange}%,
              rgba(100, 0, 0, 0.58) ${volumerange}%
            )
        `;

        volumeicon = false;
    } else {
        volumeIcone.classList.remove("fa-volume");
        volumeIcone.classList.add("fa-volume-mute");
        volumebar.value = 0;
        Music.volume = volumebar.value / 100;
        let volumerange = volumebar.value;
        volumebar.style.background = `
            linear-gradient(
                to left,
                gray 0%,
                gray ${volumerange}%,
                rgba(100, 0, 0, 0.58) ${volumerange}%
            )
        `;

        volumeicon = true;
    }
});

// ! Music Time-Line
let songtime;
let musicmin = 0;
let musicsec = 0;
let min = 0;
let sec = 0;

Music.addEventListener("loadedmetadata" , function () {
    musicmin = Math.floor(Music.duration / 60);
    musicsec = Math.floor(Music.duration % 60);
    musicduration.innerHTML = `${musicmin}:${musicsec}`;

    songtime = setInterval(handler , 1000);


    progressBar.max = Math.floor(Music.duration);
});
function handler() { 
    
    min = Math.floor(Music.currentTime / 60); // * currentTime = 60 / 60 = 1min
    sec = Math.floor(Music.currentTime % 60); // * 0
    
    if (sec < 10) {
        sec = `0${sec}`;
    }
    musiccurrentTime.innerHTML = `${min}:${sec}`;
};
Music.addEventListener("ended" , function (event) {

    Play.classList.remove("fa-circle-pause");
    Play.classList.add("fa-circle-play");

    quickplay.forEach(function (quickbtn) {
        quickbtn.classList.remove("fa-circle-pause");
        quickbtn.classList.add("fa-circle-play");
    });

});
// !  Create Timeline
Music.addEventListener("timeupdate", function () { // ! Updates in Real Times ✅

    progressBar.value = Music.currentTime;

    const progress = (Music.currentTime / Music.duration) * 100;

    progressBar.style.background = `linear-gradient(to left, #2196f3 ${progress}%, rgba(61, 60, 60, 0.41) ${progress}%)`;

});

// ! Previous Music
let shuffle = false;
previousSong.addEventListener("click" , function (event) {
        
    quickplay.forEach(function (inPlaymode) {
        inPlaymode.classList.remove("fa-circle-pause");
        inPlaymode.classList.add("fa-circle-play");

        Music.pause();
    });
    
    

    if (shuffle) {
        counter = Math.floor(Math.random() * Musics.length);
        Music.setAttribute("src" , `${Musics[counter].src}`);
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].parentElement.lastElementChild.classList.remove("fa-circle-play");
        quickplay[counter].parentElement.lastElementChild.classList.add("fa-circle-pause");

        Music.play();
    } else {
        counter--;
        if (counter < 0) {
            counter = quickplay.length - 1;
        }
        Music.src = Musics[counter].src;
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].classList.remove("fa-circle-play");
        quickplay[counter].classList.add("fa-circle-pause");

        Music.play();
    }

    
    Play.classList.remove("fa-circle-play");
    Play.classList.add("fa-circle-pause");

    
});

// ! Next Music
nextSong.addEventListener("click" , function (event) {

    quickplay.forEach(function (inPlaymode) {
        inPlaymode.classList.remove("fa-circle-pause");
        inPlaymode.classList.add("fa-circle-play");
        
        Music.pause();
    });
    
    if (shuffle) {
        counter = Math.floor(Math.random() * Musics.length);
        Music.setAttribute("src" , `${Musics[counter].src}`);
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].parentElement.lastElementChild.classList.remove("fa-circle-play");
        quickplay[counter].parentElement.lastElementChild.classList.add("fa-circle-pause");

        Music.play();
    } else {
        counter++;
        if (counter === quickplay.length) {
            counter = 0;
        }
        Music.src = Musics[counter].src;
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].classList.remove("fa-circle-play");
        quickplay[counter].classList.add("fa-circle-pause");

        Music.play();
    }

    Play.classList.remove("fa-circle-play");
    Play.classList.add("fa-circle-pause");
});

// ! Click for music==> play
progressBar.addEventListener("input" , function (event) {
    const music = progressBar.value;
    Music.currentTime = music;
});

// ! Song Repeat
repeat.addEventListener("click" , function (event) {
    if (!Music.loop) {
        Music.loop = true;
        
        repeat.classList.replace("bi-shuffle" , "bi-repeat-1");
    } else {
        Music.loop = false;

        repeat.classList.replace("bi-repeat-1" , "bi-shuffle");
    }
    
})

}

function forplaylistsongs () {
    const musics = document.querySelector(".musics");
    
    const Music = document.querySelector("audio");
    const quickplay = document.querySelectorAll(".btn");
    const Play = document.querySelector(".playbtn");
    const volumebar = document.querySelector("#volume-bar")
    const volumeIcone = document.querySelector(".volume");
    let musicduration = document.querySelector(".finalTime");
    let musiccurrentTime = document.querySelector(".currentTime");
    const timeline = document.querySelector(".timeline");
    const progressBar = document.querySelector("#progress");
    const previousSong = document.querySelector(".previous");
    const nextSong = document.querySelector(".next");
    const repeat = document.querySelector(".repeat");

// ! Fast Play
let counter = 0;
quickplay.forEach( function (quickbtn) {
    quickbtn.addEventListener("click" , function (event) {

        const MainSrcAudio = event.target.dataset.audioSrc;
        Music.setAttribute("src" , `${MainSrcAudio}`);
        
        let songcover = event.target.parentElement.firstElementChild.firstElementChild.src;
        let songname = event.target.parentElement.firstElementChild.lastElementChild.previousElementSibling.innerHTML;
        let singer = event.target.parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = songname;
        document.querySelector(".songtitle").innerHTML = singer;

        // * Before Change to Pause ==> Changing Mode to Play▶️
        quickplay.forEach(function (inPlaymode) {
            inPlaymode.classList.remove("fa-circle-pause");
            inPlaymode.classList.add("fa-circle-play");

            Music.pause();
        });

        // * After Change to Play ==> Changing Mode to  Pause⏸️
        if (quickbtn.className.includes("fa-circle-play")) {
            quickbtn.classList.remove("fa-circle-play");
            quickbtn.classList.add("fa-circle-pause");
            Play.classList.remove("fa-circle-play");
            Play.classList.add("fa-circle-pause");

            Music.play();
        }
    });
});

// ! Play or Pause
let wichPlayed;
Play.addEventListener("click" ,  function (event) {
    
    // * Wich Music is Pause ==> Music.play()
    quickplay.forEach( function (quickbtn) {
        if (quickbtn.className.includes("fa-circle-pause")) {
            wichPlayed = quickbtn;
        };
    });

    // * We Are Only Supervising Here ==> Play() or Pause()
    if (Play.className.includes("fa-circle-pause")) {

        Play.classList.remove("fa-circle-pause");
        Play.classList.add("fa-circle-play");
        
        Music.pause();
    } else {
        Play.classList.remove("fa-circle-play");
        Play.classList.add("fa-circle-pause");

        Music.play();
    }

});

// ! Music Sound
volumebar.addEventListener("input", function () {

    let volumerange = volumebar.value;

    Music.volume = volumerange / 100;

    volumebar.style.background = `
        linear-gradient(
            to left,
            gray 0%,
            gray ${volumerange}%,
            rgba(100, 0, 0, 0.58) ${volumerange}%
        )
    `;

});
let volumeicon = false;
volumeIcone.addEventListener("click" , function (event) {

    if (volumeicon) {
        volumeIcone.classList.remove("fa-volume-mute");
        volumeIcone.classList.add("fa-volume");
        volumebar.value = 100;
        Music.volume = volumebar.value / 100;
        let volumerange = volumebar.value;
        volumebar.style.background = `
            linear-gradient(
                to left,
                gray 0%,
                gray ${volumerange}%,
              rgba(100, 0, 0, 0.58) ${volumerange}%
            )
        `;

        volumeicon = false;
    } else {
        volumeIcone.classList.remove("fa-volume");
        volumeIcone.classList.add("fa-volume-mute");
        volumebar.value = 0;
        Music.volume = volumebar.value / 100;
        let volumerange = volumebar.value;
        volumebar.style.background = `
            linear-gradient(
                to left,
                gray 0%,
                gray ${volumerange}%,
                rgba(100, 0, 0, 0.58) ${volumerange}%
            )
        `;

        volumeicon = true;
    }
});

// ! Music Time-Line
let songtime;
let musicmin = 0;
let musicsec = 0;
let min = 0;
let sec = 0;

Music.addEventListener("loadedmetadata" , function () {
    musicmin = Math.floor(Music.duration / 60);
    musicsec = Math.floor(Music.duration % 60);
    musicduration.innerHTML = `${musicmin}:${musicsec}`;

    songtime = setInterval(handler , 1000);


    progressBar.max = Math.floor(Music.duration);
});
function handler() { 
    
    min = Math.floor(Music.currentTime / 60); // * currentTime = 60 / 60 = 1min
    sec = Math.floor(Music.currentTime % 60); // * 0
    
    if (sec < 10) {
        sec = `0${sec}`;
    }

    musiccurrentTime.innerHTML = `${min}:${sec}`;
};
Music.addEventListener("ended" , function (event) {

    Play.classList.remove("fa-circle-pause");
    Play.classList.add("fa-circle-play");

    quickplay.forEach(function (quickbtn) {
        quickbtn.classList.remove("fa-circle-pause");
        quickbtn.classList.add("fa-circle-play");
    });

});
// !  Create Timeline
Music.addEventListener("timeupdate", function () { // ! Updates in Real Times ✅

    progressBar.value = Music.currentTime;

    const progress = (Music.currentTime / Music.duration) * 100;

    progressBar.style.background = `linear-gradient(to left, #2196f3 ${progress}%, rgba(61, 60, 60, 0.41) ${progress}%)`;

});

// ! Previous Music
let shuffle = false;
previousSong.addEventListener("click" , function (event) {
        
    quickplay.forEach(function (inPlaymode) {
        inPlaymode.classList.remove("fa-circle-pause");
        inPlaymode.classList.add("fa-circle-play");

        Music.pause();
    });
    
    

    if (shuffle) {
        counter = Math.floor(Math.random() * Musics.length);
        Music.setAttribute("src" , `${Musics[counter].src}`);
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].parentElement.lastElementChild.classList.remove("fa-circle-play");
        quickplay[counter].parentElement.lastElementChild.classList.add("fa-circle-pause");

        Music.play();
    } else {
        counter--;
        if (counter < 0) {
            counter = quickplay.length - 1;
        }
        Music.src = Musics[counter].src;
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].classList.remove("fa-circle-play");
        quickplay[counter].classList.add("fa-circle-pause");

        Music.play();
    }

    
    Play.classList.remove("fa-circle-play");
    Play.classList.add("fa-circle-pause");

    
});

// ! Next Music
nextSong.addEventListener("click" , function (event) {

    quickplay.forEach(function (inPlaymode) {
        inPlaymode.classList.remove("fa-circle-pause");
        inPlaymode.classList.add("fa-circle-play");
        
        Music.pause();
    });
    
    if (shuffle) {
        counter = Math.floor(Math.random() * Musics.length);
        Music.setAttribute("src" , `${Musics[counter].src}`);
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].parentElement.lastElementChild.classList.remove("fa-circle-play");
        quickplay[counter].parentElement.lastElementChild.classList.add("fa-circle-pause");

        Music.play();
    } else {
        counter++;
        if (counter === quickplay.length) {
            counter = 0;
        }
        Music.src = Musics[counter].src;
        let songcover = quickplay[counter].parentElement.firstElementChild.firstElementChild.src;
        let songname = quickplay[counter].parentElement.firstElementChild.querySelector("h3").innerHTML;
        let singer = quickplay[counter].parentElement.firstElementChild.lastElementChild.innerHTML;
        document.querySelector(".song-cover").setAttribute("src" , `${songcover}`);
        document.querySelector(".songname").firstElementChild.innerHTML = `${songname}`;
        document.querySelector(".songtitle").innerHTML = `${singer}`;

        quickplay[counter].classList.remove("fa-circle-play");
        quickplay[counter].classList.add("fa-circle-pause");

        Music.play();
    }

    Play.classList.remove("fa-circle-play");
    Play.classList.add("fa-circle-pause");
});

// ! Click for music==> play
progressBar.addEventListener("input" , function (event) {
    const music = progressBar.value;
    Music.currentTime = music;
});

// ! Song Repeat
repeat.addEventListener("click" , function (event) {
    if (!Music.loop) {
        Music.loop = true;
        
        repeat.classList.replace("bi-shuffle" , "bi-repeat-1");
    } else {
        Music.loop = false;

        repeat.classList.replace("bi-repeat-1" , "bi-shuffle");
    }
    
})
}

function findmusic (idofsong, playlisticon) {
    const isThereid = addplaylist.some(function (idCheck) {
        return idCheck.id === idofsong;
    });
    const changeplaylistcolor = document.querySelectorAll(".playlist");

    if (!isThereid) {
    
        document.querySelector(".message").style.opacity = `1`;
        document.querySelector(".message").querySelector("p").innerHTML = `!Done✅`;
        setTimeout(function () {
            document.querySelector(".message").style.opacity = `0`;
        }, 1000);

        const findmusicid = Musics.find(function (findid) {
            return findid.id === idofsong;
        });
        
        addplaylist.push(findmusicid);

        Musics.forEach( function (musc) {
            if (musc.id === idofsong) {
                musc.isinplaylist = true;
                playlisticon.classList.add("Bookmarked");
            }
        });
       
        setfindedmusic();
        forplaylistsongs();
    } else {
        document.querySelector(".message").style.opacity = `1`;
        document.querySelector(".message").querySelector("p").innerHTML = `📛`;
        setTimeout(function () {
            document.querySelector(".message").style.opacity = `0`;
        }, 2000);
    }

}

function  setfindedmusic () {

    const parentofplaylistsongs = document.querySelector(".playlistsong");
    parentofplaylistsongs.innerHTML = ``;
    
    addplaylist.forEach(function (playlistsong) {
        parentofplaylistsongs.insertAdjacentHTML("beforeend" ,
            `

            <header>
                <article>
                    <img src="${playlistsong.cover}" alt="">
                    <h3>${playlistsong.title}</h3>
                    <p>${playlistsong.singer}</p>
                </article>
                <span class="fa-solid fa-circle-play btn" data-audio-src="${playlistsong.src}"></span>
                <span class="bi bi-bookmark-plus playlist Bookmarked" onclick = "findmusic(${playlistsong.id})" title = "Playlist"></span>
            </header>

            `
        )
    });

    forplaylistsongs();
}