ig.module(
  'game.entities.enemyspawner'
)
.requires(
  'impact.entity',
  'game.entities.spawnmanager',
  'game.entities.enemy'
)
.defines(function() {
  EntityEnemyspawner = ig.Entity.extend({
    name:"enemyspawner",
    size: {x:50, y:64},
    spawned: false,

    animSheet: new ig.AnimationSheet( 'media/enemy.png', 50, 64 ),

    init: function(x,y,settings) {
        this.parent(x,y,settings);
    },

    update: function() {
    	this.spawner();
    	this.parent();
    },

    spawner: function() {
    	var maincharacter = ig.game.getEntityByName('player');

      if(!this.spawned ){
      	ig.game.spawnEntity(EntityEnemy, this.pos.x, this.pos.y );
        this.spawned = true;
      }
      else{
        //this.spawned = false;
      }
    }

  });
});