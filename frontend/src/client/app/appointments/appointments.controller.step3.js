(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointmentsStepThree', ClientAppointmentsStepThree);

    ClientAppointmentsStepThree.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService', 'appointmentService'];

    function ClientAppointmentsStepThree($state, $uibModal, logger, spaServiceService, appointmentService) {
        var vm = this;
        vm.appointmentRequest = $state.params.appointmentRequest;

        if (!vm.appointmentRequest) {
            $state.go('clientAppointments_step1');
            return;
        }
        
        vm.getTotalCost = getTotalCost;
        vm.submitForm = submitForm;
        vm.goBack = goBack;
        vm.formSubmitted = false;
        vm.loading = false;
        
        activate();



        function activate() {
        }
        
        function getTotalCost() {
            var total = 0;
            angular.forEach(vm.appointmentRequest.selectedServices, function (svc) {
                total += svc.cost;
            });
            return total;
        }
        
        function goBack() {
            $state.go('clientAppointments_step2', { appointmentRequest: vm.appointmentRequest });
        }
        
        function submitForm() {
            vm.loading = true;
            vm.appointmentRequest.userInfo = vm.userInfo;
            
            appointmentService.book(vm.appointmentRequest)
            .then(function(confirmation) {
                $state.go("clientAppointments_step4", { appointment: confirmation });
            })
            .catch(function(err) {
                logger.error('Uh oh!  An error occurred while booking your appointment.  Please call us to book.')
            })
            .finally(function() {
                vm.loading = false;
            })
        }
       
        
       
    }
})();