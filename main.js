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
let oneMinute = 1002.6;

// Init function that runs on click of the RESTART button.

function restartProgressBar() {
  if (oneMinute <= 1002.6) {
    oneMinute = oneMinute - oneSecBarMove;
    document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
      oneMinute;
    document.getElementById("circle-mobile").style["stroke-dashoffset"] =
      oneMinute;
  }
  if (oneMinute >= 1003.6) {
    // oneHour = 1002.6;
    oneMinute = oneMinute - oneSecBarMove;
    document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
      oneMinute;
    document.getElementById("circle-mobile").style["stroke-dashoffset"] =
      oneMinute;
  } else {
  }
}

function pauseProgressBar() {
  clearInterval(initIntervalSec);
  oneSecBarMove = null;
}

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
