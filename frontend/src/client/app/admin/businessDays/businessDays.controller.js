(function () {
	'use strict';

	angular.module('app.admin.businessDays').controller('BusinessDays', BusinessDays);

	BusinessDays.$inject = ['$state', 'logger', 'businessDayService'];

	function BusinessDays($state, logger, businessDayService) {
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
			businessDayService.getAll().then(function (data) {
				vm.businessDays = data;
				return vm.businessDays;
				//vm.services.facial = dataservice.getServices("facials");
				// return dataservice.getServices().then(function(data) {
				// 	vm.services = data;
				// 	return vm.services;
				// });
			});
		}


		function gotoBusinessDay(d) {
			$state.go('businessDays.' + d);
		}
	}
})();
