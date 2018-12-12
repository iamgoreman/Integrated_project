var bg;
var score =0;
var scoreText;
// create a new scene
let gameScene = new Phaser.Scene('Game');




var Bullet = new Phaser.Class({

Extends: Phaser.GameObjects.Image,

initialize:

 function Bullet(scene)  {
        Phaser.GameObjects.Image.call(this,scene, 0 , 0, 'bullet');
        this.speed = 10;
        this.setSize(1,1,true);
        
    
    },
    
    fire: function (shooter){
    
        this.setPosition(shooter.x+20, shooter.y)
    },
    
    update: function(){
        this.x += this.speed;
        
        if(this.x > 800){
        this.setActive(false);
        this.setVisible(false);
        }
    }


})

var enemyBullet = new Phaser.Class({

Extends: Phaser.GameObjects.Image,

initialize:

 function Bullet(scene)  {
        Phaser.GameObjects.Image.call(this,scene, 0 , 0, 'bullet');
        this.speed = 15;
        this.setSize(1,1,true);
        this.nextFire = 0;
    
    },
    
    fire: function (shooter){
    
        this.setPosition(shooter.x-20, shooter.y)
    },
    
    update: function(){
        this.nextFire +=.5
        if(this.nextFire >=70)
        this.x -= this.speed;
        
        
        if(this.x < -5){
        this.setActive(false);
        this.setVisible(false);
        }
    }


})

var enemyShoot = function(enemy,time)
{
    
    
}


var onHit = function(enemyHit, bulletHit)
{
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        enemyHit.destroy();
        

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
        
        score += 10;
    }
}

var onPlayerHit = function(playerHit, bulletHit)
{
    // Reduce health of enemy
    if (bulletHit.active === true && playerHit.active === true)
    {
        

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
 
        if(gameScene.lives.getLength() == 3){
            gameScene.lives.remove(gameScene.lives.getChildren()[2],true);
            }
        
        else if(gameScene.lives.getLength() == 2){
            gameScene.lives.remove(gameScene.lives.getChildren()[1],true);
            }
        else if(gameScene.lives.getLength() == 1){
            gameScene.lives.remove(gameScene.lives.getChildren()[0],true);
            gameScene.gameOver();
            }
        
        
        
    
    }
}





// some parameters for our scene
gameScene.init = function() {
  this.playerSpeed = 1.5;
  this.fan = click;
}

// load assets
gameScene.preload = function(){
  // load images
    var progress = this.add.graphics();

    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0x2067d8, 1);
        progress.lineWidth=10;
        progress.strokeStyle = '#d82020';
       // progress.strokeRect(gameScene.sys.game.config.width / 3, gameScene.sys.game.config.height / 1.5, 2200, 30);
        progress.fillRect(gameScene.sys.game.config.width / 3, gameScene.sys.game.config.height / 1.5, 220 * (value), 30);

    });
    
  this.load.image('background', 'assets/images/background.png');
  this.load.image('player', 'assets/images/hero ship.png');
    
  this.load.image('enemy', 'assets/images/enemy1.png');
    this.load.image('enemy2', 'assets/images/enemy2.png');
    this.load.image('enemy3', 'assets/images/enemy3.png');
    this.load.image('spec_enemy', 'assets/images/special_enemy.png');
    
  this.load.image('treasure', 'assets/images/bullet.png');
    this.load.image('power', 'assets/images/power_up.png');
    this.load.image('star1', 'assets/images/star1.png');
    this.load.image('star2', 'assets/images/star1.png');
  this.load.image('planet', 'assets/images/planet.png');
    this.load.image('planet2', 'assets/images/planet_1.png');
    
  this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('enem_bullet1', 'assets/images/bullet1.png');
    this.load.image('enem_bullet2', 'assets/images/bullet2.png');
    this.load.image('enem_bullet3', 'assets/images/bullet3.png');
    this.load.image('enem_bullet4', 'assets/images/bullet4.png');
    this.load.image('dir_button', 'assets/images/direction.png');
    this.load.image('fire_button', 'assets/images/fire.png');
  this.load.audio('fanfare','./music/05 - Stephan Wells - Item Acquisition Fanfare.ogg'
                             
  );    
    
};

// called once after the preload ends
gameScene.create = function() {
   /* var listener = new Phaser.Events.EventEmitter();
    
   listener.on(this.input.activePointer.isDown, shoot(), this);
    
    function shoot(pointer) {
        var bullet = this.bullets.get(pointer.x, pointer.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = -200;
        }
    }*/
    console.log(gameScene.fan);
    this.music = this.sound.add('fanfare');
    
 /*   this.input.keyboard.on('keyup_D',function(event){
        click =true;
        console.log(click);
        
    },this)*/
  
    if(gameScene.fan){
        gameScene.music.play();
    }
    
    
    
        
   
  // create bg sprite
  bg = this.add.tileSprite(0, 0,640,360, 'background');

  // change the origin to the top-left corner
  bg.setOrigin(0,0);
    
    this.planet = this.add.tileSprite(600, 50,32,32, 'planet');

  // create the player
  this.player = this.physics.add.sprite(140,  this.sys.game.config.height / 2, 'player');

  // we are reducing the width and height by 50%
  this.player.setScale(0.8);

    scoreText = this.add.text(300, 16, 'score: '+score, { fontSize: '12px', fill: '#fff' });

    
  this.leftbutton = this.physics.add.sprite(30,90,'dir_button');
    this.leftbutton.setScale(1,1.50);
    this.leftbutton.setInteractive();
    
    this.rightbutton = this.physics.add.sprite(30,230,'dir_button');
    this.rightbutton.setInteractive();
    this.rightbutton.setScale(1,1.50);
    this.rightbutton.setAngle(180);
    
    this.firebutton = this.physics.add.sprite(90,155,'fire_button');
    this.firebutton.setInteractive();
    this.firebutton.setScale(1,1.33);
    
  // goal

    this.playerBullets = this.physics.add.group({ 
        key: 'bullet',
        classType: Bullet, 
        runChildUpdate: true ,
        repeat: 5 , 
        setXY: {
        x:-50,
        y:-50
        
    }
            
    });
    
    this.enemy1Bullets = this.physics.add.group({ 
        key: 'enem_bullet1ullet1',
        classType: Bullet, 
        runChildUpdate: true ,
        repeat: 3 , 
        setXY: {
        x:-100,
        y:-100
        }
            
    });
    
  
  this.lives = this.physics.add.group({
      key: 'player',
      repeat:2,
      setXY:{
         x:600,
         y:20,
          stepX:15
      
            }
      
      
  });
    
    
    Phaser.Actions.ScaleXY(gameScene.lives.getChildren(), -0.6, -0.6);
    Phaser.Actions.Rotate(gameScene.lives.getChildren(),4.70);
    
  this.enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 4,
        setXY: {
          x: 600,
          y: 100,
          stepX: 0,
          stepY: 40
        }

    });
    
    this.pathEnemies = this.physics.add.group();
    
    
        this.followers = this.physics.add.group({
        repeat: 3
        
        

    });
    
    
        /*pathing for enemy type two*/
    var graphics = this.add.graphics();

    var path = new Phaser.Curves.Path(700 ,155 );

    for (var i = 0; i < 9; i++)
    {
        // xRadius, yRadius, startAngle, endAngle, clockwise, rotation
        if (i % 2 === 0)
        {
            path.ellipseTo(-80, -140, -180, -360, false, 0);
        }
        else
        {
            path.ellipseTo(-80, -140, -180, -360, true, 0);
        }
    }

    graphics.lineStyle(1, 0xffffff, 0);

    path.draw(graphics);
    //console.log(gameScene.followers.getChildren()[0]);
    
    

    
    for (var i = 0; i < 3; i++)
    {
        var follower = this.add.follower(path, 100, 100 , 'enemy');
        
            gameScene.followers.getChildren()[i] = follower;       

            gameScene.followers.getChildren()[i].startFollow({
            duration: 40000,
            positionOnPath: true,
            repeat: -1,
            ease: 'Linear',
            delay: i * 600
                
            
        });
        gameScene.pathEnemies.add(gameScene.followers.getChildren()[i]);
    }
    
    console.log(gameScene.followers.getLength());


     
    this.leftbutton.on('pointerdown',function(event){
        
        console.log("sjdhf");
        gameScene.player.setVelocity(0,-100);
        
        
    },this);
    
    this.leftbutton.on('pointerup',function(event){
        
        console.log("sjdhf");
        gameScene.player.setVelocity(0);
        
        
    },this);
    
    this.rightbutton.on('pointerdown',function(event){
        
        console.log("sjdhf");
        gameScene.player.setVelocity(0,100);
        
        
    },this);
    
    this.rightbutton.on('pointerup',function(event){
        
        console.log("sjdhf");
        gameScene.player.setVelocity(0);
        
        
    },this);
    
    this.firebutton.on('pointerdown',function(event){
        
      var bullet = this.playerBullets.get().setActive(true).setVisible(true);
        console.log("sjdhf");
        if (bullet)
        {
            bullet.fire(this.player);
        
        }
        
    },this);
    
   /* this.bullets = this.physics.add.group({
        key:'bullet',
        maxSize:10
        
    });*/
    
  /*  this.input.on('pointerdown', function () {
        

        // Get bullet froy bullets group
        var bullet = this.playerBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(this.player);
        
        }
    }, this);*/
    
//    gameScene.enemies.add(gameScene.followers.getChildren();
    

    
    var collider2 = gameScene.physics.add.collider(gameScene.playerBullets, gameScene.enemies,onHit);
    var collider3 = gameScene.physics.add.collider(gameScene.player, gameScene.enemy1Bullets,onPlayerHit);
    var collider1 = gameScene.physics.add.collider(gameScene.playerBullets, gameScene.pathEnemies,onHit);
    console.log(gameScene.enemies);
    console.log(gameScene.followers);
    
};




// this is called up to 60 times per second
gameScene.update = function(){
    
   var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
   
        scoreText.setText('Score: '+score);
       
    
    
    
    bg.tilePositionX+= .15;
    gameScene.planet.x-= .05;
    


};

// end the game
gameScene.gameOver = function() {
    this.scene.start('Menu');
  
}




/*sceneA.preload = function(){
  // load images
  this.load.image('background', 'assets/images/background.png');
  this.load.image('player', 'assets/images/hero ship.png');
  this.load.image('enemy', 'assets/images/enemy1.png');
  this.load.image('treasure', 'assets/images/bullet.png');
  this.load.image('planet', 'assets/images/planet.png');
  this.load.image('bullet', 'assets/images/bullet.png');
    
};

sceneA.create = function (){
    this.player = this.add.sprite(40,  this.sys.game.config.height / 2, 'player');
    this.player.setScale(5);
    
    this.input.once('pointerdown', function () {

            

            this.scene.start('gameScene');

        }, this);
}

sceneA.update = function(){
    
    sceneA.player.x += 1
}*/


// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 640,
  height: 360,
  physics: {
        default: 'arcade',
        arcade: {
            
            debug: false
        }
    },
  scene: [menu,gameScene],
    pixelArt:true
    
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

