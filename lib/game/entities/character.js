ig.module(
	'game.entities.character'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntityCharacter = ig.Entity.extend({
	
      maxVel: {x: 100, y: 200},
      friction: {x: 600, y: 0},

          	jump_height: 500,
            accelGround: 600,
            accelAir: 200,
            crouched:false,
            crouch:64/2,
            stand:64,

  	size: {x:50, y:64},
  	collides: ig.Entity.COLLIDES.FIXED,

	update: function() {
		this.parent();
		this.jump();
	},

	jump: function() {
		  // standing on the ground, jump is being pressed, and we're not already
        // moving up.
        if( this.standing && ig.input.state('jump') ) {
            if (this.vel.y == 0) {
                this.vel.y = -this.jump_height;
                this.falling = false;
            }
        }
        // we're not standing, jump has been released and we're not falling
        // we reduce the y velocity by 66% and mark us as falling
        else if (!this.standing && !ig.input.state('jump') && !this.falling) {
            this.vel.y = Math.floor(this.vel.y/3);
            this.falling = true;
        }
	}
  
});

});