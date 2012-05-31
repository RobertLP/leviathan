ig.module(
	'game.entities.player'
)
.requires(
	'game.entities.playerbase'
)
.defines(function(){

EntityPlayer = EntityPlayerbase.extend({
	
	animSheet: new ig.AnimationSheet( 'media/player.png', 50, 64 ),

	jump: 200,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
		this.addAnim( 'jump', 1, [9] );
		this.addAnim( 'fall', 0.4, [6,7] );
	},

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
	    // standing on the ground, jump is being pressed, and we're not already
        // moving up.
        else if( this.standing && ig.input.state('jump') ) {
            if (this.vel.y == 0){
                this.vel.y = -this.jump;
                this.falling = false;
            }
        }else 
                // we're not standing, jump has been released and we're not falling
                // we reduce the y velocity by 66% and mark us as falling
                if(!this.standing && !ig.input.state('jump') && !this.falling) {
            this.vel.y = Math.floor(this.vel.y/3);
            this.falling = true;
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