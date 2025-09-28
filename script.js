// --- CONTADOR DE TEMPO ---
const dataInicio = new Date('2025-09-19T01:53:00').getTime();

const diasEl = document.getElementById('dias');
const horasEl = document.getElementById('horas');
const minutosEl = document.getElementById('minutos');
const segundosEl = document.getElementById('segundos');

function atualizarContador() {
    const agora = new Date().getTime();
    const diferenca = agora - dataInicio;

    if (diferenca < 0) {
        diasEl.textContent = '00';
        horasEl.textContent = '00';
        minutosEl.textContent = '00';
        segundosEl.textContent = '00';
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    diasEl.textContent = dias.toString().padStart(2, '0');
    horasEl.textContent = horas.toString().padStart(2, '0');
    minutosEl.textContent = minutos.toString().padStart(2, '0');
    segundosEl.textContent = segundos.toString().padStart(2, '0');
}

atualizarContador();
setInterval(atualizarContador, 1000);


// --- CARROSSEL AUTOMÁTICO ---
const carousel = document.getElementById('carousel-slide');
const slides = carousel.children;
let currentIndex = 0;

function nextSlide() {
    const slideWidth = slides[0].offsetWidth; // largura de cada imagem
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

// Troca de slide a cada 3 segundos
setInterval(nextSlide, 3000);

// Ajusta o carrossel quando a tela for redimensionada
window.addEventListener('resize', () => {
    const slideWidth = slides[0].offsetWidth;
    carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});
