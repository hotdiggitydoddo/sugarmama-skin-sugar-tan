(function() {
	'use strict';

	angular.module('app.admin.businessDays').controller('BusinessDays', BusinessDays);

	BusinessDays.$inject = ['$state', 'logger', 'dataservice'];

	function BusinessDays($state, logger, dataservice) {
		var vm = this;
		vm.businessDays = [];
		vm.gotoBusinessDay = gotoBusinessDay;
		vm.title = 'business days';

		activate();

		function activate() {
             angular.element(document).ready(function () {
                $("#menu-toggle-wrapper").trigger('click');
            });
			logger.info('Activated Business Days View');
			getBusinessDays();
			//dataservice.getUsers().then(function(data) {
			//	console.log(data);
			//})
		}

		function getBusinessDays() {
			vm.businessDays = dataservice.getBusinessDays();
			debugger;
			//vm.services.facial = dataservice.getServices("facials");
			// return dataservice.getServices().then(function(data) {
			// 	vm.services = data;
			// 	return vm.services;
			// });
		}


		function gotoBusinessDay(d) {
			$state.go('businessDays.' + d);
		}
	}
})();
