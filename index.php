<?php
// Backend to fetch songs from the 'songs' directory
if (isset($_GET['action']) && $_GET['action'] === 'fetch_songs') {
    $songsDir = 'songs'; // Directory containing songs
    $songs = [];

    if (is_dir($songsDir)) {
        $files = scandir($songsDir);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'mp3') {
                $songs[] = $file;
            }
        }
    }

    header('Content-Type: application/json');
    echo json_encode($songs);
    exit;
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Music Player</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="music-player">
        <h1>Dynamic Music Player</h1>
        <audio id="audio-player"></audio>
        <div class="controls">
            <button id="prev-btn">⮜</button>
            <button id="play-pause-btn">▶</button>
            <button id="next-btn">➤</button>
        </div>
        <div class="progress-container">
            <span id="current-time">0:00</span>
            <input type="range" id="progress-bar" min="0" max="100" value="0">
            <span id="duration">0:00</span>
        </div>
        <div id="song-title">Now Playing: </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
