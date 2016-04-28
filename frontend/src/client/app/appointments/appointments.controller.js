(function() {
    'use strict';
    
    angular.module('app.appointments').controller('ClientAppointments', ClientAppointments);
    
    ClientAppointments.$inject = ['$state', '$uibModal', 'logger'];
    
    function ClientAppointments($state, $uibModal, $logger) {
        var vm = this;
        vm.title = 'book appointment';
        vm.kewl = 'yes';
        vm.availableServices = [
            
            
            
            {
                type: 'hairRemoval',
                name: 'lip',
                description: 'lip desc',
                quickService: true,
                duration: 30,
                cost: 15.00
            },
            {
                type: 'hairRemoval',
                name: 'back',
                description: 'back desc',
                quickService: false,
                duration: 45,
                cost: 32.00
            }    
        ];
        
        vm.guestOptions = [
          { text:'just me', value: 1 },
          { text:'two guests', value: 2 },
          { text:'three guests', value: 3 },
        ]
        
        vm.appointmentRequest = {}
        vm.appointmentRequest.selectedGuestCount = 1;
        
        
        activate();
        
        function activate() {
            
        }
    }
})();