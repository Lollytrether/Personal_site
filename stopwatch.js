// Stopwatch
// Counts up. Start toggles start/pause; End resets to 00:00:00:000.
// IIFE so that it doesn't conflict with timer/global scope
(function () {
    //Renaming to non DOM so that format doesn't get confused
    const hoursEL   = document.querySelector('.stopwatch_hours');
    const minutesEL = document.querySelector('.stopwatch_minutes');
    const secondsEL = document.querySelector('.stopwatch_seconds');
    const msEL      = document.querySelector('.stopwatch_milliseconds');
    const startBtn  = document.querySelector('.stopwatch_start');
    const endBtn    = document.querySelector('.stopwatch_end');

    // Total time
    let elapsedTime = 0;
    // On or off
    let running = false;
    // Timestamp of the last check
    let currentCheck = 0;
    // Reference to current frame
    let rafID= null;

    function format(totalms) {
        // If there is no time
        totalms = Math.max(0, totalms);
        // time conversion
        const hours   = Math.floor(totalms / 3600000);
        const minutes = Math.floor((totalms % 3600000) / 60000);
        const seconds = Math.floor((totalms % 60000) / 1000);
        const ms      = Math.floor(totalms % 1000);
        //Displaying stuff
        return {
            h:  String(hours).padStart(2, '0'),
            m:  String(minutes).padStart(2, '0'),
            s:  String(seconds).padStart(2, '0'),
            ms: String(ms).padStart(3, '0'),
        };
    }

    function render(totalms){
        const fTime= format(totalms);
        // Grabs the content from the format and displays it
        hoursEL.textContent = fTime.h;
        minutesEL.textContent = fTime.m;
        secondsEL.textContent = fTime.s;
        msEL.textContent = fTime.ms;
    }

    function check(now){
        if (!running) return;
        //Difference of time between the last check and now
        const delta = now - currentCheck;
        //Reset the last check to now
        currentCheck = now;
        // Add on the new time to the current
        elapsedTime += delta;
        //Update the display
        render(elapsedTime);
        //Get the last frame to sync in case user wants to stop or when this function runs
        //And also to continue this loop
        rafID = requestAnimationFrame(check);
    }

    function start(){
        if (running) return;
        running = true;
        currentCheck = performance.now();
        //Changes the start button to pause after it has started
        startBtn.value= 'Pause'
        //Start the timer
        rafID = requestAnimationFrame(check);
    }

    function stop(){
        //make it stop running
        running = false;
        // if the current frame exists, cancel it and set it to non-existent
        if (rafID !== null){
            cancelAnimationFrame(rafID);
            rafID = null;
        }
        // After setting the start button to pause
        // It sets it to start when it stops
        startBtn.value= 'Start'
    }

    function reset(){
        stop();
        //stop the stopwatch and reset the time
        elapsedTime = 0;
        //Display it
        render(0);
    }

    startBtn.addEventListener('click', () =>
    {
        if (running) stop();
        //Pause and continue functionality
        else start();
    })

    endBtn.addEventListener('click', () => reset())
    //Making sure the digits are correct
    render(0);
})();