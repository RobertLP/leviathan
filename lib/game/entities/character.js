ig.module(
'game.entities.character'
)
.requires(
'impact.entity'
)
.defines(function() {

EntityCharacter = ig.Entity.extend({

  maxVel: {x: 100, y: 300},
  friction: {x: 600, y: 0},
  accelGround: 400,
  accelAir: 400,
  crouched:false,
  crouch_height:64/2,
  stand:64,
  jump_height: 200,

  size: {x:50, y:64},
  collides: ig.Entity.COLLIDES.FIXED,

  update: function() {
    this.parent();
    this.jump();
    this.crouch();
  },
 
  crouch: function(){
    // standing normally on the ground. crouch is being pressed, and the size
    // and offset is being changed from 64(stand) to 32(crouch_height)
    // it pushed the player down 32(crouch_height) to compensate for falling,
    // the animation goes to frame 1 to represent crouching.
    if(this.standing && ig.input.pressed('crouch') && this.vel.x == 0) {
      this.size.y = this.crouch_height;
      this.offset.y = this.crouch_height;
      this.pos.y = this.pos.y + this.crouch_height;
      this.currentAnim = this.anims.crouch;
      this.crouched = true;
    }
    // when crouch is not being pressed anymore, while standing on the ground
    // the size and offset is set back to default,
    // the animation goes to frame 0 to represent standing.
    else if (this.standing && !ig.input.state('crouch') ) {
      this.size.y = this.stand;
      this.offset.y = 0;
      this.currentAnim = this.anims.idle;
      this.crouched = false;
    }
    // falling crouched while not pressing any button makes the player
    // return to standing position
    else if (!this.standing) {
      this.size.y = this.stand;
      this.offset.y = 0;
      this.currentAnim = this.anims.idle;
      this.crouched = false;
    }
  },

  jump: function() {
    this.maxVel.y = 400
    // standing on the ground, jump is being pressed, and we're not already
    // moving up.
    if( this.standing && ig.input.state('jump') && !ig.input.state('crouch')) {
      if (this.vel.y == 0){
        this.vel.y = -this.jump_height;
        this.falling = false;
      }
    }
    else 
    // we're not standing, jump has been released and we're not falling
    // we reduce the y velocity by 66% and mark us as falling
    if(!this.standing && !ig.input.state('jump') && !this.falling) {
      this.vel.y = Math.floor(this.vel.y/3);
      this.falling = true;
      }
      ig.show( 'y vel', this.vel.y.round() );
      ig.show( 'y maxvel', this.maxVel.y.round() );
    }
  });
})
