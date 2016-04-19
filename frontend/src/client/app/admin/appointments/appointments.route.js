(function() {
    'use strict';

    angular.module('app.admin.appointments').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'appointments',
                config: {
                    url: '/admin/appointments',
                    templateUrl: 'app/admin/appointments/appointments.html',
                    controller: 'Appointments',
                    controllerAs: 'vm',
                    title: 'Appointments',
                    settings: {
                        nav: 3,
                        content: 'appointments'
                    },
                    // data: {
                    //     authRequired: true
                    // }
                }
            }];
    }
})();