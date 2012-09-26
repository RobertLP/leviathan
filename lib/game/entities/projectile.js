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
      //OLD CODE this.vel.x += this.accel.x;
      var vely = Math.sin(this.angle) * 600//this.desiredVel; //.desiredVel is just the velocity I would want if we were going in a straight line directly out of the right of the player. I just put it as a property of the entity since I refer to it in multiple locations
      var velx =  Math.cos(this.angle) * 600//this.desiredVel;
     /*
     I'm a fan of fullspeed projectiles with no acceleration so we set the velocity, max velocity and for good measure acceleration too.
     You might want to start with a bit of velocity and some sort of acceleration so your projectile starts off slower and speeds up for something like a rocket 
     If that's the case, you'll want to do something like the following
     this.maxVel.x = whatever max you want;
     this.accel.x = Math.sin(this.angle)  * desiredAcceleration;
     this.accel.y = Math.cos(this.angle)  * desiredAcceleration;
     this.vel.x = Math.sin(this.angle)  * desiredStartingVelocity;
     this.vel.y = Math.cos(this.angle)  * desiredStartingVelocity;
     */
     this.maxVel.x = this.vel.x = this.accel.x = velx;
     this.maxVel.y = this.vel.y = this.accel.y = vely;
    },

    handleMovementTrace: function( res ) {
      this.parent(res);
      if( res.collision.y || res.collision.x || res.collision.slope ) {
          this.kill();
      }
    },
  });
});