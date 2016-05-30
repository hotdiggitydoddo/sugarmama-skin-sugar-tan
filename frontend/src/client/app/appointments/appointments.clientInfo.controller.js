(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientInfo', ClientInfo);

    ClientInfo.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService', '$stateParams', '$scope'];

    function ClientInfo($state, $uibModal, logger, spaServiceService, $stateParams, $scope) {
        var vm = this;
        
        vm.appointmentRequest = $stateParams.appointmentRequest;
        vm.openings = $stateParams.openings;
        
        vm.previous = previous;
        //vm.submitForm = submitForm;
        activate();

        function activate() {
            if (!vm.appointmentRequest) {
                $state.go('appointment.chooseServices');
                return;
            }
        }

        // function submitForm() {
        //     var a = vm.appointmentRequest;
        //     debugger;
        // }
        
        function dtFormatter(value, row, index) {
            return moment(value).format('h:mm a');
        }

        function durationFormatter(value, row, index) {
            var start = moment(row.start);
            var end = moment(row.end);

            return (moment.duration(end - start) / 60000) + " minutes";
        }
        
        function previous() {
            $state.go('appointment.chooseTimeSlot',{ appointmentRequest: vm.appointmentRequest, openings: vm.openings })
        }
    }
})();