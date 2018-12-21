var bg;
var score =0;
var scoreText;
var upgrade = false;
var sound = false;
var counter1=0;
var counter2=0;
var counter3=0;
var counter4=0;
var counter5=0;
var counter6=0;
var counter7=0;
var counter8=0;
// create a new scene
let gameScene = new Phaser.Scene('Game');




var Bullet = new Phaser.Class({

Extends: Phaser.GameObjects.Image,

initialize:

 function Bullet(scene)  {
        Phaser.GameObjects.Image.call(this,scene, 0 , 0, 'bullet');
        this.speed = 400;
        this.setSize(1,1,true);
        this.nextFire = 0;
    
    },
    
    fire: function (x,y){
    
        this.setPosition(x+20,y)
    },
    
    update: function(){
        
        this.body.setVelocity(this.speed,0);
       
        if(this.x > gameScene.sys.game.config.width){
        
        this.setActive(false).setVisible(false);
        this.body.setVelocity(0,0);
        }
    }


})

var EnemyBulletTrack = new Phaser.Class({

Extends: Phaser.GameObjects.Image,

initialize:

 function EnemyBulletTrack(scene)  {
        Phaser.GameObjects.Image.call(this,scene, 0 , 0, 'enem_bullet2');
        this.speed = .2;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(2, 2, true);
        this.direction =0; 
    
    },
    
    fire: function (shooter,target){
    
        
        this.setPosition(shooter.x,shooter.y);
        this.direction = Math.atan((target.x-this.x)/(target.y-this.y))
        
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }
        
        
    },
    
    update: function(time,delta){
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        if(this.x < - 20){
            this.setActive(false);
            this.setVisible(false);
            this.body.setVelocity(0,0);
        }
        
    }


})

var EnemyBulletStraight = new Phaser.Class({

Extends: Phaser.GameObjects.Image,

initialize:

 function EnemyBulletStraight(scene)  {
        Phaser.GameObjects.Image.call(this,scene, 0 , 0, 'enem_bullet1');
        this.speed = .2;
        this.setSize(2, 2, true);
        
    
    },
    
    fire: function (shooter){
        this.setPosition(shooter.x,shooter.y);
    },
    
    update: function(time,delta){
        this.x -= this.speed * delta;
        if(this.x < - 20){
            
            this.setActive(false);
            this.setVisible(false);
            this.body.setVelocity(0,0);
        }
        
    }


})

var EnemyBulletExpand = new Phaser.Class({

Extends: Phaser.GameObjects.Image,

initialize:

 function EnemyBulletExpand(scene)  {
        Phaser.GameObjects.Image.call(this,scene, 0 , 0, 'enem_bullet4');
        this.speed = .2;
    },
    
    fire: function (shooter){
        this.setScale(1,1);
        this.setPosition(shooter.x,shooter.y);
    },
    
    grow:function(){
        if(this.scaleX < 1.8) {
    // make the player grow
            this.scaleX += (0.01 / this.scaleX);
            this.scaleY += (0.01 / this.scaleY);
        
        }     
    },
    
    
    update: function(time,delta){
        this.x -= this.speed * delta;
        if(this.x < - 20){
            
            this.setActive(false);
            this.setVisible(false);
            this.body.setVelocity(0,0);
        }
        
        this.grow();
    }

})

var Enemy = new Phaser.Class({
    
    Extends: Phaser.GameObjects.Sprite,
    
    initialize:
    
    function Enemy(scene){
        Phaser.GameObjects.Sprite.call(this,scene, 0 , 0, 'enemy');
        this.texture = 'enemy1';
        this.speed = 20;
        this.xSpeed = -10;
        this.ySpeed = 5;
        this.setAngle(90);
        gameScene.physics.world.enable(Enemy);
        this.setScale(.5,.5);
        
        
    },
    
    zigzag: function(){
        this.body.setVelocity(this.xSpeed,(this.ySpeed*this.speed));
        if(this.y<10){
        this.speed = 20
         this.body.setVelocity(this.xSpeed,(this.ySpeed*this.speed));   
        }
        else if(this.y>gameScene.sys.game.config.height - 50){
            this.speed = -20
            this.body.setVelocity(this.xSpeed,(this.ySpeed*this.speed));   
        }
        
    },
    
    fire: function(){
        if(this.x<gameScene.sys.game.config.width){
        var bullet = gameScene.enemy2Bullets.get().setActive(true).setVisible(true);;
            if(bullet){
                bullet.fire(this,gameScene.player);
            }
        }
    
    },
    
    update: function(fireRandom,time){
        
            fireRandom = Phaser.Math.Between(0,1000);
        
            if(fireRandom%1000==0){
              this.fire();
            }
        
        
        this.zigzag(); 
        
        if(this.x<-15){
            this.destroy();
        }
    }
    
});

var Enemy1 = new Phaser.Class({
    
    Extends: Phaser.GameObjects.Sprite,
    
    initialize:
    
    function Enemy1(scene){
        Phaser.GameObjects.Sprite.call(this,scene, 0 , 0, 'enemy');
        this.texture = 'enemy1';
        this.speed = -20;
        gameScene.physics.world.enable(Enemy1);
        this.setScale(.2,.2);
        
    },
    
    
    fire: function(){
        var bullet = gameScene.enemy1Bullets.get().setActive(true).setVisible(true);;
        if(bullet){
            bullet.fire(this);
        }
    
    },
    
    update: function(fireRandom,time){
        
        fireRandom = Phaser.Math.Between(0,1000);
            if(fireRandom%1000==0){
              this.fire();
        }
        this.body.setVelocityX(this.speed); 
        
        if(this.x<-15){
            this.destroy();
        }
    }
    
});

var Enemy2 = new Phaser.Class({
    
    Extends: Phaser.GameObjects.Sprite,
    
    initialize:
    
    function Enemy2(scene){
        Phaser.GameObjects.Sprite.call(this,scene, 0 , 0, 'enemy');
        this.texture = 'enemy1';
        this.speed = -20;
        this.setRotation(90);
        gameScene.physics.world.enable(Enemy2);
        
        
    },
    
    
    
    fire: function(){
        var bullet = gameScene.enemy3Bullets.get().setActive(true).setVisible(true);
        if(bullet){
            bullet.setScale(1,1);
            bullet.fire(this);
        }
    
    },
    
    update: function(fireRandom,time){
        
        fireRandom = Phaser.Math.Between(0,1000);
            if(fireRandom%1000==0){
              this.fire();
        }
        
        this.body.setVelocityX(this.speed); 
        
        if(this.x<-15){
            this.destroy();
        }
        
    }
    
});


var onHit = function(enemyHit, bulletHit)
{
    if (bulletHit.active === true && enemyHit.active === true)
    {
        /*enemyHit.anims.play('death');*/
        if(sound === true){
           gameScene.explosion.play(); 
        }
        
        enemyHit.body.setVelocity(0,0);
        enemyHit.destroy();
        bulletHit.body.setVelocity(0,0);
        bulletHit.setActive(false).setVisible(false);
        score += 10;
    }
};

var onPlayerHit = function(playerHit, bulletHit)
{
    // Reduce health of enemy
    if (bulletHit.active === true && playerHit.active === true)
    {
        

        // Destroy bullet
        bulletHit.body.setVelocity(0,0)
        bulletHit.setActive(false).setVisible(false);
        upgrade = false;
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
};

var onSpecHit = function(enemyHit, bulletHit)
{
    if (bulletHit.active === true && enemyHit.active === true)
    {
        if(sound === true){
           gameScene.explosion.play(); 
        }
        gameScene.powerUp.setPosition(enemyHit.x,enemyHit.y)
        enemyHit.destroy();
        bulletHit.body.setVelocity(0,0)
        bulletHit.setActive(false).setVisible(false);
        score += 50;
        gameScene.powerUp.body.setVelocityX(-50);
        
    }
};

var onPowerUpHit = function(playerHit, powerHit)
{
    if (playerHit.active === true && powerHit.active === true)
    {
        upgrade = true;
        powerHit.destroy();
        playerHit.body.setVelocityX(0);
    }
};



// some parameters for our scene
gameScene.init = function() {
  this.playerSpeed = 1.5;
  sound = click;
}

// load assets
gameScene.preload = function(){
  // load images
    var loading = this.add.graphics();

    this.load.on('loading', function (value) {

        loading.clear();
        loading.fillStyle(0x2067d8, 1);
        loading.lineWidth=10;
        loading.strokeStyle = '#d82020';
       // progress.strokeRect(gameScene.sys.game.config.width / 3, gameScene.sys.game.config.height / 1.5, 2200, 30);
        loading.fillRect(gameScene.sys.game.config.width / 3, gameScene.sys.game.config.height / 1.5, 220 * (value), 30);

    });
    
  this.load.image('background', 'assets/images/background.png');
  this.load.image('player', 'assets/images/hero ship_new.png');
    
  this.load.image('enemy', 'assets/images/enemy1_new.png');
    this.load.image('enemy2', 'assets/images/enemy2_new.png');
    this.load.image('enemy3', 'assets/images/enemy3_new.png');
    this.load.image('spec_enemy', 'assets/images/special_enemy.png');
    
  this.load.image('treasure', 'assets/images/bullet.png');
    this.load.image('power', 'assets/images/power_up.png');
    this.load.image('star1', 'assets/images/star1.png');
    this.load.image('star2', 'assets/images/star1.png');
  this.load.image('planet', 'assets/images/planet.png');
    this.load.image('planet2', 'assets/images/planet_1.png');
    
  this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('enem_bullet1', 'assets/images/bullet1_new.png');
    this.load.image('enem_bullet2', 'assets/images/bullet2_new.png');
    this.load.image('enem_bullet3', 'assets/images/bullet3_new.png');
    this.load.image('enem_bullet4', 'assets/images/bullet5.png');
    this.load.image('dir_button', 'assets/images/direction.png');
    this.load.image('fire_button', 'assets/images/fire.png');
    this.load.atlas('power_up_anim', 'assets/images/powerup.png', 'assets/images/powerup.json');
    this.load.atlas('death_anim', 'assets/images/enemy_death.png', 'assets/images/enemy_death.json');
  this.load.audio('fanfare',
    ['./music/05 - Stephan Wells - Item Acquisition Fanfare.ogg',
     './music/05 - Stephan Wells - Item Acquisition Fanfare.mp3'                  
     ]); 
    this.load.audio('laser',
    ['assets/sound/Laser.mp3',
    'assets/sound/Laser.ogg']
                   ); 
    this.load.audio('explosion',
    ['assets/sound/explosion.mp3',
    'assets/sound/explosion.ogg']
                   ); 
    
};

gameScene.create = function() {

    this.explosion = this.sound.add('explosion');
    this.laser = this.sound.add('laser');

  // create bg sprite
  bg = this.add.tileSprite(0, 0,640,360, 'background');

  // change the origin to the top-left corner
  bg.setOrigin(0,0);
    
    this.planet = this.add.tileSprite(600, 50,32,32, 'planet');

  // create the player
  this.player = this.physics.add.sprite(140,  this.sys.game.config.height / 2, 'player');

  // we are reducing the width and height by 50%
  this.player.setScale(0.5);

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
    
    this.pause = this.add.text(400,8,'Mute',{
        fontSize: '12px',
        fill:'#fff'
    });
    this.pause.setInteractive();
    
  // goal

    this.playerBullets = this.physics.add.group({ 
        key: 'bullet',
        classType: Bullet, 
        runChildUpdate: true ,
        repeat: 12 , 
        setXY: {
        x:-50,
        y:-50
        
    }
            
    });
   
    this.enemy1Bullets = this.physics.add.group({ 
        key: 'enem_bullet2',
        classType: EnemyBulletStraight, 
        runChildUpdate: true,
        repeat:20
        
            
    });
    Phaser.Actions.ScaleXY(gameScene.enemy1Bullets.getChildren(),-.4,-.4);
    
    this.enemy2Bullets = this.physics.add.group({ 
        key: 'enem_bullet1',
        classType: EnemyBulletTrack, 
        runChildUpdate: true,
        repeat:20
        
            
    });
    Phaser.Actions.ScaleXY(gameScene.enemy2Bullets.getChildren(),-.4,-.4);
    
    this.enemy3Bullets = this.physics.add.group({ 
        key: 'enem_bullet3',
        classType: EnemyBulletExpand, 
        runChildUpdate: true,
        repeat:20
        
            
    });
    Phaser.Actions.ScaleXY(gameScene.enemy3Bullets.getChildren(),-.4,-.4);
    
  
  this.lives = this.physics.add.group({
      key: 'player',
      repeat:2,
      setXY:{
         x:600,
         y:20,
         stepX:15
      
            },
        setScale:{
             x:.24,
             y:.24
            }
      
      
  });
  Phaser.Actions.Rotate(gameScene.lives.getChildren(),4.70);
    
  this.totalEnemies = this.physics.add.group({
      runChildUpdate:true,
    });
    
  this.enemy1_Group1 = this.physics.add.group({
      key:'enemy',
      classType:Enemy1,
      runChildUpdate:true,
      repeat:5,
      setXY:{
      x: this.sys.game.config.width,
      y:30,
      stepY:50
  },
    
        setScele:{
            x:.5,
            y:.5
        }
  });  
    Phaser.Actions.ScaleXY(gameScene.enemy1_Group1.getChildren(),-.4,-.4);
    Phaser.Actions.Rotate(gameScene.enemy1_Group1.getChildren(),1.57);
    
    
    this.enemy1_Group2 = this.physics.add.group({
      key:'enemy',
      classType:Enemy1,
      runChildUpdate:true,
      repeat:5,
      setXY:{
      x: this.sys.game.config.width+100,
      y:500,
      stepX:30,
      stepY:50
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy1_Group2.getChildren(),-.4,-.4);
    
    this.enemy1_Group3 = this.physics.add.group({
      key:'enemy',
      classType:Enemy1,
      runChildUpdate:true,
      repeat:5,
      setXY:{
      x: this.sys.game.config.width+100,
      y:500,
      stepX:-30,
      stepY:50
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy1_Group3.getChildren(),-.4,-.4);
    
    this.enemy2_Group1 = this.physics.add.group({
      key:'enemy',
      classType:Enemy,
      runChildUpdate:true,
      repeat:5,
      setXY:{
      x: this.sys.game.config.width+500,
      y:20,
      stepX:30,
      stepY:15
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy2_Group1.getChildren(),-.4,-.4);
    
    this.enemy2_Group2 = this.physics.add.group({
      key:'enemy',
      classType:Enemy,
      runChildUpdate:true,
      repeat:5,
      setXY:{
      x: this.sys.game.config.width+700,
      y:20,
      stepX:30,
      stepY:15
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy2_Group2.getChildren(),-.4,-.4);
    
    this.enemy2_Group3 = this.physics.add.group({
      key:'enemy',
      classType:Enemy,
      runChildUpdate:true,
      repeat:5,
      setXY:{
      x: this.sys.game.config.width+900,
      y:20,
      stepX:30,
      stepY:15
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy2_Group3.getChildren(),-.4,-.4);
    
    this.enemy3_Group1 = this.physics.add.group({
      key:'enemy',
      classType:Enemy2,
      runChildUpdate:true,
      repeat:2,
      setXY:{
      x: this.sys.game.config.width+500,
      y:900,
      stepX:30,
      stepY:15
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy3_Group1.getChildren(),-.4,-.4);
    
    this.enemy3_Group2 = this.physics.add.group({
      key:'enemy',
      classType:Enemy2,
      runChildUpdate:true,
      repeat:2,
      setXY:{
      x: this.sys.game.config.width+700,
      y:900,
      stepX:30,
      stepY:15
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy3_Group2.getChildren(),-.4,-.4);
    
    this.enemy3_Group3 = this.physics.add.group({
      key:'enemy',
      classType:Enemy2,
      runChildUpdate:true,
      repeat:2,
      setXY:{
      x: this.sys.game.config.width+900,
      y:900,
      stepX:900,
      stepY:15
      
    }
      
  });
    Phaser.Actions.ScaleXY(gameScene.enemy3_Group3.getChildren(),-.4,-.4);
   
    Phaser.Actions.Rotate(gameScene.enemy1_Group1.getChildren(),4.70);
    
    this.totalEnemies.addMultiple(gameScene.enemy1_Group1.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy1_Group2.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy1_Group3.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy2_Group1.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy2_Group2.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy2_Group3.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy3_Group1.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy3_Group2.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy3_Group3.getChildren());
    /*this.totalEnemies.addMultiple(gameScene.enemy2_Group2.getChildren());
    this.totalEnemies.addMultiple(gameScene.enemy2_Group3.getChildren());*/
/*  this.specEnemy = this.physics.add.sprite(300,50,'spec_enemy');
  this.powerUp = this.physics.add.sprite(0,550,'power');*/
    
    let anim_frames = this.anims.generateFrameNames('power_up_anim',{
        start:0,
        end:2,
        prefix:'power up',
        suffix:'.png'
        
    });
    this.anims.create({
        key:'flashing',
        frames:anim_frames,
        frameRate:9,
        repeat:-1
    });
    
   // this.powerUp.anims.play('flashing');
    
   /* let deathFrames = this.anims.generateFrameNames('death_anim',{
        start:0,
        end:12,
        prefix:'enemy_death',
        suffix:'.png'
        
    });
    
    this.anims.create({
        key:'death',
        frames:deathFrames,
        frameRate:11,
        repeat:-1
    });*/



    
    
        /*pathing for enemy type two*/
   /* var graphics = this.add.graphics();

    var path = new Phaser.Curves.Path(700 ,155 );

    for (var i = 0; i < 9; i++)
    {
        
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
    
    

    console.log(gameScene.testBullets.classType);
    for (var i = 0; i < gameScene.testEnemies.getLength(); i++)
    {
        var follower = this.add.follower(path, 100, 100 , 'enemy');
        
            this.physics.world.enable(follower);
            follower.classType = Enemy;
            console.log(follower.classType);
            follower.runChildUpdate = true
            console.log(follower);
            gameScene.testEnemies.getChildren()[i] = follower;       

            gameScene.testEnemies.getChildren()[i].startFollow({
            duration: 40000,
            positionOnPath: true,
            repeat: -1,
            ease: 'Linear',
            delay: i * 600
            
                
            
        });
        gameScene.enemies.add(gameScene.testEnemies.getChildren()[i]);
    }
    
    
    console.log(gameScene.followers.getLength());*/


     
    this.leftbutton.on('pointerdown',function(event){
        if(gameScene.player.y<=20 ){
            gameScene.player.setVelocity(0,0); 
        }
        else{
            gameScene.player.setVelocity(0,-100);
        }
        
    },this);
    
    this.leftbutton.on('pointerup',function(event){

        gameScene.player.setVelocity(0);
    },this);
    
    this.rightbutton.on('pointerdown',function(event){
        if(gameScene.player.y>= this.sys.game.config.height-20){
            gameScene.player.setVelocity(0,0); 
        }
        else{
            gameScene.player.setVelocity(0,100);
        }
    },this);
    
    this.rightbutton.on('pointerup',function(event){ console.log("sjdhf");
        gameScene.player.setVelocity(0);
                                                    
    },this);
    
    this.firebutton.on('pointerdown',function(event){
     if(upgrade === true){   
      var bullet1 = this.playerBullets.get().setActive(true).setVisible(true);
      var bullet2 = this.playerBullets.get().setActive(true).setVisible(true);
        if (bullet1 && bullet2)
        {
            bullet1.fire(this.player.x,this.player.y -10);
            bullet2.fire(this.player.x,this.player.y +10);
        }  
     }
        
    else{
        var bullet = this.playerBullets.get().setActive(true).setVisible(true);
        if(bullet){
            bullet.fire(this.player.x,this.player.y);
        }
        
        
    }
     if(sound){
            gameScene.laser.play();
        }    
        
    },this);
    
    this.pause.on('pointerdown',function(event){
            if(sound === true){
                sound = false;
            }
        else if(sound === false){
            sound = true;
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
    

    var collider1 = gameScene.physics.add.collider(gameScene.playerBullets, gameScene.totalEnemies,onHit);
    
    var collider3 = gameScene.physics.add.collider(gameScene.player, gameScene.enemy1Bullets,onPlayerHit);
    var collider3 = gameScene.physics.add.collider(gameScene.player, gameScene.enemy2Bullets,onPlayerHit);
    var collider3 = gameScene.physics.add.collider(gameScene.player, gameScene.enemy3Bullets,onPlayerHit);
   /* var collider4 = gameScene.physics.add.collider(gameScene.player, gameScene.testBullets,onPlayerHit);
    var collider5 = gameScene.physics.add.collider(gameScene.playerBullets, gameScene.specEnemy,onSpecHit);
    var collider6 = gameScene.physics.add.collider(gameScene.player, gameScene.powerUp,onPowerUpHit);*/
    
    
};




// this is called up to 60 times per second
gameScene.update = function(){
    if(gameScene.enemy1_Group1.countActive() == 0){
        while(counter1<=gameScene.enemy1_Group2.getLength()){
            var i = 1;
        Phaser.Actions.Call(gameScene.enemy1_Group2.getChildren(), function(enemy) {
            
            enemy.setPosition((this.sys.game.config.width)+(30*i),0+(40*i));
            
            
            i++;
           counter1++;
            }, this);
        }
       
            }
    
    if(gameScene.enemy1_Group2.countActive() == 0){
        while(counter2<=gameScene.enemy1_Group3.getLength()){
            var i = 1;
        Phaser.Actions.Call(gameScene.enemy1_Group3.getChildren(), function(enemy) {
            
            enemy.setPosition((this.sys.game.config.width)-(15*i),0+(50*i));
         
            
            i++;
           counter2++;
            }, this);
        }
       
            }
    
    if(gameScene.enemy1_Group3.countActive() == 0){
        while(counter3<=gameScene.enemy2_Group1.getLength()){
            var i = 1;
        Phaser.Actions.Call(gameScene.enemy2_Group1.getChildren(), function(enemy) {
            enemy.setPosition((this.sys.game.config.width-10)+(30*i),0+(20*i));
            i++;
           counter3++;
            }, this);
        }
    }
       
            
    
    if(gameScene.enemy2_Group1.countActive() == 0){
        while(counter4<=gameScene.enemy2_Group2.getLength()){
            var i = 1;
        Phaser.Actions.Call(gameScene.enemy2_Group2.getChildren(), function(enemy) {
            enemy.setPosition((this.sys.game.config.width-10)+(30*i),(this.sys.game.config.height-60)-(20*i));
            i++;
           counter4++;
            }, this);
        }
    }
       
            
    
    if(gameScene.enemy2_Group2.countActive() == 0){
        while(counter5<=gameScene.enemy2_Group3.getLength()){
            var i = 1;
        Phaser.Actions.Call(gameScene.enemy2_Group3.getChildren(), function(enemy) {
            enemy.setPosition((this.sys.game.config.width-10)+(30*i),(this.sys.game.config.height/1.8)-(20*i));
            i++;
           counter5++;
            }, this);
        }
       
            }    
    
    if(gameScene.enemy2_Group3.countActive() == 0){
        while(counter6<=gameScene.enemy3_Group1.getLength()){
            var i = 1;
        Phaser.Actions.Call(gameScene.enemy3_Group1.getChildren(), function(enemy) {
            
            enemy.setPosition((this.sys.game.config.width)+(30*i),0+(40*i));
            
            
            i++;
           counter6++;
            }, this);
        }
       
            }
    
    if(gameScene.enemy3_Group1.countActive() == 0){
        while(counter7<=gameScene.enemy3_Group2.getLength()){
            var i = 1;
        Phaser.Actions.Call(gameScene.enemy3_Group2.getChildren(), function(enemy) {
            
            enemy.setPosition((this.sys.game.config.width)-(15*i),0+(50*i));
         
            
            i++;
           counter7++;
            }, this);
        }
       
            }
    
    if(gameScene.enemy3_Group3.countActive() == 0){
        gameScene.gameOver();
    }
        
   if(sound===true){
      gameScene.pause.setText('Mute');
      }
      
    else if(sound===false){
        gameScene.pause.setText('Unmute');
    }
    scoreText.setText('Score: '+score);
    
    bg.tilePositionX+= .15;
    gameScene.planet.x-= .05;
    if(gameScene.player.y<=0){
        gameScene.player.y=20;
    }
    else if(gameScene.player.y>=this.sys.game.config.height){
        gameScene.player.y=this.sys.game.config.height - 20;
    }
    
};


gameScene.gameOver = function() {
   
    this.gameoverText = this.add.text((this.sys.game.config.width /2)-24, (this.sys.game.config.height /2)-12, 'Final Score: '+score, { fontSize: '24px', fill: '#fff' });
    this.retryText = this.add.text((this.sys.game.config.width /2)-12, (this.sys.game.config.height /2)+12, 'Retry?', { fontSize: '24px', fill: '#fff' });
    this.retryText.setInteractive();
    this.retryText.on('pointerdown', function () {
        },this);
  
  
}







// set the configuration of the game
let config = {
  type: Phaser.AUTO, 
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

