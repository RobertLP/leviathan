ig.module(
	'game.entities.horizontal-platform'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntityHorizontalPlatform = ig.Entity.extend({

<<<<<<< HEAD
	maxVel:{x:80, y:0},
=======
	maxVel:{x:100, y:0},
>>>>>>> master
	size: {x:100, y:50},
	collides: ig.Entity.COLLIDES.FIXED,
	gravityFactor: 0,

<<<<<<< HEAD
	animSheet: new ig.AnimationSheet('media/platform.png', 100, 50),
=======

	animSheet: new ig.AnimationSheet('/media/platform.png', 100, 50),
>>>>>>> master

	bounciness: 1,

	init: function( x, y, settings ) {
		this.parent(x, y, settings);

		this.addAnim('idle', 1, [0]);

<<<<<<< HEAD
		this.vel.x = 80;
	}

=======
		this.vel.x = 100;
	},
>>>>>>> master

	update: function() {//keeps updating these function
		this.parent();
	}
});
});