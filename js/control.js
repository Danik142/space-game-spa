"use strict";

function ClockController() {

  let self = this;
  self.accel = 4;
  self.keyUP = 38;
  self.keyDoun = 40;
  self.keyLeft = 37;
  self.keyRight = 39;
  self.keyFire = 32;
  self.speedStop = 0;
  self.keyBang = 17;

  self.start = function () {



    // двигаем корабль мышкой 
    gameWrapper.addEventListener("mousemove", self.flyShip, false);

    // выстрел 
    document.addEventListener("click", self.fireShip, false);

    // подписываемся на тач события
    gameWrapper.addEventListener("touchstart", self.fireShiptouch, false);

    gameWrapper.addEventListener("touchend", function (EO) {
      EO = EO || window.event;
      EO.preventDefault();
    }, false);

    // обработка жеста, ислодьзование бонуса
    $('.gameDiv').bind("swipeDown", function () {

      if (ship.bang) {

        ship.bigBang();
        ship.bang--;
        bangVeiv();
      }
    })

    gameWrapper.addEventListener("touchmove", self.flyShiptouch, false);


    // управление кнопками
    document.addEventListener("keydown", self.keyShip, false);

    // управление кнопками
    document.addEventListener("keyup", self.stop, false);

  }

  self.remList = function () {

    // отписываемся от событий

    gameWrapper.removeEventListener("mousemove", self.flyShip, false);
    document.removeEventListener("click", self.fireShip, false);
    gameWrapper.removeEventListener("touchstart", self.fireShiptouch, false);

    gameWrapper.removeEventListener("touchend", function (EO) {
      EO = EO || window.event;
      EO.preventDefault();
    }, false);
    $('.gameDiv').unbind("swipeDown");


    gameWrapper.removeEventListener("touchmove", self.flyShiptouch, false);

    document.removeEventListener("keydown", self.keyShip, false);

    document.removeEventListener("keyup", self.stop, false);
  }

  self.resize = function () {


    bodyHeight = document.body.offsetHeight;
    bodyWidth = document.body.offsetWidth;



    // если открыта таблица рекордов, меняем размеры
    if (tableNone) {

      scoreTable.style.display = "none";
      scoreTableHeight = scoreTable.offsetHeight;
      scoreTableWidth = scoreTable.offsetWidth;

      tableNone = false;
      tableScore();
    }

    else {
      tableNone = true;
      tableScore();
    }

    shipSize = Math.round(((bodyHeight + bodyWidth) / 2) / 12);

    asterSize = Math.round(((bodyHeight + bodyWidth) / 2) / 11);

    boomSize = Math.round(((bodyHeight + bodyWidth) / 2) / 11);

    planetSize = Math.round(((bodyHeight + bodyWidth) / 2) / 3);

    healthSize = Math.round(((bodyHeight + bodyWidth) / 2) / 15);

    bangSize = Math.round(((bodyHeight + bodyWidth) / 2) / 15);

    bonusSize = Math.round(((bodyHeight + bodyWidth) / 2) / 18);

    newFire.fireSize = shipSize / 3

    for (let i = 0; i < aster.length; i++) {

      aster[i].size = asterSize;
    }

    for (let i = 0; i < bonus.length; i++) {

      bonus[i].size = bonusSize;
    }


    healthVeiv();
    bangVeiv();

    playing.height = bodyHeight;
    playing.width = bodyWidth;

    newConwas.setAttribute("height", playing.height);
    newConwas.setAttribute("width", playing.width);


    if (ship.posY >= bodyHeight) {
      ship.posY = bodyHeight - shipSize;
    }

    if (ship.posX >= bodyWidth) {
      ship.posX = bodyWidth - shipSize;
    }

  }

  self.flyShip = function (EO) {

    EO = EO || window.event;
    EO.preventDefault();

    ship.posX = EO.pageX - shipSize / 2;
    ship.posY = EO.pageY - shipSize / 2;

  }

  self.flyShiptouch = function (EO) {

    EO = EO || window.event;
    EO.preventDefault();

    // получам массив касаний
    var touchInfo = EO.targetTouches[0];

    ship.posX = touchInfo.pageX - shipSize / 2;

    ship.posY = touchInfo.pageY - shipSize;

  }

  self.fireShip = function (EO) {

    EO = EO || window.event;
    EO.preventDefault();
    // если нету выстрела создаем его и добавляем звук
    if (fire.length === 0 && ship.life !== 0) {

      clickSound(shotSound);
      newFire.addFire((ship.posX + shipSize / 2), ship.posY);
    }
  }

  self.fireShiptouch = function (EO) {

    EO = EO || window.event;
    EO.preventDefault();
    // если нету выстрела создаем его и добавляем звук
    if (fire.length === 0 && ship.life !== 0) {

      clickSound(shotSound);
      newFire.addFire(ship.posX + shipSize / 2, ship.posY);
    }
  }

  self.keyShip = function (EO) {
    EO = EO || window.event;

    self.accel = 5;

    switch (EO.keyCode) {

      case self.keyUP:
        ship.speedY = -self.accel;

        // выход за пределы сверху
        if (ship.posY <= playing.top) {
          ship.posY = playing.top;
          ship.speedY = 0;
        }

        break;

      case self.keyDoun:

        ship.speedY = self.accel;

        break;

      case self.keyLeft:

        ship.speedX = -self.accel;

        break;

      case self.keyRight:

        ship.speedX = self.accel;

        break;

      case self.keyFire:

        // если нету выстрела создаем его и добавляем звук
        if (fire.length === 0 && ship.life !== 0) {

          clickSound(shotSound);
          newFire.addFire(ship.posX + shipSize / 2, ship.posY);
        }
        break;

      case self.keyBang:

        if (ship.bang) {

          ship.bigBang();
          ship.bang--;
          bangVeiv();
        }

        break;
    }
  }

  self.stop = function (EO) {

    if (EO.keyCode === self.keyRight || EO.keyCode === self.keyLeft) {

      ship.speedX = self.speedStop;
    }

    if (EO.keyCode === self.keyDoun || EO.keyCode === self.keyUP) {

      ship.speedY = self.speedStop;
    }
  }

  self.switchURLHash = function (EO) {

    EO = EO || window.event;

    let toClose;


    // узнаемм заначение закладки
    let URLHash = window.location.hash;

    // удаляем первый символ
    let stateStr = URLHash.substr(1);

    switch (stateStr) {

      case "menu":

        // если переход в меню из запущеной игры
        if (isPlaying) {

          toClose = confirm("В случае перезагрузки страницы прогресс игры будет утрачен!");

          if (toClose) {
            // отписываемся от событий
            self.remList();
            startMenu();
            isPlaying = false;
          }

          else location.hash = "game";
        }

        // если game over
        else startMenu();

        break;

      // если закладка игры
      case "game":
        startGame();
        break;
    }
  }

  self.befUnload = function (EO) {

    if (isPlaying) {

      EO.returnValue = "В случае перезагрузки страницы прогресс игры будет утрачен!";
    }
  }
}