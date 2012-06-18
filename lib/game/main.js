ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'impact.debug.debug',
  'game.entities.character',
  'game.entities.main-character',
  'game.entities.camera',
  'game.levels.main'
  
)
.defines(function(){

  MyGame = ig.Game.extend({

    gravity: 300,

    init: function() {
      ig.input.bind( ig.KEY.W, 'jump' );
      ig.input.bind( ig.KEY.A, 'left' );
      ig.input.bind( ig.KEY.D, 'right' );
      ig.input.bind( ig.KEY.S, 'crouch' );

      this.loadLevel( LevelMain );

      this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
      this.camera.trap.size.x = ig.system.width/10;
      this.camera.trap.size.y = ig.system.height/3;
      this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
    },

    loadLevel: function( level ) {        
    this.parent( level );

    this.character = this.getEntitiesByType( EntityCharacter )[0];
    
    // Set camera max and reposition trap
    this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
    this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
    
    this.camera.set( this.player );
    },

    update: function() {
      // Update all entities and BackgroundMaps
      this.parent();
    },

    draw: function() {
      // Draw all entities and backgroundMaps
      this.camera.follow( this.character );
      this.parent();
    }
  });

  ig.main( '#canvas', MyGame, 60, 1024, 750, 1 );
});
