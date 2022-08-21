function startTimer(seconds, container, oncomplete) {
  let startTime,
    timer,
    obj,
    ms = seconds * 1000,
    display = document.getElementById(container);
  obj = {};
  obj.resume = function () {
    startTime = new Date().getTime();
    timer = setInterval(obj.step, 250); // adjust this number to affect granularity
    // lower numbers are more accurate, but more CPU-expensive
  };
  obj.pause = function () {
    ms = obj.step();
    clearInterval(timer);
  };
  obj.step = function () {
    let now = Math.max(0, ms - (new Date().getTime() - startTime)),
      m = Math.floor(now / 60000),
      s = Math.floor(now / 1000) % 60;
    s = (s < 10 ? "0" : "") + s;
    display.innerHTML = m + ":" + s;
    if (now == 0) {
      clearInterval(timer);
      obj.resume = function () {};
      if (oncomplete) oncomplete();
    }
    return now;
  };
  obj.resume();
  return obj;
}

// start:
let timer = startTimer(5 * 60, "timer", function () {
  alert("Done!");
});
// pause:
timer.pause();
// resume:
timer.resume();

const startNewTimer = document.querySelector("#startTimerBtn");

startNewTimer.addEventListener("click", timer);
