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
    maxVel: {x: 100, y: 100},
    flip: false,

    accelGround: 600,
    accelAir: 400,

    health: 10,
    speed: 100,

    init: function(x,y,settings) {
      this.parent(x,y,settings);
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'crouch', 1, [1] );
    },

    update: function() { 
      this.parent();
      this.handleMovementEdge();
      this.handleMovementSpot();
      this.handleMovementAttack();
    },

    handleMovementTrace: function( res ) {
      this.parent( res );
      // collision with a wall? return!
      if( res.collision.x ) {
        this.flip = !this.flip; 
      } 
    },

    handleMovementEdge: function() {
      // near an edge? return!
      if(!this.spotted && !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4),this.pos.y + this.size.y+1 ) ) { 
        this.flip = !this.flip; 
      } 
      var xdir = this.flip ? -1 : 1;
      this.vel.x = this.speed * xdir;
      this.parent();
    },

    handleMovementSpot: function() {
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
          this.spotted = true;
        }
        else{
          this.spotted = false;
        }
      }
    },

    handleMovementAttack: function() {
      var maincharacter = ig.game.getEntityByName('player');
      accel = this.standing ? this.accelGround : this.accelAir;

      if( maincharacter.pos.x > this.pos.x && this.spotted){
        //what to do when player is on the right and spotted
        ig.log("I SEE YOU ON THE RIGHT!")
        this.accel.x = accel
        this.flip = false;
      }
      else if( maincharacter.pos.x < this.pos.x && this.spotted){
        //what to do when player is on the left and spotted
        ig.log("I SEE YOU ON THE LEFT!")
        this.accel.x = -accel
        this.flip = true;
      }
      else{
        //what to do if player is not spotted

      }
      this.currentAnim.flip.x = this.flip;
    }

  });
})