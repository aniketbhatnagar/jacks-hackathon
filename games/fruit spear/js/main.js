(function(window, Quintus, undefined){


window.FruitSpear = function()
	{
		var player = [],
			scores = [],
			game,


		// Private Methods
			app = this,
			createPlayer;

		createPlayer = function()
			{
				// You can create a sub-class by extending the Q.Sprite class to create Q.Player
				Q.Sprite.extend("Player",{

				  init: function(p) {
					this._super(p, {
				      	sheet: "player",
				      	x: 410,
				      	y: 90
				    });
			}



		// Public Members 
		return {

			addPlayer : function()
				{

				},
			removePlayer : function()
				{

				},
			init : function()
				{
					game = Quintus()
					        .include("Sprites, Scenes, Input, 2D, Touch, UI")
					        .setup({ maximize: true })
					        .controls().touch()


					game.load("sprites.png, sprites.json, level.json, tiles.png", function() {
					  game.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
					  game.compileSheets("sprites.png","sprites.json");
					  game.stageScene("game");
					});

				}
		}


	}


}(window, Quintus))

var fruitSpearGame = new FruitSpear();
fruitSpearGame.init();