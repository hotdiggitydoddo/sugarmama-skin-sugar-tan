(function() {
    'use strict';

    angular.module('app.admin.shifts').controller('ShiftDetail', ShiftDetail);

    ShiftDetail.$inject = ['$state', '$uibModalInstance', 'logger', 'estheticianService', 'shift', 'businessDays'];

    function ShiftDetail($state, $uibModalInstance, logger, estheticianService, shift, businessDays) {
        var vm = this;

        vm.shift = {
            id: -1,
            startTime: moment('2000-01-01 09:00'),
            endTime: moment('2000-01-01 18:00'),
            businessDay: {},
            location: {},
            esthetician: parseInt($state.params.id),
        };

        vm.cancel = cancel;
        vm.save = save;
        vm.deleteShift = deleteShift;
        vm.savingShift = false;
        vm.daysOfWeek = [];
        vm.locations = [];

        activate(shift);

        function activate(shift) {
            businessDays.forEach(function(day) {
                if (vm.daysOfWeek.find(function(day) {
                    day.dayOfWeek === day.id
                }) === undefined) {
                    vm.daysOfWeek.push({ id: day.id, value: day.dayOfWeek });
                }

                if (vm.locations.find(function(loc) {
                    loc.id === day.location.id
                }) === undefined) {
                    vm.locations.push({ id: day.location.id, value: day.location.name })
                }
            });

            if (shift) {
                vm.shift.id = shift.id;
                vm.shift.startTime = moment(shift.startTime).format('YYYY-MM-DD HH:mm');
                vm.shift.endTime = moment(shift.endTime).format('YYYY-MM-DD HH:mm');
                vm.shift.businessDay = shift.businessDay;
                return vm.shift;
            }
        }

        function getEstheticians() {
            return estheticianService.getEstheticians()
                .then(function(data) {
                    vm.estheticians = data;
                    return vm.estheticians;
                });
        }

        function save() {
            var daysent = businessDays.find(function(day) {
                return day.id === vm.shift.businessDay.id && day.location.id === vm.shift.businessDay.location.id
            });
            if (daysent === undefined) {
                logger.error('Selected location is not open on selected day.')
                return;
            }

            vm.savingShift = true;

            return estheticianService.saveShift(vm.shift)
                .then(function(data) {
                    if (vm.shift.id > 0)
                        logger.success('Shift updated!')
                    else
                        logger.success('Shift added!')
                    $uibModalInstance.close(data);
                })
                .catch(function(err) {

                })
                .finally(function() {
                    vm.savingShift = false;
                });
        }

        function deleteShift() {
            if (!confirm("Are you sure you wish to delete this shift?")) {
                 $uibModalInstance.dismiss('cancel');
                 return;
            }
            
            vm.savingShift = true;
            return estheticianService.deleteShift(vm.shift.id)
                .then(function(data) {
                    logger.success('Shift deleted.')
                    data.isDeleted = true;
                    $uibModalInstance.close(data);
                })
                .catch(function(err) {

                })
                .finally(function() {
                    vm.savingShift = false;
                });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();