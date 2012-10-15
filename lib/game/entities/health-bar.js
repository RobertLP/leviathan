ig.module(
  'game.entities.health-bar'
)
.requires(
  'impact.entity',
  'game.entities.enemy'
)
.defines(function() {
  EntityHealthBar = ig.Entity.extend({
  	collides: ig.Entity.COLLIDES.NEVER,
  	gravityFactor: 0,
  	size: {x: 50, y: 7},
    animSheet: new ig.AnimationSheet( 'media/health.png', 50, 7 ), // location of the picture for the animation, and the picture size (each frame).

    init: function( x, y, settings ) {
      this.parent( x, y, settings );

      this.addAnim( 'idle', 0.1, [0]); // the character animations. first number defines refresh rate. second number how much sprites en when to use them.
      this.addAnim( 'hurt', 0.1, [1]);
      this.addAnim( 'bleeding', 0.1, [2]);
      this.addAnim( 'dying', 0.1, [3]);
    },

    update: function() { // keeps updating these functions
      this.parent();
    },

    enemyTrack: function(entity){
      this.pos.x = entity.pos.x;
      this.pos.y = entity.pos.y - 10;
    },

    updateWith: function(entity) {
      this.enemyTrack(entity);
      this.healthBar(entity.health);
    },

    healthBar: function(health){
      if (health <= 100 && health > 75) {
        this.currentAnim = this.anims.idle;
      } else if (health <= 75 && health > 50) {
        this.currentAnim = this.anims.hurt;
      } else if (health <= 50 && health > 25) {
        this.currentAnim = this.anims.bleeding;
      } else if (health <= 25 && health > 0) {
        this.currentAnim = this.anims.dying;
      } else{
        this.kill();
      }
    }



 });
});