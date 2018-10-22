enchant();

window.onload = function(){
    game = new Game(screen.width,screen.height);
    game.spriteSheetWidth = 16;
    game.spriteSheetHeight = 16;
    game.fps = 31;
    
    game.preload('graphic.png','start.png','gameover.png','music.ogg','laser_player_edit.wav','startScreenMusic.wav','gameOverScreenMusic.wav','alienExplosion.wav','playerExplosion.wav','backgroundImage.png','effect0.png','pad.png', 'apad.png', 'icon0.png', 'font0.png');
    
    Player = Class.create(Sprite,{
        initialize:function(playerX,playerY){
            Sprite.call(this,16,15);
            this.image = game.assets['graphic.png'];
            this.frame = [0];
            this.x = playerX;
            this.y = playerY;
            this.scaleX = 1.4;
            this.scaleY = 1.4;
            game.rootScene.addChild(this);

        },
        onenterframe:function(){
           
            if(this.within(alienEnemy,16)){
                this.explosionFunction();
            } else if(this.within(alienEnemy2,16)){
                this.explosionFunction();
            } else if(this.within(alienEnemy3,16)){
                this.explosionFunction();
            } else if(this.within(alienEnemy4,16)){
                this.explosionFunction();
            } 

            if(this.x > (screen.width - 16) || this.x < 0 || this.y < 0 || (this.y > (screen.height / 1.3))){
                this.explosionFunction();
            }
        },
        explosionFunction:function(){
            
                game.assets['playerExplosion.wav'].play();
                spaceShooterScene.removeChild(this);
                spaceShooterScene.removeChild(playerBullet);
                playerExplosion = new Sprite(game.spriteSheetWidth,game.spriteSheetHeight);
                playerExplosion.image = game.assets['effect0.png'];
                playerExplosion.frame = [0,1,1,2,2,3,3,4,4];
                playerExplosion.x = this.x;
                playerExplosion.y = this.y;
                playerExplosion.scaleX = 1.4;
                playerExplosion.scaleY = 1.4;
                spaceShooterScene.addChild(playerExplosion);
                spaceShooterScene.tl.delay(5).then(function(){
                    spaceShooterScene.removeChild(playerExplosion);
                });
    
                spaceShooterScene.tl.delay(20).then(function(){
                    gameOver();
                });
        }
  });

PlayerBullet = Class.create(Sprite,{
    initialize:function(){
        Sprite.call(this,16,15);
        this.image = game.assets['graphic.png'];
        this.frame = [1];
        this.width = 16;
        this.height = 15;
        this.x = player.x + 6;
        this.y = player.y;
        game.rootScene.addChild(this);
    }
});

  AlienEnemy = Class.create(Sprite,{
    initialize:function(enemyFrame,alienXchord,alienYchord){
        Sprite.call(this,16,15);
        this.image = game.assets['graphic.png'];
        this.frame = enemyFrame;
        this.x = alienXchord;
        this.y = alienYchord;
        spaceShooterScene.addChild(this);

    },
    onenterframe:function(){
        xPosRandom1 = Math.random() * 1000;
        if(playerBullet.within(alienEnemy,16)){
            spaceShooterScene.removeChild(this.playerBullet);
            scoreLabel._score += 1;
            this.explosionEffect();
            setTimeout(function(){
                alienEnemy = new AlienEnemy(3,xPosRandom1,200);  
            },100);  
        }
        this.tl.moveTo(100,70,150).moveBy(50,xPosRandom1,150).moveTo(xPosRandom1,220,150).moveTo(250,xPosRandom1,150).loop();
    },
    explosionEffect:function(){
        game.assets['alienExplosion.wav'].play();
        spaceShooterScene.removeChild(playerBullet);
        spaceShooterScene.removeChild(this); 
        explosion = new Sprite(game.spriteSheetWidth,game.spriteSheetHeight);
        explosion.image = game.assets['effect0.png'];
        explosion.frame = [0,1,1,2,2,3,3,4,4];
        explosion.x = this.x;
        explosion.y = this.y;
        spaceShooterScene.addChild(explosion);
        spaceShooterScene.tl.delay(5).then(function(){
            spaceShooterScene.removeChild(explosion); 
        });
    }
});

AlienEnemy2 = Class.create(Sprite,{
    initialize:function(enemyFrame,alienXchord,alienYchord){
        Sprite.call(this,16,15);
        this.image = game.assets['graphic.png'];
        this.frame = enemyFrame;
        this.scaleX = 1.5;
        this.scaleY = 1.5;
        this.x = alienXchord;
        this.y = alienYchord;
        spaceShooterScene.addChild(this);

    },
    onenterframe:function(){
        xPosRandom2 = Math.random() * 1000;
        if(playerBullet.within(alienEnemy2,20)){
            spaceShooterScene.removeChild(this.playerBullet);
            scoreLabel._score += 1;
            this.explosionEffect2();
            setTimeout(function(){
                alienEnemy2 = new AlienEnemy2(4,xPosRandom2,300);  
            },100);  
        }
        this.tl.moveTo(100,70,200).moveBy(xPosRandom2,150,200).moveTo(xPosRandom2,220,200).moveTo(250,50,200).loop();
    },
    explosionEffect2:function(){
        game.assets['alienExplosion.wav'].play();
        spaceShooterScene.removeChild(playerBullet);
        spaceShooterScene.removeChild(this); 
        explosion2 = new Sprite(game.spriteSheetWidth,game.spriteSheetHeight);
        explosion2.image = game.assets['effect0.png'];
        explosion2.frame = [0,1,1,2,2,3,3,4,4];
        explosion2.x = this.x;
        explosion2.y = this.y;
        explosion2.scaleX = 1.5;
        explosion2.scaleY = 1.5;
        spaceShooterScene.addChild(explosion2);
        spaceShooterScene.tl.delay(5).then(function(){
            spaceShooterScene.removeChild(explosion2); 
        });
    }
});

AlienEnemy3 = Class.create(Sprite,{
    initialize:function(enemyFrame,alienXchord,alienYchord){
        Sprite.call(this,16,15);
        this.image = game.assets['graphic.png'];
        this.frame = enemyFrame;
        this.x = alienXchord;
        this.y = alienYchord;
        spaceShooterScene.addChild(this);

    },
    onenterframe:function(){
        xPosRandom3 = Math.random() * 1000;
        if(playerBullet.within(alienEnemy3,16)){
            spaceShooterScene.removeChild(this.playerBullet);
            scoreLabel._score += 1;
            this.explosionEffect3();
            setTimeout(function(){
                alienEnemy3 = new AlienEnemy3(5,xPosRandom3,300);  
            },100);  
        }
        this.tl.moveTo(xPosRandom3 / 2,70,200).moveBy(50,150,200).moveTo(300,220,200).moveTo(xPosRandom3,50,200).loop();
    },
    explosionEffect3:function(){
        game.assets['alienExplosion.wav'].play();
        spaceShooterScene.removeChild(playerBullet);
        spaceShooterScene.removeChild(this); 
        explosion3 = new Sprite(game.spriteSheetWidth,game.spriteSheetHeight);
        explosion3.image = game.assets['effect0.png'];
        explosion3.frame = [0,1,1,2,2,3,3,4,4];
        explosion3.x = this.x;
        explosion3.y = this.y;
        spaceShooterScene.addChild(explosion3);
        spaceShooterScene.tl.delay(5).then(function(){
            spaceShooterScene.removeChild(explosion3); 
        });
    }
});
AlienEnemy4 = Class.create(Sprite,{
    initialize:function(enemyFrame,alienXchord,alienYchord){
        Sprite.call(this,16,15);
        this.image = game.assets['graphic.png'];
        this.frame = enemyFrame;
        this.x = alienXchord;
        this.y = alienYchord;
        this.scaleX = 2;
        this.scaleY = 2;
        spaceShooterScene.addChild(this);

    },
    onenterframe:function(){
        xPosRandom4 = Math.random() * 1000;
        if(playerBullet.within(alienEnemy4,32)){
            scoreLabel._score += 1;
            this.explosionEffect4();
            spaceShooterScene.removeChild(this.playerBullet);
            setTimeout(function(){
                alienEnemy4 = new AlienEnemy4(6,xPosRandom4,300);  
            },100);  
        }
        this.tl.moveTo(xPosRandom4,70,100).moveBy(50,150,200).moveTo(xPosRandom4,220,200).moveTo(250,50,200).loop();
    },
    explosionEffect4:function(){
        game.assets['alienExplosion.wav'].play();
        spaceShooterScene.removeChild(playerBullet);
        spaceShooterScene.removeChild(this); 
        explosion4 = new Sprite(game.spriteSheetWidth,game.spriteSheetHeight);
        explosion4.image = game.assets['effect0.png'];
        explosion4.frame = [0,1,1,2,2,3,3,4,4];
        explosion4.x = this.x;
        explosion4.y = this.y;
        explosion4.scaleX = 2;
        explosion4.scaleY = 2;
        spaceShooterScene.addChild(explosion4);
        spaceShooterScene.tl.delay(5).then(function(){
            spaceShooterScene.removeChild(explosion4); 
        });
    }
});

MeteorShower = Class.create(Sprite,{
    initialize:function(randomXpos){
        Sprite.call(this,16,16);
        this.image = game.assets['graphic.png'];
        this.frame = [13];
        this.x = randomXpos;
        this.y = -16;
        game.rootScene.addChild(this);
    },
    onenterframe:function(){
        this.y+=10; 
        if(this.within(player,16)){
            spaceShooterScene.removeChild(this);
            spaceShooterScene.removeChild(playerBullet);
            player.explosionFunction();
        }
    }
});
    startScene = function(){

        game.assets['startScreenMusic.wav'].stop();
        spaceShooterScene = new Scene();
        spaceShooterScene.backgroundColor = "black";

        shootButton = new Button("Shoot", "light");
        shootButton.moveTo(screen.width / 1.6,screen.height / 1.3);
        shootButton.scaleX = 2;
        shootButton.scaleY = 2;
        shootButton.addEventListener(Event.TOUCH_START,function(){
            spaceShooterScene.removeChild(playerBullet);
            playerBullet = new Sprite(game.spriteSheetWidth,game.spriteSheetHeight);
            playerBullet.image = game.assets['graphic.png'];
            playerBullet.frame = [1];
            playerBullet.x = player.x + 6;
            playerBullet.y = player.y;
            spaceShooterScene.addChild(playerBullet);
            game.assets['laser_player_edit.wav'].play();
        });
        spaceShooterScene.on(Event.ENTER_FRAME,function(){
            playerBullet.x+=12;
        });
        

        scoreLabel = new enchant.ui.ScoreLabel();
        scoreLabel.moveTo(10,10);

        game.assets['music.ogg'].play();

        player = new Player(screen.width / 6,screen.height / 2.5);

        playerBullet = new PlayerBullet();
        
        alienEnemy = new AlienEnemy(3,screen.width + game.spriteSheetWidth,150);
        alienEnemy2 = new AlienEnemy2(4,screen.width + game.spriteSheetWidth,250);
        alienEnemy3 = new AlienEnemy3(5,screen.width + game.spriteSheetWidth,300);
        alienEnemy4 = new AlienEnemy4(6,screen.width + game.spriteSheetWidth,350);
        
        
        controller = new Pad();
        controller.backgroundColor = 'grey';
        controller.moveTo(screen.width / 12,screen.height / 1.3);
        

        setTimeout(function(){
            setInterval(function(){
                randomXpos = Math.random() * 1000;
                meteorShower1 = new MeteorShower(randomXpos);
                spaceShooterScene.addChild(meteorShower1);
            },1000);
        },20000);
        
        controller.addEventListener(Event.ENTER_FRAME,function(){

            if(game.input.up){
                player.y-=4;
            } else if(game.input.right){
                player.x+=4;
            } else if(game.input.down){
                player.y+=4;
            } else if(game.input.left){
                player.x-=4;
            } 
        });

      
        
        spaceShooterScene.addChild(scoreLabel);
        spaceShooterScene.addChild(player); 
        spaceShooterScene.addChild(controller);
        spaceShooterScene.addChild(shootButton);
        spaceShooterScene.addChild(alienEnemy);
        spaceShooterScene.addChild(alienEnemy2);
        spaceShooterScene.addChild(alienEnemy3);
        spaceShooterScene.addChild(alienEnemy4);
        
        
        game.pushScene(spaceShooterScene);
    }

    gameOver = function(){
        game.popScene(spaceShooterScene);
        game.assets['music.ogg'].stop();
        game.assets['gameOverScreenMusic.wav'].play();
        gameOverScene = new Scene();
        gameOverScene.backgroundColor = "black";
        gameOverImage = new Sprite();
        gameOverImage.image = game.assets['gameover.png'];
        gameOverImage.width = 189;
        gameOverImage.height = 97;
        gameOverImage.x = (screen.width / 2) - (gameOverImage.width / 2);
        gameOverImage.y = (screen.height / 2) - (gameOverImage.height / 2);
        gameOverImage.addEventListener(Event.TOUCH_START,function(){
            game.assets['gameOverScreenMusic.wav'].stop();
            location.reload();
        });
        gameOverScene.addChild(gameOverImage);

        endScoreLabel = new enchant.ui.MutableText();
        endScoreLabel.moveTo(gameOverImage.x,gameOverImage.y - 50);
        endScoreLabel.text = "Your Score: " + scoreLabel._score;
        gameOverScene.addChild(endScoreLabel);

        playAgainInfoLabel = new enchant.ui.MutableText();
        playAgainInfoLabel.moveTo((screen.width / 2) - 120,gameOverImage.y + 125);
        playAgainInfoLabel.text = "Click GAME OVER.";
        gameOverScene.addChild(playAgainInfoLabel);

        game.pushScene(gameOverScene);
    }

    startScreen = function(){
        game.assets['startScreenMusic.wav'].play();
        start = new Scene();
        backgroundImage = new Sprite();
        backgroundImage.image = game.assets['backgroundImage.png'];
        backgroundImage.width = screen.width;
        backgroundImage.height = screen.height;
        start.addChild(backgroundImage);

        nameLabel = new enchant.ui.MutableText();
        nameLabel.moveTo((screen.width / 2) - 152,screen.height / 3);
        nameLabel.scaleX = 1;
        nameLabel.scaleY = 2.2;
        nameLabel.text = "SPACE ALIEN SHOOTER";
        start.addChild(nameLabel);

        startImage = new Sprite();
        startImage.image = game.assets['start.png'];
        startImage.width = 236;
        startImage.height = 48;
        startImage.x = (screen.width / 2) - (startImage.width / 2);
        startImage.y = screen.height / 2;
        startImage.addEventListener(Event.TOUCH_START,function(){
            game.popScene(start);
            startScene();
        });
        start.addChild(startImage);

        game.pushScene(start);
    }

    game.onload = function(){
        startScreen();
    }
    game.start();
}

