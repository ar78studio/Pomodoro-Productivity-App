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

// ------- Initialize user input for Pomodoro, Short Break and Long Break

const pomodoroTime = document.querySelector("#pomodoro-time-el");
const shortBreakTime = document.querySelector("#short-break-el");
const longBreakTime = document.querySelector("#long-break-el");

// Setting up Time DOM Output

const displayNumbers = document.querySelector("#clock-numbers-el");

// Setting up Time Settings Object to hold values from the Pomodoro, Short Break and Long Break Time Inputs in the Settings
let timeValueObject = {
  pomodoroValue: pomodoroTime.value,
  shortBreakValue: shortBreakTime.value,
  longBreakValue: longBreakTime.value,
};

// ------- Pass All the Values from the Settings Window on Apply Settings Button click into the timeValueObject to later be used by the Pomodoro, Short Break, Long Break buttons on the Main Page

applySettingsBtn.addEventListener("click", function () {
  timeValueObject.pomodoroValue = pomodoroTime.value;
  timeValueObject.shortBreakValue = shortBreakTime.value;
  timeValueObject.longBreakValue = longBreakTime.value;
  console.log(timeValueObject);
  // Close Settings Window on Apply Button click
  settingsWindow.classList.remove("settings-window-visible");
  settingsWindow.classList.add("settings-window-hidden");
});

// Pass Pomodoro Timer value into the Clock in the DOM
pomodoroBtn.addEventListener("click", function () {
  //   timeValueObject.shortBreakValue = shortBreakTime.value;
  displayNumbers.innerHTML = `${timeValueObject.pomodoroValue}:00`;
  console.log(timeValueObject.pomodoroValue);
});

// Pass Short Break Timer value into the Clock in the DOM
shortBreakBtn.addEventListener("click", function () {
  //   timeValueObject.shortBreakValue = shortBreakTime.value;
  displayNumbers.innerHTML = `${timeValueObject.shortBreakValue}:00`;
  console.log(timeValueObject.shortBreakValue);
});

// Pass Short Break Timer value into the Clock in the DOM
longBreakBtn.addEventListener("click", function () {
  //   timeValueObject.shortBreakValue = shortBreakTime.value;
  displayNumbers.innerHTML = `${timeValueObject.longBreakValue}:00`;
  console.log(timeValueObject.longBreakValue);
});

// Initializing random time Start and End to then calculate the difference using new Date() which counts the time since January 1, 1970 (ECMA epoch start)
const start = new Date("January 1, 2022");
const end = new Date("January 2, 2022");

// Calculating difference
const difference = end.getTime() - start.getTime();

const seconds = parseInt(difference / 1000);
const minutes = parseInt(difference / 1000 / 60);
const hours = parseInt(difference / 1000 / 60 / 60);

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
  runClock();
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  const date = new Date();
  globalTimer.start = date.getTime();
}

// PAUSE Time
function pauseTimer() {
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  const date = new Date();
  globalTimer.end = date.getTime();
  // totalTime is the result of time passed between pressing the start and then pause button
  const totalTime = (globalTimer.end - globalTimer.start) / 1000;
  if (globalTimer.timer) {
    clearInterval(globalTimer.timer);
  }
}

// Output elapsed time. globalTimer is the interval?
// Increment Progress Bar

function runClock() {
  let minutes, seconds;
  globalTimer.timer = setInterval(function () {
    const difference = new Date().getTime() - globalTimer.start;
    minutes = parseInt(difference / 1000 / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = parseInt(difference / 1000);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (seconds > 60) seconds %= 60;

    // Initialize Milliseconds
    // millis = difference;
    // if (millis > 1000) millis %= 1000;

    document.getElementById(
      "clock-numbers-el"
    ).innerText = `${minutes}:${seconds}`;

    // Initialise the time-bar initialBarState = stroke-dashoffset for the following CSS:

    // 16.71 is the 1 second clock bar increase in visibility interval
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

    let oneSecBarMove = 16.71;
    let initialBarState = 1002.6;

    // Increment Progress Bar
    // We need to subtract oneSecBarMove from oneMinute, keep the result and keep subtracting oneSecBarMove from the result until the result is equal to zero. The result is pushed to .style["stroke-dashoffset"] every time it is subtracted.

    if ((initialBarState = 1002.6)) {
      initialBarState = initialBarState - oneSecBarMove;
      document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
        initialBarState;
      document.getElementById("circle-mobile").style["stroke-dashoffset"] =
        initialBarState;
    } else {
      initialBarState = initialBarState + oneSecBarMove;
      document.getElementById("circle-non-mobile").style["stroke-dashoffset"] =
        initialBarState;
      document.getElementById("circle-mobile").style["stroke-dashoffset"] =
        initialBarState;
    }
  }, 10);
}
