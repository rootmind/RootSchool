(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueTeachersProfileController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory','commonControls', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal', '$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, commonControls, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        $scope.wrapper = [];

        $scope.popoverWrapper = [];

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
        dt.imageUpload = imageUpload;


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
            //.withOption('rowCallback', rowCallback)
            // .withOption('fnRowCallback',function(nRow, aData, iDisplayIndex){       //to generate sequence number
            //     $("td:first", nRow).html(iDisplayIndex +1);
            //     return nRow;
            // })
            .withButtons([
				{extend: 'copy',className: 'btn-outline-primary', text:'<span class="icon icon-copy"></span>'},
				{ extend: 'print', className: 'btn-outline-primary', text:'<span class="icon icon-print"></span>'},
				{ extend: 'csv', className: 'btn-outline-primary', filename: "StaffList", text:'<span class="icon icon-file-code-o"></span>' },
				{
					extend: 'excel', className: 'btn-outline-primary',
					filename: "StaffList",
					title: "Staff List Report",
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
			DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(actionsHtmlAvatar),
            DTColumnBuilder.newColumn("staffRefNo").withTitle("Ref No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("staffUserID").withTitle("User ID").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("staffTypeValue").withTitle("Type").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
            DTColumnBuilder.newColumn(null).withTitle('Photo').notSortable().renderWith(actionsHtmlImage),
            DTColumnBuilder.newColumn("header").withTitle("Designation").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("name").withTitle("Name").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("profile").withTitle("Profile").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("mobileNo").withTitle("Mobile No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("emailID").withTitle("email").withOption('defaultContent', '-'),
            //DTColumnBuilder.newColumn(null).withTitle("Edit").renderWith(function (id) { return '<div class="text-center"><button class="btn btn-outline-primary btn-icon sq-24" ><span class="icon icon-edit text-primary" style="cursor: pointer;"></span></button></div>' }), //
            DTColumnBuilder.newColumn("makerID").withTitle("Maker").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("makerDateTime").withTitle("Date&Time").withOption('defaultContent', '-')			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
        ];
        //dt.newPromise = newPromise;
        //dt.reloadData = reloadData;
        //dt.dtInstance = {};

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
        //     dt.message = info.staffRefNo;
        //     console.log('click .....' + dt.message);
        //     var passInfo = [info.staffRefNo, "edit"];
        //     $ctrl.openModal('md','', passInfo);

        // }

        // function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        //     // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        //     $('td', nRow).unbind('click');
        //     $('td', nRow).bind('click', function () {
        //         //var colIndex= $(this).index();
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
             var id_data = data;
             id_data["id"]=meta.row;  //add id element
            // console.log('actionsHtml: ' + JSON.stringify( id_data));
            dt.infos[id_data.id] = data;
            return '<div class="text-center">'  +
                   '<span class="icon icon-edit text-primary" style="cursor: pointer;" ng-click="dt.edit(dt.infos['+id_data.id+'])"></span></div>' //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
        }

        function edit(info) {
            // console.log('You are trying to edit the row: ' + JSON.stringify(info));
             var passInfo = [info.staffRefNo, "edit"];
             var paramViewUrl = 'views/admin/teachers-profile.html';
             var paramViewController = 'teachersProfileController';
             var viewSize = 'md'
             $ctrl.openModal(viewSize,'', passInfo, paramViewUrl,paramViewController);
        }

        $ctrl.openModal = function (size, parentSelector, passInfo, paramViewUrl, paramViewController) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: paramViewUrl ,                     //'views/admin/teachers-profile.html',
                controller: paramViewController,                            //'teachersProfileController',
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


        //---------------for student image upload----------------
		function actionsHtmlImage(data, type, full, meta) {

			var id_data = data;
			id_data["id"] = meta.row; //add id element
			// console.log('actionsHtml: ' + JSON.stringify( id_data));
			dt.infos[id_data.id] = data;
			return '<div class="text-center">' +
				'<span class="icon icon-eye text-primary" style="cursor: pointer;" ng-click="dt.imageUpload(dt.infos[' + id_data.id + '])"></span></div>'
		}

		function imageUpload(info) {

            // console.log('You are trying to edit the row: ' + JSON.stringify(info));
            dt.message = info.staffRefNo + ' - ' + info.name;
            var passInfo = [info.staffRefNo, info.staffRefNo, info.name, "UPDATE", "DOC004", "staff", "avatar"];
            // sharedProperties.setRefNo(info.refNo);
            // sharedProperties.setStudentID(info.studentID);
            // sharedProperties.setSchoolID(info.schoolID);
            // sharedProperties.setActionMode("UPDATE");
            var paramViewUrl = 'views/student/student-image.html';
            var paramViewController = 'imageUploadController';
            var viewSize = 'sm'
            $ctrl.openModal(viewSize, '', passInfo, paramViewUrl, paramViewController);

		}

		function actionsHtmlAvatar(data, type, full, meta) {

			if (!data.avatar) {
				data.avatar = 'img/student/empty_person.png';
			}
			return '<div class="text-center">' +
				'<img class="circle" width="40" height="40" src="' + data.avatar + '"></div>'
		}


        //---------end of DT code


        //------------start loadData Function----------------

        // $scope.loadData = function () {

        //     var deferred = $q.defer();

        //     methodAction = "fetchMultiPopoverData";

        //     message = [

        //         {
        //             "tableName": "MST_Term",
        //             "filter": ""
        //         },
        //         {
        //             "tableName": "MST_Grade",
        //             "filter": ""
        //         },
        //         {
        //             "tableName": "MST_ExamStatus",
        //             "filter": ""
        //         },
        //         {
        //             "tableName": "MST_AcademicYear",
        //             "filter": ""
        //         },
        //         {
        //             "tableName": "MST_Subject",
        //             "filter": ""
        //         }



        //     ];

        //     $rootScope.loading = true;

        //     jsonData = connectHostFactory(methodAction, message);
        //     jsonData.returnData(function (value) {

        //         //alert('Popover Data='+JSON.stringify(value));

        //         if (value != null) {



        //             result = value.fetchMultiPopoverData;

        //             if (value.success == true) {

        //                 if (result.validSession == true) {

        //                     $scope.popoverWrapper = result.popoverWrapper;
        //                     deferred.resolve($scope.popoverWrapper);
        //                 }
        //             }

        //         }

        //         $rootScope.loading = false;

        //     });



        //     // /*-----fetchGradeSubjects------*/

		// 	// methodAction="fetchGradeSubjects";
								
		// 	// message={
		// 	// 			 "academicYearID" : $scope.wrapper.academicYearID
						 	    		
		// 	// 		};

		// 	// 	    $rootScope.loading=true;
						 			
		// 	// 		jsonData=connectHostFactory(methodAction, message);
		// 	// 		jsonData.returnData(function(value){
							
						
		// 	// 				if(value != null){
								
									
		// 	// 							result=value.fetchGradeSubjects;
										
		// 	// 							console.log('fetchGradeSubjects result='+JSON.stringify(result));
									
		// 	// 							if(value.success == true)
		// 	// 							{
											

		// 	// 								if(result.validSession==true && result.gradeSubjectsWrapper[0].recordFound==true)
		// 	// 								{
		// 	// 									$scope.wrapper=result.gradeSubjectsWrapper;
		// 	// 									$scope.currentAcademicYearID= sharedProperties.getAcademicYearID();
		// 	// 									$scope.wrapper.academicYearID = $scope.currentAcademicYearID
		// 	// 									//alert('$scope.Wrapper ='+JSON.stringify($scope.wrapper));
		// 	// 								}
											
		// 	// 							}
						
		// 	// 				}
							
		// 	// 				$rootScope.loading=false;
							
		// 	// 			});
        //     //              /*-----fetchGradeSubjects end------*/
            


        //     return deferred.promise;

        // }   //------------------- ends loadData Function-----------------      


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

            methodAction = "fetchTeachersProfile";

            message = {
            };

            $rootScope.loading = true;

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.fetchTeachersProfile;

                    if (value.success == true) {

                        if (result.validSession == true && result.recordFound == true && result.teachersProfileWrapper[0].recordFound == true) {
                            $scope.teachersProfileWrapper=result.teachersProfileWrapper;

                            console.log(' $scope.teachersProfileWrapper ' + JSON.stringify($scope.teachersProfileWrapper));
                        }
                        else {

                            $scope.teachersProfileWrapper = '';
                        }
                    }


                }

                $rootScope.loading = false;
                deferred.resolve($scope.teachersProfileWrapper);
            });
            //}

            return deferred.promise;
        }
        //-------end fetchuserMenu---------


        $scope.doAdd = function () {

            var paramViewUrl = 'views/admin/teachers-profile.html';
            var paramViewController = 'teachersProfileController';
            var viewSize = 'md'
            var passInfo = ["", "add"];
            $ctrl.openModal(viewSize,'', passInfo, paramViewUrl,paramViewController);
            
        }



        // //--------------start saveData Function-----------------

        // $scope.saveData = function () {


        //     $scope.submitted = true;

        //     //if ($scope.form.$valid) {



        //     methodAction = "updateExamCalendar";

        //     message = [{
        //         "academicYearID": $scope.wrapper.academicYearID,
        //         "gradeID": $scope.wrapper.gradeID,
        //         "termID": $scope.wrapper.termID,
        //         "subjectID": $scope.wrapper.subjectID,
        //         "examDate": commonControls.dateFormat($scope.wrapper.examDate),
        //         "targetMarks": $scope.wrapper.targetMarks,
        //         //"statusID" : $scope.wrapper.statusID

        //     }];

        //     console.log('message = '+JSON.stringify(message));	
        //     $scope.buttonDisabled = true;
        //     $rootScope.loading = true;

        //     jsonData = connectHostFactory(methodAction, message);
        //     jsonData.returnData(function (value) {

        //         console.log('Value personal Data= '+JSON.stringify(value));

        //         if (value != null) {


        //             result = value.updateExamCalendar;



        //             if (value.success == true) {


        //                 if (result.validSession == true && result.examCalendarWrapper[0].recordFound == true) {

        //                     messageFactory(appConstants.RECORD_DELETED);

        //                     $scope.dtSearch();


        //                     console.log(JSON.stringify(result));



        //                 }
        //                 else if (result.validSession == false) {
        //                     messageFactory(appConstants.SYSTEM_INVALIDSESSION);
        //                 }
        //                 else {


        //                     messageFactory(appConstants.SYSTEM_NORECORDS);

        //                 }

        //             }
        //             else {

        //                 messageFactory(appConstants.SYSTEM_NORESPONSE);
        //             }

        //         }
        //         else {

        //             messageFactory(appConstants.SYSTEM_ERROR);
        //         }

        //         $rootScope.loading = false;
        //         $scope.buttonDisabled = false;
        //     });

        //     //}//----if form validation

        // }  //------------ends saveData Function-------------

    }]);

})();