ig.module(
'game.entities.character'
)
.requires(
'impact.entity'
)
.defines(function() {

EntityCharacter = ig.Entity.extend({
  //friction: {x: 600, y: 0},
  jump_height: 500,
  //accelGround: 600,
  //accelAir: 200,
  crouched:false,
  crouch_height:64/2,
  stand:64,

  size: {x:50, y:64},
  collides: ig.Entity.COLLIDES.FIXED,

  update: function() {
    this.parent();
    //this.jump();
    //this.crouch();
  },



  });
})
