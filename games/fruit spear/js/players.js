// App namespace as a global variable
var App = App || {};

(function ($, window, document, App, undefined) {
   /**
     * Players module
     */
    App.player = (function () {
        function _players() {
			var context = this;
            this.playerColorMap = ["red", "yellow", "green", "blue", "white", "silver"];
			
			this.createPlayer = function(name){
                // You can create a sub-class by extending the Q.Sprite class to create Q.Player
                 App.spearGame.Sprite.extend("Player",{
                    init: function(p) {
                        this._super(p, {
                            sheet: "player-" + App.player.playerColorMap[App.main.players.length],
                            x: 10,
                            y: 500,
                            gravity : 0
                        });
                        this.add("2d, stepControls");
                        // Add in pre-made components to get up and running quickly
                    }					
                });
            };
			
            return this;
        }
		
        return new _players();
		
    }());

}(jQuery, this, this.document, App));