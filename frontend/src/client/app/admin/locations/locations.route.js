(function () {
    'use strict';

    angular.module('app.admin.locations').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
                state: 'locations',
                config: {
                    url: '/admin/locations',
                    templateUrl: 'app/admin/locations/locations.html',
                    controller: 'locations',
                    controllerAs: 'vm',
                    title: 'locations',
                    settings: {
                        nav: 2,
                        content: 'locations'
                    },
                    data: {
                        authRequired: true
                    }
                }
            }, {
                state: 'locations.add',
                config: {
                    url: '/add',
                    controller: 'locations',
                    controllerAs: 'vm',
                    title: 'add business day',
                    views: {
                        "content": {
                            templateUrl: 'app/admin/locations/add.html'
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
