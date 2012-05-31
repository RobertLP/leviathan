ig.module(
'game.main'
)
.requires(
'impact.game',

'game.entities.character',
'game.entities.main-character',
'game.levels.main'
)

.defines(function(){

	MyGame = ig.Game.extend({

		gravity: 300,

		init: function() {
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.S, 'down' );
		this.loadLevel( LevelMain );
		},

		update: function() {
		// screen follows the Character
		var character = this.getEntitiesByType( EntityCharacter )[0];
		if( character ) {
			this.screen.x = character.pos.x - ig.system.width/2;
			this.screen.y = character.pos.y - ig.system.height/2;
		}
		// Update all entities and BackgroundMaps
		this.parent();
		},

		draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		}
	});

ig.main( '#canvas', MyGame, 60, 1024, 750, 1 );

});