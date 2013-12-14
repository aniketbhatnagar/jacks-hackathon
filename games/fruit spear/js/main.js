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
			this.gameTime = 300;
			this.gameLoop = null;
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
				
				App.spearGame.load("spear_sprite.png, spear_sprite.json, balloons.png, balloons_sprite.json", function() {
					App.spearGame.compileSheets("spear_sprite.png","spear_sprite.json");
					App.spearGame.compileSheets("balloons.png","balloons_sprite.json");
					App.spearGame.stageScene("gameJoin");
				});
				
				
            };
			
			this.random = function(min, max) {
				return parseInt(min + Math.random() * (max - min), 10);
			};
			
			this.setupScenes = function(scene){
                // Create a new scene called level 1				
				App.spearGame.scene("gameJoin", function(stage) {

                    sdk = platform("10.11.11.36:9000", "2");

                    sdk.registerUserJoins(function(user) {
						var userId = user.userId
                        console.log("player " + userId + " joined");
                        App.player.createPlayer(userId)
						var userObj = stage.insert(new App.spearGame.Player());
						context.playersMap[userId] = userObj;
						context.players.push(userObj);
						App.leaderboard.createLeaderBoard(userObj.p);
                    });

                    sdk.receiveTiltBucketed(5, function(event) {
					
						var tiltLR = event.tiltLR + 90
						if (tiltLR < 0) tiltLR = 0
						if (tiltLR > 180) tiltLR = 180
						var player = context.playersMap[event.userId]
						if (typeof player == 'undefined') {
							console.log("player not found");
							return
						}
						var newX = (parseInt(11 * Math.floor(tiltLR), 10))
						player.p.x  = newX;

                    });

					var generateBallonWithDelay = function() {
						App.main.gameLoop = setTimeout(function(){
							generateBalloons(stage);
							generateBallonWithDelay();
						}, context.random(200, 1000));
					};
					generateBallonWithDelay();
					
					setTimeout(function(){
						clearTimeout(App.main.gameLoop);
						App.leaderboard.showFinalResults();
						App.spearGame.clearStage("gameJoin");
					}, App.main.gameTime * 1000);
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