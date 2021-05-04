//defining variables
var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, swordImage;
var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup,rf,randomFruit;
var monster, monsterImage, enemyGroup;
var score, gameoverImage, gameover;

//loading the images
function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png"); 
  fruit4 = loadImage("fruit4.png"); 
  
  monsterImage = loadAnimation("alien2.png","alien1.png"); 
  
  gameoverImage = loadImage("gameover.png");
}

//preparing for draw
function setup(){
  
  //creating canvas and adding background  
  createCanvas(400,400);
  
  
  //creating sword, adding image, scaling it
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.4;  
  
  //creating gameover
  gameover = createSprite(150,150,30,30);
  gameover.addImage(gameoverImage);
  gameover.scale = 1.5;
  
  sword.setCollider("rectangle",0,0,40,40);

  //setting score to 0
  score = 0;
  
  
  //creating groups
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  

}

function draw(){
  
  background("lightblue");
  
  //setting game state
  if (keyDown("space")){
    gameState = PLAY;
  }
  
  text("Score: "+ score, 300,50);
  
  
  // if gamestate is play, giving x and y of sword an the x y of mouse
  if (gameState === PLAY){ 
    
    fruits();
   enemy(); 
   sword.x = World.mouseX ;
   sword.y = World.mouseY ; 
   camera.position.x = sword.x;
   camera.position.y = sword.y;
   gameover.visible = false; 
  
   //if sword touches fruit, fruits are destroyed
  if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score  = score+3;
  }  
  
 else 
 { if (enemyGroup.isTouching(sword)){
    gameState = END;
    
    fruitGroup.destroyEach(-1);
    enemyGroup.destroyEach(-1);
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    gameover.visible = true;
    
  }
 }
  }
  
  //drawing sprites
 drawSprites();
 
 
  
}

//creating fruits function 
function fruits(){
 if (World.frameCount%80===0){
   fruit = createSprite(400,200,20,20);
   fruit.scale = 0.2;
    
   rf = Math.round(random(1,4));
   if (rf == 1){
      fruit.addImage(fruit1);
   }else if (rf == 2){
     fruit.addImage(fruit2);
   }else if (rf == 3){
     fruit.addImage(fruit3);
   }else{
     fruit.addImage(fruit4);
   }
   
   fruit.y = Math.round(random(50,340));
   
   fruit.velocityX = -7;
   fruit.setLifetime  = 100;
   
   fruitGroup.add(fruit);
   
 }
}  

//creating enemy groups
 function enemy() {
   if (World.frameCount%200===0){  
     monster= createSprite(400,200,20,20);
     monster.addAnimation("moving",monsterImage);
     monster.y = Math.round(random(100,300));
     monster.velocityX = -8;
     monster.setLifetime = 50;
     
       enemyGroup.add(monster);
   }
 }