(function() {

	'use strict';

	angular.module('app.core', [
			/* Angular modules */
			'ngAnimate',
			'ngSanitize',

			/* 3rd party modules */
			'ui.router',

			/* Reusable cross-app modules */
			'blocks.logger',
			'blocks.router'
		])
		.directive("kbSlider", function() {
			return {
				restrict: 'A',
				link: function(scope, elem, attrs) {
					$(elem).kenburnIt();

					var e = $(".page-wrapper");
					if (e.parents("#main-content.abs").length == 0) {
						e.css("min-height", $(window).height())
					}
				}
			}
		})
	
		// .directive("resizer", function($window) {
		// 	return {
		// 		restrict: 'A',
		// 		link: function(scope, elem, attrs) {
		// 			$($window).on("debouncedresize", function() {
		// 				var e = $(".page-wrapper");
		// 				if (e.parents("#main-content.abs").length == 0) {
		// 					e.css("min-height", $(window).height())
		// 				}
		// 			})
		// 		}
		// 	}
		// })
		// .directive("setBg", function() {
		// 	return {
		// 		restrict: 'A',
		// 		link: function(scope, elem, attrs) {
		// 			var e = $(elem);
		// 			var t = e.find("img").first();
		// 			e.css({
		// 				background: "url(" + t.attr("src") + ") no-repeat 50% 50%",
		// 				"background-size": "cover"
		// 			});
		// 			t.hide()
		// 		}
		// 	}
		// });
})();