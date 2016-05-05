(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'envService'];
    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger, envService) {
        
        var apiUrl = envService.read('apiUrl');
        
        var services = {
            hairRemoval : [{name: "Lip", price: 10.00}, {name: "Arm", price: 25.00}],
            facials: [{name: "face1", price: 12.00}, {name: "face2", price: 23.00}],
        };

        var estheticians = {

        }

        var readyPromise;

        var service = {
            getServices: getServices,
            getUsers: getUsers,
            postSignUp: postSignUp,
            getBusinessDays: getBusinessDays,
           // getCustomers: getCustomers,
            ready: ready,
        };

        return service;

        function getBusinessDays() {
            return $http.get(apiUrl + '/businessday')
            .then(function(res, status, headers, config) {
                return res.data;
            })
            .catch(function(message) {
                exception.catcher('XHR Failed for getBusinessDays')(message);
                //$location.url('/');
            })
        }

        function postSignUp(userData) {
            return $http.post(apiUrl + '/user/signup', userData)
            .then(function(data, status, headers, config) {
                return data.data;
            })
            .catch(function(message) {
                exception.catcher('XHR Failed for createUser')(message);
                //$location.url('/');
            })
        }

        function getUsers() {
            return $http.get(apiUrl + '/user')
            .then(function(data, status, headers, config) {
                return data.data;
            })
        }

        function getCustomer(id) {
            return $http.get('/api/customer/' + id)
                .then(getCustomerComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getCustomer')(message);
                    $location.url('/');
                });

            function getCustomerComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getServices(type) {
            switch (type) {
                case "hairRemoval":
                    return services.hairRemoval;
                case "facials":
                    return services.facials;
            }



            // return $http.get('/api/customers')
            //     .then(getCustomersComplete)
            //     .catch(function(message) {
            //         exception.catcher('XHR Failed for getCustomers')(message);
            //         $location.url('/');
            //     });

            // function getCustomersComplete(data, status, headers, config) {
            //     return data.data;
            // }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function() {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
