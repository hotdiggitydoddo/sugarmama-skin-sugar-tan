(function() {
	'use strict';

	angular.module('app.services').run(appRun);

	appRun.$inject = ['routerHelper'];

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'services',
				config: {
					url: '/services',
					templateUrl: 'app/services/services.html',
					controller: 'Services',
					controllerAs: 'vm',
					title: 'Services',
					settings: {
						nav: 2,
						content: 'services'
					}
				}
			},
			{
                state: 'services.hairremoval',
                config: {
                    url: '/hairremoval',
                    controller: 'Services',
                    controllerAs: 'vm',
                    title: 'hair removal',
                    views: {
                    	"content": {templateUrl: 'app/services/hairremoval.html'}
                    } 
                }
            },
            {
                state: 'services.facials',
                config: {
                    url: '/facials',
                    controller: 'Services',
                    controllerAs: 'vm',
                    title: 'facials and microderms',
                    views: {
                    	"content": {templateUrl: 'app/services/facials.html'}
                    } 
                }
            },
			 {
                state: 'services.chemicalPeels',
                config: {
                    url: '/peels',
                    controller: 'Services',
                    controllerAs: 'vm',
                    title: 'chemical peels',
                    views: {
                    	"content": {templateUrl: 'app/services/chemicalPeel.html'}
                    } 
                }
            },
			 {
                state: 'services.tanning',
                config: {
                    url: '/tanning',
                    controller: 'Services',
                    controllerAs: 'vm',
                    title: 'spray tans',
                    views: {
                    	"content": {templateUrl: 'app/services/tanning.html'}
                    } 
                }
            },
            {
                state: 'services.tinting',
                config: {
                    url: '/tinting',
                    controller: 'Services',
                    controllerAs: 'vm',
                    title: 'tinting',
                    views: {
                    	"content": {templateUrl: 'app/services/tinting.html'}
                    } 
                }
            }
		];
	}
})();