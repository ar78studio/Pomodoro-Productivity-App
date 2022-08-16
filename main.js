// ------- Open Settings Window by pressing Gears Button
const openSettingsWindow = document.getElementById("settings-gear-btn");
const closeSettingsWindow = document.getElementById("close-window-btn");
const settingsWindow = document.getElementById("settings-window-el");

openSettingsWindow.addEventListener("click", function () {
  settingsWindow.classList.remove("settings-window-hidden");
  settingsWindow.classList.add("settings-window-visible");
  //   settingsWindow.style.display = "block";
});

closeSettingsWindow.addEventListener("click", function () {
  settingsWindow.classList.remove("settings-window-visible");
  settingsWindow.classList.add("settings-window-hidden");
});

// ---- INITIAL SCREEN HAS START BUTTON VISIBLE WITH CLOCKS SHOWING 00:00. POMODORO HEADER BUTTON IS ACTIVE. HEADER BUTTONS STAY ALWAYS ACTIVE (use radio buttons) UNTIL THE OTHER HEADER BUTTON IS PRESSED.

// INITIATE THE CLOCKS BY PRESSINGS THE START BUTTON -> PAUSE BUTTON IS VISIBLE AND PAUSE HIDDEN, ONCE THE CLOCK IS STARTED

// PAUSE THE CLOCK BY PRESSING THE - PAUSE BUTTON - START BUTTON BECOMES VISIBLE AND PAUSE HIDDEN

// CHOOSE A SHORT BREAK COUNTDOWN BY PRESSING THE - SHORT BREAK BUTTON - SHORT BREAK TIME SET IN SETTINGS BY SAVING THE VALUE IN LOCAL STORAGE

// START A LONG BREAK COUNTDOWN BY PRESSING THE - LONG BREAK BUTTON - LONG BREAK TIME SET IN SETTINGS BY SAVING THE VALUE IN LOCAL STORAGE

// Check if the interval has been setup, if not, then initialise with JS method setInterval, where we're passing a function to be run and a delay in milliseconds
let initIntervalSec;

function initInterval() {
  if (!initIntervalSec) {
    initIntervalSec = setInterval(restartProgressBar, 1000);
  }
}

// Initialise stroke-dashoffset = oneSecInterval and initial stroke-dashoffset = oneHour
let oneSecBarMove = 16.71;
let oneHour = 1002.6;

// Init function that runs on click of the RESTART button.

function restartProgressBar() {
  if (oneHour <= 1002.6) {
    oneHour = oneHour - oneSecBarMove;
    document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
      oneHour;
  }
  if (oneHour >= 1003.6) {
    // oneHour = 1002.6;
    oneHour = oneHour - oneSecBarMove;
    document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
      oneHour;
  } else {
  }
}

function pauseProgressBar() {
  clearInterval(initIntervalSec);
  oneSecBarMove = null;
}

// Processing Current Time

// -------- Start Timer Code from Stack Overflow
class Timer {
  constructor() {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
  }

  _getTimeElapsedSinceLastStart() {
    if (!this.startTime) {
      return 0;
    }

    return Date.now() - this.startTime;
  }

  start() {
    if (this.isRunning) {
      return console.error("Timer is already running");
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop() {
    if (!this.isRunning) {
      return console.error("Timer is already stopped");
    }

    this.isRunning = false;

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
  }

  reset() {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime() {
    if (!this.startTime) {
      return 0;
    }

    if (this.isRunning) {
      return this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    return this.overallTime;
  }
}

// ---- Original Stack code
// const timer = new Timer();
// timer.start();
// setInterval(() => {
//   const timeInSeconds = Math.round(timer.getTime() / 1000);
//   document.getElementById("clock-numbers-el").innerText = timeInSeconds;
// }, 100);

// -------- End Original Timer Code from Stack Overflow

//--------- Restart and Pause time buttons

// Declaring the button variables in the DOM
const restartBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");

// Adding click functionality
// restartBtn.addEventListener("click", function () {
//   initInterval(), currentTime();
//   restartBtn.style.display = "none";
//   pauseBtn.style.display = "block";
// });

restartBtn.addEventListener("click", function () {
  initInterval();
  const timer = new Timer();
  timer.start();
  setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000);
    document.getElementById("clock-numbers-el").innerText = timeInSeconds;
  }, 100);

  restartBtn.style.display = "none";
  pauseBtn.style.display = "block";
});

pauseBtn.addEventListener("click", function () {
  pauseProgressBar();
  pauseBtn.style.display = "none";
  restartBtn.style.display = "block";
});
