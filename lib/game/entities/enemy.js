ig.module(
  'game.entities.enemy'
)
.requires(
  'impact.entity'
.defines(function() {

  EntityEnemy = ig.Entity.extend({
    size: {x:50, y:64},
    friction: {x: 1200, y: 0},
    maxVel: {x: 250, y: 1200},

  type: ig.Entity.TYPE.B, // Evil enemy group
  checkAgainst: ig.Entity.TYPE.A, // Check against friendly
  collides: ig.Entity.COLLIDES.PASSIVE,
  
  health: 10,

  animSheet: new ig.AnimationSheet( 'media/enemy.png', 50, 64 ),



  check: function( other ) {
      other.receiveDamage( 10, this );
    }
  });
});
