(function () {
    'use strict';

    angular.module('app.admin.estheticians').run(appRun);

     appRun.$inject = ['routerHelper', 'user_roles'];

    function appRun(routerHelper, user_roles) {
        routerHelper.configureStates(getStates(user_roles));
    }

    function getStates(user_roles) {
        return [
            {
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
                    params: {
                        deletedId: null
                    },
                    data: {
                        authRequired: true,
                        authorizedRoles: [user_roles.admin, user_roles.owner]
                    }
                }
            }, {
                state: 'estheticians_detail',
                config: {
                    url: '/admin/estheticians/:id',
                    title: 'Details',
                    data: {
                        id: ':id',
                        authRequired: true,
                        authorizedRoles: [user_roles.admin, user_roles.owner]
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
                            templateUrl: 'app/admin/estheticians/esthetician.appointments.html',
                            controller: 'EstheticianAppointments',
                            controllerAs: 'vm',
                            parent: 'estheticians_detail',
                            title: 'Details',
                        }
                    }
                }
            },
            {
                state: 'estheticians_profile',
                config: {
                    url: '/admin/profile',
                    title: 'Profile',
                    settings: {
                        nav: 1,
                        content: 'profile'
                    },
                    params: {
                        id: null,
                        isAdmin: null
                    },
                    data: {
                        authRequired: true,
                        authorizedRoles: [user_roles.esthetician],
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/admin/estheticians/esthetician.profile.html',
                            controller: 'EstheticianProfile',
                            controllerAs: 'vm',
                        },
                        'shifts@estheticians_profile': {
                            templateUrl: 'app/admin/shifts/shifts.html',
                            controller: 'Shifts',
                            controllerAs: 'vm',
                            parent: 'estheticians_profile',
                            title: 'Details',
                           
                        },
                        'appointments@estheticians_profile': {
                            templateUrl: 'app/admin/estheticians/esthetician.appointments.html',
                            controller: 'EstheticianAppointments',
                            controllerAs: 'vm',
                            parent: 'estheticians_profile',
                            title: 'Details',
                            params: {
                                id: null
                            }
                        }
                    }
                }
            }];
    }
})();