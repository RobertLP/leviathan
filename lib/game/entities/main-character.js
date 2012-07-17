ig.module(
'game.entities.main-character'
)
.requires(
'game.entities.character',
'game.entities.projectile'
)
.defines(function(){
  EntityMainCharacter = EntityCharacter.extend({

    size: {x:50, y:64},

    animSheet: new ig.AnimationSheet( 'media/main-character.png', 50, 64 ),

    init: function(x,y,settings) {
      this.parent(x,y,settings);
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'crouch', 1, [1] );
    },

    update: function() {
      this.parent();
    }
  });
});