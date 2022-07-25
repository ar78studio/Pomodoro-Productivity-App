// ------- Version 1 - Open Settings Window by pressing Gears Button
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

// ------ Version 2 - Open Settings Window by pressing Gears Button
// document.getElementById("settings-gear-btn").addEventListener("click", () => {
//   document
//     .getElementById("settings-window-el")
//     .classList.remove("settings-window-hidden");
//   document
//     .getElementById("settings-window-el")
//     .classList.add("settings-window-visible");
// });

// document.getElementById("close-window-btn").addEventListener("click", () => {
//   document
//     .getElementById("settings-window-el")
//     .classList.remove("settings-window-visible");
//   document
//     .getElementById("settings-window-el")
//     .classList.add("settings-window-hidden");
// });

// ---- INITIAL SCREEN HAS START BUTTON VISIBLE WITH CLOCKS SHOWING 00:00. POMODORO HEADER BUTTON IS ACTIVE. HEADER BUTTONS STAY ALWAYS ACTIVE (IGNORING OFF-BUTTON CLICKS) UNTIL THE OTHER HEADER BUTTON IS PRESSED.

// INITIATE THE CLOCKS BY PRESSINGS THE START BUTTON -> PAUSE BUTTON IS VISIBLE AND PAUSE HIDDEN, ONCE THE CLOCK IS STARTED

// PAUSE THE CLOCK BY PRESSING THE - PAUSE BUTTON - START BUTTON BECOMES VISIBLE AND PAUSE HIDDEN

// CHOOSE A SHORT BREAK COUNTDOWN BY PRESSING THE - SHORT BREAK BUTTON - SHORT BREAK TIME SET IN SETTINGS

// START A LONG BREAK COUNTDOWN BY PRESSING THE - LONG BREAK BUTTON - LONG BREAK TIME SET IN SETTINGS
