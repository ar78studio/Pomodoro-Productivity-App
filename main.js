// ------- Open Settings Window by pressing Gear Button
const openSettingsWindow = document.getElementById("settings-gear-btn");
const closeSettingsWindow = document.getElementById("close-window-btn");
const settingsWindow = document.getElementById("settings-window-el");

// ------- Apply Settings Button
const applySettingsBtn = document.getElementById("apply-settings");

// ------- Pomodoro Button on the Main Page
const pomodoroBtn = document.getElementById("pomodoro-time-btn");
// ------- Short Break Button on the Main Page
const shortBreakBtn = document.getElementById("shortbreak-time-btn");
// ------- Long Break Button on the Main Page
const longBreakBtn = document.getElementById("longbreak-time-btn");

openSettingsWindow.addEventListener("click", function () {
  settingsWindow.classList.remove("settings-window-hidden");
  settingsWindow.classList.add("settings-window-visible");
});

closeSettingsWindow.addEventListener("click", function () {
  settingsWindow.classList.remove("settings-window-visible");
  settingsWindow.classList.add("settings-window-hidden");
});

// Setting up Time DOM Output

const displayNumbers = document.querySelector("#clock-numbers-el");

// ------- Initialize user input for Pomodoro, Short Break and Long Break

const pomodoroTime = document.querySelector("#pomodoro-time-el");
const shortBreakTime = document.querySelector("#short-break-el");
const longBreakTime = document.querySelector("#long-break-el");

// Setting up Time Settings Object to hold values from the Pomodoro, Short Break and Long Break Time Inputs in the Settings
const timeValueObject = {
  pomodoroValue: pomodoroTime.value,
  shortBreakValue: shortBreakTime.value,
  longBreakValue: longBreakTime.value,
};

// ------- Pass All the Values from the Settings Window on Apply Settings Button click into the timeValueObject to later be used by the Pomodoro, Short Break, Long Break buttons on the Main Page

applySettingsBtn.addEventListener("click", function () {
  timeValueObject.pomodoroValue = pomodoroTime.value;
  timeValueObject.shortBreakValue = shortBreakTime.value;
  timeValueObject.longBreakValue = longBreakTime.value;
  // Close Settings Window on Apply Button click
  settingsWindow.classList.remove("settings-window-visible");
  settingsWindow.classList.add("settings-window-hidden");
});

// Declare Global Time Object to hold Starting Timer value
const globalTimer = {
  timer: null,
  start: null,
  progressBar: null,
};

// declare the global time holder to load Pomodoro, Short Break and Long Break into when the appropriate button is pressed in the main mode selector
let loadTime;

// Initial Progress Bar Position
let barResult = 999;

// Pass Pomodoro Timer value into the Clock in the DOM
pomodoroBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.pomodoroValue}:00`;
  loadTime = timeValueObject.pomodoroValue;
  // clearInterval(time);
  clearInterval(loadTime);
  console.log(timeValueObject.pomodoroValue);
  globalTimer.start = loadTime * 60;
});

// Pass Short Break Timer value into the Clock in the DOM
shortBreakBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.shortBreakValue}:00`;
  loadTime = timeValueObject.shortBreakValue;
  clearInterval(loadTime);
  console.log(timeValueObject.shortBreakValue);
  globalTimer.start = loadTime * 60;
});

// Pass Long Break Timer value into the Clock in the DOM
longBreakBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.longBreakValue}:00`;
  loadTime = timeValueObject.longBreakValue;
  clearInterval(loadTime);
  console.log(timeValueObject.longBreakValue);
  globalTimer.start = loadTime * 60;
});

// --------------------------- Timer ------------------------
// --------------------------- Timer ------------------------
// --------------------------- Timer ------------------------

// Declaring the button variables in the DOM
const startBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");
const clearBtn = document.getElementById("btn-clear");

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
clearBtn.addEventListener("click", clearTimer);

// START Time Calculation
function startTimer() {
  if (globalTimer.start <= 0) return;

  startBtn.style.display = "none";
  pauseBtn.style.display = "block";

  globalTimer.timer = setInterval(updateTimer, 1000);
}

// Update Timer
function updateTimer() {
  globalTimer.start--;
  const minutes = Math.trunc(globalTimer.start / 60).toString();
  const seconds = Math.trunc(globalTimer.start % 60).toString();
  displayNumbers.innerHTML = `${minutes.padStart(2, "0")}:${seconds.padStart(
    2,
    "0"
  )}`;
  // update progress bar
  globalTimer.progressBar--;
  // Subtract 16.65 from the current value of the progress bar
  barResult = barResult - 16.65;
  // If the progress bar has reached 0, reset it to the starting value
  if (barResult <= 0) {
    barResult = 999;
  }

  // Update the progress bar in the document
  document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
    barResult;

  if (globalTimer.start <= 0) {
    clearInterval(globalTimer.timer); // stop the timer when we hit 0
    clearInterval(globalTimer.progressBar); // stop the progress bar when we hit 0
    globalTimer.timer = null;
    globalTimer.start = null;
    displayNumbers.innerHTML = `<p class="all-done">All Done!</p>`;
    document.getElementById("circle-non-mobile").style["stroke-dashoffset"] = 0;
    setTimeout(() => {
      document.getElementById("circle-non-mobile").style[
        "stroke-dashoffset"
      ] = 999;
      //   displayNumbers.innerHTML = `00:00`;
    }, 6000);

    let ding = new Audio("/ding.mp3");
    ding.play();

    pauseBtn.style.display = "none";
    startBtn.style.display = "block";
  }
}

// PAUSE Time
function pauseTimer() {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  if (globalTimer.timer) clearInterval(globalTimer.timer);
  if (globalTimer.progressBar) clearInterval(globalTimer.progressBar);
}

// CLEAR Timer
function clearTimer() {
  clearInterval(globalTimer.timer);
  clearInterval(globalTimer.progressBar);
  clearInterval(globalTimer.start);
  globalTimer.timer = null;
  globalTimer.start = null;
  globalTimer.progressBar = 999;
  document.getElementById("circle-non-mobile").style["stroke-dashoffset"] = 999;
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  displayNumbers.innerHTML = `00:00`;
}

console.log(clearTimer());

// Initialise the time-bar if statement: if ((initialBarState = 1002.6))
// in relationship to the following CSS bellow:

// 16.71 is the 1 second clock bar increase in visibility interval derived from dividing dashoffset by 60 minutes
//     #circle-non-mobile {
//     height: 355px;
//     width: 355px;
//     fill: none;
//     stroke: #f87070;
//     stroke-width: 10;
//     stroke-dasharray: 1002.6;
//     stroke-dashoffset: 1002.6;
//     stroke-linecap: round;
//     transform: translate(0.3%, 89%) rotate(-90deg);
//   }
