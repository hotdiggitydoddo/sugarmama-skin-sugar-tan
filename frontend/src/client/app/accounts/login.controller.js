(function () {
    'use strict';

    angular.module('app.accounts').controller('Login', Login);

    Login.$inject = ['$scope', '$state', 'logger', 'authService'];

    function Login($scope, $state, logger, authService) {
        var vm = this;

        vm.loginForm = {
            emailAddress: "",
            password: "",
            formSubmitted: false,
            loading: false
        };
        vm.title = 'login';
        vm.submitLoginForm = submitLoginForm;
        activate();

        function activate() {
            
        }

        function submitLoginForm() {
            vm.loginForm.formSubmitted = true;
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.loginForm.$invalid)
                return;

            vm.loginForm.loading = true;

            authService.login(vm.loginForm)
                .then(function (data) {
                    console.log(data);
                //    logger.success('Logged in!');

                    // }).finally(function() {
                    // 	vm.signUpForm.loading = false;
                })
                .catch(function(error) {
                    if (error.status === -1) {
                        logger.error("Unable to communicate with the server.  Please notify tech support.")
                    } else {
                        logger.error(error.message);
                    }
                })
                .finally(function () {
                    vm.loginForm.loading = false;
                })

            console.log('hello');
            console.log(vm.loginForm);
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
