//Will not work because I can't figure out the logic for it, it'll be placeholders
// Declaring the editable HTML elements, according to W3 Schools
// getElementsByClassName returns an array hence why it is the first/0th index
let hours_shown = document.getElementsByClassName('stopwatch_hours')[0];
let minutes_shown = document.getElementsByClassName('stopwatch_minutes')[0];
let seconds_shown = document.getElementsByClassName('stopwatch_seconds')[0];
let millisecond_shown = document.getElementsByClassName('stopwatch_milliseconds')[0];

// Does not work so I'll add it in HTML
let time = 0
let hours = String(time).padStart(2, '0');
let minutes = String(time).padStart(2, '0');
let seconds = String(time).padStart(2, '0');
let milliseconds = String(time).padStart(3, '0');

hours_shown.innerHTML = hours;
minutes_shown.innerHTML = minutes;
seconds_shown.innerHTML = seconds;
millisecond_shown.innerHTML = milliseconds;
