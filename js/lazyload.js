// Lazy Load Gallery Images with Modal Functionality
// Written by Peter Yastreboff, 8 June 2025

document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('gallery-container');
    const modalContainer = document.getElementById('modal-container');
    let currentIndex = 7; // Start after the initial 6 images
    const batchSize = 6; // Load 6 images at a time
    const totalImages = 34; // Total images in the gallery
    let isLoading = false;
    const modalInstances = new Map(); // Store modal instances

    function createModal(imageIndex) {
        // Check if modal already exists
        if (document.getElementById(`galleryModal${imageIndex}`)) {
            return;
        }

        const modalHTML = `
            <div class="modal fade" id="galleryModal${imageIndex}" tabindex="-1" aria-labelledby="galleryModalLabel${imageIndex}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content" style="background-color: #000000; border: none;">
                        <div class="modal-header" style="border: none !important;">
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img src="images/gallery/${imageIndex}.jpg" class="img-fluid" alt="Gallery Image ${imageIndex}" style="max-width: 100%; height: auto;" loading="lazy">
                        </div>
                    </div>
                </div>
            </div>
        `;
        modalContainer.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize modal and store instance
        const modalElement = document.getElementById(`galleryModal${imageIndex}`);
        const modal = new bootstrap.Modal(modalElement);
        modalInstances.set(imageIndex, modal);

        // Clean up modal instance when hidden
        modalElement.addEventListener('hidden.bs.modal', function() {
            const modalInstance = modalInstances.get(imageIndex);
            if (modalInstance) {
                modalInstance.dispose();
                modalInstances.delete(imageIndex);
            }
        });
    }

    function loadMoreImages() {
        if (isLoading || currentIndex > totalImages) return;
        isLoading = true;

        const endIndex = Math.min(currentIndex + batchSize - 1, totalImages);
        let galleryHTML = '';

        for (let i = currentIndex; i <= endIndex; i++) {
            galleryHTML += `
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="gallery-item">
                        <img src="images/gallery/${i}.jpg" class="img-fluid gallery-img" alt="Gallery Image ${i}" data-bs-toggle="modal" data-bs-target="#galleryModal${i}" loading="lazy">
                    </div>
                </div>
            `;
        }

        galleryContainer.insertAdjacentHTML('beforeend', galleryHTML);
        currentIndex = endIndex + 1;
        isLoading = false;

        // Add click event listeners to newly added images
        const newImages = galleryContainer.querySelectorAll('.gallery-img:not(.modal-listener)');
        newImages.forEach(img => {
            img.addEventListener('click', function() {
                const imageIndex = parseInt(this.alt.match(/\d+/)[0], 10);
                createModal(imageIndex);
                // Show modal using stored instance
                const modalInstance = modalInstances.get(imageIndex);
                if (modalInstance) {
                    modalInstance.show();
                }
            });
            img.classList.add('modal-listener');
        });
    }

    // Add click event listeners to initial 6 images
    const initialImages = galleryContainer.querySelectorAll('.gallery-img');
    initialImages.forEach(img => {
        img.classList.add('modal-listener');
    });

    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - window.innerHeight * 1.5) {
            loadMoreImages();
        }
    });

    // Load the first batch if the page is short
    if (document.body.offsetHeight <= window.innerHeight) {
        loadMoreImages();
    }
});