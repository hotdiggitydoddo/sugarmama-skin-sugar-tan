(function() {
	'use strict';

	angular.module('app.services').controller('Services', Services);

	Services.$inject = ['$state', 'logger', 'dataservice'];

	function Services($state, logger, dataservice) {
		var vm = this;
		vm.services = [];
		vm.gotoService = gotoService;
		vm.title = 'services';

		activate();

		function activate() {
			logger.info('Activated Services View');
			getServices();
		}

		function getServices() {
			vm.services.hairRemoval = dataservice.getServices("hairRemoval");
			vm.services.facial = dataservice.getServices("facials");
			// return dataservice.getServices().then(function(data) {
			// 	vm.services = data;
			// 	return vm.services;
			// });
		}


		function gotoService(s) {
			$state.go('services.' + s);
		}
	}
})();