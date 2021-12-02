var PLAY = 1
var END = 0
var gameState = PLAY
var bird,obstacle,scene,obstacles,coins,coin;
var score;

function preload(){
scene = loadImage("bg.jpg")
flyingbird1=loadAnimation("1.png")
flyingbird = loadAnimation("1.png","2.png","3.png","2.png","5.png","6.png","7.png")
restart = loadImage("restart.png")
coin = loadImage("coin.png")
}

function setup() {
createCanvas(400,400)
edges=createEdgeSprites()
score = 0
coinsGroup = new Group()

//scene
scenery = createSprite(225,200)
scenery.addImage(scene)
scenery.scale = 3
scenery.velocityX = -1

//bird
bird = createSprite(350,190,50,100)
bird.addAnimation("bird1",flyingbird1)
bird.addAnimation("bird",flyingbird)
bird.scale = 0.39 
//bird.debug = true
bird.setCollider("circle",0,0,5)

restartbutton = createSprite(200,140)
restartbutton.addImage(restart)
restartbutton.scale = 0.2

}

function draw() {
background("black")
drawSprites()
fill("black")
textSize(20)
text("score: "+score,50,50)
if (gameState === PLAY){
    restartbutton.visible = false
    if (scenery.x < -100){
        scenery.x = scenery.width
       }
   
   if (keyDown("space") && bird.y >=100){
        bird.velocityY = -8
        bird.changeAnimation("bird",flyingbird)
       }
   bird.velocityY = bird.velocityY +0.5
   
   if(coinsGroup.isTouching(bird)){
       coinsGroup.destroyEach()
       score = score+1
    }
    if(bird.isTouching(edges[3])){
        gameState = END 
    }


if (gameState === END){
    bird.destroy();
    scenery.velocityX = 0
    text("Game Over",150,200)
    coinsGroup.destroy();
    restartbutton.visible = true
    if (mousePressedOver(restartbutton)){
        reset()
    }
}
}



spawncoins()


}
function spawncoins(){
    if(frameCount%100 == 0){
        coins =  createSprite(0,200,30,10)
        //coins.debug = true
        coins.addImage(coin)
        coins.y = random(50,150)
        coins.scale = 0.09
        coins.velocityX = 4
        coins.lifetime = (450/4)
        coins.depth = bird.depth
        coinsGroup.add(coins)
    
    }

}

function reset(){
    gameState = PLAY
    score = 0
}