ig.module(
'game.entities.main-character'
)
.requires(
'game.entities.character'
)
.defines(function(){

EntityMainCharacter = EntityCharacter.extend({

  size: {x:50, y:64},

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
  },

  move: function() {
    var newxVel = 0;
    var modifier = 0;

  if(ig.input.state('left')) {
    newxVel = -300;
    modifier = 2;
  }
  if(ig.input.state('right')) {
    newxVel = 300;
    modifier = 1;
  }
  if(this.standing && ig.input.state('crouch')) {
  //newxVel += value is the same as newxVel = newxVel + value
  switch(modifier) {
    case 1:
      newxVel -= 200;
    break;
    case 2:
      newxVel += 200;
    break;
    default:
      newxVel = 0;
    break;
    }
  }
  this.vel.x = newxVel;
  //debugger shows Vel
  ig.show( 'x vel', this.vel.x.round() );
  }
});
});