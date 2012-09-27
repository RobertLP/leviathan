ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.puck',
	'game.entities.paddle-cpu',
	'game.entities.paddle-player',
	
	'game.levels.main'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		
		this.loadLevel( LevelMain );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	},
    initCamera: function() {
      this.camera = new EntityCamera( ig.system.width/4, ig.system.height/3, 5 );
      this.camera.trap.size.x = ig.system.width/10;
      this.camera.trap.size.y = ig.system.height/3;
      this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
      this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
      this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
      this.camera.set( this.character );
    }
	
});



ig.main( '#canvas', MyGame, 100, 2400, 1600, 1 );


  });
