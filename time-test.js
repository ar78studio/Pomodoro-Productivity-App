const start = new Date('July 1, 2000');
const end = new Date('July 2, 2000');
console.log(start.getTime());
console.log(end.getTime());

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', startTimer);

function startTimer() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
}

const stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', stopTimer);

function stopTimer() {
	startBtn.disabled = false;
	stopBtn.disabled = true;
}

stopBtn.disabled = true;

// difference is in milliseconds
const difference = end.getTime() - start.getTime();
console.log(difference);

// calculate the difference in seconds
const seconds = parseInt(difference / 1000);
const minutes = parseInt(difference / 1000 / 60);
const hours = parseInt(difference / 1000 / 60 / 60);
const days = parseInt(difference / 1000 / 60 / 60 / 24);

const game = { timer: 0 };
console.log(seconds, minutes, hours, days);
