// App namespace as a global variable
var App = App || {};

(function ($, Quintus, window, document, App, undefined) {
    /**
     * Main module
     */
    App.main = (function () {
        function _main() {
           var context = this, sdk;
		   
			this.players = [];
            this.playersMap = {};
			this.balloon = [];
			this.balloonWidth = 80;
			this.xWidth = 1024;
            /**
             * Init call
			*/
            this.init = function () {
				App.spearGame = Quintus()
					.include("Sprites, Scenes, 2D, UI")
					.setup('spearGame', { width: 1024, height: 632, downsampleWidth: 1024, downsampleHeight: 768 });
				
				
				
				App.balloons.createBalloons(0);
				App.balloons.createBalloons(1);
				App.balloons.createBalloons(2);
				App.balloons.createBalloons(3);
				
				context.setupScenes("gameJoin");
				
				
				App.spearGame.load("spear_sprite.png, spear_sprite.json", function() {
					App.spearGame.compileSheets("spear_sprite.png","spear_sprite.json");
					App.spearGame.stageScene("gameJoin");
				});
				
				App.spearGame.load("balloons.png, balloons_sprite.json", function() {
					App.spearGame.compileSheets("balloons.png","balloons_sprite.json");
					App.spearGame.stageScene("gameJoin");
				});

                
				
            };
			
			this.random = function(min, max) {
				return parseInt(min + Math.random() * (max - min), 10);
			};
			
			this.setupScenes = function(scene){
                // Create a new scene called level 1				
				App.spearGame.scene("gameJoin",function(stage) {

                    sdk = platform("10.11.11.36:9000", "2");

                    sdk.registerUserJoins(function(username) {
                        console.log("player " + username + " joined");
                        App.player.createPlayer(username)
                        context.playersMap[username] = context.players.length;
                        context.players.push(stage.insert(new App.spearGame.Player()));
                    });

                    sdk.receiveTilt(function(event) {

                        if(event.tiltLR >= 1)
                                    {
                                        if(event.tiltLR > 90) { event.tiltLR = 90; }
                                        console.log(5 * Math.floor(event.tiltLR))
                                        context.players[context.playersMap[event.userId] - 1].p.x = (parseInt(11 * Math.floor(event.tiltLR), 10));
                                    }

                                if(event.tiltLR <= -1)
                                    {
                                        if(event.tiltLR < -90) { event.tiltLR = -90; }
                                        context.players[context.playersMap[event.userId] - 1].p.x = (parseInt (11 * -Math.floor(Math.abs(event.tiltLR)), 10));
                                    }

                    });
					

					

					var generateBallonWithDelay = function() {
						var t = setTimeout(function(){
							generateBalloons(stage);
							generateBallonWithDelay();
						}, context.random(200, 1000));
					};
					generateBallonWithDelay();
				});
            };
			
			var generateBalloons = function(stage){
				stage.insert(new App.spearGame["Balloon_" + App.balloons.ballonMap[context.random(0,3)]]());
			};
			
            return this;
        }
        return new _main();
    }());
	
	$(function () {
		App.main.init();
	});
}(jQuery, Quintus, this, this.document, App));