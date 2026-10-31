// Countdown timer
// Reads H/M/S/ms from the four number inputs, counts down, and updates the inputs.

(function () {
    //Inputs to separate the calculations/conversions from the DOM
    const hoursInput   = document.querySelector('.timer_hours');
    const minutesInput = document.querySelector('.timer_minutes');
    const secondsInput = document.querySelector('.timer_seconds');
    const msInput      = document.querySelector('.timer_milliseconds');
    const startBtn  = document.querySelector('.timer_start');
    const endBtn    = document.querySelector('.timer_end');


    // Remaining time in ms
    let remainingTime = 0;
    let running = false;
    let currentCheck = 0;
    let rafId = null;
    //Check if numbers are in a range
    //Includes NaN otherwise NaN gets passed through everything
    //Making all calculations invalid, 0 makes calculations possible
    function checkInt(value, min, max) {
        let n = parseInt(value, 10);
        if (isNaN(n)) n = 0;
        return Math.min(max, Math.max(min, n));
    }
    //Checks that the user inputs are within the time
    function readInputsToMs() {
        const h  = checkInt(hoursInput.value,   0, 24);
        const m  = checkInt(minutesInput.value, 0, 59);
        const s  = checkInt(secondsInput.value, 0, 59);
        const ms = checkInt(msInput.value,      0, 999);
        //converts everything to seconds then to ms
        return ((h * 60 + m) * 60 + s) * 1000 + ms;
    }
    //Converts everything back to display it
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
    // The reverse of stopwatch in its counting
    // Subtracts time instead of adds
    function check(now) {
        if (!running) return;

        const delta = now - currentCheck;
        currentCheck = now;
        remainingTime -= delta;
        //Reverts negative time to 0
        //As any checks with refresh rate won't be exact
        if (remainingTime <= 0) {
            remainingTime = 0;
            writeMsToInputs(0);
            stop();
            return;
        }
        //Display
        writeMsToInputs(remainingTime);
        //Set the handler/id
        rafId = requestAnimationFrame(check);
    }

    function start() {
        if (running) return;

        // Starting fresh: read from inputs.
        if (remainingTime <= 0) {
            remainingTime = readInputsToMs();
            if (remainingTime <= 0) return; // nothing to count down
        }

        running = true;
        currentCheck = performance.now();
        startBtn.value = 'Pause';
        rafId = requestAnimationFrame(check);
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
        remainingTime = 0;
        writeMsToInputs(0);
    }

    // Editing any input while stopped sets the starting duration.
    [hoursInput, minutesInput, secondsInput, msInput].forEach((input) => {
        input.addEventListener('input', () => {
            if (!running) {
                remainingTime = readInputsToMs();
            }
        });
        input.addEventListener('blur', () => {
            writeMsToInputs(running ? remainingTime : readInputsToMs());
        });
    });
    //Making buttons work
    startBtn.addEventListener('click', () => {
        if (running) {
            stop();
        } else {
            start();
        }
    });

    endBtn.addEventListener('click', reset);

    // Initialize display
    writeMsToInputs(0);
})();