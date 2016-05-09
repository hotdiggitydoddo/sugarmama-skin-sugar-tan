(function () {
	'use strict';

	angular.module('app.admin.locations').controller('Locations', Locations);

	Locations.$inject = ['$state', '$uibModal', 'logger', 'locationService'];

	function Locations($state, $uibModal, logger, locationService) {
		var vm = this;
		vm.locations = [];
		vm.title = 'locations';
		vm.addNewLocation = addNewLocation;

		if ($state.params.deletedId) {
            logger.success('Location succesfully deleted.')
        }

		activate();

		function activate() {
			getlocations();
		}

		function getlocations() {
			 locationService.getAll().then(function (data) {
				vm.locations = data;
				return vm.locations;
			});
		}


		function addNewLocation() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/locations/locations.add.html',
                controller: 'AddLocation',
                controllerAs: 'vm',
            });

            modalInstance.result.then(function (location) {
                vm.locations.push(location);
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };
	}
})();
