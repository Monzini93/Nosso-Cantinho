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

// --- CARROSSEL AUTOMÁTICO COM TRANSIÇÃO SUAVE ---
const carousel = document.getElementById('carousel-slide');
const slides = Array.from(carousel.children);
let currentIndex = 0;

function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) currentIndex = 0;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Troca de slide a cada 3 segundos
setInterval(nextSlide, 3000);

// Ajusta o carrossel se a tela for redimensionada
window.addEventListener('resize', () => {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
});

// --- CONTROLE DE MÚSICA ---
const musica = document.getElementById('musica-fundo');
const playPauseBtn = document.getElementById('play-pause-btn');
const volumeSlider = document.getElementById('volume-slider');

// Verifica se os elementos existem antes de adicionar event listeners
if (musica && playPauseBtn && volumeSlider) {
    // Botão Play/Pause
    playPauseBtn.addEventListener('click', function() {
        if (musica.paused) {
            musica.play().then(() => {
                playPauseBtn.innerHTML = '⏸️ Pause';
                playPauseBtn.classList.remove('bg-pink-500');
                playPauseBtn.classList.add('bg-green-500');
            }).catch(error => {
                console.log('Erro ao reproduzir:', error);
            });
        } else {
            musica.pause();
            playPauseBtn.innerHTML = '▶️ Play';
            playPauseBtn.classList.remove('bg-green-500');
            playPauseBtn.classList.add('bg-pink-500');
        }
    });

    // Controle de volume
    volumeSlider.addEventListener('input', function() {
        musica.volume = volumeSlider.value;
    });

    // Atualizar o volume inicial
    musica.volume = volumeSlider.value;

    // Tentar reproduzir automaticamente após interação do usuário
    document.addEventListener('click', function iniciarMusica() {
        if (musica.paused) {
            musica.play().then(() => {
                playPauseBtn.innerHTML = '⏸️ Pause';
                playPauseBtn.classList.remove('bg-pink-500');
                playPauseBtn.classList.add('bg-green-500');
            }).catch(error => {
                console.log('Autoplay bloqueado:', error);
            });
        }
        // Remove o listener após a primeira interação
        document.removeEventListener('click', iniciarMusica);
    }, { once: true });
} else {
    console.log('Elementos do player de música não encontrados');
}
