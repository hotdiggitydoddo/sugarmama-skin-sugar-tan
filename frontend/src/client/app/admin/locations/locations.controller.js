(function () {
	'use strict';

	angular.module('app.admin.locations').controller('locations', locations);

	locations.$inject = ['$state', 'logger', 'locationService'];

	function locations($state, logger, locationService) {
		var vm = this;
		vm.locations = [];
		vm.title = 'locations';
	    vm.addNewLocation = addNewLocation;
        vm.selectLocation = selectLocation;
        vm.selectedLocation = {};

		activate();

		function activate() {
			angular.element(document).ready(function () {
                $("#menu-toggle-wrapper").trigger('click');
            });
			logger.info('Activated Business Days View');
			getlocations();
		}

		function getlocations() {
			// locationService.getAll().then(function (data) {
			// 	vm.locations = data;
			return vm.locations;
			//vm.services.facial = dataservice.getServices("facials");
			// return dataservice.getServices().then(function(data) {
			// 	vm.services = data;
			// 	return vm.services;
			// });
			// });
		}


		function openAddModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/locations/locations.add.html',
                controller: 'AddEsthetician',
                controllerAs: 'vm',
            });

            modalInstance.result.then(function (esthetician) {
                console.log(esthetician);
                vm.estheticians.push(esthetician);
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };


		function gotoBusinessDay(d) {
			$state.go('locations.' + d);
		}
	}
})();
