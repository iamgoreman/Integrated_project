var click = false;
let settings = new Phaser.Scene('Settings');

// some parameters for our scene


// load assets
settings.preload = function(){
  // load images
   

    
};

// called once after the preload ends
settings.create = function() {
    
    this.startText = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 3) -16  , 'Settings', {
  fill: 'white',
  fontSize: 32
})
    
    this.soundText = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 2) -16  , 'Sound: ', {
  fill: 'white',
  fontSize: 24
})
    
    this.exitText = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 2) -16  , 'Back : ', {
  fill: 'white',
  fontSize: 24
})
    
    var soundRect = this.add.graphics();
    
    soundRect.strokeRect(this.soundText.x +15, this.soundText.y , 10, 10);
    
    
    this.soundText.on('pointerdown',function(event){
        
        
        if(click){
            click=false;
        }
        else{
            click=true;
        }
        
        
    },this);

    
    
    
    this.startText.setInteractive();
    this.startText.on('pointerdown', function () {
    this.scene.start('Menu',{sound:click});
},this)
}
        
        




// this is called up to 60 times per second
settings.update = function(){
    
   
};
