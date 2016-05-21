(function () {
    'use strict';

    angular.module('app.admin.shifts').controller('Shifts', Shifts);

    Shifts.$inject = ['$state', '$uibModal', 'logger', 'estheticianService', 'locationService'];

    function Shifts($state, $uibModal, logger, estheticianService, locationService) {
        var vm = this;
        vm.shifts = [];
        vm.title = 'shifts';
        vm.estheticianId = $state.params.id;
        vm.isAdmin = $state.params.isAdmin;
        vm.addNewShift = addNewShift;
        vm.selectShift = selectShift;
        vm.selectedShift = {};

        vm.businessDays = {};
        activate();

        function activate() {
            getShifts(vm.estheticianId);
            getLocations();
        }

        function getShifts(id) {
            return estheticianService.getShifts(id)
                .then(function (data) {
                    console.log(data);
                    sort(data);
                    vm.shifts = data;
                    return vm.shifts;
                });
        }

        function getLocations() {
            return locationService.getAll()
                .then(function (data) {
                    vm.locations = data;
                    return vm.locations;
                });
        }

        function sort(shifts) {
            shifts.forEach(function(shift) {
                var day = shift.businessDay.dayOfWeek;
                shift.businessDay.dayIdx = moment.weekdays().indexOf(capitalizeFirstLetter(shift.businessDay.dayOfWeek));
            });
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function selectShift(shift, index) {
            if (!vm.isAdmin) return;

            console.log("selected:" + shift.id);
            vm.selectedShift = shift;
            vm.selectedShift.index = index;
            openAddModal();
        }

        function addNewShift() {
            vm.selectedShift = null;
            openAddModal();
        }

        function openAddModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/shifts/shift.detail.html',
                controller: 'ShiftDetail',
                controllerAs: 'vm',
                resolve: {
                    shift: function () { return vm.selectedShift; },
                    locations: function () { return vm.locations; }
                }
            });

            modalInstance.result.then(function (shift) {
                if (shift.isDeleted) {
                    vm.shifts.splice(vm.selectedShift.index, 1);
                    vm.shifts.selectedShift = null;
                    return;
                }

                var existing = vm.shifts.find(function (existing) {
                    return existing.id === shift.id;
                });

                if (existing) {
                    existing.startTime = shift.startTime;
                    existing.endTime = shift.endTime;
                    existing.businessDay = shift.businessDay;
                    vm.selectedShift = null;
                } else {
                    vm.shifts.push(shift);
                }

            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function dayOfWeekIdx(dayOfWeek) {
            return moment.weekdays().indexOf(dayOfWeek);
        }
    }
})();