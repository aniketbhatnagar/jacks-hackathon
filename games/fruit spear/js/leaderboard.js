// App namespace as a global variable
var App = App || {};

(function ($, window, document, App, undefined) {
   /**
     * Players module
     */
    App.leaderboard = (function () {
        function _leaderboard() {
           var context = this;
           
            return this;
        }
		
        return new _leaderboard();
		
    }());

}(jQuery, this, this.document, App));