let gameSeq = [];
let userSeq = [];

let start = false;
let level = 0;
let max = 0;
let res = 0;

let btns = ["yellow", "red", "green", "blue"];
let h2 = document.querySelector("h2"); 

let playOnOf = document.querySelector("#playIcon");
playOnOf.value = true;

let pushText = document.createTextNode("On");
playOnOf.appendChild(pushText);

let offText = document.createTextNode("Off");

playOnOf.addEventListener("click", function () {
    if (playOnOf.value == true) {
        playOnOf.value = false;
        playOnOf.removeChild(pushText);
        playOnOf.appendChild(offText);
    } else if (playOnOf.value == false) {
        playOnOf.value = true;
        playOnOf.removeChild(offText);
        playOnOf.appendChild(pushText);
    }
});

function playSound() {
    if (playOnOf.value == true) {
        let myAudio = document.getElementById("pressSnd");
        myAudio.play();
    }
}

function startSound() {
    let startAud = document.getElementById("startSnd");
    startAud.play();
}

function endSound() {
    let endAud = document.getElementById("endSnd");
    endAud.play();
}

document.addEventListener("keypress", function () {
    if (start == false) {
        console.log("Game Started!");
        start = true;
        startSound();
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 150);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInd = Math.floor(Math.random() * 4);
    let randCol = btns[randInd];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    gameFlash(randBtn);
}

function checkMax() {
    if (level > max) {
        max = level;
    }
    return max;
}
let score = document.querySelector(".exNum");

function highest() {
    let allTime = checkMax();
    res = allTime;
    if (allTime > res) {
        res = allTime;
    }

    return res;
}

score.innerHTML = highest();

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over : <b> Your Score was ${level} </b> <br> Press any Key to Continue`;

        let val = checkMax();
        score.innerText = val;
        document.querySelector("body").style.backgroundColor = "red";
        document.querySelector("body").style.colorolor = "black";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "rgb(20, 18, 18)";
            document.querySelector("body").style.colorolor = "white";
        }, 1100);
        endSound();
        reset();
    }
}

function btnPress() {
    playSound();
    let btn = this;
    userFlash(btn);

    userCol = btn.getAttribute("id");
    userSeq.push(userCol);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    start = false;
    gameSeq = [];
    userSeeq = [];
    level = 0;
}

let pauseI = document.querySelector("#pauseBtn");
let appearBox = document.querySelector(".pauseBox");
appearBox.style.display = "none";

let Is = document.querySelector(".I1");
pauseI.value = false;

let Is2 = document.querySelector(".I2");
Is2.hidden = true;

pauseI.addEventListener("click", function () {
    if (pauseI.value == false) {
        appearBox.style.display = "flex";
        pauseI.value = true;
        Is.hidden = true;
        Is2.hidden = false;
    }
});

let lastBtn = document.querySelector("#cntBtn");

lastBtn.addEventListener("click", function () {
    appearBox.style.display = "none";
    pauseI.value = false;
    Is.hidden = false;
        Is2.hidden = true;
});