/**
 * MonkeyType-style Typing Game
 * Motivational stories & quotes - type for inspiration
 */

(function() {
    const MOTIVATIONAL_STORIES = [
        "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
        "Believe you can and you're halfway there. Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
        "Success is not final, failure is not fatal. It is the courage to continue that counts. Every setback is a setup for a comeback.",
        "The future belongs to those who believe in the beauty of their dreams. Take the first step in faith. You don't have to see the whole staircase.",
        "It does not matter how slowly you go as long as you do not stop. Progress, not perfection, is what matters most in life.",
        "Your time is limited, so don't waste it living someone else's life. Have the courage to follow your heart and intuition.",
        "The only impossible journey is the one you never begin. Start where you are. Use what you have. Do what you can.",
        "You are never too old to set another goal or to dream a new dream. Age is just a number. Passion has no expiration date.",
        "Success usually comes to those who are too busy to be looking for it. Focus on the work, and the results will follow.",
        "The best time to plant a tree was twenty years ago. The second best time is now. Don't let regret hold you back from starting today.",
        "Do what you can with all you have, wherever you are. Small steps lead to big changes. Consistency beats intensity.",
        "You don't have to be great to start, but you have to start to be great. Every expert was once a beginner who never gave up.",
        "The only person you are destined to become is the person you decide to be. Your choices shape your future more than your circumstances.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us. Trust yourself and your ability to grow.",
        "Opportunities don't happen. You create them. Take action today. The perfect moment may never come, so make this moment perfect.",
        "The secret of getting ahead is getting started. Break your goals into small steps and take the first one today.",
        "Don't watch the clock. Do what it does. Keep going. Persistence is the key to unlocking your potential.",
        "You are braver than you believe, stronger than you seem, and smarter than you think. Believe in yourself.",
        "The only limit to our realization of tomorrow will be our doubts of today. Let go of fear and embrace possibility.",
        "Life is 10% what happens to you and 90% how you react to it. Your attitude determines your direction.",
        "Dream big, work hard, stay focused. The combination of vision and action creates unstoppable momentum.",
        "Every day is a new beginning. Take a deep breath, smile, and start again. Yesterday does not define your tomorrow.",
        "The greatest glory in living lies not in never falling, but in rising every time we fall. Resilience is your superpower.",
        "Be the change you wish to see in the world. Your actions inspire others more than your words ever could.",
        "Nothing is impossible. The word itself says I'm possible. Remove the limits you've placed on yourself.",
        "Hardships often prepare ordinary people for an extraordinary destiny. What you endure today strengthens you for tomorrow.",
        "The only way to achieve the impossible is to believe it is possible. Your beliefs shape your reality.",
        "Fall seven times, stand up eight. Each failure is a lesson. Each lesson brings you closer to success.",
        "Act as if what you do makes a difference. It does. Every small action creates a ripple effect.",
        "You have within you right now everything you need to deal with whatever the world can throw at you.",
        "The harder you work for something, the greater you will feel when you achieve it. Effort compounds over time.",
        "Do not wait for the perfect moment. Take the moment and make it perfect. Action beats planning every time.",
        "You are one step away from a different life. That step is the one you have been afraid to take.",
        "Champions keep playing until they get it right. Excellence is not a one-time act but a habit.",
        "The struggle you are in today is developing the strength you need for tomorrow. Trust the process.",
        "Start where you are. Use what you have. Do what you can. Progress over perfection always.",
        "Your limitation is only your imagination. Push your boundaries and watch yourself grow beyond them.",
        "Great things never come from comfort zones. Growth happens when you choose courage over comfort.",
        "The best revenge is massive success. Let your achievements speak louder than your critics.",
        "Wake up with determination. Go to bed with satisfaction. Make every day count.",
        "Success is walking from failure to failure with no loss of enthusiasm. Stay curious and keep trying.",
        "It always seems impossible until it is done. Break big goals into small steps and start today.",
        "The only bad workout is the one that did not happen. Consistency beats intensity every time.",
        "You miss 100% of the shots you do not take. Regret hurts more than failure ever will.",
        "Do not be afraid to give up the good to go for the great. Upgrade your standards.",
        "The pain of discipline is nothing like the pain of regret. Choose your hard wisely.",
        "If you want to lift yourself up, lift up someone else. Kindness creates a rising tide for everyone.",
        "Your vibe attracts your tribe. Surround yourself with people who lift you higher.",
        "The best time to start was yesterday. The next best time is now. Stop waiting for perfect.",
        "Excellence is not being the best. It is doing your best. Compare yourself only to who you were yesterday.",
        "You were given this life because you are strong enough to live it. Believe in your resilience.",
        "The comeback is always stronger than the setback. Your story is still being written.",
        "Do not downgrade your dream just to fit your reality. Upgrade your conviction to fit your dream.",
        "Success is the sum of small efforts repeated day in and day out. Patience and persistence pay off.",
        "The only thing standing between you and your goal is the story you keep telling yourself.",
        "You do not have to see the whole staircase. Just take the first step. Clarity comes with action.",
        "Make today so awesome that yesterday gets jealous. Your future self will thank you.",
        "The world needs more people who have come alive. Find what makes you feel fully alive.",
        "Your present circumstances do not determine where you can go. They merely determine where you start.",
        "Be so good they cannot ignore you. Master your craft and opportunities will find you.",
        "The only person you should try to be better than is the person you were yesterday.",
        "Courage does not mean you do not get afraid. Courage means you do not let fear stop you.",
        "Every accomplishment starts with the decision to try. Say yes to yourself today.",
        "You are not stuck. You are just committed to certain patterns. Change the pattern, change your life.",
        "The best view comes after the hardest climb. Keep going. The summit is worth it."
    ];

    let state = {
        text: '',
        currentCharIndex: 0,
        typedChars: 0,
        correctChars: 0,
        errors: 0,
        startTime: null,
        timerInterval: null,
        timeLimit: 15,
        isRunning: false,
        isComplete: false,
        charStates: {}
    };

    const wordsDisplay = document.getElementById('wordsDisplay');
    const typingInput = document.getElementById('typingInput');
    const wpmStat = document.getElementById('wpmStat');
    const accStat = document.getElementById('accStat');
    const timerStat = document.getElementById('timerStat');
    const restartBtn = document.getElementById('restartBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const resultsOverlay = document.getElementById('resultsOverlay');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const typingArea = document.getElementById('typingArea');

    function getRandomStory() {
        return MOTIVATIONAL_STORIES[Math.floor(Math.random() * MOTIVATIONAL_STORIES.length)];
    }

    function renderText() {
        const { text, currentCharIndex, charStates } = state;
        let html = '';
        for (let i = 0; i < text.length; i++) {
            let cls = 'char';
            if (i < currentCharIndex) {
                cls += charStates[i] === true ? ' correct' : ' incorrect';
            } else if (i === currentCharIndex) {
                cls += ' current';
                if (charStates[i] === false) cls += ' incorrect';
            }
            const idAttr = i === currentCharIndex ? ' id="current-char"' : '';
            html += `<span class="${cls}"${idAttr}>${escapeHtml(text[i])}</span>`;
        }
        wordsDisplay.innerHTML = html;
        const currentEl = document.getElementById('current-char');
        if (currentEl) currentEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function escapeHtml(c) {
        const div = document.createElement('div');
        div.textContent = c;
        return div.innerHTML;
    }

    function startTimer() {
        if (state.timerInterval) clearInterval(state.timerInterval);
        const endTime = state.startTime + state.timeLimit * 1000;

        state.timerInterval = setInterval(() => {
            const now = Date.now();
            const left = Math.max(0, Math.ceil((endTime - now) / 1000));
            timerStat.textContent = formatTime(left);
            updateLiveStats();

            if (left <= 0) {
                endTest();
            }
        }, 100);
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function updateLiveStats() {
        if (!state.startTime || state.typedChars === 0) return;
        const elapsed = (Date.now() - state.startTime) / 60000;
        const wpm = Math.round((state.correctChars / 5) / elapsed);
        const acc = state.typedChars > 0 ? Math.round((state.correctChars / state.typedChars) * 100) : 0;
        wpmStat.textContent = `${wpm} WPM`;
        accStat.textContent = `${acc}% acc`;
    }

    function endTest() {
        state.isComplete = true;
        state.isRunning = false;
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
        typingInput.blur();
        typingInput.disabled = true;

        const elapsed = (Date.now() - state.startTime) / 60000;
        const wpm = Math.round((state.correctChars / 5) / elapsed);
        const rawWpm = Math.round((state.typedChars / 5) / elapsed);
        const acc = state.typedChars > 0 ? Math.round((state.correctChars / state.typedChars) * 100) : 0;

        document.getElementById('resultWpm').textContent = wpm;
        document.getElementById('resultAcc').textContent = acc + '%';
        document.getElementById('resultRaw').textContent = rawWpm;
        resultsOverlay.classList.add('visible');
    }

    function init() {
        state.text = getRandomStory();
        state.currentCharIndex = 0;
        state.typedChars = 0;
        state.correctChars = 0;
        state.errors = 0;
        state.startTime = null;
        state.isRunning = false;
        state.isComplete = false;
        state.charStates = {};

        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }

        wpmStat.textContent = '— WPM';
        accStat.textContent = '—% acc';
        timerStat.textContent = formatTime(state.timeLimit);
        resultsOverlay.classList.remove('visible');
        typingInput.value = '';
        typingInput.disabled = false;
        typingInput.focus();

        renderText();
    }

    function handleKeyDown(e) {
        if (state.isComplete) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            init();
            return;
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            typingInput.focus();
            return;
        }

        if (e.altKey || e.ctrlKey || e.metaKey) return;

        if (e.key.length === 1) {
            if (!state.isRunning) {
                state.isRunning = true;
                state.startTime = Date.now();
                startTimer();
            }

            e.preventDefault();
            const expected = state.text[state.currentCharIndex];
            const isCorrect = e.key === expected;

            state.charStates[state.currentCharIndex] = isCorrect;
            state.typedChars++;
            if (isCorrect) state.correctChars++;
            else state.errors++;

            state.currentCharIndex++;

            if (state.currentCharIndex >= state.text.length) {
                state.text += ' ' + getRandomStory();
            }
            renderText();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            if (state.currentCharIndex > 0) {
                state.currentCharIndex--;
                const idx = state.currentCharIndex;
                if (state.charStates[idx] !== undefined) {
                    state.typedChars--;
                    if (state.charStates[idx]) state.correctChars--;
                    else state.errors--;
                    delete state.charStates[idx];
                }
                renderText();
            }
        }
    }

    function initTypingGame() {
        state.timeLimit = parseInt(document.querySelector('.mode-btn.active')?.dataset.time || '15', 10);
        init();

        typingInput.addEventListener('keydown', handleKeyDown);

        document.addEventListener('keydown', (e) => {
            const resultsVisible = resultsOverlay.classList.contains('visible');
            if ((e.key === 'Tab' || e.key === 'Enter') && document.activeElement !== typingInput && !resultsVisible) {
                e.preventDefault();
                typingInput.focus();
            }
        });

        typingArea.addEventListener('click', () => typingInput.focus());

        restartBtn?.addEventListener('click', () => {
            state.timeLimit = parseInt(document.querySelector('.mode-btn.active')?.dataset.time || '15', 10);
            init();
        });

        tryAgainBtn?.addEventListener('click', () => {
            state.timeLimit = parseInt(document.querySelector('.mode-btn.active')?.dataset.time || '15', 10);
            init();
        });

        randomizeBtn?.addEventListener('click', () => {
            if (state.isRunning) return;
            state.text = getRandomStory();
            state.currentCharIndex = 0;
            state.charStates = {};
            renderText();
        });

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (state.isRunning) return;
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.timeLimit = parseInt(btn.dataset.time, 10);
                timerStat.textContent = formatTime(state.timeLimit);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTypingGame);
    } else {
        initTypingGame();
    }
})();
