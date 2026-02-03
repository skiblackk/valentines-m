document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-mariah');
    const yesBtn = document.getElementById('yes-btn-mariah');
    const noBtn = document.getElementById('no-btn-mariah');
    const confettiBtn = document.getElementById('confetti');
    const petalsBtn = document.getElementById('petals');
    const wishBtn = document.getElementById('wish-show');
    startBtn.addEventListener('click', goToQuestionScene);
    yesBtn.addEventListener('click', goToQuotesScene);
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', moveNoButton);
    confettiBtn.addEventListener('click', confettiHearts);
    petalsBtn.addEventListener('click', togglePetalShower);
    wishBtn.addEventListener('click', showWish);
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    if (prev && next) {
        prev.addEventListener('click', () => plusSlides(-1));
        next.addEventListener('click', () => plusSlides(1));
        const dots = document.querySelectorAll('.dot');
        dots.forEach((d, i) => d.addEventListener('click', () => currentSlide(i+1)));
    }
});

function goToQuestionScene() {
    document.getElementById('scene-intro').classList.add('hidden');
    document.getElementById('scene-question').classList.remove('hidden');
    document.body.classList.add('premium');
}

function goToQuotesScene() {
    document.getElementById('scene-question').classList.add('hidden');
    const quotesScene = document.getElementById('scene-quotes');
    quotesScene.classList.remove('hidden');
    startQuotes();
    ensureMusicThenPlay();
    startMemoriesShow();
}

function moveNoButton(e) {
    e.preventDefault();
    const noBtn = document.getElementById('no-btn-mariah');
    const maxWidth = window.innerWidth - noBtn.offsetWidth;
    const maxHeight = window.innerHeight - noBtn.offsetHeight;
    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

const quotes = [
    "You have a way of making ordinary moments feel special.",
    "Your smile could outshine a thousand stars.",
    "I admire your kindness and the calm you bring.",
    "If compliments were roses, you'd deserve a garden.",
    "I'd love the chance to make you smile today.",
    "Be my Valentine, Mariah?"
];

let quoteIndex = 0;
let quoteInterval;

function startQuotes() {
    const box = document.getElementById('quote-box');
    box.textContent = quotes[quoteIndex];
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        box.textContent = quotes[quoteIndex];
        box.style.animation = 'none';
        void box.offsetWidth;
        box.style.animation = '';
    }, 3500);
}

function confettiHearts() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.textContent = '❤️';
            h.style.position = 'fixed';
            h.style.left = Math.random() * 100 + 'vw';
            h.style.top = '-5vh';
            h.style.fontSize = (Math.random() * 20 + 16) + 'px';
            h.style.opacity = '0.9';
            h.style.transform = 'translateY(0)';
            h.style.transition = 'transform 3s linear, opacity 3s';
            document.body.appendChild(h);
            requestAnimationFrame(() => {
                h.style.transform = 'translateY(110vh)';
                h.style.opacity = '0';
            });
            setTimeout(() => h.remove(), 3200);
        }, i * 40);
    }
}

let petalsRunning = false;
let petalsTimer;
function togglePetalShower() {
    if (petalsRunning) {
        clearInterval(petalsTimer);
        petalsRunning = false;
        return;
    }
    petalsRunning = true;
    petalsTimer = setInterval(spawnPetal, 180);
}

function spawnPetal() {
    const container = document.getElementById('petals-container');
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = '🌹';
    const x = Math.random() * window.innerWidth;
    p.style.left = x + 'px';
    p.style.top = '-10vh';
    container.appendChild(p);
    setTimeout(() => p.remove(), 6500);
}

function showWish() {
    const input = document.getElementById('wish-input');
    if (!input.value.trim()) return;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.zIndex = '10000';
    const card = document.createElement('div');
    card.className = 'glass';
    card.style.padding = '2rem';
    card.style.color = '#fff';
    card.style.fontSize = '1.4rem';
    card.style.maxWidth = '600px';
    card.style.borderRadius = '16px';
    card.textContent = input.value;
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 3000);
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let playerMariah;
function onYouTubeIframeAPIReady() {
    playerMariah = new YT.Player('music-player-mariah', {
        height: '0',
        width: '0',
        videoId: 'j50FbJCqBnw',
        playerVars: {
            autoplay: 0,
            controls: 0,
            start: 33,
            loop: 0,
            origin: window.location.origin
        },
        events: {
            onReady: onMariahReady,
            onStateChange: onMariahStateChange
        }
    });
}

function onMariahReady(e) {
    e.target.setPlaybackRate(1.0);
}

function onMariahStateChange(e) {
    if (e.data === YT.PlayerState.ENDED) {
        playerMariah.seekTo(33);
        playerMariah.playVideo();
    }
}

function ensureMusicThenPlay() {
    // Retry until API/player ready (triggered by user click)
    if (typeof YT === 'undefined' || !playerMariah || !playerMariah.playVideo) {
        setTimeout(ensureMusicThenPlay, 400);
        return;
    }
    playerMariah.setVolume(100);
    playerMariah.seekTo(33, true);
    playerMariah.playVideo();
}

function ensureMusicPlaying() {
    if (playerMariah && playerMariah.getPlayerState && playerMariah.getPlayerState() !== YT.PlayerState.PLAYING) {
        playerMariah.playVideo();
    }
}

// Loop only between 0:33 and 1:33 (33s to 93s)
setInterval(() => {
    if (!playerMariah || !playerMariah.getCurrentTime) return;
    const t = playerMariah.getCurrentTime();
    if (t && t >= 93) {
        playerMariah.seekTo(33, true);
        playerMariah.playVideo();
    }
}, 500);

// Memories slideshow
let memIndex = 1;
let memInterval;
function startMemoriesShow() {
    memIndex = 1;
    showMemSlides(memIndex);
    if (memInterval) clearInterval(memInterval);
    memInterval = setInterval(() => {
        if (memIndex >= 4) {
            clearInterval(memInterval);
            showPoemScene();
        } else {
            plusSlides(1);
        }
    }, 15000); // 15s per slide to match 60s segment
}

function plusSlides(n) {
    showMemSlides(memIndex += n);
}

function currentSlide(n) {
    showMemSlides(memIndex = n);
}

function showMemSlides(n) {
    let i;
    const slides = document.querySelectorAll('#scene-quotes .slide');
    const dots = document.querySelectorAll('#scene-quotes .dot');
    if (n > slides.length) memIndex = 1;
    if (n < 1) memIndex = slides.length;
    for (i = 0; i < slides.length; i++) slides[i].style.display = 'none';
    for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(' active-dot', '');
    slides[memIndex-1].style.display = 'block';
    if (dots[memIndex-1]) dots[memIndex-1].className += ' active-dot';
}

// Poem scene and final message
function showPoemScene() {
    document.getElementById('scene-quotes').classList.add('hidden');
    const poem = document.getElementById('scene-poem-mariah');
    poem.classList.remove('hidden');
    startPoemTimerMariah();
}

function startPoemTimerMariah() {
    let timeLeft = 45;
    const timerElem = document.getElementById('poem-timer-mariah');
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) timerElem.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            heartCoverTransition(() => {
                showFinalSceneWithLetters();
            });
        }
    }, 1000);
}

function heartCoverTransition(done) {
    const overlay = document.getElementById('hearts-overlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = '';
    const total = 160;
    for (let i = 0; i < total; i++) {
        const h = document.createElement('div');
        h.textContent = '❤️';
        h.style.position = 'absolute';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.top = Math.random() * 100 + 'vh';
        h.style.fontSize = (Math.random() * 24 + 24) + 'px';
        h.style.opacity = '0';
        h.style.transform = 'scale(0.6)';
        h.style.transition = 'opacity 600ms ease, transform 600ms ease';
        overlay.appendChild(h);
        setTimeout(() => {
            h.style.opacity = '1';
            h.style.transform = 'scale(1)';
        }, i * 10);
    }
    setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.innerHTML = '';
        if (done) done();
    }, 2500);
}

function showFinalSceneWithLetters() {
    document.getElementById('scene-poem-mariah').classList.add('hidden');
    const finalScene = document.getElementById('scene-final-mariah');
    finalScene.classList.remove('hidden');
    const container = document.getElementById('final-yes');
    const text = "I knew you'd say yes";
    container.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.style.animationDelay = (i * 0.08) + 's';
        container.appendChild(span);
    }
}
