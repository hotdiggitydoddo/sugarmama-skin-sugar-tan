(function() {
    'use strict';

    angular.module('app.admin.shifts').controller('Shifts', Shifts);

    Shifts.$inject = ['$state', '$uibModal', 'logger', 'estheticianService', 'businessDayService'];

    function Shifts($state, $uibModal, logger, estheticianService, businessDayService) {
        var vm = this;
        vm.shifts = [];
        vm.title = 'shifts';
        vm.estheticianId = $state.params.id;
        vm.addNewShift = addNewShift;
        vm.selectShift = selectShift;
        vm.selectedShift = {};

        vm.businessDays = {};
        activate();

        function activate() {
            getShifts(vm.estheticianId);
            getBusinessDays();
            logger.info('Activated Shifts View');
        }

        function getShifts(id) {
            return estheticianService.getShifts(id)
                .then(function(data) {
                    console.log(data);
                    vm.shifts = data;
                    return vm.shifts;
                });
        }

        function getBusinessDays() {
            return businessDayService.getAll()
                .then(function(data) {
                    vm.businessDays = data;
                    return vm.businessDays;
                });
        }

        function selectShift(shift, index) {
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
                    shift: function() { return vm.selectedShift; },
                    businessDays: function() { return vm.businessDays; }
                }
            });

            modalInstance.result.then(function(shift) {
                if (shift.isDeleted) {
                    vm.shifts.splice(vm.selectedShift.index, 1);
                    vm.shifts.selectedShift = null;
                    return;
                }

                var businessDay = vm.businessDays.find(function(day) { return shift.businessDay === day.id });
                shift.businessDay = angular.copy(businessDay);

                var existing = vm.shifts.find(function(existing) {
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

            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();