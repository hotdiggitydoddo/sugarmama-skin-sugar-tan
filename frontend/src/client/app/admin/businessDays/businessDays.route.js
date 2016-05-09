(function () {
    'use strict';

    angular.module('app.admin.businessDays').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'businessDays',
            config: {
                templateUrl: 'app/admin/businessDays/businessDays.html',
                controller: 'BusinessDays',
                controllerAs: 'vm',
                parent: 'locations_detail',
                data: {
                    authRequired: true
                }
            }
        }];
    }
})();