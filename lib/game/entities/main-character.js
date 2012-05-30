ig.module(
	'game.entities.main-character'
)
.requires(
	'game.entities.character'
)
.defines(function(){

EntityMainCharacter = EntityCharacter.extend({

  size: {x:50, y:64},

	animSheet: new ig.AnimationSheet( 'media/main-character.png', 50, 64 ),

  init: function(x,y,settings) {
    this.parent(x,y,settings);
    this.addAnim( 'idle', 0.1, [0] );
  },

	update: function() {
		this.parent();
		this.move();
	},

	move: function() {
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
		}
	}
});

});