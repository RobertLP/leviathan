ig.module(
'game.entities.enemy'
)
.requires(
'impact.entity',
'game.entities.projectile'
)
.defines(function() {
  EntityEnemy = ig.Entity.extend({

    size: {x:50, y:64},

    animSheet: new ig.AnimationSheet( 'media/enemy.png', 50, 64 ),

    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    
    friction: {x: 150, y: 0},
    maxVel: {x: 100, y: 100},
    flip: false,

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
      this.handleMovementSpot
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
      if( !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4),this.pos.y + this.size.y+1 ) ) { 
        this.flip = !this.flip; 
      } 
      var xdir = this.flip ? -1 : 1;
      this.vel.x = this.speed * xdir;
      this.parent();
    },

    handleMovementSpot: function() {
      // Get the x and y distance to the player
      var xd = (ig.game.mainCharacter.pos.x + ig.game.mainCharacter.size.x / 2) - (this.pos.x + this.size.x / 2);
      var yd = (ig.game.mainCharacter.pos.y + ig.game.mainCharacter.size.y / 2) - (this.pos.y + this.size.y / 2);

      // Calculate the distance
      this.distanceToMainCharacter = Math.sqrt(xd * xd + yd * yd);

      // Check if the enemy has a line of sight to the player
      // I am working with a lot of entities, because of that i check how far away the entity is
      if (this.distanceToMainCharacter < 500) {
        var tr = ig.game.collisionMap.trace(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, xd, yd, 1, 1);
        if (!tr.collision.x && !tr.collision.y) {
          ig.log('I SEE YOU!!!!');
        }
      }
    },

  });
})