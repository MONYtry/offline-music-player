const music = document.getElementById("music");
const volumenSlider = document.getElementById("volume");
const currentTimeText = document.getElementById("currentTimeText");
const maxTimeText = document.getElementById("maxTimeText");
const buttonDisplay = document.getElementById("buttonDisplay");
const progress = document.getElementById("progress");
const tooltip = document.getElementById("tooltip");
const footerArtist = document.getElementById("footerArtist");
const footerSong = document.getElementById("footerSong");
const songCover = document.getElementById("songCover");

var musicIsPlaying = false;


function resetText() {
    maxTimeText.textContent = "00:00";
    currentTimeText.textContent = "00:00";
}
resetText();

const songs = [
    {
        name: "No Name yet!",
        artist: "Travis goty",
        file: "song.mp3",
        cover: "test.png"
    },
    {
        name: "No Name yet!",
        artist: "Travis goty",
        file: "song.mp3",
        cover: "test.png"
    }
];



function loadMusic() {
    const musicList = document.getElementById("musicList");

    songs.forEach((song, index) => {
        let card = document.createElement("div");
        card.className = "musicCard";

        // Erstellt Paragraph und Button
        card.innerHTML = `
        <div class="songListDisplay">
            <img src="${song.cover}" width="50" height="50">
            <p>${song.name}</p>
        </div>
        <p>${song.artist}</p>
        <button onclick="changeMusic('${index}')" class="musicListButton">▶</button>
        `;

        musicList.appendChild(card);
    });
}
loadMusic();
music.volume = 0.4;
volumenSlider.value = music.volume;


// Max Audio length
music.addEventListener("loadedmetadata", () => {
    progress.max = music.duration;
});


///// SLIDERS /////

// Slider nachziehen
music.addEventListener("timeupdate", () => {
    progress.value = music.currentTime;
    updateSlider();
})

// Progress Slider
progress.addEventListener("input", () => {
    music.currentTime = Number(progress.value);
    updateSlider();
})


// Audio Volumen Slider
volumenSlider.addEventListener("input", function () {
    music.volume = volumenSlider.value;
    updateVolumeSlider();
});


function updateSlider() {
    if (!progress.max) return;

    const percent = (progress.value / progress.max) * 100;

    progress.style.background = `linear-gradient(to right,#1DB954 0%,#1DB954 ${percent}%,#5C5C5C ${percent}%,#5C5C5C 100%)`;
}

function updateVolumeSlider() {
    const percent = volumenSlider.value * 100;

    volumenSlider.style.background = `linear-gradient(to right,#1DB954 0%,#1DB954 ${percent}%,#5C5C5C ${percent}%,#5C5C5C 100%)`;
}
updateVolumeSlider();

///// UPDATE TIME DISPLAY /////

setInterval(function () {
    currentTimeText.innerHTML = formatTime(music.currentTime) + "";

    if (music.src != window.location.href)
        maxTimeText.innerHTML = formatTime(music.duration) + "";
    // Every 1 sec
}, 1000)


// BUTTONS //
function toggleMusic() {
    // Display Tooltip
    if (music.src === window.location.href) {
        tooltip.style.opacity = "100%";
        setTimeout(() => {
            tooltip.style.opacity = "0%";
        }, 2000);
        return;
    }

    if (music.paused) {
        music.play();
        buttonDisplay.textContent = "⏸";
    }
    else {
        music.pause();
        buttonDisplay.textContent = "▶";
    }
}

function playMusic() {
    music.play();
    musicIsPlaying = true;

}

function pauseMusic() {
    music.pause();
    musicIsPlaying = false;
}

// Function to Format the Time //
function formatTime(seconds) {
    // Jede 60 Sekunden in 1 Minute setzen
    let minutes = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }
    // Return value
    return minutes + ":" + secs;
}


///// CHANGE MUSIC /////
function changeMusic(index) {
    const song = songs[index];

    music.src = song.file;
    displaySongInfomation(song);

    music.load();
    toggleMusic();
    progress.value = 0;
}

function displaySongInfomation(song) {
    songCover.src = song.cover;
    footerSong.textContent = song.name;
    footerArtist.textContent = song.artist;
}