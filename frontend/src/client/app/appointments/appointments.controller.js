(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointments', ClientAppointments);

    ClientAppointments.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService'];

    function ClientAppointments($state, $uibModal, $logger, spaServiceService) {
        var vm = this;
        vm.title = 'book appointment';
        vm.availableServices = {};
        vm.guestOptions = [
            { text: 'just me', value: 1 },
            { text: 'two guests', value: 2 },
            { text: 'three guests', value: 3 },
        ]

        vm.appointmentRequest = {
            selectedGuestCount: 1,
            selectedDate: new Date()
        }
        
        vm.dpOptions = {
            showWeeks: false,
            minDate: new Date()
        }
        
        vm.form = {
            isValid: false,
            loading: false
        }
        
        vm.accHairRemovalOpen = true;
        vm.accFacialOpen = false;
        vm.accMicrodermOpen = false;
        vm.accPeelOpen = false;
        vm.accTanningOpen = false;

        activate();

        function activate() {
            return spaServiceService.getServices(true)
                .then(function (data) {
                    vm.availableServices = data;
                    return vm.availableServices;
                });
        }
    }
})();