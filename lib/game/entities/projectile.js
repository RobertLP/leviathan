ig.module(
  'game.entities.projectile'
)
.requires(
  'impact.entity',
  'game.entities.character',
)
.defines(function() {   
   EntityProjectile = ig.Entity.extend({

        size: {x: 4, y: 4},
        offset: {x: 2, y: 2},
        maxVel: {x: 200, y: 200},

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
        collides: ig.Entity.COLLIDES.PASSIVE,

        animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 8 ),
        anim: new ig.Animation( this.animSheet, 0.1, [0,1,2,3,2,1] ),


    update: function() {
         this.parent();
         this.shoot();
         this.move();
  
    shoot: function(){
    
    if( ig.input.pressed('shoot') ) {
      ig.game.spawnEntity( EntityProjectile, this.pos.x, this.pos.y, { flip:this.flip} );
    }
 },


    // set the current animation, based on the player's speed/ for now, to test the shooting.
    // Thill merged with the master.
    move: function(){
    if( this.vel.y < 0 ) {
      this.currentAnim = this.anims.jump;
    }
    else if( this.vel.y > 0 ) {
      this.currentAnim = this.anims.fall;
    }
    else if( this.vel.x != 0 ) {
      this.currentAnim = this.anims.run;
    }
    else {
      this.currentAnim = this.anims.idle;
    }
    
    this.currentAnim.flip.x = this.flip;
    
    // move!
    this.parent();

  }

  });
});