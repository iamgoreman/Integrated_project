let gameOver = new Phaser.Scene('GameOver');

// some parameters for our scene


// load assets
gameOver.init = function(){
    this.fan = click;
    this.score = score;
    
}

gameOver.preload = function(){
  // load images    
};

// called once after the preload ends
gameOver.create = function() {
    this.gameoverText = this.add.text((this.sys.game.config.width /2)-24, (this.sys.game.config.height /2)-12, 'Final Score: '+gameOver.score, { fontSize: '24px', fill: '#fff' });
    this.retryText = this.add.text((this.sys.game.config.width /2)-12, (this.sys.game.config.height /2)+12, 'Retry?', { fontSize: '24px', fill: '#fff' });
    this.retryText.setInteractive();
    this.retryText.on('pointerdown', function () {
        this.scene.start('Game');
        },this);
    
}


gameOver.update = function(){

    
   
};