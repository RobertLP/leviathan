ig.module(
  'game.entities.projectile'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityProjectile = ig.Entity.extend({

    ig.gui.cursor.set();

    size: {x: 4, y: 4},
    offset: {x: 2, y: 2},
    maxVel: {x: 200, y: 200},

    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
    collides: ig.Entity.COLLIDES.PASSIVE,

    animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 8 ),

    init: function( x, y, settings ) {
      this.addAnim( 'idle', 0.1, [0,1,2,3,2,1]);
      this.parent( x, y, settings );
    },

    update: function() {
      this.parent();
      this.move();
    },

    move: function(){

        this.currentAnim = this.anims.idle;


      this.currentAnim.flip.x = this.flip;

      this.parent();
    }

this.angle = Math.atan2(settings.click.y - this.pos.y, settings.click.x - this.pos.x);
this.vel.y = Math.sin(this.angle) * 100;
this.vel.x =  Math.cos(this.angle) * 100;

  });
});