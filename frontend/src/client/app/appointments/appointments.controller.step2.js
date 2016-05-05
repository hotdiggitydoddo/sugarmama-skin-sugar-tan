(function () {
    'use strict';

    angular.module('app.appointments').controller('ClientAppointmentsStepTwo', ClientAppointmentsStepTwo);

    ClientAppointmentsStepTwo.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService'];

    function ClientAppointmentsStepTwo($state, $uibModal, logger, spaServiceService) {
        var vm = this;
        vm.appointmentRequest = $state.params.appointmentRequest;

        if (!vm.appointmentRequest) {
            $state.go('clientAppointments_step1');
            return;
        }

        vm.appointmentRequest.selectedDateString = moment(vm.appointmentRequest.selectedDate).format("dddd, MMMM Do").toLowerCase();

        vm.bsTableControl = {
            options: {
                data: vm.appointmentRequest.openings,
                cardView: true,
                height: 500,
                clickToSelect: true,
                onClickRow: rowClicked,
                columns: [{

                    field: 'start',
                    title: 'starts',
                    formatter: dtFormatter
                    // align: 'right',
                    // valign: 'bottom',
                    // sortable: true
                }, {
                        field: 'end',
                        title: 'ends',
                        formatter: dtFormatter
                        // align: 'center',
                        // valign: 'bottom',
                        // sortable: true
                    }, {
                        title: 'duration',
                        formatter: durationFormatter,
                    },
                    {
                        title: 'esthetician',
                        field: 'esthetician'
                    }]
            }
        }



        function activate() {
        }

        function rowClicked(row, element) {
            vm.appointmentRequest.startTime = row.start;
            vm.appointmentRequest.endTime = row.end;
            vm.appointmentRequest.esthetician = row.esthetician;
            if (vm.appointmentRequest.location == 1)
                vm.appointmentRequest.location = 'stanton';
            else
                vm.appointmentRequest.location = 'brea';
            
            $state.go('clientAppointments_step3', { appointmentRequest: vm.appointmentRequest });
        }

        function dtFormatter(value, row, index) {
            return moment(value).format('h:mm a');
        }

        function durationFormatter(value, row, index) {
            var start = moment(row.start);
            var end = moment(row.end);

            return (moment.duration(end - start) / 60000) + " minutes";
        }
    }
})();