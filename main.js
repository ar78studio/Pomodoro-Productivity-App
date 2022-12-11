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
  // Pass Pomodoro Time into the Clock in the DOM upon Apply click
  // displayNumbers.innerHTML = `${timeValueObject.pomodoroValue}:00`;
  console.log(` Time Value Object - ${timeValueObject.pomodoroValue}`);
  // Close Settings Window on Apply Button click
  settingsWindow.classList.remove("settings-window-visible");
  settingsWindow.classList.add("settings-window-hidden");
});

// declare the global time holder to load Pomodoro, Short Break and Long Break into when the appropriate button is pressed in the main mode selector
let loadTime;

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

// Pass Short Break Timer value into the Clock in the DOM
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

// Initializing random time Start and End to then calculate the difference using new Date() which counts the time since January 1, 1970 (ECMA epoch start)

// Declaring the button variables in the DOM
const startBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");
const clearBtn = document.getElementById("btn-clear");

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
clearBtn.addEventListener("click", clearTimer);

// Declare Global Time Object to hold Starting Timer value
const globalTimer = {
  timer: null,
  start: null,
  end: null,
};

// START Time Calculation
function startTimer() {
  if (globalTimer.start <= 0) return;

  startBtn.style.display = "none";
  pauseBtn.style.display = "block";

  globalTimer.timer = setInterval(updateTimer, 1000);
}

// const startTiming = timeValueObject;
let pomodoro = timeValueObject.pomodoroValue;
let shortBreak = timeValueObject.shortBreakValue;
let longBreak = timeValueObject.longBreakValue;

function updateTimer() {
  globalTimer.start--;
  const minutes = Math.trunc(globalTimer.start / 60).toString();
  const seconds = Math.trunc(globalTimer.start % 60).toString();
  displayNumbers.innerHTML = `${minutes.padStart(2, "0")}:${seconds.padStart(
    2,
    "0"
  )}`;

  if (globalTimer.start <= 0) {
    clearInterval(globalTimer.timer); // stop the timer when we hit 0
    globalTimer.timer = null;
    globalTimer.start = null;
    // displayNumbers.innerHTML = `<h6>All Done!</h6>`;
    // pauseBtn.style.display = "none";
    // startBtn.style.display = "block";
  }
}

// Code that starts timer
function runPomodoro() {
  // before STARTING the actual timer, set the start time...
  // If start time is not null then it's a restart from pause
  if (!globalTimer.start) globalTimer.start = loadTime * 60; // in seconds
}

function runShortBreak() {
  if (!globalTimer.start) globalTimer.start = loadTime * 60;
}

function runLongBreak() {
  if (!globalTimer.start) globalTimer.start = loadTime * 60;
}

// PAUSE Time
function pauseTimer() {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  if (globalTimer.timer) clearInterval(globalTimer.timer);
}

// CLEAR Timer
function clearTimer() {
  clearInterval(globalTimer.timer);
  globalTimer.timer = null;
  globalTimer.start = null;
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  displayNumbers.innerHTML = `00:00`;
}

//     // ---------- End Run Clock ----------------

//     // Initialise the time-bar if statement: if ((initialBarState = 1002.6))
//     // in relationship to the following CSS bellow:

//     // 16.71 is the 1 second clock bar increase in visibility interval
//     //     #circle-non-mobile {
//     //     height: 355px;
//     //     width: 355px;
//     //     fill: none;
//     //     stroke: #f87070;
//     //     stroke-width: 10;
//     //     stroke-dasharray: 1002.6;
//     //     stroke-dashoffset: 1002.6;
//     //     stroke-linecap: round;
//     //     transform: translate(0.3%, 89%) rotate(-90deg);
//     //   }

// 		let oneSecBarMove = 16.71;
// 		let initialBarState = 1002.6;

// 		// Increment Progress-Bar / Time-Bar
// 		// We need to subtract oneSecBarMove from oneMinute, keep the result and keep subtracting oneSecBarMove from the result until the result is equal to zero. The result is pushed to .style["stroke-dashoffset"] every time it is subtracted.

// 		if ((initialBarState = 1002.6)) {
// 			initialBarState = initialBarState - oneSecBarMove;
// 			document.getElementById('circle-non-mobile').style['stroke-dashoffset'] = initialBarState;
// 			document.getElementById('circle-mobile').style['stroke-dashoffset'] = initialBarState;
// 		} else {
// 			initialBarState = initialBarState + oneSecBarMove;
// 			document.getElementById('circle-non-mobile').style['stroke-dashoffset'] = initialBarState;
// 			document.getElementById('circle-mobile').style['stroke-dashoffset'] = initialBarState;
// 		}
// 	}, 10);
// }
