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

    type: ig.Entity.TYPE.A,
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
    passiveSpeed: 65,
    condition: 100,
    falling: false,
    crouching: false,
    jumpHeight: 300,

    spottedLeft: false,
    spottedRight: false,

    jumpPosX: null,
    legacyPosX: 51,

    healthBar: null,

    init: function(x,y,settings) {
      this.parent(x,y,settings);
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'crouch', 1, [1] );
      this.healthBar = ig.game.spawnEntity(EntityHealthBar, this.pos.x, (this.pos.y-5) );
    },

    update: function() {
      ig.show( 'Epos', this.pos.x.round() );
      ig.show( 'LposX', this.legacyPosX.round() );
      this.handleMovementDetection();
      this.handleMovementGeneral();
      this.handleHealthStatus();
      if(this.spottedLeft || this.spottedRight){
        this.handleMovementAttack();
      }
      else if(!this.spottedLeft && !this.spottedRight){
        this.handleMovementPassive();
      }
      this.parent();
    },

    handleHealthStatus: function(){
      this.healthBar.updateWith(this);
    },

    kill: function() {
      ig.game.removeEntity( this.healthBar );
      this.parent();
    },

    draw: function() {
      this.parent();
      this.healthBar.track(this);
    },

    handleMovementDetection: function() {
      // Get the x and y distance to the player
      var mainCharacter = ig.game.getEntityByName('player');
      var xd = (mainCharacter.pos.x + mainCharacter.size.x / 2) - (this.pos.x + this.size.x / 2);
      var yd = (mainCharacter.pos.y + mainCharacter.size.y / 2) - (this.pos.y + this.size.y / 2);
      // Calculates the distance
      this.distanceToMainCharacter = Math.sqrt(xd * xd + yd * yd);
      this.distanceX = xd;
      // Check if the enemy has a line of sight to the player
      if(this.distanceToMainCharacter < 500) {
        var tr = ig.game.collisionMap.trace(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 5, xd, yd, 1, 1);
        if (!tr.collision.x && !tr.collision.y) {
          if(this.distanceX < 0){
            this.spottedLeft = true;
            this.spottedRight = false;
          }
          if(this.distanceX > 0){ 
            this.spottedRight = true;
            this.spottedLeft = false;
          }
        }
        else{
          this.spottedLeft = false;
          this.spottedRight = false;
        }
      }
      //ig.show( 'spotR', this.spottedRight);
      //ig.show( 'spotL', this.spottedLeft);
    },

    handleMovementGeneral: function() {
      // turn around? reset vel.x!
      turnright = this.vel.x < 0 && this.accel.x > 0;
      turnleft = this.vel.x > 0 && this.accel.x < 0;
      if (this.standing && (turnright || turnleft)) this.vel.x = 0;
        // player walks past enemy? FLIP!
      if (this.spottedRight) this.flip = false;
      if (this.spottedLeft) this.flip = true;
      this.currentAnim.flip.x = this.flip;

    },

    handleMovementAttack: function() {
      this.maxVel.x = 200
      accel = this.standing ? this.accelGround : this.accelAir;
      if( this.spottedRight && this.distanceX > 5 && this.distanceToMainCharacter > 150){
        this.accel.x = accel;

      }
      else if( this.spottedLeft && this.distanceX < -5 && this.distanceToMainCharacter > 150 ){ 
        this.accel.x = -accel;
      }
      else if((this.distanceX < 5 && this.distanceX > -5) || this.distanceToMainCharacter < 150){ 
        this.accel.x = 0;
        this.vel.x = 0;
      }
    },

    handleMovementTrace: function ( res ) {
      this.parent( res );
      // jumping over small obstacles if possible, and will do 1 try each time
      if(this.standing && (this.spottedLeft || this.spottedRight) && res.collision.x){
        if(!(this.jumpPosX == this.pos.x)){
          this.jumpPosX = this.pos.x;
          this.vel.y = -this.jumpHeight;
        }
      }
      // flip if hit wall while walking in pasive mode
      if (!((this.pos.x > this.legacyPosX -50) && (this.pos.x < this.legacyPosX +50)) && res.collision.x && !this.spottedLeft && !this.spottedRight){
        this.legacyPosX = this.pos.x;
        this.flip = !this.flip;
      }

      // flip if standing still against wall while not spotted
      if(!this.spottedLeft && !this.spottedRight && res.collision.x && this.vel.x == 0){
        this.legacyPosX = this.pos.x;
        this.flip = !this.flip;
      }
    },

    handleMovementPassive: function() {
      // near an edge? return!

      if( !((this.pos.x > this.legacyPosX -50) && (this.pos.x < this.legacyPosX +50))
        && !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4),this.pos.y + this.size.y+1 ) ) {
        this.legacyPosX = this.pos.x;
        this.flip = !this.flip;
      }
      this.accel.x = 0;
      this.vel.x =  this.flip ? -this.passiveSpeed : this.passiveSpeed;
      this.parent();
    },
  });
})
