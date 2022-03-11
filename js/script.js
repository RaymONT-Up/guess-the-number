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

// Основные переменные
const fromNum = document.querySelector(".unknown-number-enter--1"),
  toNum = document.querySelector(".unknown-number-enter--2"),
  btnStart = document.querySelector(".btn-start"),
  cheackForm = document.querySelector(".cheack-wrapper"),
  cheackNum = document.querySelector(".cheack-input"),
  unknownNumber = document.querySelector(".unknown-number"),
  noticeNum = document.querySelector(".unknown-number-notice"),
  nowScore = document.querySelector(".score");

let score;
let numberRound = 0;
let randomNumber;

// Генерирует случайное число в диапозоне от до
function generateRandomNum(min, max) {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

// Если человек угадал число, то генерируется новое число и меняются значения, очки НЕ обнуляются
function newGame() {
  cheackNum.value = "";
  cheackNum.disabled = false;
  btnStart.textContent = "Угадать";
  generateRandomNum(Number(fromNum.value), Number(toNum.value));
  unknownNumber.innerHTML = `<span class="unknown-number-random">???</span>`;
  noticeNum.textContent = `Число от ${fromNum.value} до ${toNum.value}`;
  console.log(randomNumber);
  ++numberRound;
}

// При нажатие на кнопку "Начать" запускается игра
function startGame() {
  // Если нету ошибок
  if (Number(toNum.value) < 1001 && Number(toNum.value) > 9) {
    // Если первая игра
    if (numberRound === 0) {
      // Дает классы для анимированого появления элементов
      document.querySelector(".now-score").style.animationName = "scoreAnimate";
      document
        .querySelector(".cheack-line--1")
        .classList.add("animate-line--1");
      document
        .querySelector(".cheack-line--2")
        .classList.add("animate-line--1");
      document
        .querySelector(".cheack-line--3")
        .classList.add("animate-line--2");
      document
        .querySelector(".cheack-line--4")
        .classList.add("animate-line--2");
      cheackNum.classList.add("cheack-input-animate");
    }

    // Очки = Максимальное число деленное на половину
    score = Math.ceil(Number(toNum.value / 2));
    nowScore.textContent = score;
    newGame();
  }
}

// Проверяется введенное число с случайным числом
function cheackNumFunc() {
  // Подсказка если случайное число больше/меньше заданого то выводится больше/меньше
  function promptNum() {
    if (randomNumber < Number(cheackNum.value)) {
      return `меньше ${cheackNum.value}`;
    } else if (randomNumber > Number(cheackNum.value)) {
      return `больше ${cheackNum.value}`;
    }
  }
  // Калькулятор очков
  function scoreCalc() {
    // Если угадал то добавляется максимальное число деленное на 2, 3 раза
    if (Number(cheackNum.value) === randomNumber) {
      score += Math.ceil(Number(toNum.value / 2 / 2 + 1));
      nowScore.textContent = score;
    } else {
      // Если не угадал убовляются колво очков деленное максимальное число на , 5 раз
      score -= Math.ceil(Number(toNum.value / 2 / 2 / 2 / 2 / 2));
      nowScore.textContent = score;
    }
  }

  // Если угадал меняются значения и уведовляется об этом
  if (Number(cheackNum.value.length) !== 0) {
    if (Number(cheackNum.value) === randomNumber) {
      unknownNumber.innerHTML = `<span class="unknown-number-random">${randomNumber}</span>`;
      btnStart.textContent = "Еще раз";
      noticeNum.textContent = `Вы угадали! Это ${randomNumber}`;

      scoreCalc();
      cheackNum.disabled = true;

      //  Если не угадал выводится подсказка число меньше/больше заданогол
    } else if (Number(cheackNum.value) !== randomNumber) {
      noticeNum.textContent = `Число от ${fromNum.value} до ${
        toNum.value
      }  и ${promptNum()}`;
      cheackNum.disabled = false;
      scoreCalc();
    }
  } else {
    noticeNum.textContent = `Число от ${fromNum.value} до ${toNum.value}  и не пустое значение`;
  }

  // Если кончились очки, дается возможность начать игру заново
  if (0 >= Number(nowScore.textContent)) {
    nowScore.textContent = "0";
    noticeNum.textContent = "Вы проиграли!";
    btnStart.textContent = "Начать";
    cheackNum.disabled = true;
    cheackNum.value = `${randomNumber}`;
    unknownNumber.innerHTML = `<span class="unknown-number-random">${randomNumber}</span>`;
  }
}

// Input значения если меньше 1 или больше 1000 выделяет ошибку и добавляет класс ошибка

toNum.addEventListener("input", () => {
  if (Number(toNum.value) < 10 || Number(toNum.value) >= 1001) {
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
    newGame();
  }
});

cheackForm.addEventListener("submit", () => {
  event.preventDefault();
  cheackNumFunc();
});
