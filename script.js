const images = ['Timeline - 01.jpg', 'Timeline - 02.jpg', 'Timeline - 03.jpg'];

const mainImage = document.querySelector('.carousel');
let currentImage = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

const changeImage = (direction) => {
    currentImage = (currentImage + direction + images.length) % images.length; // Use modulus to loop
    mainImage.src = images[currentImage];
};

// Touch and Mouse Events
const startDrag = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
};

const drag = (e) => {
    if (!isDragging) return;

    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const difference = startX - currentX;

    if (difference > 50) { // Swipe left
        changeImage(1);
        isDragging = false;
    } else if (difference < -50) { // Swipe right
        changeImage(-1);
        isDragging = false;
    }
};

const endDrag = () => {
    isDragging = false;
};

// Touch Events
mainImage.addEventListener('touchstart', startDrag);
mainImage.addEventListener('touchmove', drag);
mainImage.addEventListener('touchend', endDrag);

// Mouse Events
mainImage.addEventListener('mousedown', startDrag);
mainImage.addEventListener('mousemove', drag);
mainImage.addEventListener('mouseup', endDrag);
mainImage.addEventListener('mouseleave', endDrag);

// Auto Play (optional)
let autoPlayInterval = null;
const autoPlayButton = document.querySelector('.play');
autoPlayButton.addEventListener('click', () => {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayButton.textContent = 'Auto Play';
    } else {
        autoPlayInterval = setInterval(() => {
            changeImage(1);
        }, 1000);
        autoPlayButton.textContent = 'Stop Auto Play';
    }
});
