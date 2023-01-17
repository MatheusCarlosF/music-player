let timeLeft = 0;
let intervalId;
let countUpTime = 0;
let countUpIntervalId;
let audio = new Audio("audio.mp3");
let isPlaying = false;

audio.addEventListener("loadedmetadata", function () {
    timeLeft = Math.round(audio.duration);
    updateTimeLeft();
});

function updateTimeLeft() {
    timeLeft = Math.round(audio.duration - audio.currentTime);
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let display = `${minutes}:${(seconds =
        seconds < 10 ? "0" + seconds : seconds)}`;
    document.querySelector("#time-left").innerHTML = display;
}

function updateCountUpTime() {
    countUpTime = Math.round(audio.currentTime);
    let minutes = Math.floor(countUpTime / 60);
    let seconds = countUpTime % 60;
    let display = `${minutes}:${(seconds =
        seconds < 10 ? "0" + seconds : seconds)}`;
    document.querySelector("#count-up-time").innerHTML = display;
    updateProgress();
}

// Função para atualizar a barra de progresso
function updateProgress() {
    document.getElementById("progressBar").value = countUpTime;
}

function startTimers() {
    console.log("play");
    isPlaying = true;
    if (isPlaying === true) {
        document.getElementById("play-button").style.display = "none";
        document.getElementById("stop-button").style.display = "flex";
    }
    audio.play();
    intervalId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalId);
        } else {
            updateTimeLeft();
        }
    }, 1000);

    countUpIntervalId = setInterval(() => {
        if (countUpTime === timeLeft) {
            clearInterval(countUpIntervalId);
        } else {
            updateCountUpTime();
        }
    }, 1000);
}

function stopTimers() {
    console.log("pause");
    isPlaying = false;
    if (isPlaying == false) {
        document.getElementById("play-button").style.display = "flex";
        document.getElementById("stop-button").style.display = "none";
    }

    clearInterval(intervalId);
    clearInterval(countUpIntervalId);
    audio.pause();
}

document.getElementById("play-button").addEventListener("click", startTimers);
document.getElementById("stop-button").addEventListener("click", stopTimers);
