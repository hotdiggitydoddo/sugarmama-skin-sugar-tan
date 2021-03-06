/* Help configure the state-base ui.router */
(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode(true);

        this.configure = function (cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state', '$http', 'logger', 'authService', 'envService'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, $http, logger, authService, envService) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );

                $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
                    if (!authService.isAuthenticated()) {
                        var token = authService.getToken();
                        if (token) {
                            var apiUrl = envService.read('apiUrl');
                            var refreshToken = authService.getRefreshToken();
                            return $http({
                                url: apiUrl + '/token',
                                method: 'POST',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                transformRequest: function(obj) {
                                    var str = [];
                                    for(var p in obj)
                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                    return str.join("&");
                                },
                                data: {
                                    grant_type: 'refresh_token',
                                    refresh_token: refreshToken 
                                }
                            }).then(function(response) {
                                if ('data' in next && 'authorizedRoles' in next.data) {
                                    var authorizedRoles = next.data.authorizedRoles;
                                    if (!authService.isAuthorized(authorizedRoles)) {
                                        event.preventDefault();
                                        $state.go('home', {}, { reload: true });
                                    // $state.go($state.current, {}, { reload: true });
                                        logger.warning('You are not authorized to access that area.')
                                        //$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                                    }   
                                }
                            }).catch(function(err) {
                                if (next.name !== 'login') {
                                event.preventDefault();
                                $state.go('login');
                            }
                            })
                        } 
                    } else {
                        if ('data' in next && 'authorizedRoles' in next.data) {
                            var authorizedRoles = next.data.authorizedRoles;
                            if (!authService.isAuthorized(authorizedRoles)) {
                                event.preventDefault();
                                $state.go('home', {}, { reload: true });
                            // $state.go($state.current, {}, { reload: true });
                                logger.warning('You are not authorized to access that area.')
                                //$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                            }
                        }
                    }
                });
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                    }
                );
            }
        }
    }
})();