(function() {
	'use strict';

	angular.module('app.about').run(appRun);

	appRun.$inject = ['routerHelper'];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'about',
				config: {
					url: '/about',
					templateUrl: 'app/about/about.html',
					controller: 'About',
					controllerAs: 'vm',
					title: 'About Us',
					settings: {
						nav: 2,
						content: 'about'
					}
				}
			}
		];
	}
})();
