(function () {
    'use strict';

    angular.module('app.admin.shifts').controller('Shifts', Shifts);

    Shifts.$inject = ['$state', '$uibModal', 'logger', 'estheticianService'];

    function Shifts($state, $uibModal, logger, estheticianService) {
        var vm = this;
        vm.shifts = [];
        vm.title = 'shifts';
        vm.estheticianId = $state.params.id;
        vm.openAddModal = openAddModal;
        activate();

        function activate() {
            logger.info('Activated Shifts View');
            getShifts(vm.estheticianId);
        }

        function getShifts(id) {
            // return estheticianService.getShifts(id)
            //     .then(function (data) {
            //         vm.shifts = data;
            //         return vm.shifts;
            //     });
        }

        function openAddModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/shifts/shift.detail.html',
                controller: 'ShiftDetail',
                controllerAs: 'vm',
            });

            modalInstance.result.then(function (shift) {
                console.log(shift);
                vm.shifts.push(shift);
            }, function () {
               // $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();