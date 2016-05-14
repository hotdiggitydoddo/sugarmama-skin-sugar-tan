(function () {
    'use strict';

    angular.module('app.admin.appointments').controller('AppointmentsBlockout', AppointmentsBlockout);

    AppointmentsBlockout.$inject = ['$state', '$uibModalInstance',  'logger', 'appointmentService'];

    function AppointmentsBlockout($state, $uibModalInstance,  logger, appointmentService) {
        var vm = this;
        vm.title = 'appointments';

        vm.saveBlockout = saveBlockout;
        vm.cancel = cancel;
        vm.savingBlockout = false;
        vm.blockout = {};

        vm.dpOptions = {
            showWeeks: false,
            minDate: new Date(),
        }

        activate();

        function activate() {
            vm.blockout.selectedDate = new Date();
            vm.blockout.startTime = new Date().setHours(0);
            vm.blockout.startTime = new Date(vm.blockout.startTime).setMinutes(0);
            vm.blockout.endTime = new Date().setHours(23);
            vm.blockout.endTime = new Date(vm.blockout.endTime).setMinutes(59);
        }

        function saveBlockout() {
            return appointmentService.submitBlockout(vm.blockout)
                .then(function (data) {
                    logger.success('Blockout added.')
                    $uibModalInstance.close(data);
                    $state.go('appointments',{}, {reload: true});
                })
                .catch(function (err) {

                })
                .finally(function () {
                    vm.savingShift = false;
                });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();