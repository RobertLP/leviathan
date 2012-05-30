ig.module(
	'game.entities.player'
)
.requires(
	'game.entities.playerbase'
)
.defines(function(){

EntityPlayer = EntityPlayerbase.extend({
	
	animSheet: new ig.AnimationSheet( 'media/player.png', 50, 64 ),
	
	update: function() {
		
		if( ig.input.state('up') ) {
			this.vel.y = -200;
		}
		else if( ig.input.state('down') ) {
			this.vel.y = 200;
		}
		else if( ig.input.state('left') ) {
			this.vel.x = -200;
		}
		else if( ig.input.state('right') ) {
			this.vel.x = 200;
		}
		else {
			this.vel.y = 0
			this.vel.x = 0
			this.addAnim( 'idle', 0.1, [0] );
		}
		
		this.parent();

	}
});

});