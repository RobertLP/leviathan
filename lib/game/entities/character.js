ig.module(
'game.entities.character'
)
.requires(
'impact.entity',
'game.entities.projectile'
)
.defines(function() {
  EntityCharacter = ig.Entity.extend({
    size: {x:50, y:64},
    friction: {x: 1200, y: 0},
    maxVel: {x: 250, y: 1200}, // max speed of the character
    health: 100,

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
    sprinting: false,
    falling: false,
    flip: false,


    update: function() { // keeps updating these functions
      this.turn();
      this.sprint();
      this.move();
      this.jump();
      this.crouch();
      this.shoot();
      this.parent();
    },

    turn: function() {
      var mouseOnRight = (ig.input.mouse.x + ig.game.screen.x) > this.center().x; // looks up if the mouse is on the right
      var mouseOnLeft = (ig.input.mouse.x + ig.game.screen.x) < this.center().x; // looks up if the mouse is on the left
      var sprintingRight =  this.vel.x > 0; // makes sure that the player flips in the running direction (right)
      var sprintingLeft  =  this.vel.x < 0; // makes sure that the player flips in the running direction (left)
      if ((this.sprinting && sprintingLeft) || (!this.sprinting && mouseOnLeft)) this.flip = true;
      if ((this.sprinting && sprintingRight) || (!this.sprinting && mouseOnRight)) this.flip = false;
    },

    sprint: function() {
      if(this.standing && !this.crouching && ig.input.pressed('sprint')) { // sprints by multiplying the maxVel by 2
        this.maxVel.x *= 2;
        this.sprinting = true;
      }
      else if(!this.crouching && this.sprinting && ig.input.released('sprint')) { // slows down by dividing maxVel in 2
        this.maxVel.x /= 2;
        this.sprinting = false;
      }
    },

    move: function() {
      // when we change direction, quickly while standing
      if(this.standing && (ig.input.pressed('right') || ig.input.pressed('left'))){
        this.vel.x = 0
      }

      accel = this.standing ? this.accelGround : this.accelAir;

      if(ig.input.state('left')){ // accel to the left
        this.accel.x = -accel
      } else if (ig.input.state('right')) { // accel to the right
        this.accel.x = accel
      } else { // slow down to a halt
        this.accel.x = 0
        this.vel.x = 0
      }
      this.currentAnim.flip.x = this.flip;
      ig.show( 'x vel', this.vel.x.round() );
    },

    jump: function() {
      if( this.standing && ig.input.pressed('jump') && !this.crouching) { // player jumps up
        this.vel.y = -this.jumpHeight; // jumphHeight = 300px
        this.falling = false;
      }
      else if (!this.standing && ig.input.released('jump') && !this.falling) { // player jumps down
        this.vel.y = Math.floor(this.vel.y/3);
        this.falling = true;
      }
    },

    crouch: function(){
      // enable crouching
      if(this.standing && ig.input.pressed('crouch') ) { // crouch down
        new_height = this.size.y/2; // divides the size by 2
        this.maxVel.x /= 5; // reduces speed by dividing maxVel by 5
        this.size.y = new_height; // makes new_height 32px
        this.offset.y = new_height; // offset becomes 32px
        this.pos.y = this.pos.y + new_height; // pushes the entity down, to compensate for shrinking the entity by a half
        this.currentAnim = this.anims.crouch; // changes the animation to crouching
        this.crouching = true; // the entity is now crouched
      }
      // disable crouching
      else if(this.crouching && (ig.input.released('crouch') || !this.standing)){
        new_height = this.size.y*2; // multiplies the size by 2, back to the original size
        this.maxVel.x *= 5; // multiplies maxVel by 5, back to the original speed
        this.pos.y = this.pos.y - this.size.y; // pushes character up to compensate for bigger size
        this.size.y = new_height; // makes new_height 64px
        this.offset.y = 0; // resets offset to standard
        this.currentAnim = this.anims.idle; // changes the animation to standing
        this.crouching = false; // the enity is now standing
      }
    },

    shoot: function() {
      if(!ig.input.state("sprint") && !this.sprinting && ig.input.pressed('shoot') ) { // 360 shoot command
        var mouseX = (ig.input.mouse.x + ig.game.screen.x - (this.size.x/2)); // Figures out the x coord of the mouse in the entire world
        var mouseY = (ig.input.mouse.y + ig.game.screen.y - (this.size.y/2)); // Figures out the y coord of the mouse in the entire world
        var radius = Math.atan2(mouseY-this.pos.y, mouseX-this.pos.x); // Gives angle in radians from player's location to the mouse location, assuming directly right is 0
        ig.game.spawnEntity( EntityProjectile, this.center().x, this.center().y, {flip:this.flip, angle:radius} );
      }
    },

    center: function() { // finds out the center y and x location of the character entity
      return {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2}
    }

  });
})
