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
    this.switch = this.add.text(menu.sound.x+12,menu.sound.y,'On',{
        fontSize: '24px',
        fill:'#fff'});
    
    
    this.sound = this.add.text((this.sys.game.config.width / 2)-24, (this.sys.game.config.height / 2) +36 ,'Toggle Sound: '+ menu.switch.text,{
        fontSize: '24px',
        fill:'#fff'
    });
    this.sound.setX((this.sys.game.config.width / 2)-(menu.sound.width)/2);
    this.sound.setInteractive();
    
   /* this.input.keyboard.on('keyup_D',function(event){
        
        this.power.x += 10;
    },this)*/
    
  /*  this.power.on('pointerdown',function(event){
        
        this.scene.start('Game');
    },this)*/
    
    
    this.startText = this.add.text((this.sys.game.config.width / 2)-36, (this.sys.game.config.height / 2) , 'START', {
  fill: 'white',
  fontSize: 24
})
    this.startText.setX((this.sys.game.config.width / 2)-(menu.startText.width)/2);
    this.startText.setInteractive();
    this.startText.on('pointerdown', function () {
    this.scene.start('Game',{sound:this.fan});
},this)
    
    

    this.sound.on('pointerdown', function () {
    if(click === false){
        click = true;
    }
    else{
        click = false;
    }
},this)
}


menu.update = function(){

     menu.sound.setText('Toggle Sound: '+ menu.switch.text);
    if(click===false){
        menu.switch.setText('Off');
       
    }
    
    else{
         menu.switch.setText('On');
        menu.sound.updateText();
    }
   
};