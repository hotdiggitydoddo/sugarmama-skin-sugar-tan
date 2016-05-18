(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointmentsStepFour', ClientAppointmentsStepFour);

    ClientAppointmentsStepFour.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService', 'appointmentService'];

    function ClientAppointmentsStepFour($state, $uibModal, logger, spaServiceService, appointmentService) {
         var vm = this;
         vm.appointment = $state.params.appointment;

        // if (!vm.appointmentRequest) {
        //     $state.go('clientAppointments_step4');
        //     return;
        // }
        
        // vm.getTotalCost = getTotalCost;
        // vm.submitForm = submitForm;
        // vm.goBack = goBack;
        // vm.formSubmitted = false;
        // vm.loading = false;
        
        // activate();



        // function activate() {
        // }
        
        // function getTotalCost() {
        //     var total = 0;
        //     angular.forEach(vm.appointmentRequest.selectedServices, function (svc) {
        //         total += svc.cost;
        //     });
        //     return total;
        // }
        
        // function goBack() {
        //     $state.go('clientAppointments_step2', { appointmentRequest: vm.appointmentRequest });
        // }
        
        // function submitForm() {
        //     vm.loading = true;
        //     vm.appointmentRequest.userInfo = vm.userInfo;
            
        //     appointmentService.book(vm.appointmentRequest)
        //     .then(function(confirmation) {
                
        //     })
        //     .catch(function(err) {
                
        //     })
        //     .finally(function() {
        //         vm.loading = false;
        //     })
        // }
       
        
       
    }
})();