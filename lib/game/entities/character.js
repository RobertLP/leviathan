ig.module(
'game.entities.character'
)
.requires(
'impact.entity'
)
.defines(function() {
  EntityCharacter = ig.Entity.extend({
    size: {x:50, y:64},
    friction: {x: 1200, y: 0},
    maxVel: {x: 250, y: 1200},

    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,

    // These are our own properties. They are not defined in the base
    // ig.Entity class. We just use them internally for the Character
    xMaxvel: 250,
    accelGround: 600,
    accelAir: 200,
    crouch_height:64/2,
    stand:64,
    jump_height: 300,
    gravityFactor: 2,
    crouched: false,

    update: function() {
      this.sprint();
      this.move();
      this.jump();
      this.crouch();
      this.parent();
    },

    sprint: function() {
      if (this.standing && this.crouched == false && ig.input.pressed('sprint')) {
        this.maxVel.x *= 2
      } 
      else if (ig.input.released('sprint')) {
        this.maxVel.x = this.xMaxvel
      }
    },

    move: function() {
      accel = this.standing ? this.accelGround : this.accelAir;
      var modifier = 0;
      if(ig.input.state('left')){
        modifier = 1;
        this.flip = false;
      }
      else if(ig.input.state('right')){
        modifier = 2;
        this.flip = true;
      }
      // when we change direction, quickly while standing
      if(this.standing && this.vel.x < 0 && this.accel.x > 0){
        this.vel.x = 0
      }
      if(this.standing && this.vel.x > 0 && this.accel.x < 0){
        this.vel.x = 0
      }
      switch(modifier) {
        case 1:
          this.accel.x = -500
        break;
        case 2:
          this.accel.x = 500
        break;
        default:
          this.accel.x = 0
          this.vel.x = 0
        break;
      }
    },

    jump: function() {
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
    },

    crouch: function(){
      if(this.standing && ig.input.pressed('crouch') ) {
        this.maxVel.x = this.xMaxvel/5;
        this.size.y = this.crouch_height;
        this.offset.y = this.crouch_height;
        this.pos.y = this.pos.y + this.crouch_height;
        this.currentAnim = this.anims.crouch;
        this.crouched = true;
      }
      else if(this.crouched && ig.input.released('crouch')){
        this.maxVel.x = this.xMaxvel;
        this.pos.y = this.pos.y - this.crouch_height;
        this.size.y = this.stand;
        this.offset.y = 0;
        this.currentAnim = this.anims.idle;
        this.crouched = false;
      }
      else if(!this.standing && this.crouched == true){
        this.maxVel.x = this.xMaxvel;
        this.pos.y = this.pos.y - this.crouch_height;
        this.size.y = this.stand;
        this.offset.y = 0;
        this.currentAnim = this.anims.idle;
        this.crouched = false;
      }
    }
  });
})
