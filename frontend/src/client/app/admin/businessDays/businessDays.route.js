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
                    url: '/admin/businessdays',
                    templateUrl: 'app/admin/businessDays/businessDays.html',
                    controller: 'BusinessDays',
                    controllerAs: 'vm',
                    title: 'Business Days',
                    settings: {
                        nav: 2,
                        content: 'business days'
                    },
                    data: {
                        authRequired: true
                    }
                }
            }, {
                state: 'businessDays.add',
                config: {
                    url: '/add',
                    controller: 'BusinessDays',
                    controllerAs: 'vm',
                    title: 'add business day',
                    views: {
                        "content": {
                            templateUrl: 'app/admin/businessdays/add.html'
                        }
                    },
                    data: {
                        authRequired: true
                    }
                }
            }
            // {
            //     // state: 'services.facials',
            //     // config: {
            //     //     url: '/facials',
            //     //
            //     //     controller: 'Services',
            //     //     controllerAs: 'vm',
            //     //     title: 'facials and microderms',
            //     //     views: {
            //     //     	"content": {templateUrl: 'app/services/facials.html'}
            //     //     }
            //     // }
            // }
        ];
    }
})();
