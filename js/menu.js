var click = false;
let menu = new Phaser.Scene('Menu');

// some parameters for our scene


// load assets
menu.init = function(){
    this.fan = click;
    
}

menu.preload = function(){
  // load images
    this.load.image('power', 'assets/images/power_up.png');
    
    
};

// called once after the preload ends
menu.create = function() {
    
    this.power = this.add.sprite(40,  this.sys.game.config.height / 2, 'power');
    this.power.setInteractive();
    this.power.on('pointerdown',function(event){
        
        
        if(click){
            click=false;
        }
        else{
            click=true;
        }
        
        
    },this);
   /* this.input.keyboard.on('keyup_D',function(event){
        
        this.power.x += 10;
    },this)*/
    
  /*  this.power.on('pointerdown',function(event){
        
        this.scene.start('Game');
    },this)*/
    
    
    this.startText = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 2) -12  , 'START', {
  fill: 'white',
  fontSize: 24
})
    this.startText.setInteractive();
    this.startText.on('pointerdown', function () {
    this.scene.start('Game',{sound:this.fan});
},this)
    
    
this.settingsText = this.add.text((this.sys.game.config.width / 2)-12, (this.sys.game.config.height / 2) +36  , 'Settings', {
  fill: 'white',
  fontSize: 24
})
    this.settingsText.setInteractive();
    this.settingsText.on('pointerdown', function () {
    this.scene.start('Settings');
},this)
}

        
        




// this is called up to 60 times per second
menu.update = function(){
    
   
};

// end the game







// set the configuration of the game
