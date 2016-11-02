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
        
        var touchEventsInitialized = false;
        var times = [
                        { text: "9:00 AM", value: "09:00" },
                        { text: "9:15 AM", value: "09:15" },
                        { text: "9:30 AM", value: "09:30" },
                        { text: "9:45 AM", value: "09:45" },
                        { text: "10:00 AM", value: "10:00" },
                        { text: "10:15 AM", value: "10:15" },
                        { text: "10:30 AM", value: "10:30" },
                        { text: "10:45 AM", value: "10:45" },
                        { text: "11:00 AM", value: "11:00" },
                        { text: "11:15 AM", value: "11:15" },
                        { text: "11:30 AM", value: "11:30" },
                        { text: "11:45 AM", value: "11:45" },
                        { text: "12:00 PM", value: "12:00" },
                        { text: "12:15 PM", value: "12:15" },
                        { text: "12:30 PM", value: "12:30" },
                        { text: "12:45 PM", value: "12:45" },
                        { text: "1:00 PM", value: "13:00" },
                        { text: "1:15 PM", value: "13:15" },
                        { text: "1:30 PM", value: "13:30" },
                        { text: "1:45 PM", value: "13:45" },
                        { text: "2:00 PM", value: "14:00" },
                        { text: "2:15 PM", value: "14:15" },
                        { text: "2:30 PM", value: "14:30" },
                        { text: "2:45 PM", value: "14:45" },
                        { text: "3:00 PM", value: "15:00" },
                        { text: "3:15 PM", value: "15:15" },
                        { text: "3:30 PM", value: "15:30" },
                        { text: "3:45 PM", value: "15:45" },
                        { text: "4:00 PM", value: "16:00" },
                        { text: "4:15 PM", value: "16:15" },
                        { text: "4:30 PM", value: "16:30" },
                        { text: "4:45 PM", value: "16:45" },
                        { text: "5:00 PM", value: "17:00" },
                        { text: "5:15 PM", value: "17:15" },
                        { text: "5:30 PM", value: "17:30" },
                        { text: "5:45 PM", value: "17:45" },
                        { text: "6:00 PM", value: "18:00" },
                        { text: "6:15 PM", value: "18:15" },
                        { text: "6:30 PM", value: "18:30" },
                        { text: "6:45 PM", value: "18:45" },
                        { text: "7:00 PM", value: "19:00" },
                        { text: "7:15 PM", value: "19:15" },
                        { text: "7:30 PM", value: "19:30" },
                        { text: "7:45 PM", value: "19:45" },
                        { text: "8:00 PM", value: "20:00" },
                        { text: "8:15 PM", value: "20:15" },
                        { text: "8:30 PM", value: "20:30" },
                        { text: "8:45 PM", value: "20:45" },
                        { text: "9:00 PM", value: "21:00" },
                        { text: "9:15 PM", value: "21:15" },
                        { text: "9:30 PM", value: "21:30" },
                        { text: "9:45 PM", value: "21:45" }
                    ];

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
            dataBound: onDataBound,
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
                                appt.date = new Date(appt.start);
                                var localStart = moment(new Date(appt.start)).tz('America/Los_Angeles').format()
                                var localEnd = moment(new Date(appt.end)).tz('America/Los_Angeles').format();
                                appt.startT = localStart.substr(localStart.indexOf('T') + 1, 5)
                                appt.endT = localEnd.substr(localEnd.indexOf('T') + 1, 5)
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
                        appt.start = new Date(appt.date);
                        appt.end = new Date(appt.date);

                        appt.startT = $("#startT").val();
                        appt.endT = $("#endT").val();
                        
                        appt.start.setHours(appt.startT.substr(0, 2));
                        appt.start.setMinutes(appt.startT.substr(3, 2));

                        appt.end.setHours(appt.endT.substr(0, 2));
                        appt.end.setMinutes(appt.endT.substr(3, 2));

                        appt.isBlockout = false;
                        if (!checkServices() || !checkTimes())
                            return;
                        appointmentService.update(o.data.models[0])
                        .then(function(saved) {
                            saved.date = new Date(saved.start);
                            var localStart = moment(new Date(saved.start)).tz('America/Los_Angeles').format()
                            var localEnd = moment(new Date(saved.end)).tz('America/Los_Angeles').format();
                            saved.startT = localStart.substr(localStart.indexOf('T') + 1, 5)
                            saved.endT = localEnd.substr(localEnd.indexOf('T') + 1, 5)
                            saved.services.forEach(function(svc) {
                                svc.text = svc.name;
                                svc.value = svc.id;
                            });
                            o.success(saved);
                        });
                    },
                    create: function(o) {
                        $('#errors').hide();
                        var appt = o.data.models[0];
                        appt.start = new Date(appt.date);
                        appt.end = new Date(appt.date);

                        appt.startT = $("#startT").val();
                        appt.endT = $("#endT").val();
                        
                        appt.start.setHours(appt.startT.substr(0, 2));
                        appt.start.setMinutes(appt.startT.substr(3, 2));

                        appt.end.setHours(appt.endT.substr(0, 2));
                        appt.end.setMinutes(appt.endT.substr(3, 2));
                        
                        appt.isNoShow = false;
                        appt.isBlockout = false;
                        
                        if (!checkTimes() || !checkServices())
                            return;
                        
                        appointmentService.bookAdmin(o.data.models[0])
                        .then(function(saved) {
                            saved.date = new Date(saved.start);
                            var localStart = moment(new Date(saved.start)).tz('America/Los_Angeles').format()
                            var localEnd = moment(new Date(saved.end)).tz('America/Los_Angeles').format();
                            appt.startT = localStart.substr(localStart.indexOf('T') + 1, 5)
                            appt.endT = localEnd.substr(localEnd.indexOf('T') + 1, 5)
                            saved.services.forEach(function(svc) {
                                svc.text = svc.name;
                                svc.value = svc.id;
                            });
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
                            date: { type: "date", from: "date" },
                            firstName: { from: "firstName", validation: { required: true} }, 
                            
                            start: { type: "date", from: "start", validation: { required: true } },
                            end: { type: "date", from: "end" , validation: { required: true } },

                            startT: { from: "startT", validation: { required: true }},                           
                            endT: {  from: "endT", validation: { required: true }},
                            
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
                    title: "esthetician",
                    field: "estheticianId",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataColorField: "color",  
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
                },
                {
                    title: "services",
                    field: "services",
                    dataTextField: "text",
                    dataValueField: "value",  
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
                },
                {
                    title: "location",
                    field: "locationId",
                    dataTextField: "city",
                    dataValueField: "id",
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
                },
                // {
                //     title: 'startTime',
                //     field: 'startTime',
                //     dataTextField: 'text',
                //     dataValueField: 'value',
                //     dataSource: times
                // },
                // {
                //     title: 'endTime',
                //     field: 'endTime',
                //     dataTextField: 'text',
                //     dataValueField: 'value',
                //     dataSource: times
                // }
            ],
    
        edit: function(e) {
             var recurrenceEditor = e.container.find("[data-role=recurrenceeditor]").data("kendoRecurrenceEditor");

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
            
             $("#startT").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: times,
                change: checkTimes,
            });

            $("#endT").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: times,
                change: checkTimes,
            });
            
            $('.k-multiselect-wrap >.k-input').attr('readonly', "readonly");

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
           
            // return locationService.getAll().then(function(locations) {
               
            // });
            
          
        }

        function checkTimes() {
            if ($("#startT").val() >= $("#endT").val()) { 
                $("#time-errors").show();
                return false;
            }
            else {
                $("#time-errors").hide();
                return true;
            }
        }

        function checkServices() {
            if (!$("#services").val())  { 
                $("#service-errors").show();
                return false;
            }
            else {
                $("#service-errors").hide();
                return true;
            }
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

        function onDataBound() {
            if (touchEventsInitialized)
                return;

             var scheduler = $("#scheduler").data("kendoScheduler");
            
            scheduler.wrapper.on("mouseup doubleTap", ".k-scheduler-table td, .k-event", function(e) {
                var target = $(e.currentTarget);

                if (target.hasClass("k-event")) {
                    var event = scheduler.occurrenceByUid(target.data("uid"));
                    if (event.isBlockout) {
                        return;
                    }
                    scheduler.editEvent(event);
                } else {
                    var slot = scheduler.slotByElement(target[0]);
                    scheduler.addEvent({
                        start: slot.startDate,
                        end: slot.endDate,
                        date: slot.startDate,
                        startT: function() {
                            var slotStart = moment(slot.startDate).format();
                            return slotStart.substr(slotStart.indexOf('T') + 1, 5)
                        },
                        endT: function() {
                            var slotEnd = moment(slot.startDate).add(15, 'minutes').format();
                            return slotEnd.substr(slotEnd.indexOf('T') + 1, 5)
                        }
                    });
                }
            });
           
            touchEventsInitialized = true;
             
        }
        
    }
})();