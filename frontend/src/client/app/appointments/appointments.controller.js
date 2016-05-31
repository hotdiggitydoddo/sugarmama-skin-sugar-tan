(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointments', ClientAppointments);

    ClientAppointments.$inject = ['$state', '$uibModal', 'logger', 'appointmentService'];

    function ClientAppointments($state, $uibModal, logger, appointmentService) {
        var vm = this;
        vm.appointmentRequest = {};
        vm.appointmentRequest.selectedServices = [];
        vm.appointmentRequest.timeSlotSelected = false;
        vm.data = {};
        vm.changeGender = changeGender;
        vm.serviceDisabled = serviceDisabled;
        vm.toggleService = toggleService;
        vm.checkAvailableOpenings = checkAvailableOpenings;
        vm.submitForm = submitForm;
        vm.dpOptions = {
            showWeeks: false,
            minDate: new Date()
        }

        activate();

        function activate() {
            vm.header = "let's get acquainted..."
            appointmentService.initiateBooking()
                .then(function (data) {
                    vm.data = data;
                    $state.go('appointment.chooseServices');
                })
        }

        function submitForm() {
            vm.appointmentRequest.formSubmitted = true;
            vm.appointmentRequest.loading = true;
            
            appointmentService.book(vm.appointmentRequest)
                .then(function (confirmation) {
                    vm.bookingComplete = true;
                    vm.header = "done."
                    
                    confirmation.esthetician = vm.data.estheticians.find(function(esth) { return esth.id == confirmation.esthetician;}).name;
                    confirmation.location = vm.data.locations.find(function(loc) { return loc.id == confirmation.location;}).city;
                    $state.go("appointment.bookingComplete", { appointment: confirmation });
                })
                .catch(function (err) {
                    logger.error('Uh oh!  An error occurred while booking your appointment.  Please call us to book.')
                })
                .finally(function () {
                    vm.appointmentRequest.loading = false;
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
            var hasErrors = false

            if (!vm.appointmentRequest.location || vm.appointmentRequest.location == "") {
                logger.error('Please choose a location.');
                hasErrors = true;
            }
            if (vm.appointmentRequest.selectedServices.length == 0) {
                logger.error('You haven\'t selected any services.');
                hasErrors = true;
            }
            if (!vm.appointmentRequest.gender) {
                logger.error('Don\'t be shy!  Please select a gender.');
                hasErrors = true;
            }
            if (hasErrors)
                return;

            appointmentService.checkAvailableOpenings(vm.appointmentRequest)
                .then(function (data) {
                    var selectedDate = moment(vm.appointmentRequest.selectedDate);

                    data.forEach(function (item) {
                        var mom = moment(item.date);
                        var longDate = mom.format('dddd, MMMM Do YYYY');
                        var day = mom.format('ddd');
                        var shortDate = mom.format('M/D');
                        item.selected = mom.date() == selectedDate.date();
                        item.day = day;
                        item.shortDate = shortDate;
                        item.longDate = longDate;
                    });
                    vm.openings = data;
                    $state.go('appointment.chooseTimeSlot', { appointmentRequest: vm.appointmentRequest, openings: vm.openings });
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