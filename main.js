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
