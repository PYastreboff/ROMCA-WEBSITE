// Modal Shadow DOM created by Peter Y to dynamically create the gallery with independant stlyes 2025

const host = document.getElementById('shadow-host');
const shadow = host.attachShadow({ mode: 'open' });

const style = `
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f0f0f0;
    }

    .gallery {
        column-count: 3;
        column-gap: 15px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .gallery-item {
        break-inside: avoid;
        margin-bottom: 15px;
        cursor: pointer;
        cursor: default; /* Prevent pointer cursor */
        user-select: none; /* Prevent text selection */
    }

    .gallery-item img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        transition: transform 0.3s;
    }

    .gallery-item img:hover {
        transform: scale(1.02);
        cursor: pointer;
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        max-width: 90%;
        max-height: 80vh;
        border-radius: 8px;
    }

    .close {
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .close:hover {

        color: #dedede;
    }

    @media (max-width: 768px) {
        .gallery {
            column-count: 2;
        }
    }

    @media (max-width: 480px) {
        .gallery {
            column-count: 1;
        }
    }
`;

const html = `
    <style>${style}</style>
    <div class="gallery" id="gallery"></div>
    <div id="imageModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>
`;

shadow.innerHTML = html;

const gallery = shadow.getElementById('gallery');
for (let i = 1; i <= 33; i++) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = `./images/gallery/${i}.jpg`;
    img.alt = `Gallery image ${i}`;
    item.appendChild(img);
    gallery.appendChild(item);
}

const modal = shadow.getElementById('imageModal');
const modalImg = shadow.getElementById('modalImage');
const closeBtn = modal.querySelector('.close');

shadow.querySelectorAll('.gallery-item img').forEach(img => {
    img.onclick = function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
    };
});

closeBtn.onclick = function() {
    modal.style.display = 'none';
};

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});