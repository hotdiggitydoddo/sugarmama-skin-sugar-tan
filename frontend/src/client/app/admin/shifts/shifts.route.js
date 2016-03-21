(function () {
    'use strict';

    angular.module('app.admin.shifts').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'shifts',
            config: {
                //url: '/admin/estheticians',
                templateUrl: '/app/admin/shifts/shifts.html',
                controller: 'Shifts',
                controllerAs: 'vm',
                parent: 'estheticians_detail',
                //title: 'Shif',
                // settings: {
                //     nav: 1,
                //     content: 'estheticians'
                // },
                data: {
                    authRequired: true
                }
            }
        }];
    }
})();