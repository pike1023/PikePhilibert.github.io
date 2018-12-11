var steImg;
var hockey;
var badguy = [];
var ste;


function preload(){
  steImg = loadImage("ste.png");
  hockey = loadImage("hockey.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ste = new Ste();
  for (var i = 0; i < 5; i++)  {
    badguy[i] = new Badguy();
  }
}

function draw() {
  background(hockey);
  ste.display();
  for(var i = 0; i < badguy.length; i++) {
    badguy[i].display();
     badguy[i].move();
  }
}

function Ste(){
  this.x = 2000;
  this.y = 350;
  this.display = function(){
    image(steImg, this.x, this.y, 575, 575)
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
}
