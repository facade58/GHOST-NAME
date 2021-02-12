var towerImage,tower;
var door,doorImage,doorsGroup;
var climberImage,climbersGroup,climber;
var ghost,ghostImage;
var invisibleblockGroup,invisibleblock;
var gameState="play";
var spookySound;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleblockGroup=new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
}

function draw(){
  background(0);
  if(gameState==="play"){
    
  
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
   ghost.x=ghost.x+3; 
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
  }
  spawnDoors();
  drawSprites();
}
if(gameState==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("gameOver",230,250);
}
}
function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
  door.addImage(doorImage);
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    invisibleblock=createSprite(200,15);
    invisibleblock.width=climber.width;
    invisibleblock.hieght=2;
    door.x=Math.round(random(120,400));
  door.velocityY=1;
    climber.x=door.x;
    climber.velocityY=1;
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
   
    invisibleblockGroup.add(invisibleblock);
    ghost.depth=door.depth;
    ghost.depth+=1;
    climber.lifetime=800;
    door.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
  
}