(function() {
	
	'use strict';

	angular.module('app', [
		
		/*
		 * Common access for all other modules
		 */
		'app.core',

		/*
		 * Feature areas
		 */
		 'app.layout',
		 'app.services',
		 'app.home',
		 'app.about'
		 
	]);

})();