(function() {
	'use strict';

	angular.module('app.home').controller('Home', Home);

	Home.$inject = ['$state', 'logger'];

	function Home($state, logger) {
		var vm = this;
		

		activate();

		function activate() {
           
		}

		// function gotoService(s) {
		// 	$state.go('service.detail', {id: s.id});
		// }
	}
})();