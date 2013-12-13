var playerColorMap = ["red", "yellow", "green", "blue", "white", "silver"],
    players = [],
    createPlayer = function()
        {
            // You can create a sub-class by extending the Q.Sprite class to create Q.Player
            game.Sprite.extend("Player",{

                init: function(p) {
                    this._super(p, {
                        sheet: "player-" + playerColorMap[players.length],
                        x: 100,
                        y: 440,
                        gravity : 0
                    });
                    this.add("2d, stepControls");
                    // Add in pre-made components to get up and running quickly
                }

            });
        };