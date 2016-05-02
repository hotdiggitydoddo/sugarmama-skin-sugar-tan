(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointments', ClientAppointments);

    ClientAppointments.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService'];

    function ClientAppointments($state, $uibModal, logger, spaServiceService) {
        var vm = this;
        vm.title = 'book appointment';

        vm.appointmentRequest = {
            selectedDate: new Date(),
            gender: ''
        }
        vm.appointmentRequest.selectedServices = [];

        activate();

        function activate() {
            $state.go('clientAppointments.step1', { appointmentRequest: vm.appointmentRequest });
        }
    }
})();