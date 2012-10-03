ig.module(
'game.entities.main-character'
)
.requires(
'game.entities.character'
)
.defines(function(){
  EntityMainCharacter = EntityCharacter.extend({

  	name:"player", // the name is to easily call upon character from other enitities

    size: {x:50, y:64}, // same size as character.js

    health: 100, // main character (player) health

    animSheet: new ig.AnimationSheet( 'media/main-character.png', 50, 64 ), // location of the picture for the animation, and the picture size (each frame).

    init: function(x,y,settings) {
      this.parent(x,y,settings);
      this.addAnim( 'idle', 1, [0] ); // the character animations. first number defines refresh rate. second number how much sprites en when to use them.
      this.addAnim( 'crouch', 1, [1] );
    },

    distanceTo: function(entity){
     // Get the x and y distance to the entity

      var xd = (this.pos.x + this.size.x / 2) - (entity.pos.x + entity.size.x / 2);
      var yd = (this.pos.y + this.size.y / 2) - (entity.pos.y + entity.size.y / 2);

      return Math.sqrt(xd * xd + yd * yd);
    }


  });
});