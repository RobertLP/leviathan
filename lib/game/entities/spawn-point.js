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

    spawn: function(entity) {
      ig.game.spawnEntity(entity, this.pos.x, this.pos.y );

    }

  });
});