var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  //tower.velocityY = 1;
  doorsGroup = new Group();
  climberGroup = new Group();

  ghost = createSprite(200,200,50,50)
   ghost.addImage("ghost",ghostImg)
   ghost.scale = 0.5
   ghost.setCollider("circle", 0 , 0, 60)
  //ghost.debug = true
  
  
}

function draw() {
  background(200);
  score = score + Math.round(frameCount/100)
  
 
 if(gameState=== "play") {
  tower.velocityY= (1+score/100)
  if(tower.y > 400){
      tower.y = 300
    }
    
   if(keyDown("space")){
      ghost.velocityY = -2 ; 
   }
   if(keyDown("left")){
    ghost.x = ghost.x -1 ; 
 }
 if(keyDown("right")){
  ghost.x = ghost.x+1 ; 
}

 ghost.velocityY = ghost.velocityY + 0.1
  if(climberGroup.isTouching(ghost)|| ghost.y>600){
  ghost.velocityY = 0
  ghost.velocityX = 0
  climberGroup.setVelocityYEach (0)
  tower.velocityY = 0
  doorsGroup.setVelocityYEach (0)
  gameState= "end"

  }
  
 
  spookySound.play();
    
   spawnDoor();
    drawSprites();
  
}
if (gameState === "end"){
  background("black")
  textSize(50)
  fill("red")
 text("GAME OVER",130,300)
 spookySound.stop()
 score= 200
 
 
}
fill("red")
  textSize(20)
  text("Score:-" + score,400,50)
}
  

  function spawnDoor(){
   if(frameCount % 240 === 0){
   var door = createSprite (200, -50)
   door.x = Math.round(random(200,400))
   door.addImage(doorImg)
   door.velocityY = (1+score/100)
   doorsGroup.add(door)
   var climber = createSprite (200, 10)
   
   climber.addImage(climberImg)
   climber.velocityY =  (1+score/100);
   climber.x = door.x;
   climberGroup.add(climber)
   ghost.depth = door.depth + 1;
   }


  }