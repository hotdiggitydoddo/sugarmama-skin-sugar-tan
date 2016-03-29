(function () {
    'use strict';

    angular.module('app.admin.estheticians').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'estheticians',
            config: {
                url: '/admin/estheticians',
                templateUrl: 'app/admin/estheticians/estheticians.html',
                controller: 'Estheticians',
                controllerAs: 'vm',
                title: 'Estheticians',
                settings: {
                    nav: 1,
                    content: 'estheticians'
                },
                data: {
                    authRequired: true
                }
            }
        }, {
            state: 'estheticians_detail',
            config: {
                url: '/admin/estheticians/:id',
                templateUrl: 'app/admin/estheticians/esthetician.detail.html',
                controller: 'EstheticianDetail',
                controllerAs: 'vm',
                title: 'blah',
                data: {
                    id: ':id',
                }
            }
        }];
    }
})();