(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointments', ClientAppointments);

    ClientAppointments.$inject = ['$state', '$uibModal', 'logger', 'appointmentService'];

    function ClientAppointments($state, $uibModal, logger, appointmentService) {
        var vm = this;
        vm.appointmentRequest = {};
        vm.appointmentRequest.selectedServices = [];
        vm.data = {};
        vm.changeGender = changeGender;
        vm.serviceDisabled = serviceDisabled;
        vm.toggleService = toggleService;
        vm.checkAvailableOpenings = checkAvailableOpenings;
        vm.dpOptions = {
            showWeeks: false,
            minDate: new Date()
        }

        activate();

        function activate() {
            appointmentService.initiateBooking()
                .then(function (data) {
                    vm.data = data;
                    $state.go('appointment.chooseServices');
                })
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

            angular.forEach(servicesToRemove, function (svc) {
                vm.appointmentRequest.selectedServices.pop(svc);
            })
        }

        function toggleService(service) {
            if (service.isSelected)
                vm.appointmentRequest.selectedServices.push(service);
            else
                vm.appointmentRequest.selectedServices.pop(service);
            reevaluateEstheticianDropDown();
        }

        function reevaluateEstheticianDropDown() {
            vm.availableEstheticians = [];
            vm.appointmentRequest.selectedEsthetician = "";
            var svcReqIds = vm.appointmentRequest.selectedServices.map(function (svc) { return svc.id });
            vm.data.estheticians.forEach(function (esth) {
                if (svcReqIds.every(function (svc) { return esth.services.indexOf(svc) >= 0; }) || svcReqIds.length == 0)
                    vm.availableEstheticians.push({ id: esth.id, name: esth.name });
            })
        }

        function checkAvailableOpenings() {
            appointmentService.checkAvailableOpenings(vm.appointmentRequest)
                .then(function (data) {
                    var selectedDate = moment(vm.appointmentRequest.selectedDate);

                    data.forEach(function (item) {
                        var mom = moment(item.date);
                        var longDate = mom.format('dddd, MMMM Do');
                        var day = mom.format('ddd');
                        var shortDate = mom.format('M/D');
                        item.selected = mom.date() == selectedDate.date();
                        item.day = day;
                        item.shortDate = shortDate;
                        item.longDate = longDate;
                    });
                    vm.openings = data;
                    $state.go('appointment.chooseTimeSlot', {appointmentRequest: vm.appointmentRequest, openings: vm.openings});
                })
        }
        
      
    }
})();

// (function () {
//     'use strict';

//     angular.module('app.appointments').controller('ClientAppointments', ClientAppointments);

//     ClientAppointments.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService'];

//     function ClientAppointments($state, $uibModal, logger, spaServiceService) {
//         var vm = this;


//         activate();

//         function activate() {
//             $state.go('clientAppointments.step1');
//         }
//     }
// })();