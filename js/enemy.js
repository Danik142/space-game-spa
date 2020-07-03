"use strict";

function Enemy() {
  let self = this;
  let enemyImg;

  self.addEnemy = function () {

    // добавляем врага в массив с координатами
    let enemyItem = {};
    enemyItem.size = asterSize;
    enemyItem.posX = randomDiap(playing.left, playing.width - asterSize);
    enemyItem.posY = playing.top;
    enemyItem.speed = randomDiap(1, 4);
    enemyItem.dell = false;
    enemyItem.node = true;
    enemyItem.randomImg = randomDiap(1, 5);
    enemyItem.angle = randomDiap(35, 155);
    enemyItem.rotateAngle = 0;
    enemyItem.rotateAccel = Math.round((Math.random() < 0.5) ? -1 : 1) / 100;
    aster.push(enemyItem);
  }


  // Если попали в астеройд добавляем 2 астеройда поменьше
  self.addAster = function (size, side) {

    let asterItem = {};
    asterItem.size = asterSize * 80/100;
    asterItem.posX = size.posX
    asterItem.posY = size.posY;
    asterItem.speed = 2;
    asterItem.dell = false;
    asterItem.randomImg = size.img;


    if(side === "left") asterItem.angle = randomDiap(65, 155);
    else asterItem.angle = randomDiap(0, 55);

    asterItem.rotateAngle = 0;
    asterItem.rotateAccel = Math.round((Math.random() < 0.5) ? -1 : 1) / 100;
    aster.push(asterItem);
  }

  


  self.enemyMove = function () {

    // двигаем астеройд
    for (let i = 0; i < aster.length; i++) {

      aster[i].posX = Math.round(aster[i].posX + aster[i].speed * Math.cos(toRadians(aster[i].angle)));
      aster[i].posY = Math.round(aster[i].posY + aster[i].speed * Math.sin(toRadians(aster[i].angle)));

      if (aster[i].posY + aster[i].size >= playing.height) {

        aster[i].dell = true;
      }

      // ударение о левую стенку
      if (aster[i].posX <= playing.left) {

        aster[i].angle = gradusCircle / 2 - aster[i].angle;
        aster[i].posX = playing.left;
      }

      // ударение о  правую стенку
      if (aster[i].posX + aster[i].size >= playing.width) {

        aster[i].angle = gradusCircle / 2 - aster[i].angle;
        aster[i].posX = playing.width - aster[i].size;
      }

      // удаяем противника из массива
      if (aster[i].dell) {
        aster.splice(i, 1);
      }
    }
  }

  self.enemyPaint = function () {

    for (let i = 0; i < aster.length; i++) {

      // задаем изображения противника
      switch (aster[i].randomImg) {
        case 1:


          enemyImg = asterimg;
          context.save();
          context.translate(aster[i].posX + aster[i].size / 2, aster[i].posY + aster[i].size / 2);
          context.rotate(aster[i].rotateAngle);
          context.drawImage(enemyImg, -aster[i].size / 2, -aster[i].size / 2, aster[i].size, aster[i].size);
          context.restore();
          aster[i].rotateAngle += aster[i].rotateAccel;

          break;

        case 2:


          enemyImg = asterimg2;
          context.save();
          context.translate(aster[i].posX + aster[i].size / 2, aster[i].posY + aster[i].size / 2);
          context.rotate(aster[i].rotateAngle);
          context.drawImage(enemyImg, -aster[i].size / 2, -aster[i].size / 2, aster[i].size, aster[i].size);
          context.restore();
          aster[i].rotateAngle += aster[i].rotateAccel;

          break;


        case 3:

          enemyImg = alien;
          context.drawImage(enemyImg, aster[i].posX, aster[i].posY, aster[i].size, aster[i].size);

          break;

        case 4:

          enemyImg = alien2;
          context.drawImage(enemyImg, aster[i].posX, aster[i].posY, aster[i].size, aster[i].size);

          break;

        case 5:

          enemyImg = alien3;
          context.drawImage(enemyImg, aster[i].posX, aster[i].posY, aster[i].size, aster[i].size);

          break;
      }
    }
  }
}
