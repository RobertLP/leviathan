ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'impact.debug.debug',
  'game.entities.character',
  'game.entities.main-character',
  'game.entities.projectile',
  'game.entities.camera',
  'game.entities.enemy',
  'game.entities.spawn-manager',
  'game.levels.test'
)
.defines(function(){

  MyGame = ig.Game.extend({

    gravity: 300,
    spawnManager: null,

    init: function() {
      this.bindKeys();
      this.loadLevel( LevelTest );
      this.initSpawnManager();
    },

    loadLevel: function( level ) {
      this.parent( level );
      this.character = this.getEntitiesByType( EntityCharacter )[0];
      this.initCamera();
    },

    update: function() {
      // Update all entities and BackgroundMaps
      this.parent();
    },

    draw: function() {
      // Draw all entities and backgroundMaps
      this.camera.follow( this.character );
      this.spawnManager.update();
      this.parent();
    },

    bindKeys: function() {
      ig.input.bind( ig.KEY.W, 'jump' );
      ig.input.bind( ig.KEY.A, 'left' );
      ig.input.bind( ig.KEY.D, 'right' );
      ig.input.bind( ig.KEY.S, 'crouch' );
      ig.input.bind( ig.KEY.MOUSE1, 'shoot' );
      ig.input.bind( ig.KEY.SHIFT, 'sprint');
      // alternative keys for Cristiano
      ig.input.bind( ig.KEY.SPACE, 'jump' );
      ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
      ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
      ig.input.bind( ig.KEY.DOWN_ARROW, 'crouch' );
      ig.input.bind( ig.KEY.ALT, 'shoot' );
    },

    initCamera: function() {
      this.camera = new EntityCamera( ig.system.width/4, ig.system.height/3, 5 );
      this.camera.trap.size.x = ig.system.width/10;
      this.camera.trap.size.y = ig.system.height/3;
      this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
      this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
      this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
      this.camera.set( this.character );
    },

    initSpawnManager: function() {
      this.spawnManager = new EntitySpawnManager();
    }

  });

  ig.main( '#canvas', MyGame, 60, 1024, 480, 1 );
});
