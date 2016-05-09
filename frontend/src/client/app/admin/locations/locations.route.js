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
                controller: 'Locations',
                controllerAs: 'vm',
                title: 'locations',
                settings: {
                    nav: 2,
                    content: 'locations'
                },
                params: {
                    deletedId: null
                },
                data: {
                    authRequired: true
                }
            }
        }, 
        {
            state: 'locations_detail',
                config: {
                    url: '/admin/locations/:id',
                    title: 'Details',
                    data: {
                        id: ':id',
                        authRequired: true
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/admin/locations/location.detail.html',
                            controller: 'LocationDetail',
                            controllerAs: 'vm',
                        },
                        'businessDays@locations_detail': {
                            templateUrl: 'app/admin/businessDays/businessDays.html',
                            controller: 'BusinessDays',
                            controllerAs: 'vm',
                            parent: 'locations_detail',
                            title: 'Business Hours',
                        }
                        // 'appointments@locations_detail': {
                        //     template: '<h4>appts</h4>'
                        // }
                    }
                }
        }
        ];
    }
})();
