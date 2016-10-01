(function() {
	'use strict';

	var core = angular.module('app.core');

	core.config(toastrConfig);

	toastrConfig.$inject = ['toastr'];

	function toastrConfig(toastr) {
		toastr.options.timeOut = 4000;
	}

	var config = {
		appErrorPrefix: '[SugarMaMa Error] ', //Configure the exception handler decorator
		appTitle: 'SugarMaMa Skin - Sugar - Tan'
	};

	core.value('config', config);
	core.config(configure);

    configure.$inject = ['$compileProvider', '$logProvider',
                         'routerHelperProvider', '$httpProvider', '$sailsProvider', 'envServiceProvider'];
    /* @ngInject */
    function configure ($compileProvider, $logProvider,
                         routerHelperProvider, $httpProvider, $sailsProvider, envServiceProvider) {
        
        $compileProvider.debugInfoEnabled(false);
        
        
        $httpProvider.interceptors.push('authInterceptor');
       
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        
        //configure environments
        envServiceProvider.config({
			domains: {
				development: ['localhost'],
                staging: ['dev.sugarmamaskinsugartan.com'],
				production: ['sugarmamaskinsugartan.com', 'www.sugarmamaskinsugartan.com']
			},
			vars: {
				development: {
					apiUrl: 'http://localhost:2135/api',
				},
                staging: {
                   apiUrl: 'https://dev.sugarmamaskinsugartan.com/api',
                },                
				production: {
					apiUrl: 'https://sugarmamaskinsugartan.com/api',
				}
			}
		});
        envServiceProvider.check();
        
        //$sailsProvider.url = 'http://localhost:1337';
        
        //exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        ////////////////

        function configureStateHelper() {
            // var resolveAlways = {
            //     ready: ready
            // };

            // //ready.$inject = ['dataservice'];
            // /* @ngInject */
            // function ready(dataservice) {
            //     return true;//dataservice.ready();
            // }

            routerHelperProvider.configure({
                docTitle: 'SugarMaMa | ',
                resolveAlways: true
            });
        }
	}
})();