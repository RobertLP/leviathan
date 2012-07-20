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
    accelGround: 600,
    accelAir: 400,
    jumpHeight: 300,
    gravityFactor: 2,
    crouching: false,

    update: function() {
      this.sprint();
      this.move();
      this.jump();
      this.crouch();
      this.shoot();
      this.parent();
    },

    sprint: function() {
      if (this.standing && !this.crouching && ig.input.pressed('sprint')) {
        this.maxVel.x *= 2
      }
      else if (!this.crouching && ig.input.released('sprint')) {
        this.maxVel.x /= 2
      }
    },

    move: function() {
      // when we change direction, quickly while standing
      if(this.standing && (ig.input.pressed('right') || ig.input.pressed('left'))){
        this.vel.x = 0
      }

      accel = this.standing ? this.accelGround : this.accelAir;

      if(ig.input.state('left')){
        this.accel.x = -accel
        this.flip = true;
      } else if(ig.input.state('right')){
        this.accel.x = accel
        this.flip = false;
      } else {
        this.accel.x = 0
        this.vel.x = 0
      }
      this.currentAnim.flip.x = this.flip;
    },

    jump: function() {
      if( this.standing && ig.input.pressed('jump') && !this.crouching) {
        this.vel.y = -this.jumpHeight;
      } else if (!this.standing && ig.input.released('jump')) {
        this.vel.y = Math.floor(this.vel.y/3);
      }
    },

    crouch: function(){
      // enable crouching
      if(this.standing && ig.input.pressed('crouch') ) {
        new_height = this.size.y/2;
        this.maxVel.x /= 5;
        this.size.y = new_height;
        this.offset.y = new_height;
        this.pos.y = this.pos.y + new_height;
        this.currentAnim = this.anims.crouch;
        this.crouching = true;
      }
      // disable crouching
      else if(this.crouching && (ig.input.released('crouch') || !this.standing)){
        new_height = this.size.y*2;
        this.maxVel.x *= 5;
        this.pos.y = this.pos.y - this.size.y;
        this.size.y = new_height;
        this.offset.y = 0;
        this.currentAnim = this.anims.idle;
        this.crouching = false;
      }
    },

    shoot: function() {
      if( ig.input.pressed('shoot') ) {
        ig.game.spawnEntity( EntityProjectile, this.center().x, this.center().y, { flip: this.flip } );
      }
    },

    center: function() {
      return {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2}
    }

    check: function( other ) {
    other.receiveDamage( 10, this );
    this.kill();
  });
})
