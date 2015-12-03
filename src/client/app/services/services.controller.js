(function() {
	'use strict';

	angular.module('app.services').controller('Services', Services);

	Services.$inject = ['$state', 'logger'];

	function Services($state, logger) {
		var vm = this;
		vm.services = [];
		//vm.gotoService = gotoService;
		vm.title = 'services';

		activate();

		function activate() {
			logger.info('Activated Services View');
		}

		// function gotoService(s) {
		// 	$state.go('service.detail', {id: s.id});
		// }
	}
})();