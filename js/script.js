document.addEventListener('DOMContentLoaded', () => {
    const timerTime = document.querySelector(".timer__time"),
        timerStart = document.querySelector(".timer__functions__start"),
        timerClear = document.querySelector(".timer__functions__clear"),
        timerFunctions = document.querySelector(".timer__functions"),
        timerMinutes = document.querySelector(".timer__minutes"),
        timerSeconds = document.querySelector(".timer__seconds"),
        timerMilliseconds = document.querySelector(".timer__milliseconds"),
        timerStartStopText = document.querySelector(".timer__functions__start span"),
        timerLaps = document.querySelector(".timer__laps");
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let laps = 0;
    function addZero(time) {
        return time < 10 ? `0${time}` : time;
    }
    function startTimer() {
        if (minutes < 1) {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            timerMinutes.innerHTML = `${addZero(minutes)}:`;
            timerSeconds.innerHTML = `${addZero(seconds)},`;
            timerMilliseconds.innerHTML = `${addZero(milliseconds)}`;
        }
        else {

        }
    }
    function clearTimer() {
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        timerMinutes.innerHTML = `${addZero(minutes)}:`;
        timerSeconds.innerHTML = `${addZero(seconds)},`;
        timerMilliseconds.innerHTML = `${addZero(milliseconds)}`;
    }
    timerFunctions.addEventListener('click', (event) => {
        function addLap(lap, time) {
            timerLaps.insertAdjacentHTML(`afterbegin`, `
            <div class="timer__laps__item">
            <div class="lap">Lap ${lap}</div>
            <div class="time">${addZero(time[0])}:${addZero(time[1])},${addZero(time[2])}</div>
            </div>
        `);
        }
        if (event.target.outerText === 'Start') {
            intervalTotal = setInterval(startTimer, 10);
            timerStart.classList.add('timer__functions__stop');
            timerStart.classList.remove('timer__functions__start');
            timerStartStopText.innerHTML = `Stop`;
            timerClear.innerHTML = `Lap`;
        }
        else if (event.target.outerText === 'Stop') {
            clearInterval(intervalTotal);
            timerStart.classList.remove('timer__functions__stop');
            timerStart.classList.add('timer__functions__start');
            timerStartStopText.innerHTML = `Start`;
            timerClear.innerHTML = `Clear`;
        }
        else if (event.target.outerText === "Clear") {
            clearTimer();
            laps = 0;
            timerLaps.innerHTML = '';
        }
        else if (event.target.outerText === "Lap") {
            laps++;
            addLap(laps, [minutes, seconds, milliseconds]);
        }
    });
    timerLaps.addEventListener("mouseover", () => {
        timerLaps.classList.add("custom-scrollbar");
        timerLaps.addEventListener("mouseout", () => {
            timerLaps.classList.remove("custom-scrollbar");
        });
    })
});