"use strict";

// добавляем музыку
let shotSound = new Audio("audio/fire1.mp3");

// громкость
shotSound.volume = 0.4;

let crashSound = new Audio("audio/crash.mp3");
crashSound.volume = 0.3;

let backAudio = new Audio("audio/back.mp3");
backAudio.volume = 0.2;

let bonusAudio = new Audio("audio/bonus.mp3");
bonusAudio.volume = 0.5;

let bangAudio = new Audio("audio/bigbang.mp3");
bangAudio.volume = 0.5;

bangAudio.onload = soundClick;


// добавляем картинки
let shipimg = new Image();
shipimg.src = "img/ship.png";

let asterimg = new Image();
asterimg.src = "img/aster.png";

let asterimg2 = new Image();
asterimg2.src = "img/aster2.png";

let alien = new Image();
alien.src = "img/spaceship.png";

let alien2 = new Image();
alien2.src = "img/alien2.png";

let alien3 = new Image();
alien3.src = "img/alien3.png";


let expl = new Image();
expl.src = "img/boom.png";

let planetImg = new Image();
planetImg.src = "img/planet.png"

let planetImg2 = new Image();
planetImg2.src = "img/planet2.png"

let planetImg3 = new Image();
planetImg3.src = "img/planet3.png"


let fire1 = new Image();
fire1.src = "img/fire.png";

let bonusImg = new Image();
bonusImg.src = "img/bonus.png";

let bonusImg2 = new Image();
bonusImg2.src = "img/bonus2.png";


let gradusCircle = 360;

let newscore = 0;
let nicktext = "";

// задаем таймер
let timerGame = 0;

// считает до 1000
let timer = 0;

// задаем массив выстрелов
let fire = [];

// задаем массив астеройдов
let aster = [];

// задаем массив взрывов
let boom = [];

// задаем массив бонусов
let bonus = [];

let arrScore = [];

// определяем размеры окна
let bodyHeight = document.body.offsetHeight;
let bodyWidth = document.body.offsetWidth;

let playing = {
  color: "#0a0530",
  height: bodyHeight,
  width: bodyWidth,
  top: 0,
  left: 0,
};

// задаем размеры
let planetSize = ((bodyHeight + bodyWidth) / 2) / 3;

let shipSize = Math.round(((bodyHeight + bodyWidth) / 2) / 12);

let asterSize = Math.round(((bodyHeight + bodyWidth) / 2) / 11);

let boomSize = Math.round(((bodyHeight + bodyWidth) / 2) / 11);

let bonusSize = Math.round(((bodyHeight + bodyWidth) / 2) / 18);

let healthSize = Math.round(((bodyHeight + bodyWidth) / 2) / 15);

let bangSize = Math.round(((bodyHeight + bodyWidth) / 2) / 15);

let scoreTableHeight;
let scoreTableWidth;
// скорость взрыва
let boomSpeed = 0;

// ускорение взрыва
let boomAccel = 0.2;

// этот класс отвечает за звезда
let newSpase = new Space();

// этот класс отвечает за выстрелы
let newFire = new Fire();

// этот класс отвечает за врагов
let newEnemy = new Enemy();

// этот класс отвечает за управление
let controll = new ClockController();

// этот класс отвечает за корабль
let ship = new Ship();

// этот класс отвечает за планеты 
let planet = new Planet();

let newBonus = new Bonus();

let isPlaying = false;

let tableNone = false;

let randPass = 0;

let scoreData ;

// при загрузке страницы 
window.onload = startDocument;

function startDocument() {

  //  задаем хэш
  location.hash = "menu";

  // узнаем размеры и позиционируем таблицу рекордов
  scoreTable.style.display = "block";

  scoreTableHeight = scoreTable.offsetHeight;
  scoreTableWidth = scoreTable.offsetWidth;

  scoreTable.style.top = -scoreTableHeight + "px";
  scoreTable.style.left = bodyWidth / 2 - scoreTableWidth / 2 + "px";
}


// при нажатии кнопки, двигаем таблицу рекордов
function tableScore() {

  scoreTable.style.display = "block";



  if (!tableNone) {
    read();
    scoreTable.style.top = "50%";
    scoreTable.style.left = "50%";
    scoreTable.style.transform = "translateZ(0) translateX(-50%) translateY(-50%)";

    tableNone = true;
  }

  else {

    scoreTable.style.top = "0";
    scoreTable.style.left = "50%";
    scoreTable.style.transform = "translateZ(0) translateX(-50%)  translateY(-100%) ";
    tableNone = false;
  }
}


// подписываемся на изменения закладок
window.onhashchange = controll.switchURLHash;

// при перезагрузе или уходе со страницы, если игра запущена выдавать предупреждение
window.onbeforeunload = controll.befUnload;



// подписываемся на изменение экрана
window.addEventListener("resize", controll.resize, false);

// находим тэг конвас
let newConwas = document.querySelector(".gameCanvas");
newConwas.setAttribute("height", playing.height);
newConwas.setAttribute("width", playing.width);
let context = newConwas.getContext('2d');

// находим нужные дивы
let nicknameInfo = document.querySelector(".nickInfo");
let nickneme = document.querySelector(".nickname");
let wrapper = document.querySelector(".menuDiv");
let gameWrapper = document.querySelector(".gameDiv");
let gameOverWrapper = document.querySelector(".gameOverDiv");
let scoreTable = document.querySelector(".tableDiv");

function startHash() {

  location.hash = "game";
};

function startMenuHash() {

  location.hash = "menu";
  lockGet(randPass);
};

// по нажатию на кнопку, запускаем игру
function startGame() {

  randPass = randomDiap(1, 5000);
  


  isPlaying = true;

  location.hash = "game";

  // скрываем главное меню
  wrapper.style.display = "none";

  // открываем игровые элементы
  gameWrapper.style.display = "block";


  // запоминаем имя
  nicktext = nickneme.value;

  // если поле не запелнено, присваиваем user
  if (nicktext == "") nicktext = "user";

  nicknameInfo.innerText = nicktext + " : " + scoreText(newscore);

  // показываем количекство жизней и бонусов
  healthVeiv();
  bangVeiv();

  newConwas.style.cursor = "none";

  clickSound(backAudio);

  controll.start();
  gameRun();

}


// запуск главного меню
function startMenu() {

  location.hash = "menu";

  if (isPlaying) {
    backAudio.pause();
  }

  // если есть таймер удаляем его
  if (timerGame) {

    cancelAnimationFrame(timerGame);
    timerGame = 0;
  }

  // открываем главное меню
  wrapper.style.display = "block";

  // скрываем игровые элементы
  gameWrapper.style.display = "none";
  gameOverWrapper.style.display = "none";


  // устанавливаем начальные значения
  aster.length = 0;
  bonus.length = 0;
  ship.life = 4;
  ship.bang = 3;
  newscore = 0;
  nicknameInfo.innerText = nicktext + " : " + scoreText(newscore);


}

function gameOver() {

  let overScore = document.querySelector(".overInfo");

  // скрываем игровые элементы
  gameWrapper.style.display = "none";
  gameOverWrapper.style.display = "block";


  // отписываемся от событий
  controll.remList();

  if (timerGame) {

    cancelAnimationFrame(timerGame);
    timerGame = 0;
  }

  newConwas.style.cursor = "default";

  backAudio.pause();

  isPlaying = false;

  overScore.innerText = nicktext + " : " + scoreText(newscore);

}


function gameRun() {

  // если есть таймер удаляем его, если нету устанавливаем
  if (timerGame) {

    cancelAnimationFrame(timerGame);
    timerGame = 0;
  }

  timerGame = requestAnimationFrame(gameRun);

  updateGame();
  renderGame();
};

function updateGame() {

  timer++;

  if (timer > 1000) timer = 0;

  // создаем звезды 
  if (timer % 2 === 0) {

    newSpase.addSpaceobj();
  }

  // двигаем звезды
  newSpase.spaceobjMove();

  // создаем планеты 
  if (timer === 5 || timer === 540) {

    planet.addPlanet();
  }

  // двигаем планеты
  planet.planetMove();


  // создаем бонус
  if (timer === 5) {

    newBonus.addBonus();
  }


  //двигаем бонус
  newBonus.bonusMove();


  // создаем врагов
  if (timer % 30 === 0) {

    newEnemy.addEnemy();
  }

  newEnemy.enemyMove();

  // анимация взрыва
  for (let i = 0; i < boom.length; i++) {

    //скорость анимации
    boom[i].animX = boom[i].animX + boomAccel;

    // смена ряды спрайта
    if (boom[i].animX > 8) { boom[i].animY++; boom[i].animX = 0 };

    // если строки закончились удаляем 
    if (boom[i].animY > 0) boom.splice(i, 1);
  }

  //двигаем выстрел
  newFire.fireMove();

  // двигаем корабль со скоротью 0, при ажатии на клавишу скорость увеличиваем
  ship.moveShip();
}

function renderGame() {

  //задаем цвет заливки
  context.fillStyle = playing.color;

  context.fillRect(playing.top, playing.left, playing.width, playing.height);

  // рисуем планеты
  planet.planetPaint();

  // рисуем звезды
  newSpase.spaceobjPaint();

  // рисуем бонусы
  newBonus.bonusPaint();

  // рисуем астеройды
  newEnemy.enemyPaint();

  // рисуем выстрел
  newFire.firePaint();

  // рисуем взрыв
  for (let i = 0; i < boom.length; i++) {

    // рисуем анимацию шаг 65 
    context.drawImage(expl, 65 * Math.floor(boom[i].animX), 65 * Math.floor(boom[i].animY), 65, 65, boom[i].x, boom[i].y, boomSize, boomSize);
  };

  ship.shipPaint();
}


// случайное число
function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

// случайный цвет
function generateColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

// перевод градусов в радианы
function toRadians(angle) {
  return angle * (Math.PI / 180);
}

// функция запускает музыку
function clickSound(clickAudio) {
  clickAudio.currentTime = 0; // в секундах
  clickAudio.play();
}

// функция запуска музыки (запускается с кнопки)
function soundClick() {

  shotSound.play(); // запускаем звук
  shotSound.pause(); // и сразу останавливаем

  crashSound.play();
  crashSound.pause();

  backAudio.play();
  backAudio.pause();

  bonusAudio.play();
  bonusAudio.pause();

  bangAudio.play();
  bangAudio.pause();

}

// функция приводит счет к строке
function scoreText(number) {

  let s = String(number);;
  let str = "00000000";
  let n = str.length - s.length;
  str = str.slice(0, n);
  str = str + number;
  return str;
}

//показывает количество жизней
function healthVeiv() {

  let healthContainer = document.querySelector(".healthPoint");

  healthContainer.style.display = "inline-block";
  healthContainer.style.position = "absolute";

  // если у родительского эллемента есть дочерние , удаляем 
  if (healthContainer.children.length > 0) {
    while (healthContainer.children.length !== 0) {
      healthContainer.removeChild(healthContainer.lastChild);
    }
  }

  for (let i = 0; i < ship.life - 1; i++) {

    let healthImg = document.createElement("IMG");
    healthImg.src = "img/hp1.png";
    healthImg.style.height = healthSize + "px";
    healthImg.style.width = healthSize + "px";
    healthImg.style.marginTop = healthSize / 5 + "px";
    healthImg.style.display = "block";

    healthContainer.appendChild(healthImg);
  }
}

function bangVeiv() {

  let bangContainer = document.querySelector(".bang");

  bangContainer.style.display = "inline-block";
  bangContainer.style.position = "absolute";

  // если у родительского эллемента есть дочерние , удаляем 
  if (bangContainer.children.length > 0) {
    while (bangContainer.children.length !== 0) {
      bangContainer.removeChild(bangContainer.lastChild);
    }
  }

  for (let i = 0; i < ship.bang; i++) {

    let bangImg = document.createElement("IMG");
    bangImg.src = "img/bonus.png";
    bangImg.style.height = bangSize + "px";
    bangImg.style.width = bangSize + "px";
    bangImg.style.marginTop = bangSize / 5 + "px";
    bangImg.style.display = "block";

    bangContainer.appendChild(bangImg);
  }
}



