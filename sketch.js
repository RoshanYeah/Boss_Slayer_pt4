var playB, infoB;
var backgroundAImg, backgroundBImg, backgroundCImg;
var splashScreen, splashScreen2;
var swordManImg, bowManImg;
var swordMan, bowMan;
var swordB, bowB;
var player,player_run, player_runLeft;
var swordAttackImg, bowStillImg, bossImg, enemyImg, bossImgRight;
var swordAtk, bowStill, enemy, enemyGroup;
var ground;
var swordSwordImg;

var arrow, arrowImg;

var score = 0;

var pHealth = 200;
var pMaxHealth = 200;

var bossHealth = 5;
var bossMaxHealth = 5;

var gameState = "wait"



function preload(){
    backgroundAImg = loadImage("/assets/Background3.jpg");
    backgroundBImg = loadImage("/assets/Background1.jpg");
    backgroundCImg = loadImage("/assets/Background2.jpg");
    splashScreen = loadImage("/assets/Boss_Slayer.gif");
    splashScreen2 = loadImage("/assets/Boss_SlayerDimmed.gif");
    swordManImg = loadImage("/assets/SwordGrab-unscreen.gif");
    player_run = loadImage("/assets/Running-unscreen.gif");
    player_runLeft = loadImage("/assets/Running-unscreen-left.gif");
    bowManImg = loadImage("/assets/Bow-unscreen.gif");
    swordAttackImg = loadImage("/assets/SwordAttack-unscreen.gif");
    bowStillImg = loadImage("/assets/BowStill.jpg");
    bossImg = loadImage("/assets/Enemy.gif");
    bossImgRight = loadImage("/assets/EnemyRight.gif");
    enemyImg = loadImage("/assets/miniEnemy.gif");
    arrowImg = loadImage("./assets/arrow.png")
    swordSwordImg = loadImage("./assets/SwordSwingL.png")
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    playB = createImg("/assets/PlayButton.png")
    playB.position(windowWidth/2,windowHeight/3)
    playB.size(100,80)
 

    infoB = createImg("/assets/InfoButton.png")
    infoB.position(windowWidth/2,windowHeight/3+100)
    infoB.size(100,80)

  /*  swordMan = createSprite(windowWidth/3,windowHeight/2);
    swordMan.addImage(swordManImg);
    swordMan.scale = 0.5;
    swordMan.visible = false;

    bowMan = createSprite(windowWidth/3,windowHeight/2);
    bowMan.addImage(bowManImg);
    bowMan.scale = 0.5;
    bowMan.visible = false; */

    ground = createSprite(windowWidth/2,windowHeight/2+165,windowWidth,5)


    swordB = createImg("/assets/SwordB.gif")
    swordB.position(windowWidth/3-100,windowHeight/3-50)
    swordB.size(300,300)
    swordB.hide();

    bowB = createImg("/assets/BowB.gif")
    bowB.position(windowWidth/2+50,windowHeight/3-50)
    bowB.size(300,300)
    bowB.hide();

    player = createSprite(100,windowHeight/2+100,100,100);
    player.scale= 0.5;
    player.visible = false;

    
    swordAtk = createSprite(player.x+50,player.y-10,50,150);

    

    enemyGroup = new Group();
    arrowGroup = new Group();
  
    
}

function draw(){
    if(gameState == "wait"){
        background(splashScreen);
        playB.show();
        infoB.show();
    }
    playB.mousePressed(() => {
        playB.hide();
        infoB.hide();
        gameState = "choose";
    })
    infoB.mousePressed(()=>{
        playB.hide();
        infoB.hide();
        gameState = "information";
    })
    

    if(gameState == "choose"){
        background(splashScreen2);
        weaponChoose();
    }

    swordB.mousePressed(() =>{
        swordB.hide();
        bowB.hide();
        player.addImage(swordManImg);
        gameState = "SwordLevel";
    })
    bowB.mousePressed(() =>{
        swordB.hide();
        bowB.hide();
        player.addImage(bowStillImg);
        player.y = windowHeight/2-50;
        gameState = "BowLevel";
    })

    if(gameState == "information"){
        gameInfo();
    }

    

    if(gameState == "SwordLevel"){
        background(backgroundAImg);
        player.visible = true;
        playerMovement();
        spawnEnemies();
        if(keyDown("SPACE")){
           swordAtk.visible = true;
            player.addImage(swordAttackImg);
            player.scale=0.9
            swordAtk.visible = true;
                if(swordAtk.isTouching(enemyGroup)){
                    enemyGroup.destroy();
                    console.log("attack")
                    score += 5;
                }
        }
        if(!keyDown("SPACE")){
            player.addImage(swordManImg);
            player.scale=0.5;
            swordAtk.visible = false;
        }
        

        
        
    }
    if(gameState == "BowLevel"){
        swordAtk.visible = false;
        background(backgroundAImg);
        player.visible = true;
        if(keyDown("SPACE")){
           
            player.addImage(bowManImg);
            for(var i =0; i < enemyGroup.length; i++){
                console("forlooop")
                if(arrowGroup.isTouching(enemyGroup.get[i])){
                    console.log("bow")
                    score+= 5;
                    enemyGroup.get(i).destroy();
                    arrowGroup.destroyEach();
                }
            }
        
        }
        playerMovement();
        spawnEnemies();
        spawnArrows();
    }
    

    drawSprites();
    textSize(30)
    text("Score: "+score,windowWidth/2, 100);

}

function weaponChoose(){
    swordB.show();
    bowB.show();
}
function gameInfo(){
    swal({
        title: "How to play",
        text: "Use the A/D or Left and Right Arrows to move left and right.",
        textAlign: "CENTER",
        imageUrl: "assets/Boss_Slayer.gif",
        imageSize: "200x200",
        confirmButtonText:"OK",
        confirmButtonColor:"green"
        
    },
    function(){
        gameState = "wait"
    })
}

function playerMovement(){
    if(player.x < 30){
        player.x = 30;
    }
    if(player.x >windowWidth-30){
        player.x = windowWidth-30
    }

    if(player.y < 200){
        player.y = 200
    }
    
    if(keyDown("RIGHT_ARROW") || keyDown("D")){
        player.addImage(player_run);
        player.x += 10;
        swordAtk.x +=10;

    }
    if(keyDown("LEFT_ARROW") || keyDown("A")){
        player.addImage(player_runLeft)
        player.x -= 10;
        swordAtk.x -=10;
    }
    if((keyDown("UP_ARROW") || keyDown("W")) && player.y <= windowHeight/2+100){

        player.y -= 35;
        swordAtk.y -=35;
    }
    
    player.y +=15;
    swordAtk.y +=35;
    if(keyDown("DOWN_ARROW") || keyDown("S")){
        player.y += 25;
        swordAtk.y +=25;
    }

   player.collide(ground);
   swordAtk.collide(ground);
}

function spawnEnemies(){

    enemy = createSprite(windowWidth+100,windowHeight/2+100,100,100);

    if(score < 50){
        if(frameCount % 50 == 0){
            enemy.addImage(enemyImg);
            enemy.scale = 0.2;
            enemy.velocityX = -10;
            enemy.positionX = windowWidth+100;
            enemy.positionY = windowHeight/2;
            enemy.lifetime = 150;
        }
    }
    if(score >=50){
        enemy.addImage(bossImg);
        enemy.scale = 1;
        enemy.velocityX = -10;
        enemy.positionX = windowWidth+100;
        enemy.positionY = windowHeight/2;
        if(enemy.x == 10){
            enemy.addImage(bossImgRight);
            enemy.velocityX = 7;
        }
        if(enemy.x == windowWidth-30){
            enemy.addImage(bossImg);
            enemy.velocityX = -7
        }
        enemyHealth();
    }
}

function spawnArrows(){
    if(keyDown("SPACE")){
        arrow = createSprite(150,windowHeight/2+100,100,100);
        arrow.addImage(arrowImg);
        arrow.scale= 0.2;
        arrow.velocityX = 10;
        arrowGroup.add(arrow);
    }
    
}

function enemyHealth(){
    // if(bossHealth == 0){
    //     enemy.
    // }
}



function bowAttack(){
    player.addImage(bowManImg);
    player.addImage(bowStill);
}