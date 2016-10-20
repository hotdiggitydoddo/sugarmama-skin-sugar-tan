(function () {
    'use strict';

    angular.module('app.admin.appointments').controller('Appointments', Appointments);

    Appointments.$inject = ['$state', '$uibModal', 'logger', 'envService', 
        'authService', 'appointmentService', 'estheticianService', 'spaServiceService', 'locationService'];

    function Appointments($state, $uibModal, logger, envService, 
        authService, appointmentService, estheticianService, spaServiceService, locationService) {

        var apiUrl = envService.read('apiUrl');
        var today = new Date();
        today.setHours("09","00","00");
        
        var vm = this;
        vm.estheticians = [];
        vm.title = 'appointments';
        vm.env = envService.get();
        vm.showStanton = true;
        vm.showBrea = true;
        vm.toggleLocation = toggleLocation;
        vm.openBlockoutModal = openBlockoutModal;
        
        vm.schedulerOptions = {
            date: today,
            startTime: today,
            height: 780,
            // mobile: 'phone',
            views: [
                "day",
                { type: "week", selected: true, majorTick: 30 },
                "month",
            ],
            eventTemplate: $("#event-template").html(),
            timezone: "America/Los_Angeles",
            editable: {
                template: $("#customEditorTemplate").html(),
                move: false
            },
            dataSource: {
                error: function(e) {
                    alert(e.xhr.responseText);
                },
                batch: true,
                transport: {
                    read: function(o) {
                        appointmentService.getAppointmentsAdmin()
                        .then(function(appts) {
                            appts.forEach(function(appt) {
                                appt.services.forEach(function(svc) {
                                    svc.text = svc.name;
                                    svc.value = svc.id;
                                })
                            })
                            o.success(appts)
                        })
                    },
                    update: function(o) {
                       var appt = o.data.models[0];
                        appt.isBlockout = false;
                        
                        appointmentService.update(o.data.models[0])
                        .then(function(saved) {
                            o.success(saved);
                        })
                    },
                    create: function(o) {
                        var appt = o.data.models[0];
                        appt.isNoShow = false;
                        appt.isBlockout = false;
                        
                        appointmentService.bookAdmin(o.data.models[0])
                        .then(function(saved) {
                            o.success(saved);
                        })

                    },
                    destroy: {
                        url: apiUrl + "/appointment",
                        dataType: "json"
                    },
                },
                schema: {
                    model: {
                        id: "appointmentId",
                        fields: {
                            appointmentId: { from: "id", type: "number" },
                            title: { from: "title" },
                            firstName: { from: "firstName", validation: { required: true} }, 
                            start: { type: "date", from: "start", validation: { required: true } },
                            end: { type: "date", from: "end" , validation: { required: true } },
                            startTimezone: { from: "startTimezone" },
                            endTimezone: { from: "endTimezone" },
                            //description: { from: "description" },
                            gender: { from: 'gender' },
                            phoneNumber: { from: 'description' },
                            // recurrenceId: { from: "RecurrenceID" },
                            // recurrenceRule: { from: "RecurrenceRule" },
                            // recurrenceException: { from: "RecurrenceException" },
                            estheticianId: { from: "estheticianId", validation: { required: true } },
                            locationId: { from: "locationId", validation: { required: true } },
                            isBlockout: { from: "isBlockout" },
                            isNoShow: { from: "isNoShow" },
                            services: { from: "services" },
                            isAllDay: { type: "boolean", from: "isAllDay" }
                        }
                    }
                },
                
            },
    
            resources: [  
                {  
                    dataSource: {  
                        transport: {  
                            read: function(o) {  
                                estheticianService.getEstheticians()
                                .then(function(estheticians) {
                                    var kendoEstheticians = [];
                                    estheticians.forEach(function(e) {
                                        var ke = {};
                                        ke.text = e.firstName;
                                        ke.value = e.id;
                                        ke.color = '#' + e.color;
                                        kendoEstheticians.push(ke);
                                    })
                                    o.success(kendoEstheticians);
                                })
                            },
                            prefix : ""
                            },
                        schema: {  
                            errors: "Errors"
                        },
                    },
                    title: "esthetician",
                    field: "estheticianId",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataColorField: "color"
                },
                
                    {  
                    dataSource: {  
                        transport: {  
                            read: function(o) {
                                spaServiceService.getServices()
                                .then(function(services) {
                                    services.forEach(function(service) {
                                        service.text = service.name;
                                        service.value = service.id;
                                    })
                                    o.success(services);
                                })
                            },
                        prefix : ""
                        },
                        schema: {  
                            errors: "Errors"
                        }
                    },
                    title: "services",
                    field: "services",
                    dataTextField: "text",
                    dataValueField: "value",
                },
                
                {
                        dataSource: {  
                        transport: {  
                            read: function(o) {  
                               locationService.getAll()
                               .then(function(locations) {
                                   o.success(locations);
                               })
                            },
                        prefix : ""
                        },
                        schema: {  
                            errors: "Errors"
                        }
                    },
                    title: "location",
                    field: "locationId",
                    dataTextField: "city",
                    dataValueField: "id",
                }
            ],
    
        edit: function(e) {
        
            $("#estheticianId").kendoDropDownList({
                dataSource: e.sender.resources[0].dataSource,
                dataTextField: "text",
                dataValueField: "value",
                dataColorField: "color",
                template: '<span class="k-scheduler-mark" style="background-color:\#= color \#"></span>\#= text \#',
                valueTemplate: '<span class="k-scheduler-mark" style="background-color:\#= color \#"></span>\#= text \#',
                index: 1
            });
            
            $("#genderId").kendoDropDownList({
                dataSource: [
                    { value: 0, text: 'female' },
                    { value: 1, text: 'male' }
                ],
                dataTextField: "text",
                dataValueField: "value",
            });
            
            $("#locationId").kendoDropDownList({
                dataSource: e.sender.resources[2].dataSource,
                dataTextField: "city",
                dataValueField: "id",
                template: '\#= city \#',
                valueTemplate: '\#= city \#',
            });
            
            $("#services").kendoMultiSelect({
                dataSource: e.sender.resources[1].dataSource,
                dataTextField: "text",
                dataValueField: "value",
                template: '\#= text \#',
                valueTemplate: '\#= text \#',
                index: 1
            });
            
          
        }
    }

        activate();

        function activate() {
            // $sails.get('/appointment/sync')
            //     .then(function (res) {
            //         vm.res = res;
            //     }, function (err) {
            //         logger.error('Error trying to sync for real-time updates.');
            //     });
                
            //     $sails.on('refresh', function(message) {
            //             var schedulerEl = $("iframe").contents().find("#scheduler");
            //             schedulerEl.trigger('refreshCal');
            //     });
            return locationService.getAll().then(function(locations) {
                logger.info('locs');
            });
        }

        function toggleLocation(locationId) {
            if (locationId === 1) {
                vm.showStanton = !vm.showStanton;
            }
            else if (locationId === 2) {
                vm.showBrea = !vm.showBrea;
            }
        }

        function openBlockoutModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/admin/appointments/appointment.blockout.html',
                controller: 'AppointmentsBlockout',
                controllerAs: 'vm'
            });
        }
        
    }
})();