"use strict";

// Анимация печати текста

let typeWriterIndex = 0;
let typeWriterText = "гадай число!";
let typeWriterPlace = document.querySelector(".title");
function typeWriter() {
  if (typeWriterIndex < typeWriterText.length) {
    typeWriterPlace.textContent += typeWriterText.charAt(typeWriterIndex);
    typeWriterIndex++;
    setTimeout(typeWriter, 150);
  }
}
typeWriter();

//
const fromNum = document.querySelector(".unknown-number-enter--1"),
  toNum = document.querySelector(".unknown-number-enter--2"),
  btnStart = document.querySelector(".btn-start"),
  cheackForm = document.querySelector(".cheack-wrapper"),
  cheackNum = document.querySelector(".cheack-input"),
  unknownNumber = document.querySelector(".unknown-number"),
  noticeNum = document.querySelector(".unknown-number-notice");

let cheackBtn;
let randomNumber;
let guessedRight;

function generateRandomNum(min, max) {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  // Если нету ошибок
  if (
    Number(fromNum.value) > 0 &&
    Number(toNum.value) < 1001 &&
    Number(toNum.value) > 0 &&
    Number(fromNum.value) < 1001
  ) {
    btnStart.textContent = "Угадать";
    generateRandomNum(Number(fromNum.value), Number(toNum.value));
    unknownNumber.innerHTML = `<span class="unknown-number-random">???</span>`;
    noticeNum.textContent = `Число от ${fromNum.value} до ${toNum.value}`;

    document.querySelector(".cheack-line--1").classList.add("animate-line--1");
    document.querySelector(".cheack-line--2").classList.add("animate-line--1");
    document.querySelector(".cheack-line--3").classList.add("animate-line--2");
    document.querySelector(".cheack-line--4").classList.add("animate-line--2");
    cheackNum.classList.add("cheack-input-animate");

    console.log(randomNumber);
  }
}
function cheackNumFunc() {
  if (Number(cheackNum.value) === randomNumber) {
    unknownNumber.innerHTML = `<span class="unknown-number-random">${randomNumber}</span>`;
    btnStart.textContent = "Еще раз";
    noticeNum.textContent = `Вы угадали! Это ${randomNumber}`;
    guessedRight = true;
  } else {
    noticeNum.textContent = `Число от ${fromNum.value} до ${toNum.value} и меньше/больше ${cheackNum.value}`;
    guessedRight = false;
  }
}
// Input значения если меньше 1 или больше 1000 выделяет ошибку и добавляет класс ошибка
fromNum.addEventListener("input", () => {
  if (Number(fromNum.value) < 1 || Number(fromNum.value) > 1001) {
    fromNum.classList.add("unknown-number-enter--error");
  } else {
    fromNum.classList.remove("unknown-number-enter--error");
  }
});
toNum.addEventListener("input", () => {
  if (Number(toNum.value) < 1 || Number(toNum.value) > 1001) {
    toNum.classList.add("unknown-number-enter--error");
  } else {
    toNum.classList.remove("unknown-number-enter--error");
  }
});

// Начало игры
btnStart.addEventListener("click", () => {
  if (btnStart.textContent === "Начать") {
    startGame();
  } else if (btnStart.textContent === "Угадать") {
    cheackNumFunc();
  } else if (btnStart.textContent === "Еще раз") {
    startGame();
  }
});

cheackForm.addEventListener("submit", () => {
  event.preventDefault();
  cheackNumFunc();
});
