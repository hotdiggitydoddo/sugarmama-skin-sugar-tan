(function () {
    'use strict';

    angular.module('app.appointments').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [];
        // return [
        //     {
        //         state: 'clientAppointments_step1',
        //         config: {
        //             url: '/appointments',
        //             templateUrl: 'app/appointments/appointments.step1.html',
        //             controller: 'ClientAppointmentsStepOne',
        //             controllerAs: 'vm',
        //             title: 'Book an Appointment',
        //              settings: {
        //                 nav: 1,
        //                 content: 'appointments'
        //             },
        //         }
        //     },
        //     {
        //         state: 'clientAppointments_step2',
        //         config: {
        //             url: '/appointments/openings',
        //             templateUrl: 'app/appointments/appointments.step2.html',
        //             controller: 'ClientAppointmentsStepTwo',
        //             controllerAs: 'vm',
        //             title: 'Book an Appointment',
        //             params: {
        //                 appointmentRequest: null
        //             },
        //         }
        //     },
        //     {
        //         state: 'clientAppointments_step3',
        //         config: {
        //             url: '/appointments/book',
        //             templateUrl: 'app/appointments/appointments.step3.html',
        //             controller: 'ClientAppointmentsStepThree',
        //             controllerAs: 'vm',
        //             title: 'Book an Appointment',
        //             params: {
        //                 appointmentRequest: null
        //             },
        //         }
        //     }];
    }
})();