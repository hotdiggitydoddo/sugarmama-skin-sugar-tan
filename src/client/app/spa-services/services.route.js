(function() {
	'use strict';

	angular.module('app.services').run(appRun);

	appRun.$inject = ['routerHelper'];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'services',
				config: {
					url: '/services',
					templateUrl: 'app/spa-services/services.html',
					controller: 'Services',
					controllerAs: 'vm',
					title: 'services',
					settings: {
						nav: 2,
						content: 'services'
					}
				}
			}
		];
	}
})();