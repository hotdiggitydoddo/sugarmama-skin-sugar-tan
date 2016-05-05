(function() {
    'use strict';

    angular.module('app.admin.appointments').controller('Appointments', Appointments);

    Appointments.$inject = ['$state', '$uibModal', 'logger', 'envService'];

    function Appointments($state, $uibModal, logger, envService) {
        var vm = this;
        vm.estheticians = [];
        vm.title = 'appointments';
        vm.env = envService.get();

        activate();

        function activate() {
            // // angular.element(document).ready(function() {
            // //     $("#menu-toggle-wrapper").trigger('click');
            // // });
            // // logger.info('Activated Estheticians View');
            // getEstheticians();
        }
    }
})();