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
	
	animSheet: new ig.AnimationSheet( 'media/main_character.png', 50, 64 ),
	
});

});