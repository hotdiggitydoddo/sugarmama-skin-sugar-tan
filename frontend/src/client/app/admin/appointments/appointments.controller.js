(function() {
    'use strict';

    angular.module('app.admin.appointments').controller('Appointments', Appointments);

    Appointments.$inject = ['$state', '$uibModal', 'logger'];

    function Appointments($state, $uibModal, logger) {
        var vm = this;
        vm.estheticians = [];
        vm.title = 'appointments';


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