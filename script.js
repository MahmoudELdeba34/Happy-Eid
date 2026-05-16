/**
 * Eid 2026 — App bootstrap (works without refresh, no hidden iframe)
 */
(function () {
    'use strict';

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
        { emoji: '💕', label: 'لمسة ١', msg: 'روان، إنتِ أجمل حاجة في يومي.', bg: '#ffe8f4' },
        { emoji: '🌙', label: 'لمسة ٢', msg: 'كل عيد وأنتِ عيدي — وكل يوم وأنتِ حياتي.', bg: '#e8eaff' },
        { emoji: '✨', label: 'لمسة ٣', msg: 'بحبك أكتر مما أقدر أقول.', bg: '#fff9db' },
        { emoji: '🐑', label: 'لمسة ٤', msg: 'عيد أضحى سعيد يا أميرتي — محمود ♥', bg: '#e3fce9' },
        { emoji: '🎁', label: 'لمسة ٥', msg: 'مستني أقضي كل الأعياد الجاية معاكِ.', bg: '#f3e8ff' },
        { emoji: '♥', label: 'لمسة ٦', msg: 'إنتِ السبب إني بابتسم من قلبي.', bg: '#ffe4e8' },
        { emoji: '🌹', label: 'لمسة ٧', msg: 'ضحكتك أحلى صوت في الدنيا — محمود.', bg: '#fce7f3' },
        { emoji: '🦋', label: 'لمسة ٨', msg: 'كل ما أشوفك بحس إن الدنيا وقفت عشانكِ.', bg: '#e0f2fe' },
        { emoji: '☀️', label: 'لمسة ٩', msg: 'إنتِ مش بس حبيبتي — إنتِ رفيقة عمري.', bg: '#fef3c7' },
        { emoji: '🍯', label: 'لمسة ١٠', msg: 'حياتي حلوة عشانكِ موجودة فيها.', bg: '#ffedd5' },
        { emoji: '🌊', label: 'لمسة ١١', msg: 'مستني نصنع ذكريات أجمل من اللي فات.', bg: '#dbeafe' },
        { emoji: '🎀', label: 'لمسة ١٢', msg: 'محمود دايمًا فخور إنك خطيبته — روان ♥', bg: '#fae8ff' },
    ];

    const MYSTERY_BOXES = [
        { icon: '🎁', msg: 'عيديتك الحقيقية: قلبي كله ليكِ.' },
        { icon: '💍', msg: 'مستني اليوم اللي نكمل فيه حكايتنا للأبد.' },
        { icon: '🌟', msg: 'إنتِ نجمة حياتي — من غيركِ مفيش سماء.' },
        { icon: '🎂', msg: 'كل يوم معاكِ عيد — مش بس العيد.' },
        { icon: '🕯️', msg: 'دعوة من قلبي: ربنا يديم فرحتنا سوا.' },
        { icon: '🧸', msg: 'حضنك أحلى مكان في الدنيا — محمود.' },
    ];

    const LUCKY_MSGS = [
        'روان، النهاردة يومكِ — ابتسمي ♥',
        'مفاجأة: محمود بيفتكركِ كل ثانية ✨',
        'سر: إنتِ السبب في كل حاجة حلوة في حياتي 🎁',
        'تلميح: في حد بيحبكِ أكتر مما تتخيلي 🌙',
        'رسالة: مستني أقولك بحبك قدام الدنيا كلها 💕',
        'عيدية صغيرة: ضحكتك أغلى من كل هدايا العيد 🐑',
        'محمود بيقول: روان = سعادة × ∞',
        'مفاجأة عشوائية: إنتِ أحلى قرار في حياتي 🎀',
    ];

    const WHEEL_MSGS = [
        'روان، إنتِ عيدي الحقيقي 🎉',
        'بحبك يا أحلى روان ♥',
        'كل عام وأنتِ بخير يا روحي ✨',
        'إنتِ أجمل مفاجأة في حياتي 🎁',
        'مستني نكمل حكايتنا للأبد 🌙',
        'عيد سعيد يا حبيبتي 🐑',
        'ضحكتك تساوي الدنيا كلها 🌹',
        'قلبي ملككِ — محمود ♥',
    ];

    const QUIZ = [
        { q: 'مين أحلى بنت في الدنيا؟', opts: ['روان ♥', 'حد تاني', 'مش عارف'], correct: 0 },
        { q: 'محمود بيحب مين؟', opts: ['روان', 'الكورة', 'النوم'], correct: 0 },
        { q: 'كل عيد وأنتِ إيه؟', opts: ['عيدي', 'صديقتي بس', 'جارتي'], correct: 0 },
        { q: 'أحلى ذكرى لمحمود؟', opts: ['أول يوم شافكِ', 'أكل فول', 'ماتش'], correct: 0 },
        { q: 'مين خطيبة محمود؟', opts: ['روان — طبعًا!', 'مفيش', 'القمر'], correct: 0 },
    ];

    const MEMORY_PAIRS = ['💕', '🐑', '✨', '🌙', '🎁', '♥'];

    /* ─── DOM refs ─── */
    const $ = (sel, root = document) => root.querySelector(sel);
    const loader = $('#loader');
    const loaderBar = $('#loader-bar');
    const miniPlayer = $('#mini-player');
    const nowPlayingEl = $('#now-playing');
    const btnPlay = $('#btn-play');
    const btnPrev = $('#btn-prev');
    const btnNext = $('#btn-next');
    const tracksRoot = $('#tracks-root');
    let currentIndex = 0;
    let wheelRotation = 0;
    let wheelSpinning = false;
    let loaderDone = false;

    const youtubeUrl = (track) => `https://www.youtube.com/watch?v=${track.id}`;

    function finishLoader() {
        if (loaderDone) return;
        loaderDone = true;

        if (loaderBar) loaderBar.style.width = '100%';
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');

        requestAnimationFrame(() => {
            if (loader) loader.classList.add('is-hidden');
            if (miniPlayer) {
                miniPlayer.hidden = false;
                miniPlayer.classList.add('is-visible');
            }
            initScratch();
        });
    }

    function runLoader() {
        let progress = 0;
        const tick = () => {
            progress = Math.min(progress + 8 + Math.random() * 12, 95);
            if (loaderBar) loaderBar.style.width = `${progress}%`;
            if (progress < 95) {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);

        const onReady = () => finishLoader();
        if (document.readyState === 'complete') {
            setTimeout(onReady, 600);
        } else {
            window.addEventListener('load', () => setTimeout(onReady, 400), { once: true });
        }
        setTimeout(finishLoader, 3500);
    }

    /* ─── Music ─── */
    function renderTracks() {
        if (!tracksRoot) return;
        let index = 0;
        const html = [];

        PLAYLIST_SECTIONS.forEach((section) => {
            html.push(`<p class="tracks__section">${section.label}</p>`);
            section.tracks.forEach((t) => {
                const i = index++;
                html.push(`
                <button type="button" class="track${i === 0 ? ' is-active' : ''}" data-index="${i}">
                    <span class="track__icon track__icon--${t.theme}">${t.icon}</span>
                    <span class="track__body">
                        <span class="track__name">${t.title}</span>
                        <span class="track__artist">${t.artist}</span>
                    </span>
                    <span class="track__go">▶ يوتيوب</span>
                </button>`);
            });
        });

        tracksRoot.innerHTML = html.join('');
        tracksRoot.querySelectorAll('.track').forEach((btn) => {
            btn.addEventListener('click', () => playTrack(Number(btn.dataset.index)));
        });
    }

    function setActiveTrack(i) {
        currentIndex = i;
        if (nowPlayingEl) nowPlayingEl.textContent = PLAYLIST[i].title;
        tracksRoot?.querySelectorAll('.track').forEach((el, idx) => {
            el.classList.toggle('is-active', idx === i);
        });
    }

    function playTrack(index) {
        const i = (index + PLAYLIST.length) % PLAYLIST.length;
        setActiveTrack(i);
        window.open(youtubeUrl(PLAYLIST[i]), '_blank', 'noopener,noreferrer');
        miniPlayer?.classList.add('is-playing');
        if (btnPlay) btnPlay.textContent = '⏸';
    }

    btnPlay?.addEventListener('click', () => {
        if (miniPlayer?.classList.contains('is-playing')) {
            miniPlayer.classList.remove('is-playing');
            if (btnPlay) btnPlay.textContent = '▶';
        } else {
            playTrack(currentIndex);
        }
    });
    btnPrev?.addEventListener('click', () => playTrack(currentIndex - 1));
    btnNext?.addEventListener('click', () => playTrack(currentIndex + 1));

    /* ─── Surprises ─── */
    function renderSurprises() {
        const grid = $('#surprise-grid');
        if (!grid) return;

        grid.innerHTML = SURPRISES.map(
            (s, i) => `
            <button type="button" class="surprise" data-i="${i}" style="background:${s.bg}">
                <span class="surprise__emoji">${s.emoji}</span>
                <span class="surprise__label">${s.label}</span>
            </button>`
        ).join('');

        grid.querySelectorAll('.surprise').forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('is-open')) return;
                const s = SURPRISES[Number(btn.dataset.i)];
                btn.classList.add('is-open');
                btn.innerHTML = `<p class="surprise__msg">${s.msg}</p>`;
                burstMini(btn);
            });
        });
    }

    function burstMini(el) {
        if (!el || typeof gsap === 'undefined') return;
        gsap.from(el, { scale: 0.92, duration: 0.35, ease: 'back.out(2)' });
    }

    /* ─── Mystery boxes + lucky + envelope ─── */
    function initExtras() {
        const boxesRoot = $('#mystery-boxes');
        let boxesOpened = 0;

        if (boxesRoot) {
            boxesRoot.innerHTML = MYSTERY_BOXES.map(
                (b, i) => `
                <button type="button" class="mystery-box" data-i="${i}">
                    <span class="mystery-box__lid" aria-hidden="true">🎀</span>
                    <span class="mystery-box__icon">${b.icon}</span>
                    <span class="mystery-box__label">صندوق ${i + 1}</span>
                </button>`
            ).join('');

            boxesRoot.querySelectorAll('.mystery-box').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (btn.classList.contains('is-open')) return;
                    const b = MYSTERY_BOXES[Number(btn.dataset.i)];
                    btn.classList.add('is-open');
                    btn.innerHTML = `<p class="mystery-box__msg">${b.msg}</p>`;
                    burstMini(btn);
                    boxesOpened += 1;
                    if (boxesOpened === MYSTERY_BOXES.length) {
                        showSecretEnvelope('فتحتي كل الصناديق! مفاجأة كبيرة: محمود هيفضل يحبكِ كل يوم أكتر — للأبد ♥');
                    }
                });
            });
        }

        const luckyBtn = $('#btn-lucky');
        const luckyResult = $('#lucky-result');
        let lastLucky = -1;

        luckyBtn?.addEventListener('click', () => {
            let idx;
            do {
                idx = Math.floor(Math.random() * LUCKY_MSGS.length);
            } while (idx === lastLucky && LUCKY_MSGS.length > 1);
            lastLucky = idx;
            if (luckyResult) {
                luckyResult.textContent = LUCKY_MSGS[idx];
                luckyResult.classList.add('is-show');
            }
            burstMini(luckyResult);
            if (Math.random() > 0.65) {
                showSecretEnvelope(LUCKY_MSGS[idx]);
            }
        });
    }

    function showSecretEnvelope(text) {
        const env = $('#secret-envelope');
        const envText = $('#secret-envelope-text');
        if (!env || !envText) return;
        envText.textContent = text;
        env.hidden = false;
        env.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (typeof gsap !== 'undefined') {
            gsap.from(env, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' });
        }
    }

    /* ─── Quiz ─── */
    function initQuiz() {
        const qEl = $('#quiz-q');
        const optsEl = $('#quiz-opts');
        const progressEl = $('#quiz-progress');
        const resultEl = $('#quiz-result');
        if (!qEl || !optsEl) return;

        let step = 0;
        let score = 0;

        const renderQ = () => {
            const item = QUIZ[step];
            qEl.textContent = item.q;
            if (progressEl) progressEl.textContent = `سؤال ${step + 1} من ${QUIZ.length}`;
            optsEl.innerHTML = item.opts.map(
                (opt, i) => `<button type="button" class="quiz__opt" data-i="${i}">${opt}</button>`
            ).join('');

            optsEl.querySelectorAll('.quiz__opt').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const chosen = Number(btn.dataset.i);
                    const ok = chosen === item.correct;
                    if (ok) score += 1;
                    btn.classList.add(ok ? 'is-correct' : 'is-wrong');
                    optsEl.querySelectorAll('.quiz__opt').forEach((b) => { b.disabled = true; });

                    setTimeout(() => {
                        step += 1;
                        if (step < QUIZ.length) {
                            renderQ();
                        } else if (resultEl) {
                            resultEl.textContent = score === QUIZ.length
                                ? '١٠٠٪! روان عارفة إن محمود بيحبها — أنتِ الأذكى ♥'
                                : `نتيجتك ${score} من ${QUIZ.length} — بس الإجابة الصح دايمًا: محمود ♥ روان`;
                        }
                    }, 700);
                });
            });
        };

        renderQ();
    }

    /* ─── Memory ─── */
    function initMemory() {
        const grid = $('#memory-grid');
        const movesEl = $('#memory-moves');
        const winEl = $('#memory-win');
        if (!grid) return;

        const cards = [...MEMORY_PAIRS, ...MEMORY_PAIRS]
            .map((emoji, id) => ({ id, emoji }))
            .sort(() => Math.random() - 0.5);

        let flipped = [];
        let moves = 0;
        let matched = 0;
        let locked = false;

        const toAr = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

        grid.innerHTML = cards.map(
            (c) => `<button type="button" class="memory__card" data-id="${c.id}" data-emoji="${c.emoji}" aria-label="كارت"><span>?</span></button>`
        ).join('');

        grid.querySelectorAll('.memory__card').forEach((btn) => {
            btn.addEventListener('click', () => {
                if (locked || btn.classList.contains('is-flipped') || btn.classList.contains('is-match')) return;

                btn.classList.add('is-flipped');
                btn.innerHTML = `<span>${btn.dataset.emoji}</span>`;
                flipped.push(btn);

                if (flipped.length === 2) {
                    locked = true;
                    moves += 1;
                    if (movesEl) movesEl.textContent = toAr(moves);

                    const [a, b] = flipped;
                    if (a.dataset.emoji === b.dataset.emoji) {
                        a.classList.add('is-match');
                        b.classList.add('is-match');
                        matched += 1;
                        flipped = [];
                        locked = false;
                        if (matched === MEMORY_PAIRS.length && winEl) {
                            winEl.hidden = false;
                            showSecretEnvelope('لعبة الذاكرة كملت! زي حبنا — دايمًا بيلاقي بعضه ♥');
                        }
                    } else {
                        setTimeout(() => {
                            a.classList.remove('is-flipped');
                            b.classList.remove('is-flipped');
                            a.innerHTML = '<span>?</span>';
                            b.innerHTML = '<span>?</span>';
                            flipped = [];
                            locked = false;
                        }, 750);
                    }
                }
            });
        });
    }

    /* ─── Heart tap game ─── */
    function initHeartGame() {
        const arena = $('#heart-arena');
        const scoreEl = $('#heart-score');
        const timeEl = $('#heart-time');
        const msgEl = $('#heart-msg');
        const startBtn = $('#btn-heart-start');
        if (!arena || !startBtn) return;

        let score = 0;
        let timeLeft = 15;
        let timer = null;
        let spawner = null;
        let playing = false;

        const toAr = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

        const endGame = () => {
            playing = false;
            clearInterval(timer);
            clearInterval(spawner);
            arena.querySelectorAll('.heart-game__heart').forEach((h) => h.remove());
            startBtn.disabled = false;
            startBtn.textContent = 'العبى تاني';

            let msg = 'حلو! ';
            if (score >= 20) msg += 'روان سريعة! محمود معجب بيكِ جدًا 🔥';
            else if (score >= 12) msg += 'نتيجة حلوة — قلبك أسرع من إيدكِ ♥';
            else msg += 'حاولي تاني — القلوب مستنية روان 💕';
            if (msgEl) msgEl.textContent = msg;

            if (score >= 15) {
                showSecretEnvelope(`مسكتِ ${toAr(score)} قلب! كل قلب = بحبك — محمود ♥`);
            }
        };

        const spawnHeart = () => {
            if (!playing) return;
            const h = document.createElement('button');
            h.type = 'button';
            h.className = 'heart-game__heart';
            h.textContent = ['♥', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
            h.style.left = `${8 + Math.random() * 72}%`;
            h.style.top = `${8 + Math.random() * 55}%`;
            h.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!playing) return;
                score += 1;
                if (scoreEl) scoreEl.textContent = toAr(score);
                h.remove();
                burstMini(h);
            });
            arena.appendChild(h);
            setTimeout(() => h.remove(), 2200);
        };

        startBtn.addEventListener('click', () => {
            if (playing) return;
            playing = true;
            score = 0;
            timeLeft = 15;
            if (scoreEl) scoreEl.textContent = toAr(0);
            if (timeEl) timeEl.textContent = toAr(15);
            if (msgEl) msgEl.textContent = '';
            startBtn.disabled = true;
            startBtn.textContent = 'جاري اللعب...';

            spawner = setInterval(spawnHeart, 550);
            spawnHeart();

            timer = setInterval(() => {
                timeLeft -= 1;
                if (timeEl) timeEl.textContent = toAr(timeLeft);
                if (timeLeft <= 0) endGame();
            }, 1000);
        });
    }

    /* ─── Gallery lightbox ─── */
    function initGallery() {
        const lightbox = $('#lightbox');
        const lightboxImg = $('#lightbox-img');
        const lightboxCap = $('#lightbox-cap');
        const closeBtn = $('#lightbox-close');
        if (!lightbox) return;

        const open = (src, cap) => {
            lightboxImg.src = src;
            lightboxImg.alt = cap;
            lightboxCap.textContent = cap;
            lightbox.showModal();
            document.body.style.overflow = 'hidden';
        };

        const close = () => {
            lightbox.close();
            document.body.style.overflow = '';
        };

        document.querySelectorAll('.gallery__item').forEach((item) => {
            item.addEventListener('click', () => {
                open(item.dataset.full, item.dataset.caption);
            });
        });

        closeBtn?.addEventListener('click', close);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) close();
        });
        lightbox.addEventListener('cancel', () => {
            document.body.style.overflow = '';
        });
    }

    /* ─── Scratch ─── */
    function initScratch() {
        const canvas = $('#scratch-canvas');
        const wrap = $('#scratch-root');
        if (!canvas || !wrap) return;

        const ctx = canvas.getContext('2d');
        let drawing = false;

        const paint = () => {
            const rect = wrap.getBoundingClientRect();
            if (rect.width < 1) return;
            canvas.width = Math.floor(rect.width);
            canvas.height = Math.floor(rect.height);
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#ffd93d';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#c9920e';
            ctx.font = 'bold 17px Reem Kufi, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('امسحي هنا ✨', canvas.width / 2, canvas.height / 2);
        };

        paint();

        const ro = new ResizeObserver(() => paint());
        ro.observe(wrap);

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
        canvas.addEventListener('mousedown', (e) => {
            drawing = true;
            const p = pos(e);
            scratch(p.x, p.y);
        });
        canvas.addEventListener('mousemove', (e) => {
            if (!drawing) return;
            const p = pos(e);
            scratch(p.x, p.y);
        });
        canvas.addEventListener('mouseup', () => { drawing = false; });
    }

    /* ─── Wheel ─── */
    function initWheel() {
        const wheel = $('#wheel');
        const result = $('#wheel-result');
        const btn = $('#btn-spin');
        if (!wheel || !btn) return;

        btn.addEventListener('click', () => {
            if (wheelSpinning) return;
            wheelSpinning = true;
            const idx = Math.floor(Math.random() * WHEEL_MSGS.length);
            wheelRotation += 360 * 5 + idx * 60 + 30;
            wheel.style.transform = `rotate(${wheelRotation}deg)`;
            if (result) result.textContent = '...';
            setTimeout(() => {
                if (result) result.textContent = WHEEL_MSGS[idx];
                wheelSpinning = false;
            }, 4200);
        });
    }

    /* ─── Petals ─── */
    function initPetals() {
        const canvas = $('#petals-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const colors = ['#ff6b81', '#ffd93d', '#7bed9f', '#ff85c0', '#a55eea'];
        const petals = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });

        for (let i = 0; i < 28; i++) {
            petals.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 3 + Math.random() * 4,
                speed: 0.25 + Math.random() * 0.45,
                color: colors[i % colors.length],
            });
        }

        (function frame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach((p) => {
                p.y += p.speed;
                if (p.y > canvas.height) p.y = -8;
                ctx.globalAlpha = 0.55;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(frame);
        })();
    }

    /* ─── Gift letter ─── */
    function initGift() {
        const btn = $('#btn-final-gift');
        const letter = $('#letter');
        const hint = $('#gift-hint');
        if (!btn || !letter) return;

        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-done')) return;
            btn.classList.add('is-done');
            letter.hidden = false;
            if (hint) hint.textContent = 'عيدية محمود وصلتكِ ♥';

            const items = ['🐑', '❤', '✨', '🎉', '🌸', '💛', '🎁'];
            for (let i = 0; i < 50; i++) {
                const el = document.createElement('span');
                el.className = 'confetti';
                el.textContent = items[Math.floor(Math.random() * items.length)];
                el.style.left = `${Math.random() * 100}vw`;
                el.style.top = '100vh';
                document.body.appendChild(el);
                if (typeof gsap !== 'undefined') {
                    gsap.to(el, {
                        y: -window.innerHeight - 80,
                        x: (Math.random() - 0.5) * 180,
                        rotation: Math.random() * 400,
                        duration: 1.4 + Math.random(),
                        onComplete: () => el.remove(),
                    });
                } else {
                    el.remove();
                }
            }

            if (typeof gsap !== 'undefined') {
                gsap.from(letter, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
            }
            setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
        });
    }

    /* ─── GSAP enhancements (optional) ─── */
    function initAnimations() {
        if (typeof gsap === 'undefined') return;
        document.body.classList.add('has-gsap');

        try {
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
            }

            gsap.utils.toArray('.panel__head, .card').forEach((el) => {
                el.classList.add('anim-fade');
                gsap.to(el, {
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    ease: 'power2.out',
                });
            });
        } catch (_) {
            /* GSAP optional */
        }
    }

    /* ─── Boot ─── */
    function init() {
        renderTracks();
        setActiveTrack(0);
        renderSurprises();
        initExtras();
        initGallery();
        initWheel();
        initQuiz();
        initMemory();
        initHeartGame();
        initGift();
        initPetals();
        runLoader();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAnimations, { once: true });
        } else {
            initAnimations();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
