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
	]);
})();