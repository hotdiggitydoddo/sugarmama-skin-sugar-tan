(function () {
    'use strict';

    angular.module('app.admin.estheticians').controller('EstheticianAppointments', EstheticianAppointments);

    EstheticianAppointments.$inject = ['$state', '$uibModal', 'logger', 'estheticianService', 'locationService'];

    function EstheticianAppointments($state, $uibModal, logger, estheticianService, locationService) {
        var vm = this;
        vm.appointments = [];
        vm.title = 'appointments';
        vm.estheticianId = $state.params.id;
        vm.selectAppointment = selectAppointment;
        vm.selectedAppointment = {};

        activate();

        function activate() {
            getAppointments(vm.estheticianId);
        }

        function getAppointments(id) {
            return estheticianService.getAppointments(id)
                .then(function (data) {

                    var byDate = [];

                    data.forEach(function (appt) {
                        if (appt.firstName.indexOf('lockout') != -1)
                            return;
                        var date = new Date(appt.startTime);
                        date.setHours(0);
                        date.setMinutes(0);

                        var dateInCollection = byDate.filter(function (val) { 
                            return moment(val.key).isSame(moment(date)); 
                        });
                        
                        if (dateInCollection.length > 0) {
                             dateInCollection[0].appts.push(appt);
                        }
                        else {
                              byDate.push({ key: date, appts: [appt] });
                        }
                    });

                    vm.appointments = byDate;
                    return vm.appointments;

                });
        }

        function selectAppointment(shift, index) {
            console.log("selected:" + shift.id);
            vm.selectedAppointment = shift;
            vm.selectedAppointment.index = index;
            openAddModal();
        }

        function openAddModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/appointments/shift.detail.html',
                controller: 'ShiftDetail',
                controllerAs: 'vm',
                resolve: {
                    shift: function () { return vm.selectedAppointment; },
                    locations: function () { return vm.locations; }
                }
            });

            modalInstance.result.then(function (shift) {
                if (shift.isDeleted) {
                    vm.appointments.splice(vm.selectedAppointment.index, 1);
                    vm.appointments.selectedAppointment = null;
                    return;
                }

                var existing = vm.appointments.find(function (existing) {
                    return existing.id === shift.id;
                });

                if (existing) {
                    existing.startTime = shift.startTime;
                    existing.endTime = shift.endTime;
                    existing.businessDay = shift.businessDay;
                    vm.selectedAppointment = null;
                } else {
                    vm.appointments.push(shift);
                }

            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();