ig.module(
  'game.entities.enemyspawner'
)
.requires(
  'impact.entity',
  'game.entities.enemy'
)
.defines(function() {
  EntityEnemyspawner = ig.Entity.extend({
    name:"enemy",
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
    	var xr = ((Math.random()*1024)+1);
    	var yr = ((Math.random()*720)+1);
    	var maincharacter = ig.game.getEntityByName('player');

      if(!this.spawned ){
      	this.spawnEntity( 'enemy', this.xr, this.yr ); //KEVIN: error "Object [object Object] has no method 'spawnEntity'"
        this.spawned = true;
        ig.log("spawning")
      }
      else{
        //this.spawned = false;
        ig.log("not spawning")
      }
    }

  });
});