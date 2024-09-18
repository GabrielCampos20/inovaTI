function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const carouselInner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.produto');
    const totalItems = items.length;
    let currentIndex = parseInt(carousel.getAttribute('data-index')) || 0;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
    carousel.setAttribute('data-index', currentIndex);
}
