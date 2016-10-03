(function () {
	'use strict';

	angular.module('app.services').controller('Services', Services);

	Services.$inject = ['$state', 'logger', 'dataservice', 'spaServiceService'];

	function Services($state, logger, dataservice, spaServiceService) {
		var vm = this;
		vm.services = [];
		vm.gotoService = gotoService;
		vm.title = 'services';
		vm.carouselSettings = {};
		vm.carouselSettings.sprayTan = {
			interval: 2500,
			slides: [
				{
					image: 'images/tanning/1.jpg', id: 0
				},
				{
					image: 'images/tanning/2.png', id: 1
				},
				{
					image: 'images/tanning/3.jpg', id: 2
				},
				{
					image: 'images/tanning/4.jpg', id: 3
				},
				{
					image: 'images/tanning/5.jpg', id: 4
				},
				{
					image: 'images/tanning/6.jpg', id: 5
				},
				{
					image: 'images/tanning/7.png', id: 6
				},
				{
					image: 'images/tanning/8.png', id: 7
				},
				{
					image: 'images/tanning/9.png', id: 8
				},
				{
					image: 'images/tanning/10.png', id: 9
				},
			],
			active: 0,
		};
		
		vm.carouselSettings.tinting = {
			interval: 3000,
			slides: [
				{
					image: 'images/tinting/3.png', id: 0
				},
				{
					image: 'images/tinting/1.png', id: 1
				},
				{
					image: 'images/tinting/4.png', id: 2
				},
				{
					image: 'images/tinting/2.png', id: 3
				}
			],
			active: 0,
		};

		activate();

		function activate() {
			getServices();
		}

		function getServices() {
			spaServiceService.getServices(true)
				.then(function (results) {
					var brows = results.hairRemoval.find(function(x) { return x.name == 'Eyebrow Shaping' })
					results.hairRemoval.splice(results.hairRemoval.indexOf(brows), 1)

					vm.services = results;
					vm.services.facial.push(vm.services.hairRemoval.find(function (svc) { return svc.name.indexOf('Bold') != -1; }))
					vm.services.hairRemoval.premium = vm.services.hairRemoval.filter(function (svc) { return svc.isPremium });
					return vm.services;
				})
				.catch(function (err) {
					return vm.services = [];
				});
		}

		function gotoService(s) {
			$state.go('services.' + s);
		}
	}
})();
