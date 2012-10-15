ig.module(
'game.entities.enemy'
)
.requires(
'impact.entity',
'game.entities.projectile',
'game.entities.main-character'
)
.defines(function() {
  EntityEnemy = ig.Entity.extend({

    name:"enemy",

    size: {x:50, y:64},

    health: 100,

    animSheet: new ig.AnimationSheet( 'media/enemy.png', 50, 64 ), // location of the picture for the animation, and the picture size (each frame).

    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,

    friction: {x: 150, y: 0},
    maxVel: {x: 190, y: 1200},
    friction: {x: 1200, y: 0},
    flip: false,

    // These are our own properties. They are not defined in the base
    // ig.Entity class. We just use them internally for the Character

    accelGround: 600,
    accelAir: 400,
    gravityFactor: 2,
    spot: false,
    speed: 100,
    condition: 100,

    spottedLeft: false,
    spottedRight: false,

    healthBar: null,

    init: function(x,y,settings) {
      this.parent(x,y,settings);
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'crouch', 1, [1] );
      this.healthBar = ig.game.spawnEntity(EntityHealthBar, this.pos.x, (this.pos.y-5) );
    },

    update: function() {
      this.handleMovementPassive();
      this.handleMovementDetection();
      this.handleMovementAttack();
      this.handleMovementGeneral();
      this.handleHealthStatus();
      this.parent();
    },

    handleMovementGeneral: function() {
      // turn around? reset vel.x!
      turnright = this.vel.x < 0 && this.accel.x > 0;
      turnleft = this.vel.x > 0 && this.accel.x < 0;
      if (this.standing && (turnright || turnleft)) this.vel.x = 0;

        // player walks past enemy? FLIP!
        if(this.spottedRight){
          this.flip = false // look to the right
        }
        else if(this.spottedLeft){
          this.flip = true // look to the left
        }
        else{
          this.flip = false
        }
    },

    handleMovementPassive: function() {
      if( !this.spottedLeft && !this.spottedRight ){
        // near an edge? return!
        if( !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4),this.pos.y + this.size.y+1 ) ) {
          this.flip = !this.flip;
        }
        this.maxVel.x = 100
        var xdir = this.flip ? -1 : 1; // to turn around values from negative to positive, or positive to negative.
        this.accel.x = this.speed * xdir;
        this.parent();
      }
    },

    handleMovementDetection: function() {
      // Get the x and y distance to the player
      var maincharacter = ig.game.getEntityByName('player');
      var xd = (maincharacter.pos.x + maincharacter.size.x / 2) - (this.pos.x + this.size.x / 2);
      var yd = (maincharacter.pos.y + maincharacter.size.y / 2) - (this.pos.y + this.size.y / 2);

      // Calculate the distance
      this.distanceToMainCharacter = Math.sqrt(xd * xd + yd * yd);

      // Check if the enemy has a line of sight to the player
      if(this.distanceToMainCharacter < 500) {
        var tr = ig.game.collisionMap.trace(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, xd, yd, 1, 1);
        if (!tr.collision.x && !tr.collision.y) {
          if(this.pos.x > maincharacter.pos.x){
            this.spottedLeft = true
          }
          else{
            this.spottedLeft = false
          }
          if(this.pos.x < maincharacter.pos.x){
            this.spottedRight = true
          }
          else{
            this.spottedRight = false
          }
        }
      }
    },

    handleMovementAttack: function() {
      if(this.spottedLeft || this.spottedRight){
        accel = this.standing ? this.accelGround : this.accelAir;
        if( this.spottedRight && this.distanceToMainCharacter > 150){ // enemy should walk to the left if the player is on the right farther than 150px away
          //what to do when player is on the right and spotted
          this.accel.x = accel
          this.maxVel.x = 200
        }
        else if( this.spottedLeft && this.distanceToMainCharacter > 150){ // enemy should walk to the right if the player is on the left farther than 150px away
          //what to do when player is on the left and spotted
          this.accel.x = -accel
          this.maxVel.x = 200
        }
        else if(this.distanceToMainCharacter < 150){ // enemy should stand still if its closer than 150px
          //what to do if player is not spotted
          this.maxVel.x = 150
          this.accel.x = 0
          this.vel.x = 0
        }
        this.currentAnim.flip.x = this.flip;
        ig.show( 'x Eaacel', this.vel.x.round() );
      }
    },

    handleWallCollision: function( res ) {
      this.parent( res );
      // collision with a wall? return!
      if (res.collision.x) this.flip = !this.flip;
    },

    handleHealthStatus: function(){
      // needs to be sure that EntityHealthBar has spawned

      // if EntityHealthBar has spawned
      this.healthBar.updateWith(this);
    }

  });
})
