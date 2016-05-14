(function () {
    'use strict';

    angular.module('app.admin.appointments').controller('Appointments', Appointments);

    Appointments.$inject = ['$state', '$uibModal',  'logger', 'envService', 'appointmentService'];

    function Appointments($state, $uibModal,  logger, envService, appointmentService) {
        var vm = this;
        vm.estheticians = [];
        vm.title = 'appointments';
        vm.env = envService.get();

        vm.openBlockoutModal = openBlockoutModal;
        activate();

        function activate() {
        }

        function openBlockoutModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/appointments/appointment.blockout.html',
                controller: 'AppointmentsBlockout',
                controllerAs: 'vm'
            });
        }
    }
})();