var dog,dogimage; 
var happyDog,happyDogimage; 
var database;
var foodS, foodStock;

function preload()
{
  dogimage = loadImage("dogImg.png");
  happyDogimage = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
 dog = createSprite(250,210,20,50);
 dog.addImage("dog",dogimage);
 dog.scale=0.2;

 database = firebase.database();

 foodStock=database.ref('Food');
 foodStock.on("value",readStock);
}

function draw() {  
  background(46,139,87);

  
 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage("happyDog",happyDogimage)
   }

drawSprites();
 textSize(20);
 stroke("black");

 fill("white");
 text("Foods Remaining: "+foodS,250,150);
 text("note:Press UP_ARROW key to feed Drago milk ",50,50);
}

function readStock (data)  {
 foodS = data.val();
}

function writeStock (x)  {
  if (x<=0) {
    x=0
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


