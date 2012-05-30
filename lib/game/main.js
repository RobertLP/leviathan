ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.playerbase',
	'game.entities.player',
	'game.levels.main'

)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.S, 'down' );
		
		this.loadLevel( LevelMain );
	},
	
	update: function() { // screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) { 
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
			}
	 		// Update all entities and BackgroundMaps
	 this.parent(); },
		
			// Add your own, additional update code here

	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


ig.main( '#canvas', MyGame, 60, 1024, 750, 1 );

});
