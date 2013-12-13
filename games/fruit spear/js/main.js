// App namespace as a global variable
var App = App || {};

(function ($, Quintus, window, document, App, undefined) {
    /**
     * Main module
     */
    App.main = (function () {
        function _main() {
           var context = this, sdk;
		   
		   this.players = ["vinod"];
		   this.balloon = [];
            /**
             * Init call
			*/
            this.init = function () {
				App.spearGame = Quintus()
					.include("Sprites, Scenes, Input, 2D, Touch, UI")
					.setup('spearGame', { width: 1024, height: 632, downsampleWidth: 1024, downsampleHeight: 768 })
					.controls().touch();
				
				App.player.createPlayer();
				
				App.balloons.createBalloons(1);
				
				context.setupScenes("gameJoin");
				
				
				App.spearGame.load("spear_sprite.png, spear_sprite.json", function() {
					App.spearGame.compileSheets("spear_sprite.png","spear_sprite.json");
					App.spearGame.stageScene("gameJoin");
				});
				
				App.spearGame.load("balloons.png, balloons_sprite.json", function() {
					App.spearGame.compileSheets("balloons.png","balloons_sprite.json");
					App.spearGame.stageScene("gameJoin");
				});

                sdk = platform("10.11.11.36:9000", "1")
                sdk.receiveAccelerometer(function(event) {

                    if(event.x >= 1)
                        {
                            console.log("left");
                        }

                    if(event.x <= -1)
                        {
                            console.log("Right");
                        }

                })
				
            };
			
			this.setupScenes = function(scene){
                // Create a new scene called level 1				
				App.spearGame.scene("gameJoin",function(stage) {
					context.players.push(stage.insert(new App.spearGame.Player()));
					context.balloon.push(stage.insert(new App.spearGame.Balloon()));
				});
            };
			
            return this;
        }
        return new _main();
    }());
	
	$(function () {
		App.main.init();
	});
}(jQuery, Quintus, this, this.document, App));