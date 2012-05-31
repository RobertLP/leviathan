ig.module(
	'game.entities.character'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCharacter = ig.Entity.extend({
	
	size: {x:50, y:64},
	collides: ig.Entity.COLLIDES.FIXED,

	
});

});