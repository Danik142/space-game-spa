"use strict";

function Fire() {
  let self = this;
  self.speedFire = 10;
  self.fireSize = shipSize / 3;

  self.addFire = function (x, y) {

    // добавляем выстрел в массив с координатами
    let fireItem = {};
    fireItem.size = self.fireSize;
    fireItem.posX = x - self.fireSize/2;
    fireItem.posY = y - shipSize / 2;
    fireItem.speedY = self.speedFire;
    fire.push(fireItem);
  }

  self.fireMove = function () {

    // двигаем выстрел
    for (let i = 0; i < fire.length; i++) {
      
      fire[i].posY -= fire[i].speedY;
      if (fire[i].posY <= playing.top) fire.splice(i, 1);
    }

    // попадание
    for (let i = 0; i < aster.length; i++) {

      for (let j = 0; j < fire.length; j++) {

        if (fire[j].posY <= aster[i].posY + aster[i].size && fire[j].posY + fire[j].size >= aster[i].posY && fire[j].posX + fire[j].size >= aster[i].posX && fire[j].posX <= aster[i].posX + aster[i].size) {


          if(aster[i].randomImg < 3 && aster[i].node ){
              
              let size = {posX: aster[i].posX, posY:aster[i].posY, img:aster[i].randomImg }
              newEnemy.addAster(size, "left");
              newEnemy.addAster(size, "right");
            
          }

          clickSound(crashSound);
          // удаляем снаряд из массива
          fire.splice(j, 1);

          // добавляем взрыв в массив
          boom.push({ x: aster[i].posX, y: aster[i].posY, animX: boomSpeed, animY: boomSpeed });


          // помечаем, что попали
          aster[i].dell = true;

          newscore++;
          nicknameInfo.innerText = nicktext + " : " + scoreText(newscore);

        }
      }
    }
  }

  self.firePaint = function () {

    // рисуем выстрел
    for (let i = 0; i < fire.length; i++) {
      context.drawImage(fire1, fire[i].posX, fire[i].posY, fire[i].size, fire[i].size);
    }
  }
}   