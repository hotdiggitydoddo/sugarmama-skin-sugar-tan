(function () {
    'use strict';

    angular.module('app.admin.businessDays').controller('BusinessDayDetail', BusinessDayDetail);

    BusinessDayDetail.$inject = ['$state', '$uibModalInstance', 'logger', 'locationService', 'businessDay', 'businessDays'];

    function BusinessDayDetail($state, $uibModalInstance, logger, locationService, businessDay, businessDays) {
        var vm = this;

        vm.businessDay = {
            id: -1,
            openingTime: moment('2000-01-01 09:00'),
            closingTime: moment('2000-01-01 18:00'),
            dayOfWeek: "",
            location: parseInt($state.params.id),
        };

        vm.cancel = cancel;
        vm.save = save;
        vm.deleteBusinessDay = deleteBusinessDay;
        vm.savingBusinessDay = false;
        vm.daysOfWeek = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday"
        ]

        activate(businessDay);

        function activate(businessDay) {
            if (businessDay) {
                vm.businessDay.id = businessDay.id;
                vm.businessDay.startTime = moment(businessDay.startTime).format('YYYY-MM-DD HH:mm');
                vm.businessDay.endTime = moment(businessDay.endTime).format('YYYY-MM-DD HH:mm');
                vm.businessDay.businessDay = businessDay.businessDay;
                return vm.businessDay;
            }
        }

        function getEstheticians() {
            return locationService.getEstheticians()
                .then(function (data) {
                    vm.locations = data;
                    return vm.locations;
                });
        }

        function save() {
            if (vm.businessDay.dayOfWeek == '') {
                logger.error('Please select a day of the week.');
                return;
            }

            vm.savingBusinessDay = true;

            return locationService.saveBusinessDay(vm.businessDay)
                .then(function (data) {
                    if (vm.businessDay.id > 0)
                        logger.success('Business hours updated!')
                    else
                        logger.success('Business hours added!')
                    $uibModalInstance.close(data);
                })
                .catch(function (err) {
                    logger.error('Error saving business hours.')
                })
                .finally(function () {
                    vm.savingBusinessDay = false;
                });
        }

        function deleteBusinessDay() {
            if (!confirm("Are you sure you wish to delete these business hours?")) {
                $uibModalInstance.dismiss('cancel');
                return;
            }

            vm.savingBusinessDay = true;
            return locationService.deleteBusinessDay(vm.businessDay.id)
                .then(function (data) {
                    logger.success('Business hours deleted.')
                    data.isDeleted = true;
                    $uibModalInstance.close(data);
                })
                .catch(function (err) {

                })
                .finally(function () {
                    vm.savingBusinessDay = false;
                });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();