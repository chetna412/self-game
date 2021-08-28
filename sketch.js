

var PLAY=1;
var END=0;
var gameState=1;


var ground,ground_img,invisible_ground;
var girl,girl_running,girlImage,girl_standing;
var obstracle,obstracleGroup,obstracle1,obstracle2,obstracle3,obtracle4;
var fruit,fruitsGroup,fruit1,fruit2,fruit3,fruit4;
var gameOver,gameOverImage,restart,restartImage;
var diamond,diamondImage;
var sfruit,sfruitgrp,sfruit1,sfruit2,sfruit3;
var jumpS,bonusS,collectS,diamondloseS,gameoverS,restartS;
var boy,boyImg,boy_running,boy_standing;
var form;


function preload(){
  girl_standing=loadImage("girl image.jpg")
  ground_img=loadImage("background 4.png");
  girl_running=loadAnimation("girl ani-1.png","girl ani-2.png","girl ani-3.png","girl ani-4.png","girl ani-5.png","girl ani-6.png");

  boy_running=loadAnimation("boy img-1.png","boy img-2.png","boy img-3.png","boy img-4.png","boy img-5.png","boy img-6.png","boy img-7.png");
  
  obstracle1=loadImage("Stone 4.png");
  obstracle2=loadImage("trunk img.png");
  obstracle3=loadImage("mushroom img.png");
  obstracle4=loadImage("log img.png");
  fruit1=loadImage("carrot.png");
  fruit2=loadImage("orange.png");
  fruit3=loadImage("strawberry.png");
  fruit4=loadImage("tomato.png");
  gameOverImage=loadImage("game over2.png");
  restartImage=loadImage("restart game img.png");
  diamondImage=loadImage("diamond image.png")
  sfruit1=loadImage("smily apple.png");
  sfruit2=loadImage("smily pear.png");
  sfruit3=loadImage("smily strawberry.png");
  jumpS=loadSound("jump sound.wav");
  bonusS=loadSound("bonus sound.wav");
  collectS=loadSound("collecting sound.wav");
  diamondloseS=loadSound("diamond losing sound.wav");
  gameoverS=loadSound("game over sound.wav");
  restartS=loadSound("restart sound.wav");

  
}

function setup(){
  createCanvas(displayWidth,displayHeight);

   


   ground=createSprite(displayWidth/2,displayHeight/2,displayWidth,2);
  ground.addImage("groundImage",ground_img);
  ground.scale=1.5;
  ground.velocityX=-1;
  
 girl=createSprite(70,150);
  girl.addAnimation("girl running",girl_running);
  girl.scale=1.1;
  
  form=new Form();
  form.display();
  
  
  invisible_ground=createSprite(width/2,height+40,width,125);
  invisible_ground.visible=false;
  
  diamond=createSprite(width-100,70,10,10);
  diamond.addImage(diamondImage);
  diamond.scale=0.08;
  
   gameOver = createSprite(displayWidth/2,displayHeight/2-40);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.7;
  
  restart = createSprite(displayWidth/2,displayHeight/2+80);
  restart.addImage(restartImage);
  restart.scale=0.7
  

   
 
  obstracleGroup=new Group();
  fruitsGroup=new Group();
  sfruitgrp=new Group();
  
  score=0;
  diamonds=5;
  
  girl.debug=false;
  girl.setCollider("circle",0,20,120);
  
}
function draw(){
  background(220);
  if(gameState===PLAY){
     gameOver.visible=false;
    restart.visible=false;
    girl.velocityY = girl.velocityY + 0.8;

    
    ground.velocityX = -(4 + 3* score/100);
    
    if(ground.x < 0){
    ground.x = ground.width/2;
  }
    
    if(score>0 && score%100 === 0){
       diamonds=diamonds+10;
    }
  
  
  if((keyDown("space")&& girl.y >= 220)) {
     girl.velocityY = -12;
    jumpS.play();
       
      }
    
    spawnObstracles();
  spawnFruits();
  spawnsfruit();
  
  if(fruitsGroup.isTouching(girl)){
    score=score+5;
    //collectS.play();
    fruit.destroy();
  }
    
    if(sfruitgrp.isTouching(girl)){
    score=score+50;
    diamonds=diamonds+1;
   // bonusS.play();
    sfruit.destroy();
  }
  

  
   if(obstracleGroup.isTouching(girl)){
    diamonds=diamonds-1;
   // diamondloseS.play();
    obstracle.destroy();
  }
    
    if(diamonds===0){
      gameState=END;
    }
    
  
  
  } if(gameState===END){
   
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX = 0;
       girl.velocityY = 0 
      
       if(mousePressedOver(restart)) {
        reset();
      }
       
       obstracleGroup.setLifetimeEach(-1);
    obstracleGroup.setVelocityXEach(0);
    
    fruitsGroup.setLifetimeEach(-1);
    fruitsGroup.setVelocityXEach(0);
    
    sfruitgrp.setLifetimeEach(-1);
    sfruitgrp.setVelocityXEach(0);
     
       
  }
  
  
  

  
 /*if(score%50===0 && score>0){
    console.log(score+"  "+diamonds)
    
    diamonds=diamonds+10;
  }*/
  
  
  
    girl.collide(invisible_ground); 
  drawSprites();
  
  
  
  textSize(23);
  fill("yellow");
  textFont("itallic")
  text("Fruits Rewards:"+score,40,60);
  

  textSize(20);
  fill("blue");
  text("********************",30,80);
  
  textSize(20);
  fill("yellow");
  text("*************",width-160,100);



  textSize(23);
  fill("red");
  textFont("itallic");
  text(":"+diamonds,width-80,80);
  

  
  
}

 function reset(){
    gameState=PLAY;
   diamonds=5;
   score=0;
  gameOver.visible=false;
  restart.visible=false;
  
 
    
}
  function spawnObstracles(){
    if(frameCount % 143 === 0){
       obstracle = createSprite(490,270,10,40);
      obstracle.velocityX=-6;
      obstracle.scale=0.2;
      
      girl.depth=obstracle.depth;
    girl.depth+=1;
      
      var rand = Math.round(random(1,4));
      switch(rand){
          
        case 1 :obstracle.y=690;
                obstracle.addImage(obstracle1);
                  
                  break;
        case 2 : obstracle.y=690;
                 obstracle.addImage(obstracle2);
                  break;
        case 3 : obstracle.y=690;
                  obstracle.addImage(obstracle3);
                  break;
        case 4 :obstracle.y=690;
                  obstracle.addImage(obstracle4);
                  break;
      }
      
      obstracleGroup.add(obstracle)
      
    }
  }

function spawnFruits(){
    if(frameCount % 200 === 0){
      fruit = createSprite(490,30,10,40);
      fruit.velocityX=-6;
      fruit.scale=0.1;
      
      girl.depth=fruit.depth;
  girl.depth+=1;
      
      var rand = Math.round(random(1,4));
      switch(rand){
          
        case 1 :fruit.y=690;
                fruit.addImage(fruit1);
                  
                  break;
        case 2 : fruit.y=690;
                  fruit.addImage(fruit2);
                  break;
        case 3 :fruit.y=690;
                 fruit.addImage(fruit3);
                  break;
        case 4 :fruit.y=690;
                  fruit.addImage(fruit4);
                  break;
      }
      
      fruitsGroup.add(fruit);
      
    }
  }

function spawnsfruit(){
    if(frameCount % 595 === 0){
      sfruit = createSprite(490,30,10,40);
      sfruit.velocityX=-6;
      sfruit.scale=0.2;
      
      girl.depth=sfruit.depth;
  girl.depth+=1;
      
      var rand = Math.round(random(1,4));
      switch(rand){
          
        case 1 :sfruit.y=595;
                sfruit.addImage(sfruit1);
                  
                  break;
        case 2 : sfruit.y=595;
                  sfruit.addImage(sfruit2);
                  break;
        case 3 :sfruit.y=595;
                 sfruit.addImage(sfruit3);
                  break;
        
      }
      
      sfruitgrp.add(sfruit);
      
    }
  }

 

   