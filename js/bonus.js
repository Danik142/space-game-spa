"use strict";

function Bonus() {

  let self = this;
  self.speed = 2;
  let enemyImg;

  self.addBonus = function () {

    let bonusItem = {};
    bonusItem.size = bonusSize;
    bonusItem.posX = randomDiap(playing.left, playing.width - asterSize);
    bonusItem.posY = playing.top;
    bonusItem.speed = self.speed;
    bonusItem.dell = false;
    bonusItem.randomImg = randomDiap(1, 2);
    bonusItem.angle = randomDiap(35, 155);
    bonusItem.rotateAngle = 0;
    bonusItem.rotateAccel = Math.round((Math.random() < 0.5) ? -1 : 1) / 100;
    bonus.push(bonusItem);
  }

  self.bonusMove = function () {

    // двигаем бонус
    for (let i = 0; i < bonus.length; i++) {

      bonus[i].posX = Math.round(bonus[i].posX + bonus[i].speed * Math.cos(toRadians(bonus[i].angle)));
      bonus[i].posY = Math.round(bonus[i].posY + bonus[i].speed * Math.sin(toRadians(bonus[i].angle)));

      if (bonus[i].posY + bonus[i].size >= playing.height) {

        bonus[i].dell = true;
      }

      // ударение о левую стенку
      if (bonus[i].posX <= playing.left) {

        bonus[i].angle = gradusCircle / 2 - bonus[i].angle;
        bonus[i].posX = playing.left;
      }

      // ударение о  правую стенку
      if (bonus[i].posX + bonus[i].size >= playing.width) {

        bonus[i].angle = gradusCircle / 2 - bonus[i].angle;
        bonus[i].posX = playing.width - bonus[i].size;
      }

      // при столкновении с короблем добавляем бонус
      if (Math.abs(bonus[i].posY - ship.posY) <= bonus[i].size && Math.abs(bonus[i].posX - ship.posX) <= bonus[i].size) {

        if (bonus[i].randomImg === 1 && ship.bang < 4) {

          clickSound(bonusAudio);
          bonus[i].dell = true;
          ship.bang++;
          bangVeiv();
        }

        else if (bonus[i].randomImg === 2 && ship.life <= 4) {

          clickSound(bonusAudio);
          bonus[i].dell = true;
          ship.life++;
          healthVeiv();
        }

        else {

          clickSound(bonusAudio);
          bonus[i].dell = true;
          newscore += 10;
          nicknameInfo.innerText = nicktext + " : " + scoreText(newscore);

        }
      }

      if (bonus[i].dell) {

        bonus.splice(i, 1);
      }
    }
  }

  self.bonusPaint = function () {

    for (let i = 0; i < bonus.length; i++) {

      // задаем изображения противника
      switch (bonus[i].randomImg) {
        case 1:
          enemyImg = bonusImg;
          break;

        case 2:
          enemyImg = bonusImg2;
          break;
      }

      context.save();
      context.translate(bonus[i].posX + bonus[i].size / 2, bonus[i].posY + bonus[i].size / 2);
      context.rotate(bonus[i].rotateAngle);
      context.drawImage(enemyImg, -bonus[i].size / 2, -bonus[i].size / 2, bonus[i].size, bonus[i].size);
      context.restore();
      bonus[i].rotateAngle += bonus[i].rotateAccel;
    }
  }
}
