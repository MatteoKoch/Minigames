class Spielfeld {
  
  constructor(gridsize, n_) {
    this.x = 7;
    this.y = 4;
    this.size = gridsize;
    this.n = n_;
    this.count = -1;
    this.score = 1;
    this.p = [];
    this.grid = [];
    this.vx = 1;
    this.vy = 0;
    
    //output = createWriter("score.txt");
  }
  
  
  make() {
    for(let sizex = 0; sizex < this.n; sizex++) {
      this.grid[sizex] = []
      for(let sizey = 0; sizey < this.n; sizey++) {
        this.grid[sizex][sizey] = new Coordinates(this.size*sizex, this.size*sizey);
      }
    }
    this.grid[15][3].apple = true;
  }
  
  
  mov() {
    
    for(let i = this.count-this.score; i >= 0; i--) {    
      this.grid[this.p[i].x][this.p[i].y].state = false;
    }
    
    this.count++;
    let c = new Coordinates(this.x,this.y);
    this.p.push(c);
    
    this.x+=this.vx;
    this.y+=this.vy;
    this.x%=this.n;
    this.y%=this.n;
    if(this.x < 0) this.x = 19;
    if(this.y < 0) this.y= 19;
    this.checkapple();
    this.checkcollision();
    for(let i = this.count; i > this.count-this.score; i--) {
      this.grid[this.p[i].x][this.p[i].y].state = true;
    }
    
  }
  
  checkcollision() {

    for(let i = this.count; i > this.count-this.score; i--) {
      if(this.p[i].x == this.x && this.p[i].y == this.y) {
        //output.println(score);
        //output.close();
        noLoop();
      }
    }
 
  }
  
  checkapple() {

    if(this.grid[this.x][this.y].apple) {
      this.grid[this.x][this.y].apple = false;
      this.score++;
      this.spawnapple();
    }
 
  }
  
  
  spawnapple() {
    let rx = int(random(20));
    let ry = int(random(20));
    if(this.grid[rx][ry].state) {
      this.spawnapple();
    } else this.grid[rx][ry].apple = true;
  }
  
  show() {
    stroke(200);
    strokeWeight(1);
    for(let z = this.size; z < width; z+=this.size) {
      line(z, 0, z, height);
      line(0, z, width, z);
    }
    for(let sizex = 0; sizex < this.n; sizex++) {
      for(let sizey = 0; sizey < this.n; sizey++) {
        let c = this.grid[sizex][sizey].state? color(180):(this.grid[sizex][sizey].apple? color(200,10,10):color(20));
        fill(c);
        rect(this.grid[sizex][sizey].x, this.grid[sizex][sizey].y, this.size, this.size);
      }
    }
    textSize(40);
    fill(200,10,10);
    text(this.score, 20, 40);
  }
  
}