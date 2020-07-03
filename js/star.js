"use strict";

function Space() {
  let self = this;

  let arrSpace = [];
  self.addSpaceobj = function () {
    // добавляем звезду в массив со случайными координатами и цветом

    let spaceObj = {};

    spaceObj.color = generateColor();
    spaceObj.size = randomDiap(Math.round(((bodyHeight + bodyWidth) / 2) / 300), Math.round(((bodyHeight + bodyWidth) / 2) / 100));
    spaceObj.posX = randomDiap(playing.left, playing.width);
    spaceObj.posY = randomDiap(playing.top, playing.height);
    spaceObj.speedY = randomDiap(1, 15);

    arrSpace.push(spaceObj);
  }

  self.spaceobjMove = function () {
    // двигаем звезды
    for (let i = 0; i < arrSpace.length; i++) {
      arrSpace[i].posY += arrSpace[i].speedY;
      if (arrSpace[i].posY >= playing.height) arrSpace.splice(i, 1);
    }
  }

  self.spaceobjPaint = function () {
    // рисуем звезды
    for (let i = 0; i < arrSpace.length; i++) {
      context.fillStyle = arrSpace[i].color;
      context.beginPath();
      context.arc(arrSpace[i].posX, arrSpace[i].posY, arrSpace[i].size / 2, 0, Math.PI * 2, false);
      context.fill();
    }
  }
}


function Planet() {

  let self = this;
  let arrPlanet = [];

  self.addPlanet = function () {

    let planetObj = {};

    planetObj.size = planetSize;
    planetObj.posX = randomDiap(playing.left, playing.width - planetSize);
    planetObj.posY = playing.top - planetSize;
    planetObj.speed = 3;
    planetObj.randomImg = randomDiap(1, 3);

    arrPlanet.push(planetObj);
  }

  self.planetMove = function () {

    // двигаем астеройд
    for (let i = 0; i < arrPlanet.length; i++) {

      arrPlanet[i].posY += arrPlanet[i].speed;
      if (arrPlanet[i].posY >= playing.height) arrPlanet.splice(i, 1);
    }
  }


  self.planetPaint = function () {

    for (let i = 0; i < arrPlanet.length; i++) {

      // задаем изображения противника

      switch (arrPlanet[i].randomImg) {

        case 1:

          context.drawImage(planetImg, arrPlanet[i].posX, arrPlanet[i].posY, arrPlanet[i].size, arrPlanet[i].size);
          break;

        case 2:

          context.drawImage(planetImg2, arrPlanet[i].posX, arrPlanet[i].posY, arrPlanet[i].size, arrPlanet[i].size);
          break;

        case 3:

          context.drawImage(planetImg3, arrPlanet[i].posX, arrPlanet[i].posY, arrPlanet[i].size, arrPlanet[i].size);
          break;
      }
    }
  }
}


