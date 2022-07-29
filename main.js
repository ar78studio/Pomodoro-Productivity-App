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

// ---- INITIAL SCREEN HAS START BUTTON VISIBLE WITH CLOCKS SHOWING 00:00. POMODORO HEADER BUTTON IS ACTIVE. HEADER BUTTONS STAY ALWAYS ACTIVE (IGNORING OFF-BUTTON CLICKS) UNTIL THE OTHER HEADER BUTTON IS PRESSED.

// INITIATE THE CLOCKS BY PRESSINGS THE START BUTTON -> PAUSE BUTTON IS VISIBLE AND PAUSE HIDDEN, ONCE THE CLOCK IS STARTED

// PAUSE THE CLOCK BY PRESSING THE - PAUSE BUTTON - START BUTTON BECOMES VISIBLE AND PAUSE HIDDEN

// CHOOSE A SHORT BREAK COUNTDOWN BY PRESSING THE - SHORT BREAK BUTTON - SHORT BREAK TIME SET IN SETTINGS

// START A LONG BREAK COUNTDOWN BY PRESSING THE - LONG BREAK BUTTON - LONG BREAK TIME SET IN SETTINGS

// Check if the interval has been setup, if not, then initialise with JS method setInterval, where we're passing a function to be run and a delay in milliseconds
let initIntervalSec;

function initInterval() {
  if (!initIntervalSec) {
    initIntervalSec = setInterval(restartProgressBar, 1000);
  }
}

// Initialise stroke-dashoffset = oneSecInterval and initial stroke-dashoffset = oneHour
let oneSecIntervalBar = 16.71;
let oneHour = 1002.6;

// Init function that runs on click of the RESTART button. The function checks what the

function restartProgressBar() {
  if (oneHour <= 1002.6) {
    oneHour = oneHour - oneSecIntervalBar;
    document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
      oneHour;
  }
  if (oneHour >= 1003.6) {
    // oneHour = 1002.6;
    oneHour = oneHour - oneSecIntervalBar;
    document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
      oneHour;
  } else {
  }
}

function pauseProgressBar() {
  clearInterval(initIntervalSec);
  oneSecIntervalBar = null;
}

// Processing Current Time

function currentTime() {
  let date = new Date();
  let m = date.getMinutes();
  let s = date.getSeconds();

  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = m + ":" + s;

  document.getElementById("clock-numbers-el").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

//--------- Restart and Pause time buttons

// Declaring the button variables in the DOM
const restartBtn = document.getElementById("btn-restart");
const pauseBtn = document.getElementById("btn-pause");

// Adding click functionality
restartBtn.addEventListener("click", function () {
  initInterval(), currentTime();
  restartBtn.style.display = "none";
  pauseBtn.style.display = "block";
});

pauseBtn.addEventListener("click", function () {
  pauseProgressBar();
  pauseBtn.style.display = "none";
  restartBtn.style.display = "block";
});
