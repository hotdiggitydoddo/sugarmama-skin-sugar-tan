(function () {
    'use strict';

    angular.module('app.appointments').controller('TimeSlots', TimeSlots);

    TimeSlots.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService', '$stateParams'];

    function TimeSlots($state, $uibModal, logger, spaServiceService, $stateParams) {
        var vm = this;

        // if (!vm.appointmentRequest) {
        //     $state.go('clientAppointments_step1');
        //     return;
        // }
        vm.appointmentRequest = $stateParams.appointmentRequest;
        vm.openings = $stateParams.openings;
        vm.changeDate = changeDate;
      
        vm.selectedIndex = -1;
        vm.bsTableControls = [];
        activate();

        function activate() {
            if (!vm.appointmentRequest) {
                $state.go('appointment.chooseServices')
            }
             
            vm.appointmentRequest.selectedDateString = moment(vm.appointmentRequest.selectedDate).format("dddd, MMMM Do YYYY").toLowerCase();      
            vm.openings.forEach(function (openingSet) {
                if (openingSet.selected) {
                    vm.selectedIndex = vm.openings.indexOf(openingSet);
                }
                vm.bsTableControls.push({
                    options: {
                        data: openingSet.openings,
                        cardView: true,
                        height: 500,
                        striped: true,
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
                });
            });
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

        function changeDate(date, index) {
            var old = vm.openings.find(function (item) { return item.selected; });
            old.selected = false;
            vm.openings[index].selected = true;
            vm.selectedIndex = index;
            vm.appointmentRequest.selectedDate = date.date;
            vm.appointmentRequest.selectedDateString = date.longDate.toLowerCase();
        }
    }
})();