let spielFeld = [];
var timer, punkte;
let size = window.location.search.replaceAll("?size=", "");

function setup() {
    if(window.innerWidth<700) {
        createCanvas(window.innerWidth, window.innerWidth);
    } else {
        createCanvas(600, 600);
    }
    initSpielFeld();
    mischleSpielFeld();
    startTimer();
}

function draw() {
    background(100, 100, 100);
    drawBoard();
    if(gameOver()) {
        stopTimer();
    }
}

function startTimer() {
    let m = s = ms = 0;
    let inc = 30;
    let sinc = inc/1000;
    let minc = inc/60000;
    punkte = document.getElementById("punkte");
    timer = setInterval(function() {
        ms += 10;
        ms %= 1000;
        s += sinc;
        s %= 60;
        m += minc;
        punkte.innerHTML = `${appendZeros(Math.floor(m), 2)}:${appendZeros(Math.floor(s), 2)}:${appendZeros(String(Math.floor(ms)), 3).slice(0, 2)}`;
    }, inc)
}

function appendZeros(time, length) {
    let news = "";
    for(let i = String(time).length; i < length; ++i) {
        news += "0";
    }
    news += String(time);
    return news;
}

function stopTimer() {
    clearInterval(timer);
}

function initSpielFeld() {
    let index = 0;
    for(let x = -1; x < size+1; ++x) {
        spielFeld[x] = []
        for(let y = -1; y < size+1; ++y) {
            spielFeld[x][y] = {"text":null, "val":null};
            if(x >= 0 && x < size && y >= 0 && y < size) spielFeld[x][y] = {"text":++index>(size*size -1)?0:index, "val":index>(size*size -1)?0:1};
        }
    }
}

function mischleSpielFeld() {
    let xpos, ypos;
    for(let i = 0; i < 10000; ++i) {
        xpos = Math.floor(random(size))
        ypos = Math.floor(random(size))
        moveToAvailable(xpos, ypos);
    }
}

function drawBoard() {
    for(let x = 0; x < size; ++x) {
        for(let y = 0; y < size; ++y) {
            spielFeld[y][x].text>0?fill(200):fill(60)
            stroke(40);
            rect(x*width/size, y*height/size, width/size, height/size);
            textSize(40);
            fill(0);
            if(spielFeld[y][x].val != 0) text(spielFeld[y][x].text, x*width/size + width/(2*size) - width/(8*size), y*height/size + height/(2*size) + height/(8*size))
        }
    }
}

function findHole() {
    for(let x = 0; x < size; ++x) {
        for(let y = 0; y < size; ++y) {
            if(spielFeld[y][x].val == 0) return {"x":x, "y":y};
        }
    }
}

function gameOver() {
    let index = 0;
    for(let x = 0; x < size; ++x) {
        for(let y = 0; y < size; ++y) {
            if(spielFeld[x][y].text != (++index>(size*size -1)?0:index)) return false;
        }
    }
    return true;
}

function moveToAvailable(x, y) {
    if(spielFeld[x+1][y].val == 0) {
        swap(x, y, x+1, y);
    } else if(spielFeld[x-1][y].val == 0) {
        swap(x, y, x-1, y);
    } else if(spielFeld[x][y+1].val == 0) {
        swap(x, y, x, y+1);
    } else if(spielFeld[x][y-1].val == 0) {
        swap(x, y, x, y-1);
    } else {
        
        let hole = findHole();
        let saver = x;
        x = y;
        y = saver;
        let xdif = hole.x - x;
        let ydif = hole.y - y;
        
        if(xdif == 0 && ydif > 0) {
            for(let i = hole.y-1; i >= y; --i) {
                swap(i, x, i+1, x);
            }
        } else if(xdif == 0 && ydif < 0) {
            for(let i = hole.y+1; i <= y; ++i) {
                swap(i, x, i-1, x);
            }
        } else if(xdif > 0 && ydif == 0) {
            for(let i = hole.x-1; i >= x; --i) {
                swap(y, i, y, i+1);
            }
        } else if(xdif < 0 && ydif == 0) {
            for(let i = hole.x+1; i <= x; ++i) {
                swap(y, i, y, i-1);
            }
        }
        
    }
}

function swap(x1, y1, x2, y2) {
    spielFeld[x2][y2].text = spielFeld[x1][y1].text;
    spielFeld[x2][y2].val = spielFeld[x1][y1].val;
    spielFeld[x1][y1].text = 0;
    spielFeld[x1][y1].val = 0;
}

function coordToIndex(x, y) {
    return {"xindex":Math.floor(size*x/width), "yindex":Math.floor(size*y/height)};
}

function mousePressed() {
    let xpos = coordToIndex(mouseX, mouseY).xindex;
    let ypos = coordToIndex(mouseX, mouseY).yindex;
    moveToAvailable(ypos, xpos);
}