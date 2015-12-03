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
					templateUrl: 'app/services/services.html',
					controller: 'Services',
					controllerAs: 'vm',
					title: 'Services',
					settings: {
						nav: 1,
						content: 'services'
					}
				}
			}
		];
	}
})();