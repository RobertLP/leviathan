ig.module(
  'game.entities.enemy-health'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityEnemyHealth = ig.Entity.extend({
  	collides: ig.Entity.COLLIDES.NEVER,
  	gravityFactor: 0,
  	size: {x: 50, y: 7},
    animSheet: new ig.AnimationSheet( 'media/enemy-health.png', 50, 7 ), // location of the picture for the animation, and the picture size (each frame).

    init: function( x, y, settings ) {
      this.parent( x, y, settings );

      this.addAnim( 'idle', 1, [0]); // the character animations. first number defines refresh rate. second number how much sprites en when to use them.
    },

    update: function() { // keeps updating these functions
      this.parent();
      this.mousetrack();
    },

    mousetrack: function(){
      var enemy = ig.game.getEntityByName('enemy');
      this.pos.x = (enemy.pos.x);
      this.pos.y = (enemy.pos.y + 50);
    }


 });
});