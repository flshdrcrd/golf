const ball = "o"
const hole = "h"
const background = 'b'

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
)

power = 0
angle = 0

setSolids([])

setBackground(background)

let level = 0
const levels = [
  map`
o...............
................
................
................
................
................
.......h........
................
................
................
................
................
................`
]

setMap(levels[level])


onInput("w", () => {
  power += 1;
})

onInput("s", () => {
  power -= 1;
})

onInput("a", () => {
  angle -= 1;
})

onInput("d", () => {
  angle += 1;
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
    angle = 0
  }

  if (angle > 360) {
    angle = 360
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

  const currentx = getFirst(ball).x;
  const currenty = getFirst(ball).y;

  const radians = angle * Math.PI / 180;
  const sin = Math.sin(radians)
  const cos = Math.cos(radians)

  const xcoord = Math.round(currentx + (power * sin));
  const ycoord = Math.round(currenty + (power * cos));

  addText(`${xcoord} ${ycoord}`, {
    x: 1,
    y: 3,
    color: color`L`
  });
});
