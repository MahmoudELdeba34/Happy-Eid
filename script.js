gsap.registerPlugin(ScrollTrigger);

/* ═══ أغاني العيد — روابط صحيحة ═══ */
const PLAYLIST = [
    { id: 'EF4QVCWUSY0', title: 'يا ليلة العيد', artist: 'أم كلثوم', icon: '🌙', theme: 'classic' },
    { id: '6mJWH3dquqE', title: 'كل عيد وانت عيدي', artist: 'عمرو دياب', icon: '🎉', theme: 'eid' },
    { id: 'EgmXTmj62ic', title: 'تملي معاك', artist: 'عمرو دياب', icon: '✨', theme: 'amr' },
    {
        search: 'محمود+العسيلي+بعد+حوارات',
        title: 'بعد حوارات',
        artist: 'محمود العسيلي',
        icon: '🎤',
        theme: 'new',
    },
    { id: 's9JVDi5la_0', title: 'إيش', artist: 'محمود العسيلي', icon: '🔥', theme: 'esseily' },
    { id: '-jFKJ1eYJ-g', title: 'بوم طاخ', artist: 'محمود العسيلي', icon: '💥', theme: 'new' },
];

const SURPRISES = [
    { emoji: '💕', label: 'لمسة ١', msg: 'روان، إنتِ أجمل حاجة في يومي.' },
    { emoji: '🌙', label: 'لمسة ٢', msg: 'كل عيد وأنتِ عيدي — وكل يوم وأنتِ حياتي.' },
    { emoji: '✨', label: 'لمسة ٣', msg: 'بحبك أكتر مما أقدر أقول.' },
    { emoji: '🐑', label: 'لمسة ٤', msg: 'عيد أضحى سعيد يا أميرتي — محمود ♥' },
    { emoji: '🎁', label: 'لمسة ٥', msg: 'مستني أقضي كل الأعياد الجاية معاكِ.' },
    { emoji: '♥', label: 'لمسة ٦', msg: 'إنتِ السبب إني بابتسم من قلبي.' },
];

const WHEEL_MSGS = [
    'روان، إنتِ عيدي الحقيقي 🎉',
    'بحبك يا أحلى روان ♥',
    'كل عام وأنتِ بخير يا روحي ✨',
    'إنتِ أجمل مفاجأة في حياتي 🎁',
    'مستني نكمل حكايتنا للأبد 🌙',
    'عيد سعيد يا حبيبتي 🐑',
];

const youtubeUrl = (track) =>
    track.id
        ? `https://www.youtube.com/watch?v=${track.id}`
        : `https://www.youtube.com/results?search_query=${track.search}`;

let currentIndex = 0;
const nowPlayingEl = document.getElementById('now-playing');
const miniPlayer = document.getElementById('mini-player');
const btnPlay = document.getElementById('btn-play');
const tracksRoot = document.getElementById('tracks-root');

function renderTracks() {
    tracksRoot.innerHTML = PLAYLIST.map(
        (t, i) => `
        <button type="button" class="track${i === 0 ? ' is-active' : ''}" data-index="${i}">
            <span class="track__icon track__icon--${t.theme}">${t.icon}</span>
            <span class="track__body">
                <span class="track__name">${t.title}</span>
                <span class="track__artist">${t.artist}</span>
            </span>
            <span class="track__play">▶ يوتيوب</span>
        </button>`
    ).join('');

    tracksRoot.querySelectorAll('.track').forEach((btn) => {
        btn.addEventListener('click', () => playTrack(Number(btn.dataset.index)));
    });
}

function setActiveTrack(i) {
    currentIndex = i;
    nowPlayingEl.textContent = PLAYLIST[i].title;
    tracksRoot.querySelectorAll('.track').forEach((el, idx) => {
        el.classList.toggle('is-active', idx === i);
    });
}

function playTrack(index) {
    const i = (index + PLAYLIST.length) % PLAYLIST.length;
    setActiveTrack(i);
    window.open(youtubeUrl(PLAYLIST[i]), '_blank', 'noopener,noreferrer');
    miniPlayer.classList.add('is-playing');
    btnPlay.textContent = '⏸';
}

btnPlay.addEventListener('click', () => {
    if (miniPlayer.classList.contains('is-playing')) {
        miniPlayer.classList.remove('is-playing');
        btnPlay.textContent = '▶';
    } else {
        playTrack(currentIndex);
    }
});
document.getElementById('btn-prev').addEventListener('click', () => playTrack(currentIndex - 1));
document.getElementById('btn-next').addEventListener('click', () => playTrack(currentIndex + 1));
renderTracks();
setActiveTrack(0);

/* ═══ مفاجآت ═══ */
function renderSurprises() {
    const grid = document.getElementById('surprise-grid');
    const colors = ['#fce7f3', '#d1fae5', '#ffedd5', '#e0e7ff', '#fef08a', '#ffe4e6'];
    grid.innerHTML = SURPRISES.map((s, i) => `
        <button type="button" class="surprise-card" data-i="${i}" style="background:${colors[i]}">
            <span class="surprise-card__emoji">${s.emoji}</span>
            <span class="surprise-card__label">${s.label}</span>
        </button>
    `).join('');

    grid.querySelectorAll('.surprise-card').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-open')) return;
            const s = SURPRISES[Number(btn.dataset.i)];
            btn.classList.add('is-open');
            btn.innerHTML = `<p class="surprise-card__msg">${s.msg}</p>`;
            gsap.from(btn, { scale: 0.9, duration: 0.35, ease: 'back.out(2)' });
        });
    });
}
renderSurprises();

/* ═══ فيديو ═══ */
const video = document.getElementById('main-video');
const videoCard = document.getElementById('video-card');
const videoOverlay = document.getElementById('video-overlay');
const btnPlayVideo = document.getElementById('btn-play-video');
const vcToggle = document.getElementById('vc-toggle');
const vcSeek = document.getElementById('vc-seek');
const vcMute = document.getElementById('vc-mute');
const vcTime = document.getElementById('vc-time');
const videoError = document.getElementById('video-error');

function fmt(sec) {
    if (!sec || Number.isNaN(sec)) return '0:00';
    return `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, '0')}`;
}

function startVideo() {
    video.muted = false;
    const p = video.play();
    if (p && p.catch) {
        p.catch(() => {
            video.muted = true;
            video.play();
        });
    }
    videoCard.classList.add('is-playing');
    videoOverlay.classList.add('is-hidden');
    vcToggle.textContent = '⏸';
}

btnPlayVideo.addEventListener('click', startVideo);

vcToggle.addEventListener('click', () => {
    if (video.paused) startVideo();
    else {
        video.pause();
        videoCard.classList.remove('is-playing');
        videoOverlay.classList.remove('is-hidden');
        vcToggle.textContent = '▶';
    }
});

video.addEventListener('timeupdate', () => {
    if (video.duration) {
        vcSeek.value = (video.currentTime / video.duration) * 100;
        vcTime.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
    }
});

vcSeek.addEventListener('input', () => {
    if (video.duration) video.currentTime = (vcSeek.value / 100) * video.duration;
});

vcMute.addEventListener('click', () => {
    video.muted = !video.muted;
    vcMute.textContent = video.muted ? '🔇' : '🔊';
});

video.addEventListener('error', () => {
    videoError.hidden = false;
});

video.addEventListener('loadeddata', () => {
    videoError.hidden = true;
});

if (window.location.protocol === 'file:') {
    videoError.hidden = false;
}

/* ═══ Lightbox صور ═══ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCap = document.getElementById('lightbox-cap');

document.querySelectorAll('.gallery-slide').forEach((slide) => {
    slide.addEventListener('click', () => {
        lightboxImg.src = slide.dataset.full;
        lightboxCap.textContent = slide.dataset.caption;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    });
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
}

/* ═══ Scratch card ═══ */
function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    const wrap = canvas.parentElement;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    let drawing = false;

    const resize = () => {
        const rect = wrap.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.fillStyle = '#c9a227';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#8b6914';
        ctx.font = 'bold 18px Reem Kufi, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('امسحي هنا ✨', canvas.width / 2, canvas.height / 2);
    };

    resize();
    window.addEventListener('resize', resize);

    const scratch = (x, y) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
    };

    const pos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const t = e.touches ? e.touches[0] : e;
        return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    };

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        drawing = true;
        const p = pos(e);
        scratch(p.x, p.y);
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!drawing) return;
        const p = pos(e);
        scratch(p.x, p.y);
    }, { passive: false });

    canvas.addEventListener('touchend', () => { drawing = false; });
    canvas.addEventListener('mousedown', (e) => { drawing = true; scratch(pos(e).x, pos(e).y); });
    canvas.addEventListener('mousemove', (e) => { if (drawing) scratch(pos(e).x, pos(e).y); });
    canvas.addEventListener('mouseup', () => { drawing = false; });
}

/* ═══ Wheel ═══ */
const wheel = document.getElementById('wheel');
const wheelResult = document.getElementById('wheel-result');
let wheelSpinning = false;
let wheelRotation = 0;

document.getElementById('btn-spin').addEventListener('click', () => {
    if (wheelSpinning) return;
    wheelSpinning = true;
    const idx = Math.floor(Math.random() * WHEEL_MSGS.length);
    const extra = 360 * 5 + idx * 60 + 30;
    wheelRotation += extra;
    wheel.style.transform = `rotate(${wheelRotation}deg)`;
    wheelResult.textContent = '...';
    setTimeout(() => {
        wheelResult.textContent = WHEEL_MSGS[idx];
        wheelSpinning = false;
    }, 4200);
});

/* ═══ Memory game ═══ */
function initMemory() {
    const grid = document.getElementById('memory-grid');
    const scoreEl = document.getElementById('memory-score');
    const emojis = ['❤', '✨', '🌙', '🎁', '❤', '✨', '🌙', '🎁'];
    let shuffled = [...emojis].sort(() => Math.random() - 0.5);
    let flipped = [];
    let matched = 0;
    let tries = 0;
    let lock = false;

    grid.innerHTML = shuffled
        .map((e, i) => `<button type="button" class="memory-card" data-i="${i}" data-e="${e}">?</button>`)
        .join('');

    grid.querySelectorAll('.memory-card').forEach((card) => {
        card.addEventListener('click', () => {
            if (lock || card.classList.contains('is-flipped') || card.classList.contains('is-matched')) return;

            card.classList.add('is-flipped');
            card.textContent = card.dataset.e;
            flipped.push(card);

            if (flipped.length === 2) {
                lock = true;
                tries++;
                scoreEl.textContent = `محاولات: ${tries}`;

                if (flipped[0].dataset.e === flipped[1].dataset.e) {
                    flipped.forEach((c) => c.classList.add('is-matched'));
                    matched += 2;
                    flipped = [];
                    lock = false;
                    if (matched === emojis.length) {
                        scoreEl.textContent = `🎉 كسبتِ! محاولات: ${tries}`;
                    }
                } else {
                    setTimeout(() => {
                        flipped.forEach((c) => {
                            c.classList.remove('is-flipped');
                            c.textContent = '?';
                        });
                        flipped = [];
                        lock = false;
                    }, 700);
                }
            }
        });
    });
}

/* ═══ Petals ═══ */
function initPetals() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = ['#ff6b6b', '#ffd666', '#10b981', '#f472b6'];
    const petals = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 25; i++) {
        petals.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 3 + Math.random() * 4,
            speed: 0.2 + Math.random() * 0.5,
            color: colors[i % colors.length],
        });
    }

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach((p) => {
            p.y += p.speed;
            if (p.y > canvas.height) p.y = -10;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    })();
}

/* ═══ Final gift ═══ */
document.getElementById('btn-final-gift').addEventListener('click', function () {
    if (this.classList.contains('is-done')) return;
    this.classList.add('is-done');
    document.getElementById('letter-secret').hidden = false;

    const items = ['🐑', '❤', '✨', '🎉', '🌸', '💛', '🎁'];
    for (let i = 0; i < 55; i++) {
        const el = document.createElement('span');
        el.className = 'confetti';
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.left = `${Math.random() * 100}vw`;
        el.style.top = '100vh';
        document.body.appendChild(el);
        gsap.to(el, {
            y: -window.innerHeight - 100,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 500,
            duration: 1.5 + Math.random(),
            onComplete: () => el.remove(),
        });
    }

    gsap.from('#letter-secret', { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(2)' });
});

/* ═══ Loader & reveals ═══ */
window.addEventListener('load', () => {
    gsap.timeline()
        .to('.loader-fill', { width: '100%', duration: 1.4, ease: 'power2.inOut' })
        .to('.loader', {
            opacity: 0,
            duration: 0.45,
            onComplete: () => { document.getElementById('loader').style.display = 'none'; },
        })
        .add(() => miniPlayer.classList.add('is-visible'))
        .from('.hero__inner > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' });

    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 92%' },
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
        });
    });

    initPetals();
    initScratch();
    initMemory();
});
