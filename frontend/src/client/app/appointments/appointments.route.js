(function () {
    'use strict';

    angular.module('app.appointments').run(appRun);

    appRun.$inject = ['routerHelper', 'user_roles'];

    function appRun(routerHelper, user_roles) {
        routerHelper.configureStates(getStates(user_roles));
    }

    function getStates(user_roles) {
        return [
            {
                state: 'clientAppointments_step1',
                config: {
                    url: '/appointments',
                    templateUrl: 'app/appointments/appointments.step1.html',
                    controller: 'ClientAppointmentsStepOne',
                    controllerAs: 'vm',
                    title: 'Book an Appointment',
                    settings: {
                        nav: 1,
                        content: 'book'
                    },
                    data: {
                        authRequired: true,
                        authorizedRoles: [user_roles.admin, user_roles.owner, user_roles.esthetician]
                    },
                }
            },
            {
                state: 'clientAppointments_step2',
                config: {
                    url: '/appointments/openings',
                    templateUrl: 'app/appointments/appointments.step2.html',
                    controller: 'ClientAppointmentsStepTwo',
                    controllerAs: 'vm',
                    title: 'Book an Appointment',
                    params: {
                        appointmentRequest: null
                    },
                    data: {
                        authRequired: true,
                        authorizedRoles: [user_roles.admin, user_roles.owner, user_roles.esthetician]
                    },
                }
            },
            {
                state: 'clientAppointments_step3',
                config: {
                    url: '/appointments/book',
                    templateUrl: 'app/appointments/appointments.step3.html',
                    controller: 'ClientAppointmentsStepThree',
                    controllerAs: 'vm',
                    title: 'Book an Appointment',
                    params: {
                        appointmentRequest: null
                    },
                    data: {
                        authRequired: true,
                        authorizedRoles: [user_roles.admin, user_roles.owner, user_roles.esthetician]
                    },
                }
            },
            {
                state: 'clientAppointments_step4',
                config: {
                    url: '/appointments/confimation',
                    templateUrl: 'app/appointments/appointments.step4.html',
                    controller: 'ClientAppointmentsStepFour',
                    controllerAs: 'vm',
                    title: 'Book an Appointment',
                    params: {
                        appointment: null
                    },
                    data: {
                        authRequired: true,
                        authorizedRoles: [user_roles.admin, user_roles.owner, user_roles.esthetician]
                    },
                }
            }];
    }
})();