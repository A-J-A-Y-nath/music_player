const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');

let songs = [];
let songIndex = 0;

// Fetch the list of songs from the PHP backend
async function fetchSongs() {
    try {
        const response = await fetch('index.php?action=fetch_songs');
        songs = await response.json();
        loadSong(songIndex);
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

// Load the current song
function loadSong(index) {
    if (songs.length === 0) return;
    audioPlayer.src = `songs/${songs[index]}`;
    songTitle.textContent = `Now Playing: ${songs[index]}`;
}

// Play-pause the current song
function playSong() {
    if(audioPlayer.paused){
        audioPlayer.play();
        playPauseBtn.innerHTML = '❚❚'
    }
    else{
        audioPlayer.pause();
        playPauseBtn.innerHTML = '▶'
    }

}


// Play the next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
}

// Play the previous song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
}

// Update progress bar and current time
audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioPlayer;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = duration ? formatTime(duration) : "0:00";
});

// Seek the audio
progressBar.addEventListener('input', () => {
    const { duration } = audioPlayer;
    audioPlayer.currentTime = (progressBar.value / 100) * duration;
});

// Play the next song automatically when the current one ends
audioPlayer.addEventListener('ended', nextSong);

// Format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Add event listeners
playPauseBtn.addEventListener('click', playSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Fetch and initialize songs
fetchSongs();
