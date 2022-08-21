// ------- Open Settings Window by pressing Gear Button
const openSettingsWindow = document.getElementById("settings-gear-btn");
const closeSettingsWindow = document.getElementById("close-window-btn");
const settingsWindow = document.getElementById("settings-window-el");

openSettingsWindow.addEventListener("click", function () {
  settingsWindow.classList.remove("settings-window-hidden");
  settingsWindow.classList.add("settings-window-visible");
});

closeSettingsWindow.addEventListener("click", function () {
  settingsWindow.classList.remove("settings-window-visible");
  settingsWindow.classList.add("settings-window-hidden");
});

// Initializing random time Start and End to then calculate the difference using new Date() which counts the time since January 1, 1970 (ECMA epoch start)
const start = new Date("January 1, 2022");
const end = new Date("January 2, 2022");

console.log(start.getTime());
console.log(end.getTime());

// Calculating difference
const difference = end.getTime() - start.getTime();
console.log(difference);

const seconds = parseInt(difference / 1000);
const minutes = parseInt(difference / 1000 / 60);
const hours = parseInt(difference / 1000 / 60 / 60);

console.log(hours, minutes, seconds);

// Setting up Time DOM Output

const clockNumbers = document.querySelector("#clock-numbers-el"); // main in the tutorial

// Declaring the button variables in the DOM
const startBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);

// Declare Global Time Object to hold Starting Timer value
const globalTimer = {
  timer: null,
  start: null,
  end: null,
};

// Declare User inputs: main pomodoro time in Minutes, short break and long break
const pomodoroTime = document.querySelector("#pomodoro-time-el");
const shortBreak = document.querySelector("#short-break-el");
const longBreak = document.querySelector("#long-break-el");

// START Time Calculation
function startTimer() {
  console.log("start");
  showTimer();
  //   initInterval();
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  const date = new Date();
  globalTimer.start = date.getTime();
}

// PAUSE Time
function pauseTimer() {
  console.log("pause");
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  const date = new Date();
  globalTimer.end = date.getTime();
  // totalTime is the result of time passed between pressing the start and then pause button
  const totalTime = (globalTimer.end - globalTimer.start) / 1000;
  console.log(totalTime);
  if (globalTimer.timer) {
    clearInterval(globalTimer.timer);
  }
}

// Output elapsed time. globalTimer is the interval?
// Increment Progress Bar

// Initialise stroke-dashoffset = oneSecInterval and initial stroke-dashoffset = oneHour
let oneSecBarMove = 16.71;
let initialBarState = 1002.6;

let barState = initialBarState - oneSecBarMove;

function showTimer() {
  let minutes, seconds;
  globalTimer.timer = setInterval(() => {
    const difference = new Date().getTime() - globalTimer.start;
    minutes = parseInt(difference / 1000 / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = parseInt(difference / 1000);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (initialBarState <= 1002.6) {
      //   oneMinute = oneMinute - oneSecBarMove;
      initialBarState = initialBarState - oneSecBarMove;

      document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
        initialBarState;
      document.getElementById("circle-mobile").style["stroke-dashoffset"] =
        initialBarState;
    }

    if (seconds > 60) seconds %= 60;

    // Initialize Milliseconds
    // millis = difference;
    // if (millis > 1000) millis %= 1000;

    document.getElementById(
      "clock-numbers-el"
    ).innerText = `${minutes}:${seconds}`;

    // // Increment Progress Bar

    // if (oneMinute <= 1002.6) {
    //   oneMinute = oneMinute - oneSecBarMove;
    //   document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
    //     oneMinute;
    //   document.getElementById("circle-mobile").style["stroke-dashoffset"] =
    //     oneMinute;
    // }
    // if (oneMinute >= 1003.6) {
    //   oneMinute = oneMinute - oneSecBarMove;
    //   document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
    //     oneMinute;
    //   document.getElementById("circle-mobile").style["stroke-dashoffset"] =
    //     oneMinute;
    // }
  }, 10);
}

// END Time Calculation

// START Progress Bar
// Check if the interval has been setup, if not, then initialise with JS method setInterval, where we're passing a function to be run and a delay in milliseconds
// let initIntervalSec;

// function initInterval() {
//   if (!initIntervalSec) {
//     initIntervalSec = setInterval(startProgressBar, globalTimer.timer);
//   }
// }

// Initialise stroke-dashoffset = oneSecInterval and initial stroke-dashoffset = oneHour
// let oneSecBarMove = 16.71;
// let oneMinute = 1002.6;

// Init function that runs on click of the RESTART button.

// function startProgressBar() {
//   if (oneMinute <= 1002.6) {
//     oneMinute = oneMinute - oneSecBarMove;
//     document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
//       oneMinute;
//     document.getElementById("circle-mobile").style["stroke-dashoffset"] =
//       oneMinute;
//   }
//   if (oneMinute >= 1003.6) {
//     // oneHour = 1002.6;
//     oneHour = oneMinute - oneSecBarMove;
//     document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
//       oneMinute;
//     document.getElementById("circle-mobile").style["stroke-dashoffset"] =
//       oneMinute;
//   }
// }

// function pauseProgressBar() {
//   clearInterval(initIntervalSec);
//   oneSecBarMove = null;
// }
