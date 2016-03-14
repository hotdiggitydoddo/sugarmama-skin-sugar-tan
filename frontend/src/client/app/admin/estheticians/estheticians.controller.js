(function () {
    'use strict';

    angular.module('app.admin.estheticians').controller('Estheticians', Estheticians);

    Estheticians.$inject = ['$state', '$uibModal', 'logger', 'estheticianService'];

    function Estheticians($state, $uibModal, logger, estheticianService) {
        var vm = this;
        vm.estheticians = [];
        vm.title = 'estheticians';
        vm.openAddModal = openAddModal;
        activate();

        function activate() {
           
            logger.info('Activated Estheticians View');
            getEstheticians();
        }

        function getEstheticians() {
            return estheticianService.getEstheticians()
                .then(function (data) {
                    vm.estheticians = data;
                    return vm.estheticians;
                });
        }

        function openAddModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/estheticians/estheticians.add.html',
                controller: 'AddEsthetician',
                controllerAs: 'vm',
            });

            modalInstance.result.then(function (esthetician) {
                console.log(esthetician);
                vm.estheticians.push(esthetician);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();