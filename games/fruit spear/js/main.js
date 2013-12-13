(function(window, Quintus, undefined){


window.FruitSpear = function()
    {
        var players = [],
            scores = [],
            game,
            playerColorMap = ["red", "yellow", "green", "blue", "white", "silver"],
            scenes = {},
            ball,


        // Private Methods
            app = this,
            createPlayer,
            setupScenes;

        createPlayer = function()
            {
                // You can create a sub-class by extending the Q.Sprite class to create Q.Player
                game.Sprite.extend("Player",{

                    init: function(p) {
                        this._super(p, {
                            sheet: "player-" + playerColorMap[players.length],
                            x: 10,
                            y: 440,
                            gravity : 0
                        });
                        this.add("2d, stepControls");
                        // Add in pre-made components to get up and running quickly
                    }

                });
            };

        setupScenes = function()
            {
                // Create a new scene called level 1
                game.scene("level1",function(stage) {
                    players.push(stage.insert(new game.Player()));
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
                            .setup({ width: 400, height: 400 })
                            .controls().touch()

                    createPlayer();
                    setupScenes();

                    game.load("spear_sprite.png, spear_sprite.json" /*, level.json, tiles.png"*/ , function() {
                        game.compileSheets("spear_sprite.png","spear_sprite.json");
                        game.stageScene("game");
                        

                        game.stageScene("level1");
                    });
                }
        }


    }


}(window, Quintus))

var fruitSpearGame = new FruitSpear();
fruitSpearGame.init();
