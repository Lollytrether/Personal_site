// Countdown timer
// Reads H/M/S/ms from the four number inputs, counts down, and updates the inputs.

(function () {
    const hoursInput   = document.querySelector('.timer_hours');
    const minutesInput = document.querySelector('.timer_minutes');
    const secondsInput = document.querySelector('.timer_seconds');
    const msInput      = document.querySelector('.timer_milliseconds');
    const startButton  = document.querySelector('.timer_start');
    const endButton    = document.querySelector('.timer_end');

    if (!hoursInput || !startButton) return;

    // Remaining time in milliseconds (source of truth)
    let remainingMs = 0;
    let running = false;
    let lastTick = 0;
    let rafId = null;

    function clampInt(value, min, max) {
        let n = parseInt(value, 10);
        if (isNaN(n)) n = 0;
        return Math.min(max, Math.max(min, n));
    }

    function readInputsToMs() {
        const h  = clampInt(hoursInput.value,   0, 24);
        const m  = clampInt(minutesInput.value, 0, 59);
        const s  = clampInt(secondsInput.value, 0, 59);
        const ms = clampInt(msInput.value,      0, 999);
        return ((h * 60 + m) * 60 + s) * 1000 + ms;
    }

    function writeMsToInputs(totalMs) {
        totalMs = Math.max(0, totalMs);
        const hours   = Math.floor(totalMs / 3600000);
        const minutes = Math.floor((totalMs % 3600000) / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const ms      = Math.floor(totalMs % 1000);

        hoursInput.value   = String(hours).padStart(2, '0');
        minutesInput.value = String(minutes).padStart(2, '0');
        secondsInput.value = String(seconds).padStart(2, '0');
        msInput.value      = String(ms).padStart(3, '0');
    }

    function tick(now) {
        if (!running) return;

        const delta = now - lastTick;
        lastTick = now;
        remainingMs -= delta;

        if (remainingMs <= 0) {
            remainingMs = 0;
            writeMsToInputs(0);
            stop();
            return;
        }

        writeMsToInputs(remainingMs);
        rafId = requestAnimationFrame(tick);
    }

    function start() {
        if (running) return;

        // Starting fresh: read from inputs. Resuming: use remainingMs.
        if (remainingMs <= 0) {
            remainingMs = readInputsToMs();
            if (remainingMs <= 0) return; // nothing to count down
        }

        running = true;
        lastTick = performance.now();
        startButton.value = 'Pause';
        rafId = requestAnimationFrame(tick);
    }

    function stop() {
        running = false;
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        startButton.value = 'Start';
    }

    function reset() {
        stop();
        remainingMs = 0;
        writeMsToInputs(0);
    }

    // Editing any input while stopped sets the starting duration.
    [hoursInput, minutesInput, secondsInput, msInput].forEach((input) => {
        input.addEventListener('input', () => {
            if (!running) {
                remainingMs = readInputsToMs();
            }
        });
        input.addEventListener('blur', () => {
            writeMsToInputs(running ? remainingMs : readInputsToMs());
        });
    });

    startButton.addEventListener('click', () => {
        if (running) {
            stop();
        } else {
            start();
        }
    });

    endButton.addEventListener('click', reset);

    // Initialize display
    writeMsToInputs(0);
})();