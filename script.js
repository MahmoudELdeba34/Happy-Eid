gsap.registerPlugin(ScrollTrigger);

/* ═══ أغاني العيد — روابط يوتيوب ═══ */
const PLAYLIST_SECTIONS = [
    {
        label: 'محمود العسيلي',
        tracks: [
            { id: 'GMihmMfeazY', title: 'وأخيراً', artist: 'مع صابرين', icon: '🎬', theme: 'esseily' },
        ],
    },
    {
        label: 'عمرو دياب',
        tracks: [
            { id: '6mJWH3dquqE', title: 'كل عيد وانت عيدي', artist: 'عمرو دياب', icon: '🎉', theme: 'amr' },
            { id: 'EgmXTmj62ic', title: 'تملي معاك', artist: 'عمرو دياب', icon: '✨', theme: 'amr' },
            { id: 'g3YyxsUBgmw', title: 'كل حياتي', artist: 'عمرو دياب', icon: '💛', theme: 'amr' },
            { id: 'D8VEwqef9XY', title: 'أول كل حاجة', artist: 'عمرو دياب', icon: '🎵', theme: 'amr' },
            { id: 'amy2fttDCb8', title: 'وماله', artist: 'عمرو دياب', icon: '🔥', theme: 'amr' },
            { id: 'iMZ1skkbUWI', title: 'يوم ما اتقابلنا', artist: 'عمرو دياب', icon: '💕', theme: 'amr' },
            { id: 'qcN8GkfaOZo', title: 'يا ساحر', artist: 'عمرو دياب', icon: '🌙', theme: 'amr' },
            { id: 'A6H5Xx2nFvM', title: 'يتعلموا', artist: 'عمرو دياب', icon: '⭐', theme: 'amr' },
        ],
    },
    {
        label: 'أغاني العيد',
        tracks: [
            { id: 'T-LAJ0Y7lsw', title: 'أغنية العيد', artist: 'مفضّلة', icon: '🐑', theme: 'eid' },
            { id: 'U25jPcPSmd8', title: 'أغنية العيد', artist: 'مفضّلة', icon: '🌙', theme: 'classic' },
            { id: 'U1MilDXHf4M', title: 'أغنية العيد', artist: 'مفضّلة', icon: '✨', theme: 'eid' },
            { id: 'SKfi0V8NRhQ', title: 'أغنية العيد', artist: 'مفضّلة', icon: '💛', theme: 'eid' },
            { id: 'eUMjEOIO7Cs', title: 'أغنية العيد', artist: 'مفضّلة', icon: '🎵', theme: 'classic' },
            { id: 'EI2oxQd95z4', title: 'أغنية العيد', artist: 'مفضّلة', icon: '❤', theme: 'eid' },
        ],
    },
];

const PLAYLIST = PLAYLIST_SECTIONS.flatMap((s) => s.tracks);

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

const youtubeUrl = (track) => `https://www.youtube.com/watch?v=${track.id}`;

let currentIndex = 0;
const nowPlayingEl = document.getElementById('now-playing');
const miniPlayer = document.getElementById('mini-player');
const btnPlay = document.getElementById('btn-play');
const tracksRoot = document.getElementById('tracks-root');

function renderTracks() {
    let index = 0;
    const parts = [];

    PLAYLIST_SECTIONS.forEach((section) => {
        parts.push(`<p class="tracks-section-label">${section.label}</p>`);
        section.tracks.forEach((t) => {
            const i = index;
            parts.push(`
            <button type="button" class="track${i === 0 ? ' is-active' : ''}" data-index="${i}">
                <span class="track__icon track__icon--${t.theme}">${t.icon}</span>
                <span class="track__body">
                    <span class="track__name">${t.title}</span>
                    <span class="track__artist">${t.artist}</span>
                </span>
                <span class="track__play">▶ يوتيوب</span>
            </button>`);
            index += 1;
        });
    });

    tracksRoot.innerHTML = parts.join('');

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

/* ═══ عيدية — الرسالة تظهر بعد الضغط فقط ═══ */
document.getElementById('btn-final-gift').addEventListener('click', function () {
    if (this.classList.contains('is-done')) return;
    this.classList.add('is-done');

    const letter = document.getElementById('letter');
    const hint = document.getElementById('gift-hint');
    letter.hidden = false;
    letter.classList.remove('letter--locked');
    hint.textContent = 'عيدية محمود وصلتكِ ♥';

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

    gsap.from(letter, { y: 40, opacity: 0, scale: 0.95, duration: 0.8, ease: 'power3.out' });
    setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
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
});
