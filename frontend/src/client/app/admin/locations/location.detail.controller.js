(function() {
    'use strict';

    angular.module('app.admin.locations').controller('LocationDetail', LocationDetail);

    LocationDetail.$inject = ['$state', 'logger', 'locationService'];

    function LocationDetail($state, logger, locationService) {
        var vm = this;
        vm.location = {}
        vm.editMode = false;
        vm.formSubmitted = false;
        vm.updating = false;
        vm.toggleEditMode = toggleEditMode;
        vm.save = save;
        vm.destroy = destroy;
        vm.stateOptions = [
            'AL',
            'AK',
            'AZ',
            'AR',
            'CA',
            'CO',
            'CT',
            'DE',
            'FL',
            'GA',
            'HI',
            'ID',
            'IL',
            'IN',
            'IA',
            'KS',
            'KY',
            'LA',
            'ME',
            'MD',
            'MA',
            'MI',
            'MN',
            'MS',
            'MO',
            'MT',
            'NE',
            'NV',
            'NH',
            'NJ',
            'NM',
            'NY',
            'NC',
            'ND',
            'OH',
            'OK',
            'OR',
            'PA',
            'RI',
            'SC',
            'SD',
            'TN',
            'TX',
            'UT',
            'VT',
            'VA',
            'WA',
            'WV',
            'WI',
            'WY',
        ];

        activate();

        function activate() {
            return getLocation($state.params.id);
        }

        function getLocation(id) {
            locationService.getById(id)
                .then(function(data) {
                    vm.location = data;
                    return vm.location;
                });
        }

        function toggleEditMode() {
            vm.editMode = !vm.editMode;
            if (vm.editMode)
                vm.editableLoc = angular.copy(vm.location);
            else
                vm.editableLoc = null;
        }

        function save(valid) {
            vm.formSubmitted = true;
            if (!valid)
                return;            
            vm.updating = true;
            locationService.updateLocation(vm.editableLoc)
                .then(function(data) {
                    vm.location = data;
                    logger.success("Info successfully updated!")
                })
                .finally(function() {
                    vm.toggleEditMode();
                    vm.updating = false;
                })
        }

        function destroy() {
            if (!confirm("Are you sure you wish to delete this location?")) {
                return;
            }
            locationService.deletelocation({ id: vm.location.id })
                .then(function(data) {
                    $state.go('locations', { deletedId: vm.location.id });
                })
                .catch(function(err) {
           //         logger.error(err);
                });
        }
    }
})();