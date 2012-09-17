ig.module(
  'game.entities.spawnmanager'
)
.requires(
  'impact.entity'
)
.defines(function() {
  Entityspawnmanager = ig.Entity.extend({

  	wave: 1,
    spawnnumber: 1,
    i: 0,
    spawn: 0,

  	init: function(x,y,settings) {
  	  var spawncounter = ig.game.getEntitiesByType(EntityEnemyspawner).count;
  	  var enemycounter = ig.game.getEntitiesByType(EntityEnemys).count;
  	  var randomspawn = ((Math.random()*this.spawncounter)+1);
      this.parent(x,y,settings);
    },

    update: function() {
    	//this.waves();
      //this.numbergenerator();
    	this.parent();
    },

    waves: function() {
    	if(enemycounter == 0 && this.wave < 10){
    		//NEXT WAVE!
        
    		this.wave++;
    		
    	}
    },
    
    numbergenerator: function() {
      if(this.spawn == this.i){
        this.spawnname = "spawn "+spawn;
        this.spawn++
      }
    }

  });
});