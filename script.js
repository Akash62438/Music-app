const audioPlayer = document.getElementById('audioPlayer');
const playlist = [
  { src: 'music.mp3', title: 'Cheques', artist: 'Shubh' },
  { src: 'music1.mp3', title: 'King shit', artist: 'Shubh' },
  { src: 'music3.mp3', title: 'Still Rollin', artist: 'Shubh' },
  { src: 'Bandana_1.mp3', title: 'Bandana', artist: 'Shubh' },
  { src: 'music4.mp3', title: 'Brownprint', artist: 'AP Dhillon' }
];
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Play the selected song
function playSong(song, title, artist) {
  audioPlayer.src = song;
  audioPlayer.play();
  document.getElementById('currentSongTitle').innerText = `Now Playing: ${title}`;
  document.getElementById('currentSongArtist').innerText = `Artist: ${artist}`;
  isPlaying = true;
}

// Play or pause the current song
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
  } else {
    audioPlayer.play();
    isPlaying = true;
  }
}

// Play the previous song
function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  const song = playlist[currentSongIndex];
  playSong(song.src, song.title, song.artist);
}

// Play the next song
function nextSong() {
  currentSongIndex = isShuffle
    ? Math.floor(Math.random() * playlist.length)
    : (currentSongIndex + 1) % playlist.length;
  const song = playlist[currentSongIndex];
  playSong(song.src, song.title, song.artist);
}

// Shuffle toggle
function toggleShuffle() {
  isShuffle = !isShuffle;
  alert(isShuffle ? 'Shuffle On' : 'Shuffle Off');
}

// Repeat toggle
function toggleRepeat() {
  isRepeat = !isRepeat;
  audioPlayer.loop = isRepeat;
  alert(isRepeat ? 'Repeat On' : 'Repeat Off');
}

// Adjust volume
function setVolume(value) {
  audioPlayer.volume = value;
}

// Auto-play next song
audioPlayer.addEventListener('ended', () => {
  if (!isRepeat) nextSong();
});

// Search songs
function searchSongs() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const songList = document.getElementById('playlistContainer').children;
  for (let song of songList) {
    const text = song.innerText.toLowerCase();
    song.style.display = text.includes(query) ? '' : 'none';
  }
}