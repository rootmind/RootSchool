(function () {
    "use strict";

    var app = angular.module('elephant');


    app.controller('dashboardAdmin1Controller', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q) {

        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;

        var schoolAcademicsJSON = null;
        // $scope.morningStatusPresentDataPoints = [];
        // $scope.eveningStatusPresentDataPoints = [];
        $scope.wrapper = [];
        $scope.menuName = sharedProperties.getMenuName();

        
        $scope.messengerServiceWrapper = [];

        //attendance option selection
        $(document).on("change", "input[type=radio]", function () {
            var options = $('[name="options"]:checked').val();
            //alert(options);
            $scope.fetchSchoolAttendance(options);
        });

        //------------start loadData Function----------------

        $scope.loadData = function () {

            var deferred = $q.defer();


            methodAction = "fetchMultiPopoverData";

            message = [


                {
                    "tableName": "MST_Grade",
                    "filter": ""
                },
                {
                    "tableName": "MST_Subject",
                    "filter": ""
                }
            ];

            $rootScope.loading = true;

            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                //alert('Popover Data='+JSON.stringify(value));

                if (value != null) {

                    result = value.fetchMultiPopoverData;

                    if (value.success == true) {

                        if (result.validSession == true) {
                            $scope.popoverWrapper = result.popoverWrapper;
                            deferred.resolve($scope.popoverWrapper);

                        }
                    }

                }

                $rootScope.loading = false;

                $scope.fetchSchoolAttendance('YEAR');
                $scope.fetchDashboardCount();
                $scope.fetchMessengerServiceList();

            });

            return deferred.promise;

        }   //------------------- ends loadData Function-----------------       

        $scope.visitors = {
            series: ["Visitors"],
            data: [
                [25250, 23370, 25568, 28961, 26762, 30072, 25135]
            ],
            labels: ["Jun 21", "Jun 20", "Jun 19", "Jun 18", "Jun 17", "Jun 16", "Jun 15"],
            colors: [{
                backgroundColor: "#ffffff",
                borderColor: "#1c90fb",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        ticks: {
                            max: 32327
                        },
                        display: false
                    }]
                },
                tooltips: {
                    enabled: false
                }
            }
        };

        $scope.newVisitors = {
            series: ["New visitors"],
            data: [
                [8796, 11317, 8678, 9452, 8453, 11853, 9945]
            ],
            labels: ["Jun 21", "Jun 20", "Jun 19", "Jun 18", "Jun 17", "Jun 16", "Jun 15"],
            colors: [{
                backgroundColor: "#ffffff",
                borderColor: "#1c90fb",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        ticks: {
                            max: 12742
                        },
                        display: false
                    }]
                },
                tooltips: {
                    enabled: false
                }
            }
        };

        $scope.pageviews = {
            series: ["Pageviews"],
            data: [
                [116196, 145160, 124419, 147004, 134740, 120846, 137225]
            ],
            labels: ["Jun 21", "Jun 20", "Jun 19", "Jun 18", "Jun 17", "Jun 16", "Jun 15"],
            colors: [{
                backgroundColor: "#ffffff",
                borderColor: "#1c90fb",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        ticks: {
                            max: 158029
                        },
                        display: false
                    }]
                },
                tooltips: {
                    enabled: false
                }
            }
        };

        $scope.averageDuration = {
            series: ["Average duration"],
            data: [
                [13590442, 12362934, 13639564, 13055677, 12915203, 11009940, 11542408]
            ],
            labels: ["Jun 21", "Jun 20", "Jun 19", "Jun 18", "Jun 17", "Jun 16", "Jun 15"],
            colors: [{
                backgroundColor: "#ffffff",
                borderColor: "#1c90fb",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        ticks: {
                            max: 14662531
                        },
                        display: false
                    }]
                },
                tooltips: {
                    enabled: false
                }
            }
        };


        //---------------- fetchSchoolAcademics ---------------------

        $scope.fetchSchoolAcademics = function () {

            $scope.submitted = true;
            if ($scope.form.subjectID.$valid) {

                methodAction = "fetchSchoolAcademics";

                message = {
                    "gradeID": $scope.wrapper.gradeID,
                    "subjectID": $scope.wrapper.subjectID
                };
                //alert("message "+JSON.stringify(message));	

                $rootScope.loading = true;

                jsonData = connectHostFactory(methodAction, message);

                jsonData.returnData(function (value) {

                    //alert("value "+JSON.stringify(value));	

                    if (value != null) {

                        result = value.fetchSchoolAcademics;

                        if (value.success == true) {

                            if (result.validSession == true && result.schoolAcademicsWrapper[0].recordFound == true) {

                                schoolAcademicsJSON = result.schoolAcademicsWrapper;

                                var schoolAcademicsDataPoints = [];
                                for (var i = 0; i <= schoolAcademicsJSON.length - 1; i++) {

                                    schoolAcademicsDataPoints.push({ x: parseInt(schoolAcademicsJSON[i].securedMarks), y: parseInt(schoolAcademicsJSON[i].totalStudents), z: parseInt(schoolAcademicsJSON[i].securedMarks), name: 'Marks' });
                                }



                                //----------------Bubble Chart--------------------------------


                                // var bubbleChart = new CanvasJS.Chart("bubbleChartContainer",
                                // 	{
                                // 		title: {
                                // 			text: "School Academics"
                                // 		},
                                // 		axisX: {
                                // 			title: "Marks"
                                // 		},
                                // 		axisY: {
                                // 			title: "Total no of students"
                                // 		},

                                // 		legend: {
                                // 			verticalAlign: "bottom",
                                // 			horizontalAlign: "left"

                                // 		},
                                // 		data: [
                                // 			{
                                // 				type: "bubble",
                                // 				//legendText: "Size of Bubble Represents Population",
                                // 				//showInLegend: true,
                                // 				//legendMarkerType: "circle",
                                // 				toolTipContent: "<strong>Secured Marks: {x}</strong> <br/> Total Students: {y}<br/>",
                                // 				dataPoints: schoolAcademicsDataPoints
                                // 			}
                                // 		]
                                // 	});

                                // bubbleChart.render();
                                // //----------------Ends Bubble Chart--------------------------------

                            }
                            else if (result.validSession == false) {
                                messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                            }
                            else {
                                messageFactory(appConstants.SYSTEM_NORECORDS);
                            }
                        }

                        else {
                            messageFactory(appConstants.SYSTEM_NORECORDS);
                        }

                    }
                    else {
                        messageFactory(appConstants.SYSTEM_ERROR);
                    }

                    $rootScope.loading = false;
                });

            }
        }	//----------------Ends StudentAcademics chart--------------------------------




        $scope.audienceOverview = {
            series: ["Morning", "Evening"],
            // data: [	$scope.source1,
            // 		$scope.source2]
            // 		,
            // // [
            // // 		[222, 417, 230, 801, 502, 512, 932],
            // // 		[312, 203, 204, 352, 820, 805, 203]
            // // ],
            // labels: $scope.labels,//["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            colors: [{
                backgroundColor: "#1c90fb",
                borderColor: "#1c90fb",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
            }, {
                backgroundColor: "#2cf0d9",
                borderColor: "#2cf0d9",
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: true
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: "#f5f5f5"
                        },
                        ticks: {
                            fontColor: "#bcc1c6",
                            maxTicksLimit: 5
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            color: "#f5f5f5",
                        },
                        ticks: {
                            fontColor: "#bcc1c6",
                        }
                    }]
                },
                tooltips: {
                    mode: "label"
                }
            }
        };

        //---------------- fetchSchoolAttendance ---------------------

        $scope.fetchSchoolAttendance = function (duration) {

            $scope.submitted = true;

            //alert("fetchSchoolAttendance ");	

            var deferred = $q.defer();

            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var schoolMorningAttendanceJSON = [];
            var schoolEveningAttendanceJSON = [];


            methodAction = "fetchSchoolAttendance";

            message = {

                "gradeID": ($scope.wrapper.grade == null ? "" : $scope.wrapper.grade),
                "duration": duration
            };

            $rootScope.loading = true;

            console.log('fetchSchoolAttendance message' + JSON.stringify(message));

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {

                console.log("value " + JSON.stringify(value));

                if (value != null) {

                    result = value.fetchSchoolAttendance;

                    if (value.success == true) {



                        if (result.validSession == true) {


                            if (result.morningAttendancePresentWrapper && result.morningAttendancePresentWrapper[0].recordFound == true) {
                                schoolMorningAttendanceJSON = result.morningAttendancePresentWrapper;

                            }

                            if (result.eveningAttendancePresentWrapper && result.eveningAttendancePresentWrapper[0].recordFound == true) {
                                schoolEveningAttendanceJSON = result.eveningAttendancePresentWrapper;

                            }



                            //console.log("schoolMorningAttendanceJSON "+JSON.stringify(schoolMorningAttendanceJSON));	


                            //console.log("schoolEveningAttendanceJSON "+JSON.stringify(schoolEveningAttendanceJSON));	

                            var morningStatusPresentDataPoints = [];
                            var eveningStatusPresentDataPoints = [];

                            for (var i = 0; i <= months.length - 1; i++) {


                                if (typeof schoolMorningAttendanceJSON[i] === 'undefined') {

                                    //morningStatusPresentDataPoints.push({ label: months[i], data: 0 });

                                }
                                else if (months[i].indexOf(schoolMorningAttendanceJSON[i].calendarDate.substring(0, 3) > 0)) {

                                    morningStatusPresentDataPoints.push({ label: schoolMorningAttendanceJSON[i].calendarDate.substring(0, 3), data: parseInt(schoolMorningAttendanceJSON[i].morningStatus) });
                                }

                                if (typeof schoolEveningAttendanceJSON[i] === 'undefined') {

                                    //eveningStatusPresentDataPoints.push({ label: months[i], data: 0 });

                                }
                                else if (months[i].indexOf(schoolEveningAttendanceJSON[i].calendarDate.substring(0, 3) > 0)) {

                                    eveningStatusPresentDataPoints.push({ label: schoolEveningAttendanceJSON[i].calendarDate.substring(0, 3), data: parseInt(schoolEveningAttendanceJSON[i].eveningStatus) });
                                }


                            }

                            //console.log("morningStatusPresentDataPoints "+JSON.stringify($scope.morningStatusPresentDataPoints));

                            //console.log("eveningStatusPresentDataPoints "+JSON.stringify($scope.eveningStatusPresentDataPoints));


                            var labels = morningStatusPresentDataPoints.map(function (e) {
                                return e.label;
                            });
                            var source1 = morningStatusPresentDataPoints.map(function (e) {
                                return e.data;
                            });
                            var source2 = eveningStatusPresentDataPoints.map(function (e) {
                                return e.data;
                            });

                            if (labels === undefined || labels.length == 0) {
                                labels = eveningStatusPresentDataPoints.map(function (e) {
                                    return e.label;
                                });
                            }


                            console.log("labels " + JSON.stringify(labels));
                            console.log("source1 " + JSON.stringify(source1));
                            console.log("source2 " + JSON.stringify(source2));

                            $scope.audienceOverview.labels = labels;
                            $scope.audienceOverview.data = [source1, source2];

                            $scope.signups.labels = labels;
                            $scope.signups.data = [source1, source2];


                        }
                        else if (result.validSession == false) {
                            messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                        }
                        else {
                            messageFactory(appConstants.SYSTEM_NORECORDS);
                        }
                    }

                    else {
                        messageFactory(appConstants.SYSTEM_NORECORDS);
                    }

                }
                else {
                    messageFactory(appConstants.SYSTEM_ERROR);
                }

                $rootScope.loading = false;

                deferred.resolve(schoolMorningAttendanceJSON, schoolEveningAttendanceJSON);


            });


            return deferred.promise;


        }	//----------------Ends fetchSchoolAttendance chart--------------------------------


        $scope.signups = {
            series: ["This week", "Last week"],
            data: [
                [467, 991, 905, 447, 558, 594, 367],
                [374, 740, 929, 788, 403, 459, 458]
            ],
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            colors: [{
                backgroundColor: "#1c90fb",
                borderColor: "#1c90fb"
            }, {
                backgroundColor: "#2cf0d9",
                borderColor: "#2cf0d9"
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: true
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: "#f5f5f5"
                        },
                        ticks: {
                            fontColor: "#bcc1c6",
                            maxTicksLimit: 5
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            color: "#f5f5f5",
                        },
                        ticks: {
                            fontColor: "#bcc1c6",
                        }
                    }]
                },
                tooltips: {
                    mode: "label"
                }
            }
        };

        $scope.resolvedIssues = {
            series: ["Resolved Issues"],
            // data: [
            //     [879, 377]
            // ],
            labels: ["Resolved", "Unresolved"],
            colors: [{
                backgroundColor: ["#1c90fb", "#667589"]
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                tooltips: {
                    enabled: false
                }
            }
        };

        $scope.unresolvedIssues = {
            series: ["Unresolved Issues"],
            // data: [
            //     [879, 377]
            // ],
            labels: ["Resolved", "Unresolved"],
            colors: [{
                backgroundColor: ["#667589", "#1c90fb"]
            }],
            options: {
                animation: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                tooltips: {
                    enabled: false
                }
            }
        };



        //---------------- fetchDashboardCount ---------------------

        $scope.fetchDashboardCount = function () {

            $scope.submitted = true;

            //alert("fetchSchoolAttendance ");	

            var deferred = $q.defer();


            methodAction = "fetchDashboardCount";

            message = {

                "studentID": ""
            };

            $rootScope.loading = true;

            console.log('fetchDashboardCount message' + JSON.stringify(message));

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {

                console.log("value " + JSON.stringify(value));

                if (value != null) {

                    result = value.fetchDashboardCount;

                    if (value.success == true) {

                        if (result.validSession == true && result.dashboardWrapper[0].recordFound == true) {



                            $scope.serviceTicketsCount = result.dashboardWrapper[0].serviceTicketsCount;
                            $scope.serviceTicketsCloseCount = result.dashboardWrapper[0].serviceTicketsCloseCount;
                            $scope.serviceTicketsOpenCount = result.dashboardWrapper[0].serviceTicketsOpenCount;
                            $scope.serviceTicketsUnassignedCount = result.dashboardWrapper[0].serviceTicketsUnassignedCount;
                            $scope.resolvedIssuesPercent = Math.round(($scope.serviceTicketsCloseCount / $scope.serviceTicketsCount) * 100);
                            $scope.unresolvedIssuesPercent = Math.round(($scope.serviceTicketsOpenCount / $scope.serviceTicketsCount) * 100);
                            $scope.unassignedIssuesPercent = Math.round(($scope.serviceTicketsUnassignedCount / $scope.serviceTicketsCount) * 100);

                            $scope.studentCount = result.dashboardWrapper[0].studentCount;
                            $scope.teacherCount = result.dashboardWrapper[0].teacherCount;
                            $scope.staffCount = result.dashboardWrapper[0].staffCount;

                            $scope.resolvedIssues.data = [$scope.serviceTicketsCloseCount, $scope.serviceTicketsOpenCount];
                            $scope.unresolvedIssues.data = [$scope.serviceTicketsCloseCount, $scope.serviceTicketsOpenCount];

                            deferred.resolve($scope.resolvedIssues.data, $scope.unresolvedIssues.data);


                        }
                        else if (result.validSession == false) {
                            messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                        }
                        else {
                            messageFactory(appConstants.SYSTEM_NORECORDS);
                        }
                    }

                    else {
                        messageFactory(appConstants.SYSTEM_NORECORDS);
                    }

                }
                else {
                    messageFactory(appConstants.SYSTEM_ERROR);
                }

                $rootScope.loading = false;
            });


            return deferred.promise;


        }	//----------------Ends fetchDashboardCount chart--------------------------------



        $scope.fetchMessengerServiceList = function() {

            var deferred = $q.defer();

            var methodAction = null;
            var message = null;
            var jsonData = null;
            var result = null;


            methodAction = "fetchMessengerServiceList";
            message = {
            };
            //$rootScope.loading = true;
            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.fetchMessengerServiceList;

                    console.log('result Data= ' + JSON.stringify(result));


                    if (value.success == true) {

                        if (result.validSession == true && result.messengerServiceWrapper[0].recordFound == true) {

                            console.log('messengerServiceWrapper ' + JSON.stringify(result.messengerServiceWrapper));

                            $scope.messengerServiceWrapper = result.messengerServiceWrapper;


                        }
                        else if (result.validSession == false) {
                            messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                        }
                        else {
                            messageFactory(appConstants.SYSTEM_NORECORDS);
                        }
                    }
                    else {
                        messageFactory(appConstants.SYSTEM_NORESPONSE);
                    }
                }
                else {

                    messageFactory(appConstants.SYSTEM_ERROR);
                }
                //$scope.wrapper.message = '';
                //$rootScope.loading = false;

                deferred.resolve($scope.messengerServiceWrapper);


            });

            return deferred.promise;
        };


        $scope.routeMessenger=function(){

            $location.path('/admin-messenger');


        }


    }]);



})();

