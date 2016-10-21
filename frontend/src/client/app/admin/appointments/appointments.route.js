(function() {
    'use strict';

    angular.module('app.admin.appointments').run(appRun);

      appRun.$inject = ['routerHelper', 'user_roles'];

      function appRun(routerHelper, user_roles) {
        routerHelper.configureStates(getStates(user_roles));
    }

    function getStates(user_roles) {
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
                    data: {
                        authRequired: true,
                        authorizedRoles: [user_roles.admin, user_roles.owner]
                    },
                    css: [
                        {
                            href: 'https://kendo.cdn.telerik.com/2016.1.226/styles/kendo.common-material.min.css',
                        },
                        {
                            href: 'https://kendo.cdn.telerik.com/2016.1.226/styles/kendo.material.min.css'
                        },
                        // {
                        //     href: 'app/admin/appointments/scheduler.css'
                        // }
                    ]
                }
            }];
    }
})();