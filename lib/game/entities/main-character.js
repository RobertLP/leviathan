ig.module(
'game.entities.main-character'
)
.requires(
'game.entities.character'
)
.defines(function(){

EntityMainCharacter = EntityCharacter.extend({

  size: {x:50, y:64},
  sprinting: false,

  animSheet: new ig.AnimationSheet( 'media/main-character.png', 50, 64 ),

  init: function(x,y,settings) {
    this.parent(x,y,settings);
    this.addAnim( 'idle', 1, [0] );
    this.addAnim( 'crouch', 1, [1] );

    if(this.standing && ig.input.pressed('crouch') ) {
        this.currentAnim = this.anims.crouching;
    }
    else{
      this.currentAnim = this.anims.idle;
    }
  },

  update: function() {
    this.parent();
    this.move();
    this.running();
  },

  running: function() {
    if(this.standing && this.crouched == false && ig.input.state('left') && ig.input.state('sprint')){
      this.accel.x = -700
      this.maxVel.x = 400
      this.sprinting = true
    }
    if(this.standing && this.crouched == false && ig.input.state('right') && ig.input.state('sprint')){
      this.accel.x = 700
      this.maxVel.x = 400
      this.sprinting = true
    }
    if(!ig.input.state('sprint')){
      this.sprinting = false
    }
  },

  move: function() {
    var modifier = 0;
    if(ig.input.state('left')){
      modifier = 1
    }
    if(ig.input.state('right')){
      modifier = 2
    }
    if(this.standing && this.vel.x < 0 && this.accel.x > 0){
      this.vel.x = 0
    }
    if(this.standing && this.vel.x > 0 && this.accel.x < 0){
      this.vel.x = 0
    }
    if(this.standing && ig.input.state('crouch')){
      modifier = 3
      if(this.standing && ig.input.state('left')){
        modifier = 1
        this.maxVel.x = 50
      }
      if(this.standing && ig.input.state('right')){
        modifier = 2
        this.maxVel.x = 50
      }
      if(!ig.input.state('right') && !ig.input.state('left')){
        this.accel.x = 0
        this.vel.x = 0
      }
    }
    if(this.standing && !ig.input.state('crouch')) {
      this.maxVel.x = 200
    }
    switch(modifier) {
      case 1:
        this.accel.x = -500
      break;
      case 2:
        this.accel.x = 500
      break;
      case 3:
        this.maxVel.x = 50
      break;
      default:
        this.accel.x = 0
        this.vel.x = 0
        this.maxVel
      break;
    }
  ig.show( 'x vel', this.vel.x.round() );
  ig.show( 'x accel', this.accel.x.round() );
  }
  });
});