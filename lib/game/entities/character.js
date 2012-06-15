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
    crouched: false,
    crouch: 64/2,
    stand: 64,

    size: {x:50, y:64},
    collides: ig.Entity.COLLIDES.FIXED,

    update: function() {
      this.parent();
      this.jump();
      this.shoot();
      this.move();
    },

    jump: function() {
      // standing on the ground, jump is being pressed, and we're not already
      // moving up.
      if (this.standing && ig.input.state('jump')) {
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
    },

    shoot: function(){
    
    if( ig.input.pressed('shoot') ) {
      ig.game.spawnEntity( EntityProjectile, this.pos.x, this.pos.y, { flip:this.flip} );
    }
  }


    // set the current animation, based on the player's speed/ for now, to test the shooting.
    // Thill merged with the master.
    move: function(){
    if( this.vel.y < 0 ) {
      this.currentAnim = this.anims.jump;
    }
    else if( this.vel.y > 0 ) {
      this.currentAnim = this.anims.fall;
    }
    else if( this.vel.x != 0 ) {
      this.currentAnim = this.anims.run;
    }
    else {
      this.currentAnim = this.anims.idle;
    }
    
    this.currentAnim.flip.x = this.flip;
    
    // move!
    this.parent();

  }
});

     EntityProjectile = ig.Entity.extend({
        size: {x: 4, y: 4},
        offset: {x: 2, y: 2},
        maxVel: {x: 200, y: 200},

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
        collides: ig.Entity.COLLIDES.PASSIVE,

        animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 8 ),    
  });
});
