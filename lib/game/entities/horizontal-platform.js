ig.module(
	'game.entities.horizontal-platform'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntityHorizontalPlatform = ig.Entity.extend({

	maxVel:{x:0, y:100},
	size: {x:144, y:48},
	collides: ig.Entity.COLLIDES.ACTIVE,

	animeSheet: new ig.AnimationSheet('media/platform.png', 144, 48),

	bounciness: 1,

	init: function( x, y, settings ) {

		this.parent(x, y, settings);

		this.addAnim('idle', 1, [0]);

		this.vel.y = 100;
	}


});
});