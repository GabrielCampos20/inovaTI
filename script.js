// Carousel functionality
let carousels = {};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all carousels
    document.querySelectorAll('.carousel').forEach(carousel => {
        const id = carousel.id;
        carousels[id] = {
            currentIndex: 0,
            totalItems: carousel.querySelectorAll('.produto').length
        };
    });

    // Add click event listeners to all buy buttons
    document.querySelectorAll('.comprar-btn').forEach(button => {
        button.addEventListener('click', handlePurchase);
    });

    // Initialize form validation
    const contactForm = document.getElementById('contato-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
});

function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const carouselData = carousels[carouselId];
    if (!carouselData) return;

    carouselData.currentIndex += direction;

    // Handle circular navigation
    if (carouselData.currentIndex < 0) {
        carouselData.currentIndex = carouselData.totalItems - 1;
    } else if (carouselData.currentIndex >= carouselData.totalItems) {
        carouselData.currentIndex = 0;
    }

    // Apply the transform
    const carouselInner = carousel.querySelector('.carousel-inner');
    if (carouselInner) {
        const offset = -carouselData.currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }
}

function handlePurchase(event) {
    const button = event.target;
    const productInfo = button.closest('.produto-info');
    if (!productInfo) return;

    const productName = productInfo.querySelector('h4').textContent;
    const productPrice = productInfo.querySelector('.preco').textContent;

    // Simple confirmation dialog
    const confirmed = confirm(`Confirmar compra:\n${productName}\n${productPrice}`);
    
    if (confirmed) {
        button.textContent = 'Processando...';
        button.disabled = true;

        // Simulate processing
        setTimeout(() => {
            alert('Compra realizada com sucesso!');
            button.textContent = 'Comprar';
            button.disabled = false;
        }, 1500);
    }
}

function validateForm(event) {
    event.preventDefault();

    const form = event.target;
    const nome = form.querySelector('#nome');
    const email = form.querySelector('#email');
    const mensagem = form.querySelector('#mensagem');

    // Reset previous error states
    clearErrors();

    let isValid = true;

    // Validate name (minimum 3 characters)
    if (nome.value.trim().length < 3) {
        showError(nome, 'O nome deve ter pelo menos 3 caracteres');
        isValid = false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Por favor, insira um email válido');
        isValid = false;
    }

    // Validate message (minimum 10 characters)
    if (mensagem.value.trim().length < 10) {
        showError(mensagem, 'A mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        const submitButton = form.querySelector('.submit-btn');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('Mensagem enviada com sucesso!');
            form.reset();
            submitButton.textContent = 'Enviar Mensagem';
            submitButton.disabled = false;
        }, 1500);
    }

    return false;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '0.3rem';
    error.textContent = message;
    formGroup.appendChild(error);
    input.style.borderColor = 'red';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.style.borderColor = '#ddd';
    });
}
