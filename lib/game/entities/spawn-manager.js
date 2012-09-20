ig.module(
  'game.entities.spawn-manager'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntitySpawnManager = ig.Entity.extend({

  	wave: 1,
    spawnnumber: 1,
    i: 0,
    spawn: 0,
    spawnable: false,

  	init: function(x,y,settings) {
  	  var spawn = ig.game.getEntitiesByType(EntitySpwanPoint).random();
  	  var enemycounter = ig.game.getEntitiesByType(EntityEnemy).count;
  	  var randomspawn = ((Math.random()*this.spawncounter)+1);
      this.parent(x,y,settings);
    },

    update: function() {
    	//this.waves();
      this.spawnGenerator();
    	this.parent();
    },

    waves: function() {
    	if(enemycounter == 0 && this.wave < 10){
    		//NEXT WAVE!

    		this.wave++;

    	}
    },

    spawnGenerator: function() {
      var maincharacter = ig.game.getEntityByName('player');
      var xd = (maincharacter.pos.x + maincharacter.size.x / 2) - (spawn.pos.x + spawn.size.x / 2);
      var yd = (maincharacter.pos.y + maincharacter.size.y / 2) - (spawn.pos.y + spawn.size.y / 2);

      // Calculate the distance from spawn to player
      this.distanceToMainCharacter = Math.sqrt(xd * xd + yd * yd);
      if(distanceToMainCharacter > 500){
        spawnable = true
      }
      else{
        spawnable = false
      }
    }

  });
});