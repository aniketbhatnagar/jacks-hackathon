// App namespace as a global variable
var App = App || {};

(function ($, window, document, App, undefined) {
   /**
     * Players module
     */
    App.player = (function () {
        function _players() {
			var context = this, userCount = 0;
            this.playerColorMap = ["red", "yellow", "green", "blue", "white", "silver"];
			
			this.createPlayer = function(name){
                // You can create a sub-class by extending the Q.Sprite class to create Q.Player
                 App.spearGame.Sprite.extend("Player",{
                    init: function(p) {
                        this._super(p, {
                            sheet: "player-" + App.player.playerColorMap[App.main.players.length],
                            x: App.main.random(App.main.balloonWidth, App.main.xWidth - App.main.balloonWidth),
                            y: 600,
							pointsEarned: 0,
                            gravity : 0,
							userName: name,
							userId: "user" + userCount++,
							colorName: App.player.playerColorMap[App.main.players.length]
                        });
                        this.add("2d, stepControls");
                        // Add in pre-made components to get up and running quickly
                    },
					update: function(dt) {
					  this.trigger('prestep',dt);
					  if(this.step) { this.step(dt); }
					  if (this.p.newX) this.p.x = this.p.newX
					  this.trigger('step',dt);
					  this.refreshMatrix();
					  App.spearGame._invoke(this.children,"frame",dt);
					}
                });
            };
			
            return this;
        }
		
        return new _players();
		
    }());

}(jQuery, this, this.document, App));