ig.module(
  'game.entities.projectile'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityProjectile = ig.Entity.extend({

    size: {x: 4, y: 4},
    maxVel: {x: 500, y: 0},
    accel: { x: 65, y: 1 },

    animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 8 ),

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      if (settings.flip) {
        this.vel.x =  -this.vel.x;
        this.accel.x =  -this.accel.x;
      }
      this.addAnim( 'idle', 0.1, [0,1,2,3,2,1]);
    },

    update: function() {
      this.parent();
      this.accellerate();
    },

    accellerate: function() {
      this.vel.x += this.accel.x;
    },

    handleMovementTrace: function( res ) {
      this.parent(res);
      if( res.collision.x || res.collision.slope ) {
          this.kill();
      }
    },
  });
});