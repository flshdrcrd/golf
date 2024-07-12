const ball = "o"
const hole = "h"
const background = 'b'
const target = "t"

setLegend(
  [ball, bitmap`
................
....22222222....
...2222222222...
..222222222222..
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
..222222222222..
...2222222222...
....22222222....
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
  [target, bitmap`
3..............3
.3............3.
..3..........3..
...3........3...
....3......3....
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
....3......3....
...3........3...
..3..........3..
.3............3.
3..............3`],
)

let power = 0
let angle = 0

setSolids([])

setBackground(background)

let level = 0
const levels = [
  map`
................
................
................
................
................
................
....o.....h.....
................
................
................
................
................
................`
]

setMap(levels[level])

xcoord = null;
ycoord = null;

onInput("w", () => {
  power += 1;
})

onInput("s", () => {
  power -= 1;
})

onInput("a", () => {
  angle -= 10;
})

onInput("d", () => {
  angle += 10;
})

onInput("j", () => {
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
    }
  }, 50);

})

afterInput(() => {
  clearText();

  if (power < 0) {
    power = 0
  }

  if (power > 100) {
    power = 100
  }

  if (angle < 0) {
    angle = 360
  }

  if (angle > 360) {
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
