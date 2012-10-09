ig.module(
  'game.entities.enemy-health'
)
.requires(
  'impact.entity',
  'game.entities.enemy'
)
.defines(function() {
  EntityEnemyHealth = ig.Entity.extend({
  	collides: ig.Entity.COLLIDES.NEVER,
  	gravityFactor: 0,
  	size: {x: 50, y: 7},
    animSheet: new ig.AnimationSheet( 'media/enemy-health.png', 50, 7 ), // location of the picture for the animation, and the picture size (each frame).

    init: function( x, y, settings ) {
      this.parent( x, y, settings );

      this.addAnim( 'idle', 0.1, [0]); // the character animations. first number defines refresh rate. second number how much sprites en when to use them.
      this.addAnim( 'hurt', 0.1, [1]);
      this.addAnim( 'bleeding', 0.1, [2]);
      this.addAnim( 'dying', 0.1, [3]);
    },

    update: function() { // keeps updating these functions
      this.parent();
      this.enemyTrack();
      this.healthBar();
    },

    enemyTrack: function(){
      var mainEnemy = ig.game.getEntityByName('enemy');
      this.pos.x = mainEnemy.pos.x;
      this.pos.y = mainEnemy.pos.y - 10;
    },

    healthBar: function(){
      var mainEnemy = ig.game.getEntityByName('enemy');
      if(mainEnemy.condition == 100){
        this.currentAnim = this.anims.idle;
      }
      else if(mainEnemy.condition == 75){
        this.currentAnim = this.anims.hurt;
      }
      else if(mainEnemy.condition == 50){
        this.currentAnim = this.anims.bleeding;
      }  
      else if(mainEnemy.condition == 25){
        this.currentAnim = this.anims.dying;
      }
      else{
        this.kill();
      }
    }


 });
});