(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueParentMessageController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal','$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal,$compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        $scope.studentID = "";
        $scope.wrapper = [];

        $scope.parentMessageWrapper=[];

        // $scope.menuName = sharedProperties.getMenuName();

        // $scope.modalHidden = false;


        //----------------
        var $ctrl = this;


        //------------------DT code
        var dt = this;
        dt.message = '';
        // dt.someClickHandler = someClickHandler;
        dt.edit = edit;
        dt.dtInstance = {};
        dt.infos = {};

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
                [0, "asc"]
            ])
            .withOption("responsive", true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);
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
            //DTColumnBuilder.newColumn("academicYearIDValue").withTitle("Academic Year").withOption('defaultContent', '-'),
            // DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
            // DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            //DTColumnBuilder.newColumn("subjectIDValue").withTitle("Subject").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("messageID").withTitle("Message ID").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("message").withTitle("Message").withOption('defaultContent', '-').renderWith(actionsHtml),
            //DTColumnBuilder.newColumn("makerID").withTitle("Maker").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("messageDateTime").withTitle("Date&Time").withOption('defaultContent', '-'),	
            //DTColumnBuilder.newColumn(null).withTitle('Delete').notSortable().renderWith(actionsHtml),
            // DTColumnBuilder.newColumn('delete').withTitle("Delete").renderWith(function (id) { return '<div class="text-center"><span class="icon icon-trash text-primary" style="cursor: pointer;"></span></div>' }), //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
            //DTColumnBuilder.newColumn("academicYearID").withTitle("Academic Year").withOption('defaultContent', '-').notVisible(),
            //DTColumnBuilder.newColumn("gradeID").withTitle("Grade").withOption('defaultContent', '-').notVisible(),
            //DTColumnBuilder.newColumn("subjectID").withTitle("Subject").withOption('defaultContent', '-').notVisible()

        ];
        // dt.newPromise = newPromise;
        // dt.reloadData = reloadData;
        // dt.dtInstance = {};

        // function newPromise() {
        //     return $scope.searchData();
        // }
        // function reloadData() {
        //     var resetPaging = true;
        //     dt.dtInstance.reloadData(callback, resetPaging);
        // }

        // function callback(json) {
        //     console.log(json);
        // }

        // dt.dtInstanceCallback = function (_dtInstance) {
        //     dt.dtInstance = _dtInstance;
        //     dt.dtInstance.reloadData();
        // }

        // function someClickHandler(info) {
        //     dt.message = info.gradeID + ' - ' + info.subjectID;
        //     console.log('click ' + dt.message);
        //     var passInfo = [info.gradeID, info.subjectID];
        //     //$ctrl.openModal('sm','', passInfo);

        //     $scope.wrapper.academicYearID=info.academicYearID;
        //     $scope.wrapper.gradeID=info.gradeID;
        //     $scope.wrapper.subjectID=info.subjectID;
        //     $scope.wrapper.staffUserID = info.staffUserID;

        //     $scope.saveData();
        // }

        // function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        //     // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        //     $('td', nRow).unbind('click');
        //     $('td', nRow).bind('click', function () {
        //         $scope.$apply(function () {
        //             dt.someClickHandler(aData);
        //         });
        //     });
        //     return nRow;
        // }

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function actionsHtml(data, type, full, meta) {

            var html= '<div class="text-normal">'+full.message+'</div>';

            console.log(full.staffRefNo);

            if(full.userGroup=='STAFF')
            {
                html= '<div class="text-primary">'+'Reply:' + full.message+'</div>';
            }

            return html;
        }

        function edit(info) {
            // console.log('You are trying to edit the row: ' + JSON.stringify(info));
            $scope.wrapper.academicYearID=info.academicYearID;
            $scope.wrapper.gradeID=info.gradeID;
            $scope.wrapper.subjectID=info.subjectID;
            $scope.wrapper.staffUserID = info.staffUserID;

            Swal.fire({
				title: 'Do you want to delete?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {
                    $scope.saveData();
				}
			})

        }

        $ctrl.openModal = function (size, parentSelector, passInfo) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/parent/parent-message.html',
                controller: 'parentMessageController',
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
                    "tableName": "MST_Grade",
                    "filter": ""
                },

                {
                    "tableName": "MST_Subject",
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

            //alert('test1');


                if (!angular.equals(dt.dtInstance, {})) {
                    //alert('test2');
                    dt.dtInstance.reloadData();
                    dt.dtInstance.changeData(function () { return $scope.searchData() });
                }

        }


        //--------fetchuserMenu------------
        $scope.searchData = function () {

            var deferred = $q.defer();

            //alert('test3');
            //if ($scope.loginForm.wrapper.academicYearID.$valid) {

                methodAction="fetchParentMessage";
				
				message={
							//"academicYearID": $scope.wrapper.academicYearID,
                            "studentID" :(sharedProperties.getStudentID()==null?"":sharedProperties.getStudentID())
							//"gradeID": $scope.wrapper.gradeID,
							//"subjectID": $scope.wrapper.subjectID
					    };

                $rootScope.loading = true;

                console.log("fetchParentMessage "+JSON.stringify(message));

                jsonData = connectHostFactory(methodAction, message);

                jsonData.returnData(function (value) {

                    if (value != null) {

                        result = value.fetchParentMessage;

                        console.log("fetchParentMessage Data "+JSON.stringify(result));


                        if (value.success == true) {

                            if(result.validSession==true && result.parentMessageWrapper[0].recordFound==true)
                            {
                                    $scope.parentMessageWrapper=result.parentMessageWrapper;
                                     //$scope.wrapper.deleteEnable = true;
                                    

                            }
                            else {

                                $scope.parentMessageWrapper = '';
                            }
                        }


                    }

                    $rootScope.loading = false;
                    deferred.resolve($scope.parentMessageWrapper);
                });
            //}

            return deferred.promise;
        }
        //-------end fetchuserMenu---------


        $scope.doAdd = function () {
            sharedProperties.setActionMode("ADD");
            var passInfo = [sharedProperties.getStudentID(), "ADD"];
            $ctrl.openModal('md', '', '');
        }



        //--------------start saveData Function-----------------

        // $scope.saveData = function () {


        //     $scope.submitted = true;

        //     //if ($scope.form.$valid) {



        //         methodAction = "updateTeacherSubjects";

        //         message={
						
        //             "academicYearID": $scope.wrapper.academicYearID,
        //             "staffUserID": $scope.wrapper.staffUserID,
        //             "gradeID": $scope.wrapper.gradeID,   
        //             "subjectID": $scope.wrapper.subjectID,
        //             "deleteFlag":"Y" //--'Y' or 'N'
                    
        //         };

        //         //alert('message = '+JSON.stringify(message));	
        //         $scope.buttonDisabled = true;
        //         $rootScope.loading = true;

        //         jsonData = connectHostFactory(methodAction, message);
        //         jsonData.returnData(function (value) {

        //             //alert('Value personal Data= '+JSON.stringify(value));

        //             if (value != null) {


        //                 result = value.updateTeacherSubjects;



        //                 if (value.success == true) {


        //                     if (result.validSession == true && result.teacherSubjectsWrapper[0].recordFound == true) {

        //                         messageFactory(appConstants.RECORD_DELETED);

        //                         $scope.wrapper=[]; //clear data before search

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