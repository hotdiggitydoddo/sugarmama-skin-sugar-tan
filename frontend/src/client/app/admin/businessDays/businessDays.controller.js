(function () {
    'use strict';

    angular.module('app.admin.businessDays').controller('BusinessDays', BusinessDays);

    BusinessDays.$inject = ['$state', '$uibModal', 'logger', 'locationService'];

    function BusinessDays($state, $uibModal, logger, locationService) {
        var vm = this;
        vm.businessDays = [];
        vm.title = 'businessDays';
        vm.locationId = $state.params.id;
        vm.addNewBusinessDay = addNewBusinessDay;
        vm.selectBusinessDay = selectBusinessDay;
        vm.selectedBusinessDay = {};



        activate();

        function activate() {
            getBusinessDays(vm.locationId);
        }

        function getBusinessDays(id) {
            return locationService.getBusinessDays(id)
                .then(function (data) {
                    console.log(data);
                    vm.businessDays = data;
                    return vm.businessDays;
                });
        }

        function selectBusinessDay(businessDay, index) {
            console.log("selected:" + businessDay.id);
            vm.selectedBusinessDay = businessDay;
            vm.selectedBusinessDay.index = index;
            openAddModal();
        }

        function addNewBusinessDay() {
            vm.selectedBusinessDay = null;
            openAddModal();
        }

        function openAddModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/businessDays/businessDay.detail.html',
                controller: 'BusinessDayDetail',
                controllerAs: 'vm',
                resolve: {
                    businessDay: function () { return vm.selectedBusinessDay; },
                    businessDays: function () { return vm.businessDays; }
                }
            });

            modalInstance.result.then(function (businessDay) {
                if (businessDay.isDeleted) {
                    vm.businessDays.splice(vm.selectedBusinessDay.index, 1);
                    vm.businessDays.selectedBusinessDay = null;
                    return;
                }

                // var businessDay = vm.businessDays.find(function (day) { return businessDay.businessDay === day.id });
                // businessDay.businessDay = angular.copy(businessDay);

                var existing = vm.businessDays.find(function (existing) {
                    return existing.id === businessDay.id;
                });

                if (existing) {
                    existing.openingTime = businessDay.openingTime;
                    existing.closingTime = businessDay.closingTime;
                    existing.dayOfWeek = businessDay.dayOfWeek;
                    vm.selectedBusinessDay = null;
                } else {
                    vm.businessDays.push(businessDay);
                }

            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();