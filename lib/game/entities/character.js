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
    sprinting: false,
    falling: false,


    update: function() {
      this.turn();
      this.sprint();
      this.move();
      this.jump();
      this.crouch();
      this.shoot();
      this.parent();
    },

    turn: function() {
      if(!this.sprinting && (ig.input.mouse.x + ig.game.screen.x) > this.pos.x){
        this.flip = false
      }
      else if(!this.sprinting && (ig.input.mouse.x + ig.game.screen.x) < this.pos.x){
        this.flip = true
      }
      else if(this.sprinting && this.vel.x < 0){
        this.flip = true
      }
      else if(this.sprinting && this.vel.x > 0){
        this.flip = false
      }
    },

    sprint: function() {
      if(this.standing && !this.crouching && ig.input.pressed('sprint')) {
        this.maxVel.x *= 2;
        this.sprinting = true;
      }
      else if(!this.crouching && this.sprinting && ig.input.released('sprint')) {
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

      if(ig.input.state('left')){
        this.accel.x = -accel
        //this.flip = true;
      } else if (ig.input.state('right')) {
        this.accel.x = accel
        //this.flip = false;
      } else {
        this.accel.x = 0
        this.vel.x = 0
      }
      this.currentAnim.flip.x = this.flip;
      ig.show( 'x vel', this.vel.x.round() );
    },

    jump: function() {
      if( this.standing && ig.input.pressed('jump') && !this.crouching) {
        this.vel.y = -this.jumpHeight;
        this.falling = false;
      }
      else if (!this.standing && ig.input.released('jump') && !this.falling) {
        this.vel.y = Math.floor(this.vel.y/3);
        this.falling = true;
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
    /*OLD CODE  if( !this.sprinting && ig.input.pressed('shoot') ) {
        ig.game.spawnEntity( EntityProjectile, this.center().x, this.center().y, { flip: this.flip } );
      } */
      if(!ig.input.state("sprint") && !this.sprinting && ig.input.pressed('shoot') ) { //Basic shoot command
        var mx = (ig.input.mouse.x + ig.game.screen.x); //Figures out the x coord of the mouse in the entire world
        var my = (ig.input.mouse.y + ig.game.screen.y); //Figures out the y coord of the mouse in the entire world

        var r = Math.atan2(my-this.pos.y, mx-this.pos.x); //Gives angle in radians from player's location to the mouse location, assuming directly right is 0
        /*
        Honestly, the above should probably take into account offsets of where your gun is located, 
        but that greatly overcomplicates this snippet since most of you are going to have different exit points for the barrel of your weapons

        Furthermore, each weapon might even have different exit points, so you might want to move the angle calculation into the init method of
        each bullet
        */
       ig.game.spawnEntity( EntityProjectile, this.center().x, this.center().y, {flip:this.flip, angle:r} ); //Nothing to special here, just make sure you pass the angle we calculated in
  }
    },

    center: function() {
      return {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2}
    }
  });
})
