(function() {
	'use strict';

	angular.module('app.accounts').controller('Signup', Signup);

	Signup.$inject = ['$scope', '$state', 'logger', 'dataservice'];

	function Signup($scope, $state, logger, dataservice) {
		var vm = this;
		
		vm.signUpForm = {
		    email: "",
		    password: "",
		    confirmPassword: "",
		    formSubmitted: false,
		    loading: false
		};
		vm.submitSignUpForm = submitSignUpForm;
		vm.title = 'sign up';

		activate();

		function activate() {
		    var users = dataservice.getUsers().then(function(data) {
		    vm.email = data[0].emailAddress;
		    //vm.email = data  
		    });
		    
			logger.info('Activated Signup View');
		}
        
        function submitSignUpForm() {
        	 vm.signUpForm.formSubmitted = true;
        	 $scope.$broadcast('show-errors-check-validity');
        	 if ($scope.signUpForm.$invalid)
            	return;

        	 vm.signUpForm.loading = true;
        	
        	
            console.log('hello');
            console.log(vm.signUpForm);
        }
        
// 		function getServices() {
// 			vm.services.hairRemoval = dataservice.getServices("hairRemoval");
// 			vm.services.facial = dataservice.getServices("facials");
// 			// return dataservice.getServices().then(function(data) {
// 			// 	vm.services = data;
// 			// 	return vm.services;
// 			// });
// 		}


// 		function gotoService(s) {
// 			$state.go('services.' + s);
// 		}
	}
})();