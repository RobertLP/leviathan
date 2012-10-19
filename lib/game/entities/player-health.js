ig.module(
  'game.entities.player-health'
)
.requires(
  'impact.entity',
  'game.entities.main-character'
)
.defines(function() {
  EntityPlayerHealth = ig.Entity.extend({
  	collides: ig.Entity.COLLIDES.NEVER,
  	gravityFactor: 0,
  	size: {x: 150, y: 15},

    animSheet: new ig.AnimationSheet( 'media/backbar.png', 197, 21 ),

    characterHealth: null,

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1, [0]);
      this.offset.x = 3
      this.offset.y = 3
    },

    update: function() {
      this.parent();
    },

    updateWith: function(entity) {
      this.handlePlayerHealth(entity.health);
    },

    handlePlayerHealth: function(health) {
      this.characterHealth = health;
    },

    track: function() {
      this.pos.x = ig.game.screen.x + 20;
      this.pos.y = ig.game.screen.y + 20;
      this.draw(true);
    },

    draw: function(valid) {
      if (valid) {
        var ctx = ig.system.context;
        var s = ig.system.scale;
        var x = this.pos.x * s - ig.game.screen.x * s;
        var y = this.pos.y * s - ig.game.screen.y * s;
        var sizeX = ((this.size.x/100)*this.characterHealth) * s;
        var sizeY = this.size.y * s;
        this.parent();
        ctx.save();
        ctx.fillStyle = "rgb(200,0,0)";//this.color;
        ctx.fillRect(x,y,sizeX,sizeY);
        ctx.restore();
        // 
        var font = new ig.Font( 'media/font.png' );
        font.draw( this.characterHealth + "%", 212, 23, ig.Font.ALIGN.RIGHT );      }
    }

 });
});