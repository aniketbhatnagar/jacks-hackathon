// App namespace as a global variable
var App = App || {};

(function ($, window, document, App, undefined) {
   /**
     * Balloons module
     */
    App.balloons = (function () {
        function _balloons() {
			var context = this;
				
			this.ballonMap = ["blue", "red", "green", "yellow"];
			
			this.createBalloons = function(index){
                // You can create a sub-class by extending the Q.Sprite class to create Q.Player
				App.spearGame.Sprite.extend("Balloon_" + context.ballonMap[index], {
                    init: function(p) {
                        this._super(p, {
                            sheet: "balloon-" + context.ballonMap[index],
                            x: App.main.random(App.main.balloonWidth, App.main.xWidth - App.main.balloonWidth),
                            y: -101,
                            gravity : Math.random()
                        });
                        this.add("2d, stepControls");
                        // Add in pre-made components to get up and running quickly
                    }		
                });
            };
			
            return this;
        }
		
        return new _balloons();
    }());

}(jQuery, this, this.document, App));