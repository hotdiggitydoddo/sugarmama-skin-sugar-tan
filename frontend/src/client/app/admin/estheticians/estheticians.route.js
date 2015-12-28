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
			},
			{
                state: 'estheticians.add',
                config: {
                    url: '/add',
                    controller: 'Estheticians',
                    controllerAs: 'vm',
                    title: 'add esthetician',
                    views: {
                    	"content": {templateUrl: 'app/admin/estheticians/add.html'}
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
