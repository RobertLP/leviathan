ig.module(
	'game.entities.Horizontal-Platform'
)
.requires(
	'impact.entity';
)
.defines(function() {

EnityHorizontal-Platform = ig.Entity.extend({

	maxVel:{x:0, y:100}
	size: {x:144, y:48},
	collides: ig.Entity.COLLIDES.ACTIVE,

	animeSheet: new ig.AnimationSheet{ 'media/platform.png', 144, 48},

	bounciness: 1,

	init: function( x, y, settings ) {
		this.parent{ x, y, settings};

		this.addAnim{ 'idle', 0.1, [0.1.2.3.4.4.4.4.3.2.1]}

		this.vel.y = 100;
	}


});
});