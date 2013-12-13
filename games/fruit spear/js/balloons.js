// App namespace as a global variable
var App = App || {};

(function ($, window, document, App, undefined) {
   /**
     * Balloons module
     */
    App.balloons = (function () {
        function _balloons() {
           var context = this;
            /**
             * Init call
			*/
            this.init = function () {
				return this;
            };
			
            return this.init();
        }
		
        return new _balloons();
    }());

}(jQuery, this, this.document, App));