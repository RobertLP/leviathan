ig.module(
	'game.entities.horizontal-platform'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntityHorizontalPlatform = ig.Entity.extend({

	maxVel:{x:80, y:0},
	size: {x:100, y:50},
	collides: ig.Entity.COLLIDES.FIXED,
	gravityFactor: 0,

	animSheet: new ig.AnimationSheet('media/platform.png', 100, 50),

	bounciness: 1,

	init: function( x, y, settings ) {
		this.parent(x, y, settings);

		this.addAnim('idle', 1, [0]);

		this.vel.x = 80;
	},

	update: function() {//keeps updating these function
		this.parent();
	}
});
});