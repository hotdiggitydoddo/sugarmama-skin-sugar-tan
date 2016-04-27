(function() {
    'use strict';

    angular.module('app.appointments').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'appointments_step_1',
                config: {
                    url: '/appointments/book',
                    templateUrl: 'app/appointments/step1.html',
                    controller: 'ClientAppointments',
                    controllerAs: 'vm',
                    title: 'Find an Opening',
                    settings: {
                        nav: 1,
                        content: 'appointments'
                    },
                }
            }];
    }
})();