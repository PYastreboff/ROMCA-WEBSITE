// Generate image elements for 1-33.jpg
const gallery = document.getElementById('gallery2');
for (let i = 1; i <= 33; i++) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = `./images/gallery/${i}.jpg`;
    img.alt = `Gallery image ${i}`;
    item.appendChild(img);
    gallery.appendChild(item);
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.onclick = function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
    }
});

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}