ig.module(
  'game.entities.moving_platform'
)
.requires(
  'impact.entity',
  'game.entities.main-character'
)
.defines(function() {
  EntityMoving_platform = ig.Entity.extend({
  	collides: ig.Entity.COLLIDES.ACTIVE,
  	gravityFactor: 0,
  	size: {x: 100, y: 50},
    speed: 100,

    animSheet: new ig.AnimationSheet( 'media/platform.png', 100, 50 ), // location of the picture for the animation, and the picture size (each frame).

    init: function( x, y, settings ) {
      this.parent( x, y, settings );

      this.addAnim( 'idle', 1, [0]); // the character animations. first number defines refresh rate. second number how much sprites en when to use them.
    },

    update: function() { // keeps updating these functions
      this.parent();
      //this.platformMovement();

    },

    platformMovement: function(other) {
      //if(other.standing == true) {
        if(this.touches(other instanceof EntityMainCharacter)){
          this.maxVel.x = 100
          var xdir = this.flip ? -1 : 1;
          this.accel.x = this.speed * xdir;
          ig.log("touching platform")
        }
        else{
          this.vel.x = this.maxVel.x = this.accel.x = 0;
        }
      //}
    }

 });
});