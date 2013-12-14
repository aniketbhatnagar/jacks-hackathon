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
				
				var $leaderBoardElement = $leaderBoard.find('.player-stats li.player.'+ userObj.userId).removeClass('hidden');
				$leaderBoardElement.attr("id", userObj.userId);
				$leaderBoardElement.find('h2').html(userObj.userName);
				$leaderBoardElement.find('h3').html(userObj.pointsEarned);
				$leaderBoardElement.addClass(userObj.colorName).removeClass('remove');
			};
			
			this.updateLeaderBoard = function(userObj){
				$leaderBoard.find('.'+ userObj.userId).find('h3').html(userObj.pointsEarned);
			};
			
            return this;
        }
		
        return new _leaderboard();
		
    }());

}(jQuery, this, this.document, App));