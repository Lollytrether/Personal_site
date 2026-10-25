// Declaring the editable HTML elements, according to W3 Schools
// getElementsByClassName returns an array hence why it is the first/0th index
let hours_shown = document.getElementsByClassName('clock_hours')[0];
let minutes_shown = document.getElementsByClassName('clock_minutes')[0];
let seconds_shown = document.getElementsByClassName('clock_seconds')[0];
let millisecond_shown = document.getElementsByClassName('clock_milliseconds')[0];


//Made it auto refresh instead of the user having to press it
function clock_refresh() {
    // I knew this function existed and took it from Google
    let date = new Date();
    // Variables to actually store the current time in, padStart I kind of knew in when doing python stuff in school
    // Adds two 0's as placeholders
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    // Changes the HTML based on the JS variables
    hours_shown.innerHTML = hours;
    minutes_shown.innerHTML = minutes;
    seconds_shown.innerHTML = seconds;
    millisecond_shown.innerHTML = milliseconds;
}
//Calling the function, and setting an interval/loop for calling the function of 200ms ~0.2 secs
clock_refresh();
setInterval(clock_refresh, 200);