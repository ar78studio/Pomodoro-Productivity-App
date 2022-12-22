// ------- Open Settings Window by pressing Gear Button
// const settingsGearBtn = document.getElementById("settings-gear-btn");
const settingsGearBtn = document.getElementById("gear-icon");
const closeSettingsWindow = document.getElementById("close-window-btn");
const settingsWindow = document.getElementById("settings-window-el");
const clearTimerBtn = document.getElementById("btn-clear");

// ------- Apply Settings Button
const applySettingsBtn = document.getElementById("apply-settings");

// ------- Pomodoro Button on the Main Page
const pomodoroBtn = document.getElementById("pomodoro-time-btn");
// ------- Short Break Button on the Main Page
const shortBreakBtn = document.getElementById("shortbreak-time-btn");
// ------- Long Break Button on the Main Page
const longBreakBtn = document.getElementById("longbreak-time-btn");

// Open Settings Window and close it
settingsGearBtn.addEventListener("click", () => {
  settingsWindow.classList.add("settings-window-visible");

  // Close settings window on outside click
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest("#settings-window-el") &&
      !event.target.matches("#gear-icon")
    ) {
      settingsWindow.classList.remove("settings-window-visible");
      settingsWindow.classList.add("settings-window-hidden");
    }
  });
});

closeSettingsWindow.addEventListener("click", () => {
  settingsWindow.classList.remove("settings-window-visible");
  settingsWindow.classList.add("settings-window-hidden");
});

// Setting up Time DOM Output

const displayNumbers = document.querySelector("#clock-numbers-el");

// ------- Initialize user input for Pomodoro, Short Break and Long Break

const pomodoroTime = document.querySelector("#pomodoro-time-el");
const shortBreakTime = document.querySelector("#short-break-el");
const longBreakTime = document.querySelector("#long-break-el");

// ------- Initialize user input for Color Variations

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
  progressBarLG: null,
  progressBarSM: null,
};

// declare the global time holder to load Pomodoro, Short Break and Long Break into when the appropriate button is pressed in the main mode selector
let loadTime;

// Initial Progress Bar Position
let nonMobileProgressBar = 999;
let mobileProgressBar = 999;
// Pass Pomodoro Timer value into the Clock in the DOM
pomodoroBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.pomodoroValue}:00`;
  loadTime = timeValueObject.pomodoroValue;
  clearInterval(loadTime);
  globalTimer.start = loadTime * 60;
});

// Pass Short Break Timer value into the Clock in the DOM
shortBreakBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.shortBreakValue}:00`;
  loadTime = timeValueObject.shortBreakValue;
  clearInterval(loadTime);
  globalTimer.start = loadTime * 60;
});

// Pass Long Break Timer value into the Clock in the DOM
longBreakBtn.addEventListener("click", function () {
  displayNumbers.innerHTML = `${timeValueObject.longBreakValue}:00`;
  loadTime = timeValueObject.longBreakValue;
  clearInterval(loadTime);
  globalTimer.start = loadTime * 60;
});

// --------------------------- Timer ------------------------
// --------------------------- Timer ------------------------
// --------------------------- Timer ------------------------

// Declaring the button variables in the DOM
const startBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");
const clearBtn = document.getElementById("btn-clear");

// Declaring progress bars for Mobile and Large Screens
const barMobile = document.getElementById("circle-non-mobile");
const barNonMobile = document.getElementById("circle-mobile");

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
// clearBtn.addEventListener("click", clearTimer);

// START Time Calculation
function startTimer() {
  if (globalTimer.start <= 0) return;

  startBtn.style.display = "none";
  pauseBtn.style.display = "block";

  globalTimer.timer = setInterval(updateTimer, 1000);

  function disableWhileRunning() {
    pomodoroBtn.disabled = true;
    shortBreakBtn.disabled = true;
    longBreakBtn.disabled = true;
  }
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
  // update progress bar on large screens
  globalTimer.progressBarLG--;
  // Subtract 16.65 from the current value of the progress bar
  nonMobileProgressBar = nonMobileProgressBar - 16.65;
  // If the progress bar has reached 0, reset it to the starting value
  if (nonMobileProgressBar <= 0) {
    nonMobileProgressBar = 999;
  }

  // update bar on mobile screens
  globalTimer.progressBarSM--;
  // Subtract 12.30 from the current value of the progress bar
  mobileProgressBar = mobileProgressBar - 12.3;
  // If the progress bar has reached 0, reset it to the starting value
  if (mobileProgressBar <= 0) {
    mobileProgressBar = 999;
  }

  // Update the progress bar in the DOM
  barNonMobile.style["stroke-dashoffset"] = nonMobileProgressBar;
  barMobile.style["stroke-dashoffset"] = mobileProgressBar;

  if (globalTimer.start <= 0) {
    clearInterval(globalTimer.timer); // stop the timer when we hit 0
    clearInterval(globalTimer.progressBarLG); // stop nonMobile bar when we hit 0
    clearInterval(globalTimer.progressBarSM); // stop Mobile bar when we hit 0
    globalTimer.timer = null;
    globalTimer.start = null;
    displayNumbers.innerHTML = `<p class="all-done">All Done!</p>`;
    barNonMobile.style["stroke-dashoffset"] = 0;
    barMobile.style["stroke-dashoffset"] = 0;
    setTimeout(() => {
      barNonMobile.style["stroke-dashoffset"] = 999;
      barMobile.style["stroke-dashoffset"] = 999;
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
  if (globalTimer.progressBarLG) clearInterval(globalTimer.progressBarLG);
  if (globalTimer.progressBarSM) clearInterval(globalTimer.progressBarSM);
}

// CLEAR Timer
clearTimerBtn.addEventListener("click", function () {
  let confirmAction = confirm("Are you sure you want to reset the Timer?");

  if (confirmAction) {
    clearInterval(globalTimer.timer);
    clearInterval(globalTimer.progressBarLG);
    clearInterval(globalTimer.progressBarSM);
    globalTimer.timer = null;
    globalTimer.start = null;
    globalTimer.progressBarLG = null;
    globalTimer.progressBarSM = null;
    barNonMobile.style["stroke-dashoffset"] = 999;
    barMobile.style["stroke-dashoffset"] = 999;
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
    displayNumbers.innerHTML = `00:00`;
    nonMobileProgressBar = 999;
    mobileProgressBar = 999;
  } else {
    alert("Timer will continue...");
  }
});

// Progress bar JS code references the following CSS:

// 16.65 is the 1 second clock bar increase in visibility interval derived from dividing stroke-dashoffset by 60 minutes for the large screens and adjusted for mobile screens
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

// Settings for Fonts and Color

// Colour buttons in the settings menu
const orangeColorRadioBtn = document.getElementById("orange-checkbox");
const turquoiseColorRadioBtn = document.getElementById("turquoise-checkbox");
const purpleColorRadioBtn = document.getElementById("purple-checkbox");

// Font buttons in the settings menu
const kumbhSansFontRadioBtn = document.getElementById("kumbh-sans");
const robotoSlabFontRadioBtn = document.getElementById("roboto-slab");
const spaceMonoFontRadioBtn = document.getElementById("space-mono");

// Selecting the :root Theme
const rootTheme = document.querySelector(":root");

orangeColorRadioBtn.addEventListener("click", () => {
  rootTheme.style.setProperty("--current-color", "#F87070");
});
turquoiseColorRadioBtn.addEventListener("click", () => {
  rootTheme.style.setProperty("--current-color", "#70F3F8");
});
purpleColorRadioBtn.addEventListener("click", () => {
  rootTheme.style.setProperty("--current-color", "#D881F8");
});

// Select fonts
spaceMonoFontRadioBtn.addEventListener("click", () => {
  rootTheme.style.setProperty("--current-font", "'Space Mono', monospace");
});

robotoSlabFontRadioBtn.addEventListener("click", () => {
  rootTheme.style.setProperty("--current-font", "'Roboto Slab', serif");
});

kumbhSansFontRadioBtn.addEventListener("click", () => {
  rootTheme.style.setProperty("--current-font", "'Kumbh Sans', sans-serif");
});
