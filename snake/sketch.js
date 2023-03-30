var n = 20;
let step;
let grid;
let k;
let tick = 7;

function setup() {
    if(window.innerWidth<700) {
        createCanvas(window.innerWidth, window.innerWidth);
    } else {
        createCanvas(600, 600);
    }
    background(20);
    this.step = width/this.n;
    this.grid = new Spielfeld(this.step, this.n);
    this.grid.make();

}

function draw() {
    background(20);
    this.grid.mov();
    this.grid.show();
	frameRate(tick);
//    delay(tick);
}

function goRight() {
    k = RIGHT_ARROW;
    this.grid.vy = 0;
    this.grid.vx = 1;
}

function goLeft() {
    k = LEFT_ARROW;
    this.grid.vy = 0;
    this.grid.vx = -1;
}

function goDown() {
    k = DOWN_ARROW;
    this.grid.vy = 1;
    this.grid.vx = 0;
}

function goUp() {
    k = UP_ARROW;
    this.grid.vy = -1;
    this.grid.vx = 0;
}

function keyPressed() {
  switch(keyCode) {
    case UP_ARROW:
      if(k != DOWN_ARROW) {
        goUp();
      }
      break;
    case DOWN_ARROW:
      if(k != UP_ARROW) {
        goDown();
      }
    break;
    case LEFT_ARROW:
      if(k != RIGHT_ARROW) {
        goLeft();
      }
    break;
    case RIGHT_ARROW:
      if(k != LEFT_ARROW) {
        goRight();
      }
    break;
  }
}
