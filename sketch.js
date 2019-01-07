var steImg;
var hockey;
var badguy = [];
var ste;
var greenthing;
var point = 0;
var gameOver = false;
var gameOverImg;



function preload(){
  steImg = loadImage("ste.png");
  hockey = loadImage("hockey.jpg");
  gameOverImg = loadImage("gameover1.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ste = new Ste();
  for (var i = 0; i < 5; i++)  {
    badguy[i] = new Badguy();
  }
  greenthing = new Greenthing();
}

function draw() {
  background(hockey);
  ste.display();
  for(var i = 0; i < badguy.length; i++) {
    badguy[i].display();
     badguy[i].move();
  badguy[i].checkforhit();
  }
  greenthing.display();
  greenthing.checkforpoint();
  if(gameOver == true){
    GameOverScreen();
  }
}

function Ste(){
  this.x = 1000;
  this.y = 350;
  this.display = function(){
    imageMode(CENTER);
    image(steImg, this.x, this.y, 575, 575)
    imageMode(CORNER);
  }
  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    ste.move(0, -60);
  }
  if (keyCode == LEFT_ARROW){
    ste.move(-60, 0);
  }
  if (keyCode == DOWN_ARROW){
    ste.move(0, 60);
  }
  if (keyCode == RIGHT_ARROW){
    ste.move(60, 0);
  }
}

function Badguy(){
  this.position = createVector(random(width), random(height))
  this.speed = 12;
  this.angle = random(0, 2*PI);
  this.velocity = createVector(this.speed * cos (this.angle), this.speed*sin(this.angle));
  this.display= function(){
    fill(255,0,0)
    ellipse(this.position.x, this.position.y, 40)
    }
  this.move = function() {
    this.position.add(this.velocity);
    if (this.position.y < 100) {
      this.velocity.y *= -1;
    }
    if (this.position.y > windowHeight - 100) {
      this.velocity.y *= -1;
    }
    if (this.position.x < 100) {
      this.velocity.x *= -1;
    }
    if (this.position.x > windowWidth - 100) {
      this.velocity.x *= -1;
    }
  }
  this.checkforhit = function(){
    var x = (this.position.x - ste.x)*(this.position.x - ste.x);
    var y = (this.position.y - ste.y)*(this.position.y - ste.y);
    var d = sqrt(x+y)

    if (d < 100 && millis() > 2000){
      gameOver = true;
      console.log("lose")
      // if(ste > this.x && ste < this.x + 150 && ste > this.y && mste < this.y + 150){
      //   gameOver = true;
      //
      // }
    }
  }
}
function Greenthing(){
  this.position = createVector(random(width), random(height))
  this.display = function(){
    fill(0,225,0);
    ellipse(this.position.x, this.position.y, 30)
  }
  this.checkforpoint = function(){
    var a = (this.position.x - ste.x)*(this.position.x - ste.x);
    var b = (this.position.y - ste.y)*(this.position.y - ste.y);
    var c = sqrt(a+b)
    if (c < 80){
      point++;
      console.log("1 point");
      this.position = createVector(random(width), random(height))
    }
  }
}
function GameOverScreen(){
  image(gameOverImg, 0, 0, windowWidth, windowHeight);
}
