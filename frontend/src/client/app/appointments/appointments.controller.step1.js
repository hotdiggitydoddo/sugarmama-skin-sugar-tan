(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointmentsStepOne', ClientAppointmentsStepOne);

    ClientAppointmentsStepOne.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService', 'appointmentService'];

    function ClientAppointmentsStepOne($state, $uibModal, logger, spaServiceService, appointmentService) {
        var vm = this;
        vm.title = 'book appointment';

        vm.appointmentRequest = $state.params.appointmentRequest;
        vm.availableServices = {};

        vm.dpOptions = {
            showWeeks: false,
            minDate: new Date(),
            dateDisabled: disabledDate
        }

        vm.accHairRemovalOpen = true;
        vm.accFacialOpen = false;
        vm.accMicrodermOpen = false;
        vm.accPeelOpen = false;
        vm.accTanningOpen = false;

        vm.disabledDate = disabledDate;
        vm.submitStepOne = submitStepOne;
        vm.toggleService = toggleService;
        vm.serviceDisabled = serviceDisabled;
        vm.changeGender = changeGender;

        vm.form = {
            isValid: false,
            loading: false
        }

        activate();

        function activate() {
            var date = vm.appointmentRequest.selectedDate;
            if (date.getDay() === 0)
                date.setDate(date.getDate() + 1);

            vm.genderOptions = ['female', 'male'];

            return spaServiceService.getServices(true)
                .then(function (data) {
                    vm.availableServices = data;
                    return vm.availableServices;
                });
        }

        function disabledDate(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0);
        }

        function toggleService(service) {
            if (service.isSelected)
                vm.appointmentRequest.selectedServices.push(service);
            else
                vm.appointmentRequest.selectedServices.pop(service);
        }

        function submitStepOne() {
            vm.form.isValid = true;

            if (vm.appointmentRequest.gender.length === 0) {
                logger.error('Don\'t be shy!  Please select your gender.');
                vm.form.isValid = false;
            }
            if (vm.appointmentRequest.selectedServices.length === 0) {
                logger.error('Please select at least one service.');
                vm.form.isValid = false;
            }

            if (!vm.form.isValid) return;

            console.log(vm.appointmentRequest);
            
            appointmentService.submitApptRequest(vm.appointmentRequest)
            .then(function(results) {
                $state.transitionTo('clientAppointments.step2', { appointmentRequest: vm.appointmentRequest });
            });
            
        }

        function serviceDisabled(service) {
            return vm.appointmentRequest.gender === 'male' && !service.unisex;
        }

        function changeGender() {
            if (vm.appointmentRequest.gender == 'female') return;
            
            var servicesToRemove = [];
            
            angular.forEach(vm.appointmentRequest.selectedServices, function (svc) {
                if (!svc.unisex) {
                    svc.isSelected = false;
                    servicesToRemove.push(svc);
                }
            });
            
            angular.forEach(servicesToRemove, function(svc) {
                vm.appointmentRequest.selectedServices.pop(svc);
            })
        }
    }
})();