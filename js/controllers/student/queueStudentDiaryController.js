(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueStudentDiaryController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties','commonControls', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal', '$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties,commonControls, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        $scope.studentID = "";
        $scope.wrapper = [];
        //$scope.studentAcademicsWrapper =[];

        // $scope.wrapper.gradeID='GR005';
        // $scope.wrapper.sectionID='SEC0A';
        // $scope.wrapper.termID='FA2002';
        // $scope.wrapper.subjectID='SOC03';


        // $scope.menuName = sharedProperties.getMenuName();
        // $scope.modalHidden = false;

        $scope.wrapper.diaryDate = new Date();

        //----------------
        var $ctrl = this;


        //------------------DT code
        var dt = this;
        dt.message = '';
        //dt.someClickHandler = someClickHandler;
        dt.edit = edit;
        dt.dtInstance = {};
        dt.infos = {};

        dt.selected = {};
        dt.selectAll = false;
        dt.toggleAll = toggleAll;
        dt.toggleOne = toggleOne;

        var titleHtml = '<div class="text-center">Morning <input type="checkbox" ng-model="dt.selectAll" ng-click="dt.toggleAll(dt.selectAll, dt.selected)"></input></div>';


        dt.options = DTOptionsBuilder
            .fromFnPromise(function () { return $scope.searchData() }) //call from search button
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
        // .withOption('rowCallback', rowCallback);
        // .withButtons([
        // 	'columnsToggle',
        // 	'colvis',
        // 	'copy',
        // 	'print',
        // 	'excel',
        // 	{
        // 			text: 'Some button',
        // 			key: '1',
        // 			action: function (e, dt, node, config) {
        // 					alert('Button activated');
        // 			}
        // 	}
        // ]);			

        dt.columns = [
            // DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(actionsHtmlCheckbox),
            // DTColumnBuilder.newColumn("academicYearIDValue").withTitle("Academic Year").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("messageID").withTitle("ID").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("diaryDate").withTitle("Diary").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("subjectIDValue").withTitle("Subject").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
            DTColumnBuilder.newColumn("messageDateTime").withTitle("Date").withOption('defaultContent', '-'),

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

        // function actionsHtmlCheckbox(data, type, full, meta) {
        //     full["id"] = meta.row;  //add id element
        //     data["id"] = meta.row;  //add id element
        //     //dt.selected[full.id] = false;
        //     return '<div class="text-center"><input type="checkbox" ng-checked="dt.selected[' + data.id + ']"  ng-model="dt.selected[' + data.id + ']" ng-click="dt.toggleOne(dt.selected)"></input></div>';

        // }

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

            var passInfo = [info.gradeID, info.sectionID,
            info.subjectID, info.diaryDate, info.messageID, "UPDATE"];
            sharedProperties.setActionMode("UPDATE");
            $ctrl.openModal('md', '', passInfo);
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


        $ctrl.openModal = function (size, parentSelector, passInfo) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/student/student-diary.html',
                controller: 'studentDiaryController',
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
                // {
                //     "tableName" : "MST_Term",
                //      "filter" : ""    		
                // },

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
                }
                // ,
                // {
                //     "tableName" : "MST_Rank",
                //      "filter" : ""    		
                // }
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

            if ($scope.loginForm.$valid) {

                methodAction = "fetchStudentDiary";

                message = {

                    "academicYearID": "",//$scope.wrapper.academicYearID,
                    "gradeID": $scope.wrapper.gradeID,
                    "sectionID": $scope.wrapper.sectionID,
                    "subjectID": $scope.wrapper.subjectID,
                    "diaryDate": commonControls.dateFormatYYYYMMDD($scope.wrapper.diaryDate),
                    "messageID":""


                };

                $rootScope.loading = true;

                console.log('message fetchStudentDiary ' + JSON.stringify(message));

                jsonData = connectHostFactory(methodAction, message);

                jsonData.returnData(function (value) {

                    if (value != null) {

                        result = value.fetchStudentDiary;

                        console.log('result fetchStudentDiary ' + JSON.stringify(result));

                        if (value.success == true) {

                            if (result.validSession == true && result.studentDiaryWrapper[0].recordFound == true) {
                                $scope.studentDiaryWrapper = result.studentDiaryWrapper;

                            }
                            else {

                                $scope.studentDiaryWrapper = '';
                            }

                        }
                    }

                    $rootScope.loading = false;

                    deferred.resolve($scope.studentDiaryWrapper);
                });
            }


            return deferred.promise;
        }
        //-------end fetchuserMenu---------


        $scope.datepickers = {
			diaryDate: false

		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};


        $scope.doAdd = function () {

            sharedProperties.setActionMode("");
            $ctrl.openModal('md', '', '');
        }



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

    }]);

})();