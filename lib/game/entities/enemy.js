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

    animSheet: new ig.AnimationSheet( 'media/enemy.png', 50, 64 ),

    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    
    friction: {x: 150, y: 0},
    maxVel: {x: 190, y: 1200},
    friction: {x: 1200, y: 0},
    flip: false,

    accelGround: 600,
    accelAir: 400,
    gravityFactor: 2,
    spot: false,
    health: 10,
    speed: 100,

    spottedleft: false,
    spottedright: false,

    init: function(x,y,settings) {
      this.parent(x,y,settings);
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'crouch', 1, [1] );
    },

    update: function() { 
      this.handleMovementPassive();
      this.handleMovementDetection();
      this.handleMovementAttack();
      this.handleMovementGeneral();
      this.parent();
    },

    handleMovementGeneral: function() {
      // turn around? reset vel.x!
      turnright = this.vel.x < 0 && this.accel.x > 0;
      turnleft = this.vel.x > 0 && this.accel.x < 0;
      if (this.standing && (turnright || turnleft)) this.vel.x = 0;

        // player walks past enemy? FLIP!
        if(this.spottedright){
          this.flip = false
        }
        else if(this.spottedleft){
          this.flip = true
        }
        else{
          this.flip = false
        }
    },

    handleMovementPassive: function() {
      if( !this.spottedleft && !this.spottedright ){
        // near an edge? return!
        if( !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4),this.pos.y + this.size.y+1 ) ) { 
          this.flip = !this.flip; 
        }
        this.maxVel.x = 100
        var xdir = this.flip ? -1 : 1;
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
            this.spottedleft = true
            ig.log("I SEE YOU ON THE LEFT!")
          }
          else{
            this.spottedleft = false
          }
          if(this.pos.x < maincharacter.pos.x){
            this.spottedright = true
            ig.log("I SEE YOU ON THE RIGHT!")
          }
          else{
            this.spottedright = false
          }
        }
      }
    },

    handleMovementAttack: function() {
      if(this.spottedleft || this.spottedright){
        accel = this.standing ? this.accelGround : this.accelAir;
        if( this.spottedright && this.distanceToMainCharacter > 150){
          //what to do when player is on the right and spotted
          this.accel.x = accel
          this.maxVel.x = 200
        }
        else if( this.spottedleft && this.distanceToMainCharacter > 150){
          //what to do when player is on the left and spotted
          this.accel.x = -accel
          this.maxVel.x = 200
        }
        else if(this.distanceToMainCharacter < 150){
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
    }

  });
})