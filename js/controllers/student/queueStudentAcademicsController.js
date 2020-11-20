(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueStudentAcademicsController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal', '$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        $scope.studentID = "";
        $scope.wrapper = [];
        $scope.studentAcademicsWrapper = [];

        // $scope.wrapper.gradeID='GR005';
        // $scope.wrapper.sectionID='SEC0A';
        // $scope.wrapper.termID='FA2002';
        // $scope.wrapper.subjectID='SOC03';


        // $scope.menuName = sharedProperties.getMenuName();
        // $scope.modalHidden = false;


        //----------------
        var $ctrl = this;


        //------------------DT code
        var dt = this;
        dt.message = '';
        //dt.someClickHandler = someClickHandler;
        dt.edit = edit;
        dt.dtInstance = {};
        dt.infos = {};

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
                [2, "desc"]
            ])
            .withOption("responsive", true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow)
            .withOption('headerCallback', headerCallback)
            .withButtons([
				{extend: 'copy',className: 'btn-outline-primary', text:'<span class="icon icon-copy"></span>'},
				{ extend: 'print', className: 'btn-outline-primary', text:'<span class="icon icon-print"></span>'},
				{ extend: 'csv', className: 'btn-outline-primary', filename: "StudentAcademics", text:'<span class="icon icon-file-code-o"></span>' },
				{
					extend: 'excel', className: 'btn-outline-primary',
					filename: "StudentAcademics",
					title: "Student Academics Report",
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

        dt.columns = [
            DTColumnBuilder.newColumn("academicYearIDValue").withTitle("Academic Year").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentID").withTitle("ID").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
            DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("subjectIDValue").withTitle("Subject").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("termIDValue").withTitle("Term").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("targetMarks").withTitle("Target").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("securedMarks").withTitle("Marks").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("grade").withTitle("Grade").withOption('defaultContent', '-'),
            // DTColumnBuilder.newColumn("groupTerm").withTitle("Group Term").withOption('defaultContent', '-'),
            // DTColumnBuilder.newColumn("makerID").withTitle("Maker").withOption('defaultContent', '-'),
            // DTColumnBuilder.newColumn("makerDateTime").withTitle("Date&Time").withOption('defaultContent', '-'),			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
            //DTColumnBuilder.newColumn("academicYearID").withTitle("Academic Year").withOption('defaultContent', '-').notVisible(),
            //DTColumnBuilder.newColumn("gradeID").withTitle("Grade").withOption('defaultContent', '-').notVisible(),
            //DTColumnBuilder.newColumn("subjectID").withTitle("Subject").withOption('defaultContent', '-').notVisible()

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
            var id_data = data;
            id_data["id"] = meta.row;  //add id element
            // console.log('actionsHtml: ' + JSON.stringify( id_data));
            dt.infos[id_data.id] = data;
            return '<div class="text-center">' +
                '<span class="icon icon-edit text-primary" style="cursor: pointer;" ng-click="dt.edit(dt.infos[' + id_data.id + '])"></span></div>'
        }


        function edit(info) {
            // console.log('You are trying to edit the row: ' + JSON.stringify(info));
            // $scope.wrapper.academicYearID=info.academicYearID;
            // $scope.wrapper.gradeID=info.gradeID;
            // $scope.wrapper.sectionID=info.sectionID;
            // $scope.wrapper.termID=info.termID;
            // $scope.wrapper.subjectID=info.subjectID;

            var passInfo = [info.refNo, info.studentID, info.gradeID, info.sectionID,
            info.subjectID, info.termID, info.studentName, info.securedMarks];
            $ctrl.openModal('sm', '', passInfo);
        }

        $ctrl.openModal = function (size, parentSelector, passInfo) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/student/student-academics.html',
                controller: 'studentAcademicsController',
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
            });
        };






        //---------end of DT code


        //------------start loadData Function----------------

        $scope.loadData = function () {

            var deferred = $q.defer();

            methodAction = "fetchMultiPopoverData";

            message = [
                {
                    "tableName": "MST_Term",
                    "filter": ""
                },

                {
                    "tableName": "MST_Subject",
                    "filter": ""
                },
                {
                    "tableName": "MST_AcademicYear",
                    "filter": ""
                },
                {
                    "tableName": "MST_Grade",
                    "filter": ""
                },
                {
                    "tableName": "MST_Section",
                    "filter": ""
                },
                {
                    "tableName": "MST_Rank",
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

            });


            return deferred.promise;

        }   //------------------- ends loadData Function-----------------      


        //------------start saveData Function----------------

        //call from search button
        $scope.dtSearch = function () {

            if ($scope.loginForm.$valid) {

                if (!angular.equals(dt.dtInstance, {})) {
                    dt.dtInstance.reloadData();
                    dt.dtInstance.changeData(function () { return $scope.searchData() });
                }
            }

        }


        //--------fetchuserMenu------------
        $scope.searchData = function () {

            //alert('test searchData');

            var deferred = $q.defer();

            //console.log('test3 '+$scope.loginForm.$valid);

            //if ($scope.loginForm.$valid) {

            methodAction = "fetchStudentMarks";

            message = {

                "academicYearID": "",//$scope.wrapper.academicYearID,
                "gradeID": $scope.wrapper.gradeID,
                "sectionID": $scope.wrapper.sectionID,
                "termID": $scope.wrapper.termID,
                "subjectID": $scope.wrapper.subjectID


            };

            $rootScope.loading = true;

            console.log('message academics ' + JSON.stringify(message));

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.fetchStudentMarks;

                    console.log('result academics ' + JSON.stringify(result));

                    if (value.success == true) {

                        if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {
                            $scope.studentAcademicsWrapper = result.studentAcademicsWrapper;

                        }
                        else {

                            $scope.studentAcademicsWrapper = '';
                        }



                    }


                }

                $rootScope.loading = false;

                deferred.resolve($scope.studentAcademicsWrapper);
            });
            //}


            return deferred.promise;
        }
        //-------end fetchuserMenu---------


        // $scope.doAdd = function () {
        //     $ctrl.openModal('sm', '', '');
        // }



        // //--------------start saveData Function-----------------

        // $scope.saveData = function () {


        //     $scope.submitted = true;

        //     //if ($scope.form.$valid) {



        //         methodAction = "updateGradeSubjects";

        //         message = {

        //             "academicYearID": $scope.wrapper.academicYearID,
        //             "gradeID": $scope.wrapper.gradeID,
        //             "subjectID": $scope.wrapper.subjectID,
        //             "deleteFlag": "Y" //--'Y' or 'N'

        //         };

        //         //alert('message = '+JSON.stringify(message));	
        //         $scope.buttonDisabled = true;
        //         $rootScope.loading = true;

        //         jsonData = connectHostFactory(methodAction, message);
        //         jsonData.returnData(function (value) {

        //             //alert('Value personal Data= '+JSON.stringify(value));

        //             if (value != null) {


        //                 result = value.updateGradeSubjects;



        //                 if (value.success == true) {


        //                     if (result.validSession == true && result.gradeSubjectsWrapper[0].recordFound == true) {

        //                         messageFactory(appConstants.RECORD_DELETED);

        //                         $scope.wrapper=[]; //to clear before search
        //                         $scope.dtSearch();


        //                         //alert(JSON.stringify(result));



        //                     }
        //                     else if (result.validSession == false) {
        //                         messageFactory(appConstants.SYSTEM_INVALIDSESSION);
        //                     }
        //                     else {


        //                         messageFactory(appConstants.SYSTEM_NORECORDS);

        //                     }

        //                 }
        //                 else {

        //                     messageFactory(appConstants.SYSTEM_NORESPONSE);
        //                 }

        //             }
        //             else {

        //                 messageFactory(appConstants.SYSTEM_ERROR);
        //             }

        //             $rootScope.loading = false;
        //             $scope.buttonDisabled = false;
        //         });





        //     //}//----if form validation





        // }  //------------ends saveData Function-------------


        //------------for parents view
        dt.options.view = DTOptionsBuilder
            .fromFnPromise(function () { return $scope.fetchStudentAcademics() }) //call from search button
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
                [2, "desc"]
            ])
            .withOption("responsive", true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow)
            .withOption('headerCallback', headerCallback);

        dt.columns.view = [
            DTColumnBuilder.newColumn("academicYearIDValue").withTitle("Academic Year").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
            // DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("subjectIDValue").withTitle("Subject").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("termIDValue").withTitle("Term").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("targetMarks").withTitle("Target").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("securedMarks").withTitle("Marks").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("grade").withTitle("Grade").withOption('defaultContent', '-'),
        ];


        //------for view--------------
        $scope.fetchStudentAcademics = function () {

            //alert('search data');

            var deferred = $q.defer();

            //---------TO RELOAD UPDATED RECORD--------
            methodAction = "fetchStudentAcademics";

            message = {
                "refNo": sharedProperties.getRefNo(),
                "studentID": sharedProperties.getStudentID(),
            };

            console.log('SearchData message ' + JSON.stringify(message));

            $rootScope.loading = true;

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.fetchStudentAcademics;

                    console.log('Value  Data= ' + JSON.stringify(value));

                    if (value.success == true) {

                        if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {

                            $scope.studentAcademicsWrapper = result.studentAcademicsWrapper;
                            console.log('$scope.academicsWrapper= ' + JSON.stringify($scope.academicsWrapper));
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

                deferred.resolve($scope.studentAcademicsWrapper);
            });


            return deferred.promise;
        }
        //--------------END--------------------


    }]);

})();