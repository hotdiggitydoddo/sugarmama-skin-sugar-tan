(function() {
	'use strict';

	angular.module('app.layout', ['app.core'])
		.directive("sidebar", function() {
			return {
				restrict: 'A',
				link: function(scope, elem, attrs) {
					initLayout();
				}
			}
		});
})();