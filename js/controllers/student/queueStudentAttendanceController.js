(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueStudentAttendanceController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', '$q', '$uibModal', '$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $q, $uibModal, $compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        $scope.studentID = "";
        $scope.wrapper = [];

        $scope.wrapper.calendarDate = new Date();

        $scope.studentAttendanceWrapper=[];


        //----------------
        var $ctrl = this;


        //------------------DT code
        var dt = this;

        dt.dtInstance = {};

        dt.selected = {};
        dt.selectedEvening = {};
        dt.selectAll = false;
        dt.selectAllEvening = false;
        dt.toggleAll = toggleAll;
        dt.toggleOne = toggleOne;
        dt.toggleOneEvening = toggleOneEvening;

        var titleHtml = '<div class="text-center">Morning <input type="checkbox" ng-model="dt.selectAll" ng-click="dt.toggleAll(dt.selectAll, dt.selected)"></input></div>';
        var titleHtmlEvening = '<div class="text-center">Evening <input type="checkbox" ng-model="dt.selectAllEvening" ng-click="dt.toggleAll(dt.selectAllEvening, dt.selectedEvening)"></input></div>';

        dt.options = DTOptionsBuilder
            .fromFnPromise(function () { return $scope.searchData() }) //call from search button
            .withDOM('Blrtip')
			.withDOM(`<"row"<"col-sm-12">"row"<"col-sm-6"i><"col-sm-6"f>>
				<"table-responsive"tr><"row"<"col-sm-12">"row"<"col-sm-6"l><"col-sm-6"p>>`)
            .withBootstrap()
            .withLanguage({
                paginate: {
                    previous: "&laquo;",
                    next: "&raquo;",
                },
                search: "_INPUT_",
                searchPlaceholder: "Search…"
            })
            .withOption("order", [
                [6, "desc"]
            ])
            .withOption("responsive", true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow)
            .withOption('headerCallback', headerCallback)
            .withButtons([
				{extend: 'copy',className: 'btn-outline-primary', text:'<span class="icon icon-copy"></span>'},
				{ extend: 'print', className: 'btn-outline-primary', text:'<span class="icon icon-print"></span>'},
				{ extend: 'csv', className: 'btn-outline-primary', filename: "StudentAttendance", text:'<span class="icon icon-file-code-o"></span>' },
				{
					extend: 'excel', className: 'btn-outline-primary',
					filename: "StudentAttendance",
					title: "Student Attendance Report",
					exportOptions: {
						columns: ':visible'
					},
					//CharSet: "utf8",
					exportData: { decodeEntities: true },
					text:'<span class="icon icon-file-excel-o"></span>'

				},
				{ extend: 'colvis', className: 'btn-outline-primary',  text:'<span class="icon icon-folder-open"></span>' }
				// {
				// 		text: 'Some button',
				// 		key: '1',
				// 		action: function (e, dt, node, config) {
				// 				alert('Button activated');
				// 		}
				// }
			]);	
        dt.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef([2]).withOption('type', 'date-euro')
        ];

        dt.columns = [
            DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(actionsHtml),
            DTColumnBuilder.newColumn(null).withTitle(titleHtmlEvening).notSortable().renderWith(actionsHtmlEvening),
            DTColumnBuilder.newColumn("morningStatus").withTitle("Morning").notSortable().renderWith(actionsHtmlMorningStatus),
            DTColumnBuilder.newColumn("eveningStatus").withTitle("Evening").notSortable().renderWith(actionsHtmlEveningStatus),
            DTColumnBuilder.newColumn("calendarDate").withTitle("Date").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-')
        ];


        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function headerCallback(header) {
            if (!dt.headerCompiled) {
                // Use this headerCompiled field to only compile header once
                dt.headerCompiled = true;
                $compile(angular.element(header).contents())($scope);
            }
        }

        function actionsHtml(data, type, full, meta) {
            full["id"] = meta.row;  //add id element
            data["id"] = meta.row;  //add id element
            //dt.selected[full.id] = false;
            return '<div class="text-center"><input type="checkbox" ng-checked="dt.selected[' + data.id + ']"  ng-model="dt.selected[' + data.id + ']" ng-click="dt.toggleOne(dt.selected)"></input></div>';

        }

        function actionsHtmlEvening(data, type, full, meta) {
            full["id"] = meta.row;  //add id element
            data["id"] = meta.row;  //add id element
            return '<div class="text-center"><input type="checkbox" ng-checked="dt.selectedEvening[' + data.id + ']"  ng-model="dt.selectedEvening[' + data.id + ']" ng-click="dt.toggleOneEvening(dt.selectedEvening)"></input></div>';

        }

        function actionsHtmlMorningStatus(data, type, full, meta) {
            // var id_data = data;
            // id_data["id"] = meta.row;  //add id element
            //console.log('actionsHtmlMorningStatus: ' + JSON.stringify( data));
            // dt.infos[id_data.id] = data;

            var iconType = "icon-hand-o-left text-default ";

            if (data == 'P') {
                iconType = "icon-thumbs-o-up text-primary ";
            }
            if (data == 'A') {
                iconType = "icon-thumbs-o-down text-danger ";
            }

            return '<div class="text-center">' +
                '<span class="icon ' + iconType + '" style="cursor: pointer;" "></span></div>';
        }

        function actionsHtmlEveningStatus(data, type, full, meta) {
            // var id_data = data;
            // id_data["id"] = meta.row;  //add id element
            // // console.log('actionsHtml: ' + JSON.stringify( id_data));
            // dt.infos[id_data.id] = data;

            var iconType = "icon-hand-o-left text-default ";

            if (data == 'P') {
                iconType = "icon-thumbs-o-up text-primary ";
            }
            if (data == 'A') {
                iconType = "icon-thumbs-o-down text-danger ";
            }

            return '<div class="text-center">' +
                '<span class="icon ' + iconType + '" style="cursor: pointer;" "></span></div>';
        }


        function toggleAll(selectAll, selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    selectedItems[id] = selectAll;
                }
            }
        }
        function toggleOne(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if (!selectedItems[id]) {
                        dt.selectAll = false;
                        return;
                    }
                }
            }
            dt.selectAll = true;
        }

        function toggleOneEvening(selectedItems) {
            for (var id in selectedItems) {
                if (selectedItems.hasOwnProperty(id)) {
                    if (!selectedItems[id]) {
                        dt.selectAllEvening = false;
                        return;
                    }
                }
            }
            dt.selectAllEvening = true;
        }


        $ctrl.openModal = function (size, parentSelector, passInfo) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/security/teacher-subjects.html',
                controller: 'teacherSubjectsController',
                controllerAs: '$ctrl',
                size: size,
                scope: $scope,
                appendTo: parentElem,
                keyboard: false,
                resolve: {
                    passInfo: function () {
                        return passInfo;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
                console.log('$ctrl.selected: ' + $ctrl.selected);
                $scope.dtSearch();
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                $scope.dtSearch();

            });
        };



        $scope.datepickers = [
            {
                calendarDate: false
            }];

        $scope.open = function ($event, which) {

            $event.preventDefault();
            $event.stopPropagation();
            $scope.datepickers[which] = true;
        };

        // // Default Datepicker Options
        // $scope.datepickers.forEach(function (obj) {
        //     obj.date = new Date();
        // 	obj.opened = false;
        // 	obj.options = {
        // 		showWeeks: false
        //     };
        //     $scope.wrapper.calendarDate =new Date();
        // });

        // // Open Datepicker
        // $scope.open = function (datepicker) {
        // 	datepicker.opened = true;
        // };


        //---------end of DT code


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
                    "tableName": "MST_Section",
                    "filter": ""
                },
                {
                    "tableName": "MST_AcademicYear",
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
                        }
                    }

                }

                $rootScope.loading = false;
                deferred.resolve($scope.popoverWrapper);

            });


            return deferred.promise;

        }   //------------------- ends loadData Function-----------------      


        //------------start saveData Function----------------

        //call from search button
        $scope.dtSearch = function () {

            //alert('test1');

            if ($scope.loginForm.$valid) {

                if (!angular.equals(dt.dtInstance, {})) {
                    //alert('test2');
                    dt.dtInstance.reloadData();
                    dt.dtInstance.changeData(function () { return $scope.searchData() });
                }

            }
        }


        //--------fetchuserMenu------------
        $scope.searchData = function () {

            var deferred = $q.defer();

            //alert('test3');
            //if ($scope.loginForm.wrapper.academicYearID.$valid) {

            methodAction = "fetchStudentAttendance";

            message = {
                "academicYearID": $scope.wrapper.academicYearID,
                "gradeID": $scope.wrapper.gradeID,
                "sectionID": $scope.wrapper.sectionID,
                "calendarDate": commonControls.dateFormatYYYYMMDD($scope.wrapper.calendarDate)

            };

            $rootScope.loading = true;

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.fetchStudentAttendance;

                    if (value.success == true) {

                        if (result.validSession == true && result.studentAttendanceWrapper[0].recordFound == true) {
                            $scope.attendanceWrapper = result.studentAttendanceWrapper;

                            //change flag to boolean while populating on the screen
                            for (var i = 0; i <= $scope.attendanceWrapper.length - 1; i++) {

                                if ($scope.attendanceWrapper[i].morningStatus == "P") {
                                    dt.selected[i] = true;
                                }
                                else {
                                    dt.selected[i] = false;
                                }

                                if ($scope.attendanceWrapper[i].eveningStatus == "P") {
                                    dt.selectedEvening[i] = true;
                                }
                                else {
                                    dt.selectedEvening[i] = false;
                                }

                            }

                            $scope.wrapper.deleteEnable = true;
                            console.log('attendance ' + JSON.stringify($scope.attendanceWrapper));

                        }
                        else {

                            $scope.attendanceWrapper = [];
                        }
                    }


                }

                $rootScope.loading = false;
                deferred.resolve($scope.attendanceWrapper);
            });
            //}

            return deferred.promise;
        }
        //-------end fetchuserMenu---------


        $scope.doAdd = function () {
            $ctrl.openModal('sm', '', '');
        }



        //--------------start saveData Function-----------------

        $scope.saveData = function () {


            $scope.submitted = true;

            //if ($scope.form.$valid) {



            // angular.forEach(dt.selectedMorning, function (selected, day) {
            //     if (selected) {
            //        console.log('selected '+day);
            //     }
            // });


            methodAction = "updateStudentAttendance";

            var message = [];

            for (var i = 0; i <= $scope.attendanceWrapper.length - 1; i++) {
                message.push({


                    "academicYearID": $scope.attendanceWrapper[i].academicYearID,
                    "refNo": $scope.attendanceWrapper[i].refNo,
                    "studentID": $scope.attendanceWrapper[i].studentID,
                    "gradeID": $scope.attendanceWrapper[i].gradeID,
                    "sectionID": $scope.attendanceWrapper[i].sectionID,
                    "calendarDate": commonControls.dateFormat($scope.wrapper.calendarDate),
                    "morningStatus": (dt.selected[i] ? "P" : "A"),//$scope.attendanceWrapper[i].morningStatus,
                    "eveningStatus": (dt.selectedEvening[i] ? "P" : "A"),//$scope.attendanceWrapper[i].eveningStatus,
                    "delivered": 'N'

                });
            }

            console.log('message update attendance = ' + JSON.stringify(message));

            if(message===undefined || message.length==0)
            {
                messageFactory('Please select record');
                return;
            }

            $scope.buttonDisabled = true;
            $rootScope.loading = true;

            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {


                if (value != null) {

                    console.log('Value personal Data= ' + JSON.stringify(value));


                    result = value.updateStudentAttendance;



                    if (value.success == true) {


                        if (result.validSession == true && result.recordFound == true) {

                            console.log(JSON.stringify(result));


                            messageFactory(appConstants.RECORD_UPDATED);

                            $scope.attendanceWrapper = [];//clear data before search

                            $scope.dtSearch();


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

                $rootScope.loading = false;
                $scope.buttonDisabled = false;
            });





            //}//----if form validation





        }  //------------ends saveData Function-------------




        //-----------for parents view----------
        dt.options.view = DTOptionsBuilder
            .fromFnPromise(function () { return $scope.fetchAttendanceByStudent() }) //call from search button
            .withDOM('Blrtip')
            .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
				<"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
            .withBootstrap()
            .withLanguage({
                paginate: {
                    previous: "&laquo;",
                    next: "&raquo;",
                },
                search: "_INPUT_",
                searchPlaceholder: "Search…"
            })
            .withOption("order", [
                [0, "desc"]
            ])
            .withOption("responsive", true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow)
            .withOption('headerCallback', headerCallback);

        dt.columns.view = [
            DTColumnBuilder.newColumn("calendarDate").withTitle("Date").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("morningStatus").withTitle("Morning").notSortable().renderWith(actionsHtmlMorningStatus),
            DTColumnBuilder.newColumn("eveningStatus").withTitle("Evening").notSortable().renderWith(actionsHtmlEveningStatus),
            DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
            // DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-')
        ];

        //----------end of parents view table

        //--------------start fetchStudentAttendanceByStudent Function---for mobile--------------

        $scope.fetchAttendanceByStudent = function () {

            var deferred = $q.defer();

            methodAction = "fetchAttendanceByStudent";
            message = {

                "refNo": sharedProperties.getRefNo(),
                "gradeID": sharedProperties.getGradeID(),
                "sectionID": sharedProperties.getSectionID()

            };

            $scope.buttonDisabled = true;
            $rootScope.loading = true;

            console.log('fetchAttendanceByStudent message= ' + JSON.stringify(message));

            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                console.log('Value Data= ' + JSON.stringify(value));

                if (value != null) {

                    result = value.fetchAttendanceByStudent;

                    //document.writeln('value ='+JSON.stringify(value));

                    console.log('result =' + JSON.stringify(result));

                    if (value.success == true) {

                        if (result.validSession == true && result.studentAttendanceWrapper[0].recordFound == true) {
                            //alert('result 1='+JSON.stringify(result));

                            $scope.studentAttendanceWrapper = result.studentAttendanceWrapper;

                            //alert(' $scope.wrapper='+JSON.stringify($scope.studentsWrapper));

                            //$scope.studentAttendanceWrapper = _.groupBy(result.studentAttendanceWrapper, function(d){return d.calendarDateMMM.substring(3)});

                        }
                        else if (result.validSession == false) {
                            messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                        }
                        else {
                            messageFactory(appConstants.SYSTEM_NORECORDS);
                        }
                    }
                    else {
                        //messageFactory('No response from host system');
                        messageFactory(appConstants.SYSTEM_NORESPONSE);
                    }

                }
                else {
                    //messageFactory('Error encountered,Please contact system administrator');
                    messageFactory(appConstants.SYSTEM_ERROR);
                }

                $rootScope.loading = false;
                $scope.buttonDisabled = false;
                deferred.resolve($scope.studentAttendanceWrapper);

            });

            return deferred.promise;

        }  //------------ends fetchStudentAttendanceByStudent Function-------------

    }]);

})();