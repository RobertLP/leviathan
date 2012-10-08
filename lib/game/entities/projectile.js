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

    projectileSpeed: 600, // projectile speed

    animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 8 ), // location of the picture for the animation, and the picture size (each frame).

    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      if (settings.flip) { // turns the values around when turning(flip) around
        this.vel.x =  -this.vel.x;
        this.accel.x =  -this.accel.x;
      }
      this.addAnim( 'idle', 0.1, [0,1,2,3,2,1]); // the character animations. first number defines refresh rate. second number how much sprites en when to use them.
    },

    update: function() { // keeps updating these functions
      this.parent();
      this.accellerate();
    },

    accellerate: function() {
      var vely = Math.sin(this.angle) * this.projectileSpeed; //projectileSpeed is the speed of the projectile
      var velx =  Math.cos(this.angle) * this.projectileSpeed;

     this.maxVel.x = this.vel.x = this.accel.x = velx; //makes sure maxVel, vel, and accel are the same
     this.maxVel.y = this.vel.y = this.accel.y = vely;
    },

    check: function( other ) { 
      other.receiveDamage( 25, this ); 
      this.kill();
    },

    handleMovementTrace: function( res ) {
      this.parent(res);
      if( res.collision.y || res.collision.x || res.collision.slope ) { // kills the projectile entity when hitting either the ground or ceiling, a wall, or a slope.
          this.kill();
      }
    },
  });
});