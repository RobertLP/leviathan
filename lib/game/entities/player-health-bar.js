ig.module(
  'game.entities.player-health-bar'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityPlayerHealthBar = ig.Entity.extend({
    collides: ig.Entity.COLLIDES.NEVER,
    gravityFactor: 0,
    size: {x: 150, y: 15},

    animSheet: new ig.AnimationSheet( 'media/backbar.png', 197, 21 ),

    player: null,

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1, [0]);
      this.offset.x = 3
      this.offset.y = 3
    },

    setPlayer: function(entity) {
      this.player = entity;
    },

    draw: function() {
      this.positionBackground();
      this.parent();
      this.drawBar();
    },

    positionBackground: function() {
      this.pos.x = ig.game.screen.x + 20;
      this.pos.y = ig.game.screen.y + 20;
    },

    drawBar: function() {
      var ctx = ig.system.context;
      var s = ig.system.scale;
      var x = this.pos.x * s - ig.game.screen.x * s;
      var y = this.pos.y * s - ig.game.screen.y * s;
      var sizeX = ((this.size.x/100)*this.player.health) * s;
      var sizeY = this.size.y * s;

      ctx.save();
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect(x,y,sizeX,sizeY);
      ctx.restore();

      var font = new ig.Font( 'media/font.png' );
      font.draw( this.player.health + "%", 212, 23, ig.Font.ALIGN.RIGHT );
    }
 });
});