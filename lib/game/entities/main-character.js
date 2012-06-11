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
    if( ig.input.state('left') ) {
      this.vel.x = -200;
    }
    else if( ig.input.state('right') ) {
    this.vel.x = 200;
    }
    else {
    this.vel.x = 0
    }
  }
});
});