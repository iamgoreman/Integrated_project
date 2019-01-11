let help = new Phaser.Scene('Help');


help.preload = function(){
  // load images
    this.load.image('power', 'assets/images/power_up.png');
    this.load.image('enemy', 'assets/images/enemy1_new.png');
    this.load.image('enemy2', 'assets/images/enemy2_new.png');
    this.load.image('enemy3', 'assets/images/enemy3_new.png');
    this.load.image('spec_enemy', 'assets/images/special_enemy.png');
    this.load.image('enem_bullet1', 'assets/images/bullet1_new.png');
    this.load.image('enem_bullet2', 'assets/images/bullet2_new.png');
    this.load.image('enem_bullet3', 'assets/images/bullet5.png');
    this.load.image('player', 'assets/images/hero ship_new.png');
};

help.create = function() {
    
    this.player = this.add.sprite(50,25,'player');
    this.player.setScale(.5);
    
   this.playerText = this.add.text((help.player.x)+24 ,(help.player.y/1.5),'This is the ship you will be controlling for this mission',{
       fontSize: '12px',
        fill:'#fff'
       
   });
    
    this.enemy1 = this.add.sprite((help.player.x),(help.player.y)+34,'enemy');
    this.enemy1.setScale(0.5);
    this.enemy2 = this.add.sprite((help.enemy1.x)+24,(help.enemy1.y),'enemy2');
    this.enemy2.setScale(0.5);
    this.enemy3 = this.add.sprite((help.enemy2.x)+24,(help.enemy1.y),'enemy3');
    this.enemy3.setScale(0.5);
    
    this.enemyText = this.add.text((help.enemy3.x)+24 ,(help.enemy3.y/1.2),'These are your enemies. Destroy them for points',{
       fontSize: '12px',
        fill:'#fff'
       
   });
    
    this.enemybullet1 = this.add.sprite((help.enemy1.x),(help.enemy1.y)+34,'enem_bullet1');
    this.enemybullet1.setScale(0.5);
    this.enemybullet2 = this.add.sprite((help.enemybullet1.x)+24,(help.enemybullet1.y),'enem_bullet2');
    this.enemybullet2.setScale(0.5);
    this.enemybullet3 = this.add.sprite((help.enemybullet2.x)+24,(help.enemybullet2.y),'enem_bullet3');
    this.enemybullet3.setScale(0.5);
    
    this.enemyBulletText = this.add.text((help.enemybullet3.x)+24 ,(help.enemybullet3.y/1.1),'These are the enemies bullets. Avoid colliding with them.',{
       fontSize: '12px',
        fill:'#fff'
       
   });
    
    this.specEnemy = this.add.sprite((help.enemybullet1.x),(help.enemybullet1.y)+34,'spec_enemy');
    this.specEnemy.setScale(0.8);
    
    this.enemyBulletText = this.add.text((help.specEnemy.x)+24 ,(help.specEnemy.y/1.05),'This is a special enemy. Kill it to recieve a power up.',{
       fontSize: '12px',
        fill:'#fff'
       
   });
    
    this.tipText = this.add.text((help.sys.game.config.width/2)-12 ,(help.specEnemy.y+24),'Hints',{
       fontSize: '20px',
        fill:'#fff'
       
   });
    
    this.hintText = this.add.text((help.specEnemy.x)+72 ,(help.tipText.y+24),'If your hit three times, your dead, so avoid getting hit.',{
       fontSize: '12px',
        fill:'#fff'
       
   });
    
    this.backText = this.add.text((help.hintText.x)+72 ,(help.hintText.y+36),'Back',{
       fontSize: '24px',
        fill:'#fff'
       
   });
    
    this.backText.setInteractive();
    this.backText.on('pointerdown', function () {
        this.scene.start('Menu');
        },this);
    

}


help.update = function(){
   
};