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

})();