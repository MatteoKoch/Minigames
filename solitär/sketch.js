let spielFeld = [];
let rad;
let selected = false;
let coords;
let availMoves;
let radoff;

function setup() {
    if(document.querySelector('body').clientWidth>700) {
        createCanvas(700, 700);
        radoff = 20;
    } else {
        createCanvas(document.querySelector('body').clientWidth, document.querySelector('body').clientWidth);
        radoff = 10;
    }
    rad = (width/7)-radoff;
    initHoles();
    initSticks();
}

function draw() {
    background(200, 20, 20);
    drawBoard();
    if(!selected) checkMoves();
    document.querySelector("#punkte").innerHTML = `Deine Punktzahl: ${deinePunktzahl()}`;
    if(gameOver()) {
        document.querySelector("#gameover").innerHTML = "Game Over!";
        noLoop();
    }
}

function initHoles() {
    for(let i = -2; i < 9; ++i) {
        spielFeld[i] = [];
        for(let j = -2; j < 9; ++j) {
            if((i > 1 && i < 5) || (j > 1 && j < 5)) spielFeld[i][j] = 0;
            else spielFeld[i][j] = null;
        }
    }
}

function initSticks() {
    for(let i = 0; i < 7; ++i) {
        for(let j = 0; j < 7; ++j) {
            if(spielFeld[i][j] != null) {
                if(i == 3 && j == 3) spielFeld[i][j] = 0;
                else spielFeld[i][j] = 1;
            }
        }
    }
}

function drawBoard() {
    let xpos, ypos;
    fill(10, 150, 20);
    strokeWeight(0);
    rect(0, 0, 2*width/7, 2*width/7);
    rect(5*width/7, 0, 2*width/7, 2*width/7);
    rect(0, 5*width/7, 2*width/7, 2*width/7);
    rect(5*width/7, 5*width/7, 2*width/7, 2*width/7);
    strokeWeight(1);
    for(let x = 0; x < 7; ++x) {
        for(let y = 0; y < 7; ++y) {
            xpos = x*width/7;
            ypos = y*width/7;
            if(spielFeld[x][y] == 0) { //empty spot
                fill(90, 10, 10);
            } else if(spielFeld[x][y] == 1) { //stick
                fill(200, 120, 20);
            } else if(spielFeld[x][y] == 2) { //selected
                fill(20, 200, 20);
            } else if(spielFeld[x][y] == 3) { //movable
                fill(20, 150, 20);
                fill(200, 120, 20);
            } else if(spielFeld[x][y] == 4) { //available
                fill(200, 200, 20);
                fill(90, 10, 10);
            } else if(spielFeld[x][y] == 5) { //swapping available
                fill(80, 100, 80);
                fill(200, 120, 20);
            }
            if(spielFeld[x][y] != null) ellipse(xpos+radoff/2+rad/2, ypos+radoff/2+rad/2, rad, rad);
        }
    }
}

function checkMoves() {
    for(let x = 0; x < 7; ++x) {
        for(let y = 0; y < 7; ++y) {
            if(spielFeld[x][y] == 0) {
                if((spielFeld[x+1][y] == 1 || spielFeld[x+1][y] == 3 || spielFeld[x+1][y] == 5) && spielFeld[x+2][y] == 1) spielFeld[x+2][y] = 3;
                if((spielFeld[x-1][y] == 1 || spielFeld[x-1][y] == 3 || spielFeld[x-1][y] == 5) && spielFeld[x-2][y] == 1) spielFeld[x-2][y] = 3;
                if((spielFeld[x][y+1] == 1 || spielFeld[x][y+1] == 3 || spielFeld[x][y+1] == 5) && spielFeld[x][y+2] == 1) spielFeld[x][y+2] = 3;
                if((spielFeld[x][y-1] == 1 || spielFeld[x][y-1] == 3 || spielFeld[x][y-1] == 5) && spielFeld[x][y-2] == 1) spielFeld[x][y-2] = 3;
            }
        }
    }
}

function gameOver() {
    let counter = 0;
    for(let x = 0; x < 7; ++x) {
        for(let y = 0; y < 7; ++y) {
            if(spielFeld[x][y] == 2 || spielFeld[x][y] == 3 || spielFeld[x][y] == 5) ++counter;
        }
    }
    return counter>0?false:true;
}

function deinePunktzahl() {
    let counter = 0;
    for(let x = 0; x < 7; ++x) {
        for(let y = 0; y < 7; ++y) {
            if(spielFeld[x][y] == 5 || spielFeld[x][y] == 3 || spielFeld[x][y] == 2 || spielFeld[x][y] == 1) ++counter;
        }
    }
    return counter;
}

function checkAvailMoves(x, y) {
    if(spielFeld[x][y] == 2) {
        if((spielFeld[x+1][y] == 1 || spielFeld[x+1][y] == 3 || spielFeld[x+1][y] == 5) && spielFeld[x+2][y] == 0) spielFeld[x+2][y] = 4;
        if((spielFeld[x-1][y] == 1 || spielFeld[x-1][y] == 3 || spielFeld[x-1][y] == 5) && spielFeld[x-2][y] == 0) spielFeld[x-2][y] = 4;
        if((spielFeld[x][y+1] == 1 || spielFeld[x][y+1] == 3 || spielFeld[x][y+1] == 5) && spielFeld[x][y+2] == 0) spielFeld[x][y+2] = 4;
        if((spielFeld[x][y-1] == 1 || spielFeld[x][y-1] == 3 || spielFeld[x][y-1] == 5) && spielFeld[x][y-2] == 0) spielFeld[x][y-2] = 4;
    } else return false;
}

function clearColors() {
    for(let x = 0; x < 7; ++x) {
        for(let y = 0; y < 7; ++y) {
            if(spielFeld[x][y] == 3 || spielFeld[x][y] == 5) {
                spielFeld[x][y] = 1;
            }
        }
    }
}

function replaceSwapped() {
    for(let x = 0; x < 7; ++x) {
        for(let y = 0; y < 7; ++y) {
            if(spielFeld[x][y] == 3) {
                spielFeld[x][y] = 5;
            } else if(spielFeld[x][y] == 4) {
                spielFeld[x][y] = 0;
            }
        }
    }
}

function coordToIndex(x, y) {
    return {"xindex":Math.floor(7*x/width), "yindex":Math.floor(7*y/width)};
}

function mousePressed() {
    let xpos = coordToIndex(mouseX, mouseY).xindex;
    let ypos = coordToIndex(mouseX, mouseY).yindex;
    if(spielFeld[xpos][ypos] == 3 && !selected) {
        selected = true;
        replaceSwapped();
        spielFeld[xpos][ypos] = 2;
        coords = {"oldx":xpos, "oldy":ypos};
        checkAvailMoves(xpos, ypos);
    } else if(spielFeld[xpos][ypos] == 4 && selected) {
        selected = false;
        clearColors();
        spielFeld[coords.oldx][coords.oldy] = 0;
        spielFeld[(coords.oldx+xpos)/2][(coords.oldy+ypos)/2] = 0;
        spielFeld[xpos][ypos] = 1;
    } else if(spielFeld[xpos][ypos] == 5 && selected) {
        replaceSwapped();
        spielFeld[xpos][ypos] = 2;
        spielFeld[coords.oldx][coords.oldy] = 5;
        coords = {"oldx":xpos, "oldy":ypos};
        checkAvailMoves(xpos, ypos);
    }
}