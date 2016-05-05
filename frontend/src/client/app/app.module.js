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
		 'app.appointments',
		 'app.about',
		 'app.accounts',
		 'app.admin.estheticians',
		 'app.admin.locations',
         'app.admin.shifts',
         'app.admin.appointments'
	]);

})();
