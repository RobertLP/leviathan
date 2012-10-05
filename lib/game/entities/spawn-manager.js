ig.module(
  'game.entities.spawn-manager'
)
.requires(
  'impact.entity'
)
.defines(function() {

  EntitySpawnManager = ig.Class.extend({

    enemiesLeft: 10,
    MAX_ENEMIES_ON_SCREEN: 3,
    MIN_DISTANCE_TO_PLAYER: 800,

    update: function() {
      // check if need to spawn
      if(this.needsSpawn()){
        // pick random spawn point
        var spawnPoint = this.pickSpawnPoint();
        // tell spawn point to spawn enemy
        spawnPoint.spawn(EntityEnemy);
      }
    },

    needsSpawn: function() {
      return this.enemiesLeft > 0 && ig.game.getEntitiesByType(EntityEnemy).length < this.MAX_ENEMIES_ON_SCREEN;
    },

    pickSpawnPoint: function() {
      var spawnPoints = this.availableSpawnPoints();
      var index = Math.round(Math.random()*(spawnPoints.length-1));
      console.log(index);
      console.log(spawnPoints.length);
      return spawnPoints[index];
    },

    availableSpawnPoints: function() {
      var spawnPoints = ig.game.getEntitiesByType(EntitySpawnPoint);
      var availablePoints = [];
      var player = ig.game.getEntityByName('player');

      for (var i = spawnPoints.length - 1; i >= 0; i--) {
        var spawnPoint = spawnPoints[i];
        if(player.distanceTo(spawnPoint) > this.MIN_DISTANCE_TO_PLAYER){
          availablePoints.push(spawnPoint);
        }
      };
      return availablePoints;
    }

  });
});