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
});

// Pass Short Break Timer value into the Clock in the DOM
shortBreakBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.shortBreakValue}:00`;
  loadTime = timeValueObject.shortBreakValue;
  clearInterval(loadTime);
  console.log(timeValueObject.shortBreakValue);
});

// Pass Short Break Timer value into the Clock in the DOM
longBreakBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.longBreakValue}:00`;
  loadTime = timeValueObject.longBreakValue;
  clearInterval(loadTime);
  console.log(timeValueObject.longBreakValue);
});

// --------------------------- Timer ------------------------
// --------------------------- Timer ------------------------
// --------------------------- Timer ------------------------

// Initializing random time Start and End to then calculate the difference using new Date() which counts the time since January 1, 1970 (ECMA epoch start)
const start = new Date("January 1, 2022");
const end = new Date("January 2, 2022");

// Calculating difference
// const difference = end.getTime() - start.getTime();
const difference = end.getTime() - start.getTime();
// console.log(`Difference is ` + difference);

const seconds = parseInt(difference / 1000);
const minutes = parseInt(difference / 1000 / 60);

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

// START Time Calculation
function startTimer() {
  runPomodoro();
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  const date = new Date();
  globalTimer.start = date.getTime();
}

// const startTiming = timeValueObject;
let pomodoro = timeValueObject.pomodoroValue;
let shortBreak = timeValueObject.shortBreakValue;
let longBreak = timeValueObject.longBreakValue;
console.log(`
This is a "pomodoro" variable - ${pomodoro}
This is a "shortBreak" variable - ${shortBreak}
This is a "longBreak" variable - ${longBreak}
`);

// Code that starts timer
function runPomodoro() {
  globalTimer.timer = setInterval(updateTimer, 1000);

  function updateTimer() {
    let minutes = Math.floor(loadTime / 60);
    let seconds = loadTime - minutes * 60;
    console.log(minutes, seconds);

    // minutes = minutes < 10 ? "0" + minutes : minutes;
    minutes = minutes < 10 ? "" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    loadTime--;
    displayNumbers.innerHTML = `${minutes}:${seconds}`;
  }
}

function runShortBreak() {
  globalTimer.timer = setInterval(updateTimer);

  function updateTimer() {
    let minutes = Math.floor(loadTime / 60);
    let seconds = loadTime - minutes * 60;
    console.log(minutes);

    minutes = minutes < 10 ? "" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    displayNumbers.innerHTML = `${minutes}:${seconds}`;
    time--;
  }
}

function runLongBreak() {
  globalTimer.timer = setInterval(updateTimer, 1000);

  function updateTimer() {
    let minutes = Math.floor(loadTime / 60);
    let seconds = loadTime - minutes * 60;
    console.log(minutes);
    minutes = minutes < 10 ? "" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    displayNumbers.innerHTML = `${minutes}:${seconds}`;
    time--;
  }
}

// PAUSE Time
function pauseTimer() {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  const date = new Date();
  globalTimer.end = date.getTime();
  // totalTime is the result of time passed between pressing the start and then pause button
  (globalTimer.end - globalTimer.start) / 1000;
  if (globalTimer.timer) {
    clearInterval(globalTimer.timer);
  }
}

// function runClock() {
// 	let minutes, seconds;
// 	globalTimer.timer = setInterval(function () {
// 		const difference = new Date().getTime() - globalTimer.start;
// 		minutes = parseInt(difference / 1000 / 60);
// 		minutes = minutes < 10 ? '0' + minutes : minutes;

// 		seconds = parseInt(difference / 1000);
// 		seconds = seconds < 10 ? '0' + seconds : seconds;

// 		if (seconds > 60) seconds %= 60;

// 		// Initialize Milliseconds
// 		millis = difference;
// 		if (millis > 1000) millis %= 1000;

// 		document.getElementById('clock-numbers-el').innerText = `${minutes}:${seconds}`;

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
