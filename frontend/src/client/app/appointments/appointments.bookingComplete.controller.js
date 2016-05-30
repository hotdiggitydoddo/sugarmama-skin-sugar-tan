(function () {
    'use strict';

    angular.module('app.appointments').controller('BookingComplete', BookingComplete);

    BookingComplete.$inject = ['$state', '$uibModal', 'logger', 'spaServiceService', 'appointmentService'];

    function BookingComplete($state, $uibModal, logger, spaServiceService, appointmentService) {
         var vm = this;
         vm.appointment = $state.params.appointment;
    }
})();