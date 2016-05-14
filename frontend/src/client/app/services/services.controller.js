(function () {
	'use strict';

	angular.module('app.services').controller('Services', Services);

	Services.$inject = ['$state', 'logger', 'dataservice', 'spaServiceService'];

	function Services($state, logger, dataservice, spaServiceService) {
		var vm = this;
		vm.services = [];
		vm.gotoService = gotoService;
		vm.title = 'services';

		vm.carouselSettings = {
			interval: 2500,
			slides: [
				{
					image: 'images/1.jpg', id: 0
				},
				{
					image: 'images/2.png', id: 1
				},
				{
					image: 'images/3.jpg', id: 2
				},
				{
					image: 'images/4.jpg', id: 3
				},
				{
					image: 'images/5.jpg', id: 4
				},
				{
					image: 'images/6.jpg', id: 5
				},
				{
					image: 'images/7.png', id: 6
				},
				{
					image: 'images/8.png', id: 7
				},
				{
					image: 'images/9.png', id: 8
				},
				{
					image: 'images/10.png', id: 9
				},
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
					vm.services = results;
					vm.services.facial.push(vm.services.hairRemoval.find(function (svc) { return svc.name.indexOf('Bold') != -1; }))
					vm.services.hairRemoval.premium = vm.services.hairRemoval.filter(function (svc) { return svc.premium });
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
