// Stopwatch
// Counts up. Start toggles start/pause; End resets to 00:00:00:000.

(function () {
    const hoursEl   = document.querySelector('.stopwatch_hours');
    const minutesEl = document.querySelector('.stopwatch_minutes');
    const secondsEl = document.querySelector('.stopwatch_seconds');
    const msEl      = document.querySelector('.stopwatch_milliseconds');
    const startBtn  = document.querySelector('.stopwatch_start');
    const endBtn    = document.querySelector('.stopwatch_end');

    if (!hoursEl || !startBtn) return;

    let elapsedMs = 0;
    let running = false;
    let lastTick = 0;
    let rafId = null;

    function format(totalMs) {
        totalMs = Math.max(0, totalMs);
        const hours   = Math.floor(totalMs / 3600000);
        const minutes = Math.floor((totalMs % 3600000) / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const ms      = Math.floor(totalMs % 1000);

        return {
            h:  String(hours).padStart(2, '0'),
            m:  String(minutes).padStart(2, '0'),
            s:  String(seconds).padStart(2, '0'),
            ms: String(ms).padStart(3, '0'),
        };
    }

    function render(totalMs) {
        const f = format(totalMs);
        hoursEl.textContent   = f.h;
        minutesEl.textContent = f.m;
        secondsEl.textContent = f.s;
        msEl.textContent      = f.ms;
    }

    function tick(now) {
        if (!running) return;
        const delta = now - lastTick;
        lastTick = now;
        elapsedMs += delta;
        render(elapsedMs);
        rafId = requestAnimationFrame(tick);
    }

    function start() {
        if (running) return;
        running = true;
        lastTick = performance.now();
        startBtn.value = 'Pause';
        rafId = requestAnimationFrame(tick);
    }

    function stop() {
        running = false;
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        startBtn.value = 'Start';
    }

    function reset() {
        stop();
        elapsedMs = 0;
        render(0);
    }

    startBtn.addEventListener('click', () => {
        if (running) stop();
        else start();
    });

    endBtn.addEventListener('click', reset);

    // Initial render
    render(0);
})();