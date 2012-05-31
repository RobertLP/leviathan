ig.module(
	'game.entities.playerbase'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayerbase = ig.Entity.extend({
	
	size: {x:50, y:64},
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/paddle-red.png', 50, 64 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		

	}
});

});