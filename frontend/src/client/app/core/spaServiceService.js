(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('spaServiceService', spaServiceService);

    spaServiceService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger', 'envService'];

    function spaServiceService($http, $location, $q, $window, exception, logger, envService) {
        var apiUrl = envService.read('apiUrl');
        var service = {
            getServices: getServices,
         //   createService: createService,
         //   updateService: updateService,
            getById: getById
        };

        return service;

        function getServices(byType) {
            return $http.get(apiUrl + '/service/getAll/')
                .then(function (data, status, headers, config) {
                    if (!byType)
                        return data.data;
                        
                    var hairRemoval = [];
                    var chemicalPeel = [];
                    var sprayTan = [];
                    var microderm = [];
                    var tinting = [];
                    var facial = [];
                    
                    var services = data.data;
                    
                    services.forEach(function(svc) {
                        svc.isSelected = false;
                        switch(svc.serviceType)
                        {
                            case "hairRemoval": 
                                hairRemoval.push(svc);
                                break;
                            case "facial":
                                facial.push(svc);
                                break;
                            case "sprayTan":
                                sprayTan.push(svc);
                                break;
                            case "chemicalPeel":
                                chemicalPeel.push(svc);
                                break;
                            case "microderm":
                                microderm.push(svc);
                                break;
                            case "tinting":
                                tinting.push(svc);
                                break;
                        }
                    })
                    return {
                        hairRemoval: hairRemoval,
                        facial: facial,
                        sprayTan: sprayTan,
                        chemicalPeel: chemicalPeel,
                        microderm: microderm,
                        tinting: tinting
                    }
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getById(id) {
            return $http.get(apiUrl + '/service/getById?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        // function createEsthetician(serviceData) {
        //     return $http.post(apiUrl + '/service/create', serviceData)
        //         .then(function (data, status, headers, config) {
        //             return data.data;
        //         })
        //         .catch(function (message) {
        //             exception.catcher('XHR Failed for createService')(message);
        //             //$location.url('/');
        //         })
        // }
        
        // function updateEsthetician(serviceData) {
        //    return $http.post(apiUrl + '/service/update', serviceData)
        //         .then(function (data, status, headers, config) {
        //             return data.data;
        //         })
        //         .catch(function (message) {
        //             exception.catcher('XHR Failed for updateService')(message);
        //             //$location.url('/');
        //         })
        // }
    }
})();