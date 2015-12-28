(function() {
	'use strict';

	angular.module('app.admin.estheticians').controller('Estheticians', Estheticians);

	Estheticians.$inject = ['$state', 'logger', 'dataservice'];

	function Estheticians($state, logger, dataservice) {
		var vm = this;
		vm.estheticians = [];
		vm.gotoEsthetician = gotoEsthetician;
		vm.title = 'estheticians';

		activate();

		function activate() {
			logger.info('Activated Estheticians View');
			getEstheticians();
			//dataservice.getUsers().then(function(data) {
			//	console.log(data);
			//})
		}

		function getEstheticians() {
			vm.estheticians = dataservice.getEstheticians();
			//vm.services.facial = dataservice.getServices("facials");
			// return dataservice.getServices().then(function(data) {
			// 	vm.services = data;
			// 	return vm.services;
			// });
		}


		function gotoEsthetician(s) {
			$state.go('estheticians.' + s);
		}
	}
})();
