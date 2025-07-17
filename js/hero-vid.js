/*
 * Script by Peter Yastreboff to dynamically create the hero video with independent styles 2025
 * Updated to preload videos for smoother transitions
 */

const video = document.getElementById('background-video');
const placeholder = document.querySelector('.video-placeholder');

// add video sources here
const videoSources = [
    'video/hero-vid-1-4k.mp4',
    'video/hero-vid-2-4k.mp4',
    'video/hero-vid-3-4k.mp4'
];
let currentVideoIndex = 0;

// Preload all videos
const preloadVideos = [];
videoSources.forEach((src, index) => {
    if (index !== 0) { // Skip the first video since it's already set
        const videoElement = document.createElement('video');
        videoElement.src = src;
        videoElement.preload = 'auto';
        videoElement.style.display = 'none';
        document.body.appendChild(videoElement);
        preloadVideos.push(videoElement);
    }
});

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