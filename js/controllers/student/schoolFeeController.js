(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('schoolFeeController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo',   function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];
		$scope.schoolFeeWrapper=[];

		// $scope.menuName = sharedProperties.getMenuName();
		// $scope.refNo = sharedProperties.getRefNo();
		// $scope.studentName = sharedProperties.getStudentName();
		// $scope.surname = sharedProperties.getSurname();
		/*$scope.menu= sharedProperties.getMenu();

	
		$scope.actionMode=sharedProperties.getActionMode();*/

		// //------------------DT code
		// var dt_fee = this;
		// dt_fee.message = '';
		// //dt.someClickHandler = someClickHandler;
		// dt_fee.edit = edit;
		// dt_fee.dtInstance = {};
		// dt_fee.infos = {};

		// //-------------


		$scope.editableOption = true;
		$scope.codeDisabled=true;
		//$rootScope.isTabBarDisable=true;


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			refNo: $ctrl.passInfo[0], studentID: $ctrl.passInfo[1], 
			studentName: $ctrl.passInfo[2], mode: $ctrl.passInfo[3], userid:$ctrl.passInfo[4],
			gradeID:$ctrl.passInfo[5], sectionID: $ctrl.passInfo[6]

		};

		//console.log ('item ' + $ctrl.selected.studentID);
		$scope.wrapper.refNo = $ctrl.selected.refNo;
		$scope.wrapper.studentID = $ctrl.selected.studentID;
		$scope.wrapper.studentName = $ctrl.selected.studentName;
		$scope.wrapper.userid = $ctrl.selected.userid;
		$scope.actionMode = $ctrl.selected.mode;
		$scope.wrapper.gradeID = $ctrl.selected.gradeID;
		$scope.wrapper.sectionID = $ctrl.selected.sectionID;


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.studentID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------


		//------------start loadData Function----------------

		$scope.loadData = function () {


			var deferred = $q.defer();

			methodAction = "fetchMultiPopoverData";

			message = [

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
					"tableName": "MST_FeeType",
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


							// $scope.wrapper.studentID = sharedProperties.getStudentID();
							// $scope.wrapper.studentName = sharedProperties.getStudentName();
							// $scope.wrapper.gradeID = sharedProperties.getGradeID();
							// $scope.wrapper.sectionID = sharedProperties.getSectionID();
							// $scope.wrapper.academicYearID = sharedProperties.getAcademicYearID();

							//sharedProperties.setAcademicYearID('');
							sharedProperties.setGradeID('');
							sharedProperties.setSectionID('');
						}

					}

				}

				$rootScope.loading = false;
				deferred.resolve($scope.popoverWrapper);

			});


			// if(sharedProperties.getActionMode()=='UPDATE'){

			// 	 $scope.searchData();
						
			// }	
	
			return deferred.promise;


		}   //------------------- ends loadData Function-----------------       





		//--------------start saveData Function-----------------

		$scope.saveData = function () {


			alertsManager.clearAlerts();

			$scope.submitted = true;

			if ($scope.loginForm.$valid) {


				methodAction = "updateSchoolFee";



				message = {

					"refNo": sharedProperties.getRefNo(),
					"studentID": $scope.wrapper.studentID,
					"gradeID": $scope.wrapper.gradeID,
					"sectionID": $scope.wrapper.sectionID,
					"feeType": $scope.wrapper.feeType,
					"feeAmount": $scope.wrapper.feeAmount,
					"paymentDate": commonControls.dateFormat($scope.wrapper.paymentDate),
					"invoiceNo": $scope.wrapper.invoiceNo //it is used for update only

				};

				console.log('updateSchoolFee message =' + JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					console.log('updateSchoolFee Data= '+JSON.stringify(value));

					if (value != null) {



						result = value.updateSchoolFee;


						console.log('updateSchoolFee result= '+JSON.stringify(result));


						if (value.success == true) {




							if (result.validSession == true && result.schoolFeeWrapper[0].recordFound == true) {
								
								//$scope.searchData();

								messageFactory(appConstants.RECORD_UPDATED);



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
			}


		}  //------------ends saveData Function-------------


		$scope.dtSearch = function () {

                if (!angular.equals(dt_fee.dtInstance, {})) {
                    //dt_fee.dtInstance.reloadData();
                    dt_fee.dtInstance.changeData(function () { return $scope.searchData() });
                }

        }


		$scope.searchData = function () {

			//alert('search data');

			var deferred = $q.defer();

			//---------TO RELOAD UPDATED RECORD--------
			methodAction = "fetchSchoolFee";

			message = {

				"refNo": $scope.wrapper.refNo, //sharedProperties.getRefNo(),
				"studentID": $scope.wrapper.studentID //sharedProperties.getStudentID()

			};

			console.log('SearchData message ' +JSON.stringify(message));

			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					console.log('value = ' +JSON.stringify(value));

					//document.writeln('value = ' +JSON.stringify(value));

					result = value.fetchSchoolFee;

					if (value.success == true) {



						if (result.validSession == true && result.schoolFeeWrapper[0].recordFound == true) {

							$scope.schoolFeeWrapper = result.schoolFeeWrapper;

							console.log('schoolFeeWrapper = ' +JSON.stringify($scope.schoolFeeWrapper));

							// $scope.wrapper.studentID = result.schoolFeeWrapper[0].studentID;
							// $scope.wrapper.academicYearID = result.schoolFeeWrapper[0].academicYearID;
							// $scope.wrapper.gradeID = result.schoolFeeWrapper[0].gradeID;
							// $scope.wrapper.sectionID = result.schoolFeeWrapper[0].sectionID;

							// //--------
							// $scope.submitted = false;
							// $scope.form.feeType.$invalid = true;
							// $scope.form.feeType.$dirty = false;
							// $scope.form.feeAmount.$invalid = true;
							// $scope.form.feeAmount.$dirty = false
							// $scope.form.paymentDate.$invalid = true;
							// $scope.form.paymentDate.$dirty = false;

							//-------------



							// //alert('totalItems = '+$scope.totalItems);

							// //--pagination--

							// $scope.totalItems = $scope.wrapper.length;
							// $scope.currentPage = 1;
							// $scope.itemsPerPage = 5;
							// $scope.maxSize = 5; //Number of pager buttons to show

							// if ($scope.totalItems > $scope.itemsPerPage && $scope.totalItems != null) {
							// 	$scope.pagination = true;
							// }
							// //---pagination end--

						}
						else{
							$scope.schoolFeeWrapper=[];
						}
						// else if (result.validSession == false) {
						// 	messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						// }
						// else {
						// 	messageFactory(appConstants.SYSTEM_NORECORDS);
						// }
					}

					// else {
					// 	messageFactory(appConstants.SYSTEM_NORESPONSE);
					// }

				}
				// else {
				// 	messageFactory(appConstants.SYSTEM_ERROR);
				// }

				$rootScope.loading = false;

				deferred.resolve($scope.schoolFeeWrapper);

			});

			return deferred.promise;
			//--------------END--------------------
		}



		$scope.datepickers = {
			paymentDate: false

		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};



		// //-----------------Fee history tab ------------


		//  //----------------


	
 
		//  dt_fee.options = DTOptionsBuilder
		// 	 .fromFnPromise(function () { return $scope.searchData() }) //call from search button
		// 	 .withDOM('Blrtip')
		// 	 .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
		// 		 <"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
		// 	 .withBootstrap()
		// 	 .withLanguage({
		// 		 paginate: {
		// 			 previous: "&laquo;",
		// 			 next: "&raquo;",
		// 		 },
		// 		 search: "_INPUT_",
		// 		 searchPlaceholder: "Search…"
		// 	 })
		// 	//  .withOption("order", [
		// 	// 	 [2, "desc"]
		// 	//  ])
		// 	 .withOption("responsive", true)
		// 	 .withPaginationType('full_numbers')
		// 	 .withOption('createdRow', createdRow)
		// 	 .withOption('headerCallback',headerCallback);
			 
		//  dt_fee.columns = [
		// 	 DTColumnBuilder.newColumn("academicYearIDValue").withTitle("Academic Year").withOption('defaultContent', '-'),
		// 	 DTColumnBuilder.newColumn("studentID").withTitle("ID").withOption('defaultContent', '-'),
		// 	//  DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
		// 	 DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
		// 	 DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
		// 	 DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-'),
		// 	 DTColumnBuilder.newColumn("subjectIDValue").withTitle("Subject").withOption('defaultContent', '-'),
		// 	 DTColumnBuilder.newColumn("feeTypeValue").withTitle("Fee Type").withOption('defaultContent', '-'),
		// 	 DTColumnBuilder.newColumn("feeAmount").withTitle("Amount").withOption('defaultContent', '-'),
		
		//  ];
 
		 
		//  function createdRow(row, data, dataIndex) {
		// 	 // Recompiling so we can bind Angular directive to the DT
		// 	 $compile(angular.element(row).contents())($scope);
		//  }
 
		//  function headerCallback(header) {
		// 	 if (!dt_fee.headerCompiled) {
		// 		 // Use this headerCompiled field to only compile header once
		// 		 dt_fee.headerCompiled = true;
		// 		 $compile(angular.element(header).contents())($scope);
		// 	 }
		//  }
 
		//  function actionsHtml(data, type, full, meta) {
		// 	  var id_data = data;
		// 	  id_data["id"]=meta.row;  //add id element
		// 	 // console.log('actionsHtml: ' + JSON.stringify( id_data));
		// 	 dt_fee.infos[id_data.id] = data;
		// 	 return '<div class="text-center">'  +
		// 			'<span class="icon icon-edit text-primary" style="cursor: pointer;" ng-click="dt_fee.edit(dt_fee.infos['+id_data.id+'])"></span></div>'
		//  }
 
 
		//  function edit(info) {
		// 	 // console.log('You are trying to edit the row: ' + JSON.stringify(info));
		// 	 // $scope.wrapper.academicYearID=info.academicYearID;
		// 	 // $scope.wrapper.gradeID=info.gradeID;
		// 	 // $scope.wrapper.sectionID=info.sectionID;
		// 	 // $scope.wrapper.termID=info.termID;
		// 	 // $scope.wrapper.subjectID=info.subjectID;
 
		// 	//  var passInfo =[info.refNo, info.studentID, info.gradeID, info.sectionID, 
		// 	// 	 info.subjectID, info.termID, info.studentName];
		// 	 //$ctrl.openModal('sm', '', passInfo);
		//  }
 
		//  $ctrl.openModal = function (size, parentSelector, passInfo) {
		// 	 var parentElem = parentSelector ?
		// 		 angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
		// 	 var modalInstance = $uibModal.open({
		// 		 animation: true,
		// 		 ariaLabelledBy: 'modal-title',
		// 		 ariaDescribedBy: 'modal-body',
		// 		 templateUrl: 'views/student/student-academics.html',
		// 		 controller: 'studentAcademicsController',
		// 		 controllerAs: '$ctrl',
		// 		 size: size,
		// 		 scope: $scope,
		// 		 appendTo: parentElem,
		// 		 keyboard: false,
		// 		 resolve: {
		// 			 passInfo: function () {
		// 				 return passInfo;
		// 			 }
			   
		// 		 }
		// 	 });
 
		// 	 modalInstance.result.then(function (selectedItem) {
		// 		 $ctrl.selected = selectedItem;
		// 		 console.log('$ctrl.selected: ' + $ctrl.selected);
		// 		 $scope.dtSearch();
		// 	 }, function () {
		// 		 console.log('Modal dismissed at: ' + new Date());
		// 	 });
		//  };


		 //-------end of fee history tab -----



		// //--------START btnBack function-----------
		// $scope.btnBack = function () {

		// 	$location.path('/queue');
		// }
		// //--------ends btnBack function----------- 




		// $scope.setRowData = function (invoiceNo, studentID, academicYearID, gradeID, sectionID, feeType, feeAmount, paymentDate) {
		// 	$scope.editableOption = true;

		// 	$scope.wrapper.invoiceNo = '';
		// 	$scope.wrapper.studentID = '';
		// 	$scope.wrapper.academicYearID = '';
		// 	$scope.wrapper.gradeID = '';
		// 	$scope.wrapper.sectionID = '';

		// 	$scope.wrapper.feeType = '';
		// 	$scope.wrapper.feeAmount = '';
		// 	$scope.wrapper.paymentDate = '';


		// 	// alert('code '+ code + 'desc '+description +'filter ='+filter);
		// 	$scope.wrapper.invoiceNo = invoiceNo;
		// 	$scope.wrapper.studentID = studentID;
		// 	$scope.wrapper.academicYearID = academicYearID;
		// 	$scope.wrapper.gradeID = gradeID;
		// 	$scope.wrapper.sectionID = sectionID;

		// 	$scope.wrapper.feeType = feeType;
		// 	$scope.wrapper.feeAmount = feeAmount;
		// 	$scope.wrapper.paymentDate = paymentDate;
		// };





		// $scope.clear = function () {

		// 	$scope.editableOption = false;

		// 	$scope.submitted = false;


		// 	/*  $scope.wrapper.code='';
		// 		$scope.wrapper.description='';
		// 		$scope.wrapper.filterName='';*/

		// 	/*  $scope.wrapper.studentID= '';
		// 	$scope.wrapper.academicYearID= '';
		// 	$scope.wrapper.gradeID= '';
		// 	$scope.wrapper.sectionID= '';
		// 	*/

		// 	$scope.wrapper.feeType = '';
		// 	$scope.wrapper.feeAmount = '';
		// 	$scope.wrapper.paymentDate = '';

		// 	/*  $scope.form.academicYearID.$invalid=true;
		// 		$scope.form.academicYearID.$dirty=false;
		// 		$scope.form.gradeID.$invalid=true;
		// 		$scope.form.gradeID.$dirty=false;
		// 		$scope.form.sectionID.$invalid=true;
		// 		$scope.form.sectionID.$dirty=false;*/

		// }

	}]);

})();









