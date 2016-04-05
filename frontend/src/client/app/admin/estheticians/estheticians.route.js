(function() {
    'use strict';

    angular.module('app.admin.estheticians').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'estheticians',
                config: {
                    url: '/admin/estheticians/',
                    templateUrl: 'app/admin/estheticians/estheticians.html',
                    controller: 'Estheticians',
                    controllerAs: 'vm',
                    title: 'Estheticians',
                    settings: {
                        nav: 1,
                        content: 'estheticians'
                    },
                    params: {
                        deletedId: null
                    },
                    data: {
                        authRequired: true
                    }
                }
            }, {
                state: 'estheticians_detail',
                config: {
                    url: '/admin/estheticians/:id',
                    title: 'Details',
                    data: {
                        id: ':id',
                        authRequired: true
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/admin/estheticians/esthetician.detail.html',
                            controller: 'EstheticianDetail',
                            controllerAs: 'vm',
                        },
                        'shifts@estheticians_detail': {
                            templateUrl: 'app/admin/shifts/shifts.html',
                            controller: 'Shifts',
                            controllerAs: 'vm',
                            parent: 'estheticians_detail',
                            title: 'Details',
                        },
                        'appointments@estheticians_detail': {
                            template: '<h4>appts</h4>'
                        }
                    }
                }
            }];
    }
})();