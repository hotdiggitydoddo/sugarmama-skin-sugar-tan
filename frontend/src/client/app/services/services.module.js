(function() {
	'use strict';

	angular.module('app.services', ['app.core', 'app.layout'])
		 .directive("setBg", function() {
			return {
				restrict: 'A',
				link: function(scope, elem, attrs) {
					var e = $(elem);
					var t = e.find("img").first();
					e.css({
						background: "url(" + t.attr("src") + ") no-repeat 50% 50%",
						"background-size": "cover"
					});
					t.hide()
				}
			}
		});
})();