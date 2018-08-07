enchant();

window.onload = function(){
    var game = new Game(this.screen.width,this.screen.height);
    game.spriteSheetWidth = 128;
    game.spriteSheetHeight = 64;
    game.spriteWidth = 16;
    game.spriteHeight = 15;
    game.fps = 60;
    game.score = 1;
    
    game.preload('graphic.png','effect0.png','music.ogg','space-bg3.jpg','space-bg2.jpg','space-bg.jpg','start.png','gameover.png'); 

  

Player = Class.create(Sprite, { 
    initialize:function(playerX,playerY){ 
        Sprite.call(this,16,15);
        this.image = game.assets['graphic.png'];
        this.x = playerX;
        this.y = playerY;
        this.frame = 0;
        this.scaleX = 1.5;
        this.scaleY = 1.5;
        game.rootScene.addChild(this);
       
    },
    onenterframe:function(){

        if(player.x > screen.width || player.x < 0){
            location.reload();
         }
        if(player.y > screen.height || player.y < 0){
            location.reload();
         }

        if(game.input.up){
            player.y-=3;
            } else if(game.input.right){
            player.x+=3;
            } else if (game.input.down){
            player.y+=3;
            } else if(game.input.left){
            player.x-=3;
            }
        }
     });

    Enemy = Class.create(Sprite,{
       initialize:function(enemX,enemY,frame){
            Sprite.call(this,16,15);
            this.image = game.assets['graphic.png'];
            this.frame = frame;
            this.x = enemX;
            this.y = enemY;
            this.opacity = 1;
            game.rootScene.addChild(this);
           
       } ,
       onenterframe:function(){  
     
        if(meteorShower.intersect(player)){  
           location.reload();  
        }

        if(enemy.within(player,10)){  
            location.reload();
        } else if(enemy2.within(player,10)){
            location.reload();
        } else if(enemy3.within(player,10)){
            location.reload();
        } else if(enemy4.within(player,10)){
           location.reload();
        }

       }
    });
    
 Laser = Class.create(Sprite,{
     initialize:function(){
         Sprite.call(this,16,15);
         this.image = game.assets['graphic.png'];
         this.frame = 1;
         this.x = player.x + 8;
         this.y = player.y;
         game.rootScene.addChild(this);
     } 
 });

Bg = Class.create(Sprite,{
    initialize:function(){
        Sprite.call(this,screen.width,screen.height);
        this.image = game.assets['space-bg3.jpg'];
        game.rootScene.addChild(this);
        this.opacity = 1;
    }
});

game.onload = function(){
    
    //START SCENE/ROOTSCENE OF THE GAME
    startBg = new Bg();
    startBg.image = game.assets['space-bg.jpg'];
    startBg.opacity = 1;
    game.rootScene.addChild(startBg);

    startBtn = new Bg();
    startBtn.image = game.assets['start.png'];
    startBtn.width = 236;
    startBtn.height = 48;
    startBtn.x = (screen.width / 2) - (startBtn.width / 2);
    startBtn.y = (screen.height / 2) - (startBtn.height / 2);
    startBtn.opacity = 1;
    game.rootScene.addChild(startBtn); 

    startLabel = new Label();
    startLabel.width = 300;
    startLabel.x = (screen.width / 2) - (startBtn.width / 2);
    startLabel.y = screen.height / 4;
    startLabel.text = "CLICK ON START";
    startLabel.color = "yellow";
    startLabel.font = '28px "verdana"';
    game.rootScene.addChild(startLabel); 

    startBtn.addEventListener('touchstart',function(){  
        game.rootScene.removeChild(startLabel);
        game.rootScene.removeChild(startBtn); 
        game.rootScene.removeChild(startBg);
        game.pushScene(playScene());
    });
}

//STAGE 1 SCENE OF THE GAME
function playScene(){
    
    game.assets['music.ogg'].play();

    bg = new Bg();
    player = new Player(250,screen.height / 2);

    enemy = new Enemy(screen.width,400 / 2,3);
    enemy2 = new Enemy(screen.width,500,4);
    enemy3 = new Enemy(screen.width,600,5);
    enemy4 = new Enemy(screen.width,700,6);

    enemy.tl.moveTo(580, 300, 200).and().rotateBy(360,200).scaleTo(2,200).moveBy(240, 200, 200).moveTo(240,300, 400).and().rotateBy(360,100).moveTo(240,300, 100).loop();
    enemy2.tl.moveTo(450, screen.height / 2, 200).and().rotateBy(360,100).moveBy(420, 210, 100).moveTo(240,600, 100).scaleTo(2,300).and().rotateBy(360,100).loop();
    enemy3.tl.moveTo(500, screen.height / 4, 600).and().rotateBy(360,100).moveBy(420, 210, 100).moveTo(-10,100, 100).and().rotateBy(360,100).loop();
    enemy4.tl.moveTo(600, screen.height / 5, 200).scaleTo(2,100).and().rotateBy(360,200).moveBy(240, 100, 200).moveTo(240,-10, 600).and().rotateBy(360,200).moveTo(240,100, 100).loop();
   
   
    //METEOR SHOWER 
    meteorShower = new Enemy(0,0,14);
    game.rootScene.on('enterframe',function(){  
        meteorShower.y+=8; 
        if(game.frame === 2500){
            setInterval(function(){
                var randomForMeteor = Math.random() * 1000 / 2;
                meteorShower = new Enemy(randomForMeteor,0,13); 
            },3000);
        }
    });
    
    //LABEL TO DISPLAY THE SCORE
    label = new Label();
    label.x = 10;
    label.y = 10;
    label.text = "Score : 0";
    label.color = "yellow";
    label.font = '36px "verdana"';
    game.rootScene.addChild(label); 


game.rootScene.addEventListener("touchstart",function(){

     //LASER THAT PLAYER SHOOTS
    var laser = new Sprite(16,15);
    laser.image = game.assets['graphic.png'];
    laser.frame = 1;
    laser.x = player.x;
    laser.y = player.y;
    game.rootScene.addChild(laser);

    game.rootScene.on('enterframe',function(){
        laser.x+=10;
        if(laser.intersect(enemy)){
            label.text = "Score : " + game.score++;  
            game.rootScene.removeChild(enemy);
           
            var random = Math.floor(Math.random() * 1000);   
            enemy = new Enemy(random,random,3);
            enemy.tl.moveTo(screen.width / 2, 100, 200).and().rotateBy(360,200).scaleTo(2,200).moveBy(440, 200, 200).moveTo(240,300, 400).and().rotateBy(360,100).moveTo(random,300, 100).loop();
        } else if(laser.intersect(enemy2)){
            label.text = "Score : " + game.score++;
            game.rootScene.removeChild(enemy2);

            var random = Math.floor(Math.random() * 1000);  

            enemy2 = new Enemy(random,random,4);
            enemy2.tl.moveTo(random, screen.height / 2, 200).and().rotateBy(360,100).moveBy(600, 210, 100).moveTo(screen.height / 2,400, 100).scaleTo(2,300).and().rotateBy(360,100).scaleTo(2,100).loop();
        } else if(laser.intersect(enemy3)){
            label.text = "Score : " + game.score++;
                game.rootScene.removeChild(enemy3);

                var random = Math.floor(Math.random() * 1000);

                enemy3 = new Enemy(random - 200,random + 125,5);
                enemy3.tl.moveTo(140, screen.height / 2, 600).and().rotateBy(360,100).moveBy(420, 210, 100).moveTo(-20,100, 100).and().rotateBy(360,100).scaleTo(2,100).moveTo(screen.width + 100,screen.height + 200,300).loop();
        } else if(laser.intersect(enemy4)){
            label.text = "Score : " + game.score++;
            game.rootScene.removeChild(enemy4);

            var random = Math.floor(Math.random() * 1000);

            enemy4 = new Enemy(random + random,random + random,6); 
            enemy4.tl.moveTo(300, 100, 200).and().rotateBy(360,200).scaleTo(2,200).moveBy(200, 200, 200).moveTo(240,300, 100).and().rotateBy(360,100).loop();
        } 
            }); 
        });
    };
    game.start();   
};

