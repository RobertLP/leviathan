ig.module(
	'game.entities.character'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCharacter = ig.Entity.extend({
	collides: ig.Entity.COLLIDES.FIXED,
});

});