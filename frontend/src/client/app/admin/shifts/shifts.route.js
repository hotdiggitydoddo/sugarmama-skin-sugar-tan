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
                templateUrl: 'app/admin/shifts/shifts.html',
                controller: 'Shifts',
                controllerAs: 'vm',
                parent: 'estheticians_detail',
                title: 'Details',
                data: {
                    authRequired: true
                }
            }
        }];
    }
})();