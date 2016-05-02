(function () {
    'use strict';

    angular.module('app.appointments').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'clientAppointments',
                config: {
                    url: '/appointments/book',
                    templateUrl: 'app/appointments/appointments.html',
                    controller: 'ClientAppointments',
                    controllerAs: 'vm',
                    title: 'Book an Appointment',
                    settings: {
                        nav: 1,
                        content: 'appointments'
                    },
                }
            },
            {
                state: 'clientAppointments.step1',
                config: {
                    templateUrl: 'app/appointments/appointments.step1.html',
                    controller: 'ClientAppointmentsStepOne',
                    controllerAs: 'vm',
                    params: {
                        appointmentRequest: null
                    },
                }
            },
            {
                state: 'clientAppointments.step2',
                config: {
                    templateUrl: 'app/appointments/appointments.step2.html',
                    controller: 'ClientAppointmentsStepTwo',
                    controllerAs: 'vm',
                    params: {
                        appointmentRequest: null
                    },
                }
            }];
    }
})();