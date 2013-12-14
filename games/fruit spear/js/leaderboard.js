// App namespace as a global variable
var App = App || {};

(function ($, window, document, App, undefined) {
   /**
     * Players module
     */
    App.leaderboard = (function () {
        function _leaderboard() {
			var context = this,
				$leaderBoard = [];
			
			this.createLeaderBoard = function(userObj){
				$leaderBoard = $('#leaderboard');
				
				var $leaderBoardElement = $leaderBoard.find('.player-stats li.'+ userObj.userId).removeClass('hidden');
				$leaderBoardElement.find('h2').html(userObj.userName);
				$leaderBoardElement.find('h3').html(userObj.pointsEarned);
				$leaderBoardElement.addClass(userObj.colorName).removeClass('remove');
			};
			
			this.updateLeaderBoard = function(userObj){
				$('#leaderboard').find('.'+ userObj.userId).find('h3').html(userObj.pointsEarned);
			};
			
			this.showFinalResults = function(){
				var userLen = App.main.players.length;
				if(userLen == 1){
					$('#leaderboard').find('h1 .balloon-count').html("Your Score: "+ App.main.players[0].p.pointsEarned);
				} else if(userLen >= 1){
					var winner = App.main.players[0];
					for(var i = 1; i < userLen; i++){
						if (winner.p.pointsEarned < App.main.players[i].p.pointsEarned) {
							winner = App.main.players[i];
						}
					}
					$('#leaderboard').find('h1 .balloon-count').html("Winner's Score: "+ winner.p.pointsEarned);
				}
			};
			
            return this;
        }
		
        return new _leaderboard();
		
    }());

}(jQuery, this, this.document, App));