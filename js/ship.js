"use strict";

function Ship() {

  let self = this;
  self.posX = playing.width / 2 - shipSize / 2;
  self.posY = playing.height - shipSize;
  self.speedX = 0;
  self.speedY = 0;
  self.life = 4;
  self.bang = 3;

  self.moveShip = function () {

    self.posX += self.speedX;
    self.posY += self.speedY;

    // выход за пределы слева
    if (ship.posX <= playing.left) ship.posX = playing.left;

    // выход за пределы справа
    if (ship.posX + shipSize > playing.width) ship.posX = playing.width - shipSize;

    // выход за пределы снизу
    if (ship.posY + shipSize > playing.height) ship.posY = playing.height - shipSize;

    // выход за пределы сверху
    if (ship.posY < playing.top) ship.posY = playing.top;

    // удар протвника
    for (let i = 0; i < aster.length; i++) {

      if (Math.abs(aster[i].posY - self.posY) <= aster[i].size && Math.abs(aster[i].posX - self.posX) <= aster[i].size) {

        clickSound(crashSound);

        // добавляем взрыв в массив
        boom.push({ x: aster[i].posX, y: aster[i].posY, animX: boomSpeed, animY: boomSpeed });

        // помечаем, что попали
        aster[i].dell = true;

        self.life--;

        healthVeiv();

        if (navigator.vibrate) { // есть поддержка Vibration API?
          window.navigator.vibrate(100); // вибрация 100мс
        }
      }


      // если жизни закончились игра закончекна
      if (self.life <= 0 && boom.length === 0) {

        gameOver();
      }
    }
  }

  self.shipPaint = function () {

    // рисуем корабль
    context.drawImage(shipimg, ship.posX, ship.posY, shipSize, shipSize);
  }

  self.bigBang = function () {

    clickSound(bangAudio);
    document.body.style.filter = "invert(100%)";

    setTimeout(function () {

      document.body.style.filter = "none";

      for (let i = 0; i < aster.length; i++) {

        clickSound(crashSound);
        // добавляем взрыв в массив
        boom.push({ x: aster[i].posX, y: aster[i].posY, animX: boomSpeed, animY: boomSpeed });

        newscore++;
        nicknameInfo.innerText = nicktext + " : " + scoreText(newscore);

        // помечаем, что попали
        aster[i].dell = true;
      }
    }, 500);
  }
}

