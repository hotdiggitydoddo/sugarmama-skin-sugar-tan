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
				state: 'signup',
				config: {
					url: '/signup',
					templateUrl: 'app/accounts/signup.html',
					controller: 'Signup',
					controllerAs: 'vm',
					title: 'Sign up',
				}
			}
		];
	}
})();