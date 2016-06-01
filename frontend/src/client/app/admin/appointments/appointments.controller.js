(function () {
    'use strict';

    angular.module('app.admin.appointments').controller('Appointments', Appointments);

    Appointments.$inject = ['$state', '$uibModal', '$sails', 'logger', 'envService', 'appointmentService'];

    function Appointments($state, $uibModal, $sails, logger, envService, appointmentService) {
        var vm = this;
        vm.estheticians = [];
        vm.title = 'appointments';
        vm.env = envService.get();

        vm.openBlockoutModal = openBlockoutModal;
        activate();

        function activate() {
            $sails.get('/appointment/sync')
                .then(function (res) {
                    vm.res = res;
                }, function (err) {
                    logger.error('Error trying to sync for real-time updates.');
                });
                
                $sails.on('refresh', function(message) {
                        var schedulerEl = $("iframe").contents().find("#scheduler");
                        schedulerEl.trigger('contextmenu');
                });
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