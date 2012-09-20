ig.module(
  'game.entities.spawn-point'
)
.requires(
  'impact.entity',
  'game.entities.spawn-manager',
  'game.entities.enemy'
)
.defines(function() {
  EntitySpawnPoint = ig.Entity.extend({
    name:"enemyspawner",
    size: {x:50, y:64},
    spawned: false,

    animSheet: new ig.AnimationSheet( 'media/enemy.png', 50, 64 ),

    init: function(x,y,settings) {
        this.parent(x,y,settings);
    },

    update: function() {
    	this.spawn();
    	this.parent();
    },

    spawn: function() {

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