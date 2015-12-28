(function() {
	'use strict';

	angular.module('app.layout').controller('Sidebar', Sidebar);

	Sidebar.$inject = ['$state', 'routerHelper', 'authService'];

	function Sidebar($state, routerHelper, authService) {
		var vm = this;
		var states = routerHelper.getStates();
		vm.isCurrent = isCurrent;
		vm.isAuthenticated = isAuthenticated;
		vm.logOut = logOut;
		activate();

		function activate() {
			getNavRoutes();
			if (authService.isAuthenticated)
				getAuthRoutes();
		}

		function getNavRoutes() {
			vm.navRoutes = states.filter(function(r) {
				return r.settings && r.settings.nav && !r.data;
			}).sort(function(r1, r2) {
				return r1.settings.nav - r2.settings.nav;
			});
		}

		function getAuthRoutes() {
			vm.authRoutes = states.filter(function(r) {
				return r.data && r.data.authRequired;
			});
		}

		function isAuthenticated() {
			return authService.isAuthenticated();
		}

		function logOut() {
			authService.logout();
		}

		function isCurrent(route) {
			if (!route.title || !$state.current || !$state.current.title) {
				return '';
			}
			var menuName = route.title;
			return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
		}
	}
})();
