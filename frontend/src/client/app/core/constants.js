(function() {
	'use strict';

	angular.module('app.core')
		.constant('toastr', toastr)
		.constant('moment', moment)
		.constant('user_roles', {
			admin: 'admin',
			esthetician: 'esthetician',
			owner: 'owner'
		});
})();