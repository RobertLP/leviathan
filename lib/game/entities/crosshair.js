ig.module(
  'game.entities.crosshair'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityCrosshair = ig.Entity.extend({
  	collides: ig.Entity.COLLIDES.NEVER,
  	gravityFactor: 0,
  	size: {x: 17, y: 17},
    animSheet: new ig.AnimationSheet( 'media/crosshair.png', 17, 17 ),

    init: function( x, y, settings ) {
      this.parent( x, y, settings );

      this.addAnim( 'idle', 0.1, [0,1,2,1,0]);
    },

    update: function() {
      this.parent();
      this.mousetrack();
    },

    mousetrack: function(){
      this.pos.x = (ig.input.mouse.x + ig.game.screen.x);
   	  this.pos.y = (ig.input.mouse.y + ig.game.screen.y);
    }

 });
});