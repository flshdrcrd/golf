const ball = `o`
const hole = `h`
const background = `b`

shots = 0;
round = 1;
results = [];

setLegend(
  [ball, bitmap`
................
................
.....222222.....
...2222222222...
...2222222222...
..222222222222..
..222222222222..
..222222222222..
..222222222222..
..222222222222..
..222222222222..
...2222222222...
...2222222222...
.....222222.....
................
................`],
  [hole, bitmap`
....00000000....
...0000000000...
..000000000000..
.00000000000000.
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.
..000000000000..
...0000000000...
....00000000....`],
  [background, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
)

setBackground(background)

const levels = [
  map`
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................`,
  map`
............................
............................
............................
............................
............................
............................
...............o............
............................
............................
...............h............
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................
............................`
]

mainMenu();

onInput(`w`, () => {
  if (level == 1) {
    power += 1;
  }
})

onInput(`s`, () => {
  if (level == 1) {
    power -= 1;
  }
})

onInput(`a`, () => {
  if (level == 1) {
    angle -= 10;
  }
})

onInput(`d`, () => {
  if (level == 1) {
    angle += 10;
  }
})

onInput(`j`, () => {
  if (level == 1) {
    shots += 1;
    let path = [];
    for (let i = 1; i <= power; i++) {
      path.push(getCoordinates(angle, i));
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i < path.length) {
        const [x, y] = path[i];
        getFirst(ball).x = x;
        getFirst(ball).y = y;
        i++;
      } else {
        clearInterval(interval);
        const ballx = getFirst(ball).x;
        const bally = getFirst(ball).y;
        const holex = getFirst(hole).x;
        const holey = getFirst(hole).y;
        if ((ballx === holex) && (bally === holey)) {
          score()
        }
      }
    }, 50);
  }
})

afterInput(() => {
  if (level == 1) {
    clearText();
    if (power < 0) {
      power = 0
    }
    if (power > 100) {
      power = 100
    }
    if (angle < 0) {
      angle = 350
    }
    if (angle >= 360) {
      angle = 0
    }
    addText(`power: ${power}`, {
      x: 1,
      y: 1,
      color: color`L`
    })
    addText(`angle: ${angle}`, {
      x: 1,
      y: 2,
      color: color`L`
    })
    addText(`${shots}`, {
      x: 1,
      y: 14,
      color: color`L`
    });
    addText(`${round}/18`, {
      x: 15,
      y: 14,
      color: color`L`
    });
  } else {
    reset();
  }
});

function getCoordinates(angle, power) {
  const currentx = getFirst(ball).x;
  const currenty = getFirst(ball).y;

  const radians = angle * Math.PI / 180;
  const sin = Math.sin(radians)
  const cos = Math.cos(radians)

  xcoord = Math.round(currentx + (power * sin));
  ycoord = Math.round(currenty + (power * cos));

  while ((xcoord > width() - 1) || (xcoord < 0)) {
    if (xcoord > width() - 1) {
      xcoord = 2 * (width() - 1) - xcoord
    }
    if (xcoord < 0) {
      xcoord = -xcoord
    }
  }

  while ((ycoord > height() - 1) || (ycoord < 0)) {
    if (ycoord > height() - 1) {
      ycoord = 2 * (height() - 1) - ycoord
    }
    if (ycoord < 0) {
      ycoord = -ycoord
    }
  }
  return [xcoord, ycoord]
}

function reset() {
  level = 1;
  setMap(levels[level])
  clearText();
  power = 0
  angle = 0
  getFirst(ball).x = Math.floor(Math.random() * width());
  getFirst(ball).y = Math.floor(Math.random() * height());
  getFirst(hole).x = Math.floor(Math.random() * width());
  getFirst(hole).y = Math.floor(Math.random() * height());
}

function score() {
  results.push(shots);
  shots = 0;
  reset();
  if (round == 18) {
    end();
  }
  round += 1;
}

function mainMenu() {
  clearText();
  addText(` - - GOLF - - `, { x: 3, y: 3, color: color`L` });
  addText(`W/S: power`, { x: 5, y: 6, color: color`L` });
  addText(`A/D: angle`, { x: 5, y: 7, color: color`L` });
  addText(`J:   shoot`, { x: 5, y: 8, color: color`L` });
  addText(`PRESS ANY KEY `, { x: 4, y: 12, color: color`L` });
  addText(`TO CONTINUE`, { x: 5, y: 13, color: color`L` });
  level = 0
  setMap(levels[level])
}

function end() {
  clearText();
  addText(`- - RESULTS - -`, { x: 3, y: 3, color: color`L` });
  addText(`1. ${results[0]}`, { x: 4, y: 6, color: color`L` });
  addText(`2. ${results[1]}`, { x: 4, y: 7, color: color`L` });
  addText(`3. ${results[2]}`, { x: 4, y: 8, color: color`L` });
  addText(`4. ${results[3]}`, { x: 4, y: 9, color: color`L` });
  addText(`5. ${results[4]}`, { x: 4, y: 10, color: color`L` });
  addText(`6. ${results[5]}`, { x: 4, y: 11, color: color`L` });
  addText(`7. ${results[6]}`, { x: 4, y: 12, color: color`L` });
  addText(`8. ${results[7]}`, { x: 4, y: 13, color: color`L` });
  addText(`9. ${results[8]}`, { x: 4, y: 14, color: color`L` });
  addText(`10. ${results[9]}`, { x: 11, y: 6, color: color`L` });
  addText(`11. ${results[10]}`, { x: 11, y: 7, color: color`L` });
  addText(`12. ${results[11]}`, { x: 11, y: 8, color: color`L` });
  addText(`13. ${results[12]}`, { x: 11, y: 9, color: color`L` });
  addText(`14. ${results[13]}`, { x: 11, y: 10, color: color`L` });
  addText(`15. ${results[14]}`, { x: 11, y: 11, color: color`L` });
  addText(`16. ${results[15]}`, { x: 11, y: 12, color: color`L` });
  addText(`17. ${results[16]}`, { x: 11, y: 13, color: color`L` });
  addText(`18. ${results[17]}`, { x: 11, y: 14, color: color`L` });
  level = 0
  setMap(levels[level])
  shots = 0;
  round = 1;
  results = [];
}
