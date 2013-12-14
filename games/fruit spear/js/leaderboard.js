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
				
				var $playerStatsWrap = $leaderBoard.find('.player-stats'),
					$leaderBoardEleClone = $playerStatsWrap.find('.player-stats li.player').clone();
				
				$leaderBoardEleClone.addClass(userObj.userId);
				$leaderBoardEleClone.find('h2').html(userObj.userName);
				$leaderBoardEleClone.find('h3').html(userObj.pointsEarned);
				$leaderBoardEleClone.addClass(userObj.colorName).removeClass('remove');
				$playerStatsWrap.append($leaderBoardEleClone);
			};
			
			this.updateLeaderBoard = function(userObj){
				$leaderBoard.find('.'+ userObj).find('h3').html(userObj.pointsEarned);
			};
			
            return this;
        }
		
        return new _leaderboard();
		
    }());

}(jQuery, this, this.document, App));