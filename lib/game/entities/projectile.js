ig.module(
  'game.entities.projectile'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityProjectile = ig.Entity.extend({

    gravityFactor: 0,

    size: {x: 4, y: 4},
    maxVel: {x: 200, y: 200},
    vel: {x: 100, y: 0 },

    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,

    animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 8 ),

    init: function( x, y, settings ) {
      this.addAnim( 'idle', 0.1, [0,1,2,3,2,1]);
      this.parent( x, y,settings );
    },

    update: function() {
      this.parent();
      // this.move();
    },

    // move: function(){
    //   this.currentAnim = this.anims.idle;
    //   this.currentAnim.flip.x = this.flip;
    //   this.parent();
    // }

    // This function is called when this entity overlaps anonther entity of the
    // checkAgainst group. I.e. for this entity, all entities in the B group.
    check: function( other ) {
      this.kill();
    }

  });
});