// Script by Peter Yasreboff to dynamically create the hero video with independent styles 2025

const video = document.getElementById('background-video');
const placeholder = document.querySelector('.video-placeholder');
const videoSources = [
    'video/hero-vid-1-4k.mp4',
    'video/hero-vid-2-4k.mp4', // Add your second video file here
    'video/hero-vid-3-4k.mp4'  // Add your third video file here
];
let currentVideoIndex = 0;

// Hide placeholder and play first video when loaded
video.addEventListener('canplaythrough', function() {
    placeholder.style.display = 'none';
    video.play();
});

// Switch to next video when current one ends
video.addEventListener('ended', function() {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    video.src = videoSources[currentVideoIndex];
    video.load();
    video.play();
});

// Ensure placeholder is shown if video fails to load
video.addEventListener('error', function() {
    placeholder.style.display = 'block';
});