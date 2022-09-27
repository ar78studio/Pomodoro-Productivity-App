// ------- Open Settings Window by pressing Gear Button
const openSettingsWindow = document.getElementById('settings-gear-btn');
const closeSettingsWindow = document.getElementById('close-window-btn');
const settingsWindow = document.getElementById('settings-window-el');

// ------- Apply Settings Button
const applySettingsBtn = document.getElementById('apply-settings');

// ------- Pomodoro Button on the Main Page
const pomodoroBtn = document.getElementById('pomodoro-time-btn');
// ------- Short Break Button on the Main Page
const shortBreakBtn = document.getElementById('shortbreak-time-btn');
// ------- Long Break Button on the Main Page
const longBreakBtn = document.getElementById('longbreak-time-btn');

openSettingsWindow.addEventListener('click', function () {
	settingsWindow.classList.remove('settings-window-hidden');
	settingsWindow.classList.add('settings-window-visible');
});

closeSettingsWindow.addEventListener('click', function () {
	settingsWindow.classList.remove('settings-window-visible');
	settingsWindow.classList.add('settings-window-hidden');
});

// Setting up Time DOM Output

const displayNumbers = document.querySelector('#clock-numbers-el');
