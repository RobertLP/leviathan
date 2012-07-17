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
    maxVel: {x: 300, y: 1200},

    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,

    // These are our own properties. They are not defined in the base
    // ig.Entity class. We just use them internally for the Character
    accelGround: 600,
    accelAir: 200,
    jumpHeight: 300,
    gravityFactor: 2,

    update: function() {
      this.sprint();
      this.move();
      this.jump();
      this.crouch();
      this.parent();
    },

    sprint: function() {
      if (ig.input.pressed('sprint')) {
        this.maxVel.x *= 2
      } else if (ig.input.released('sprint')) {
        this.maxVel.x /= 2
      }
    },

    move: function() {
      // when we change direction, quickly change it
      if ( ig.input.pressed('left') ) {
        this.vel.x = -100;
      } else if ( ig.input.pressed('right') ) {
        this.vel.x = 100;
      }

      // do our usual moving
      accel = this.standing ? this.accelGround : this.accelAir;

      if( ig.input.state('left') ) {
        this.accel.x = -accel;
        this.flip = true;
      }
      else if( ig.input.state('right') ) {
        this.accel.x = accel;
        this.flip = false;
      }
      else {
        this.accel.x = 0;
      }
    },

    jump: function() {
      if( this.standing && ig.input.pressed('jump') ) {
        this.vel.y = -this.jumpHeight;
      }
    },

    crouch: function(){
      if( this.standing && ig.input.pressed('crouch') ) {
        height = this.size.y/2;
        this.size.y = height;
        this.offset.y = height;
        this.pos.y = this.pos.y + height;
        this.currentAnim = this.anims.crouch;
        this.crouched = true;
      }
      else if(this.crouched && ig.input.released('crouch')){
        height = this.size.y*2
        this.pos.y = this.pos.y - this.size.y;
        this.size.y = height;
        this.offset.y = 0;
        this.currentAnim = this.anims.idle;
        this.crouched = false;
      }
    },
  });
})
