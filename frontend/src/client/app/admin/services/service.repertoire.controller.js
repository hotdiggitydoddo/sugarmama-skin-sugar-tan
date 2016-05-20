(function () {
    'use strict';

    angular.module('app.admin.services').controller('ServiceRepertoire', ServiceRepertoire);

    ServiceRepertoire.$inject = ['$state', '$uibModal', 'logger', 'estheticianService'];

    function ServiceRepertoire($state, $uibModal, logger, estheticianService) {
        var vm = this;
        vm.serviceRepertoire = [];
        vm.estheticianId = $state.params.id;
        vm.isAdmin = $state.params.isAdmin;
        vm.save = save;
        vm.saving = false;

        activate();

        function activate() {
            getServiceRepertoire(vm.estheticianId);
        }

        function getServiceRepertoire(id) {
            return estheticianService.getServiceRepertoire(id)
                .then(function (data) {
                    vm.serviceRepertoire = data;
                    return vm.serviceRepertoire;
                });
        }

        function save() {
            var repertoire = {
                estheticianId: vm.estheticianId,
                services: vm.serviceRepertoire
            };

            vm.saving = true;

            return estheticianService.saveRepertoire(repertoire)
                .then(function (data) {
                    logger.success('Service repertoire updated.')
                })
                .finally(function () {
                    vm.saving = false;
                });
        }
    }
})();