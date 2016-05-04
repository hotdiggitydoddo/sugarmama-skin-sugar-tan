(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointmentsStepThree', ClientAppointmentsStepThree);

    ClientAppointmentsStepThree.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService'];

    function ClientAppointmentsStepThree($state, $uibModal, logger, spaServiceService) {
        var vm = this;
        vm.appointmentRequest = $state.params.appointmentRequest;

        if (!vm.appointmentRequest) {
            $state.go('clientAppointments_step1');
            return;
        }
        
        

        activate();



        function activate() {
        }
        
       
        
       
    }
})();