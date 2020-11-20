(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('studentDiaryController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, messageFactory, appConstants, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];
		$scope.editableOption = false;

		$scope.menuName = sharedProperties.getMenuName();

		$scope.academicYearIDValue = sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue = sharedProperties.getGradeIDValue();
		$scope.sectionIDValue = sharedProperties.getSectionIDValue();

		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		$scope.actionMode=sharedProperties.getActionMode();*/

		//$rootScope.isTabBarDisable=true;


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			gradeID: $ctrl.passInfo[0], sectionID: $ctrl.passInfo[1], subjectID: $ctrl.passInfo[2],
			diaryDate: $ctrl.passInfo[3], messageID: $ctrl.passInfo[4], mode: $ctrl.passInfo[5]
		};

		//console.log('item ' + $ctrl.selected.gradeID);

		$scope.wrapper.gradeID = $ctrl.selected.gradeID;
		$scope.wrapper.subjectID = $ctrl.selected.subjectID;
		$scope.wrapper.messageID = $ctrl.selected.messageID;

		$scope.wrapper.diaryDate = new Date();

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.gradeID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------


		if($ctrl.selected.mode=="UPDATE")
		{
			$scope.codeDisabled=true;
		}
		else
		{
			$scope.codeDisabled=false;
		}


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
						}
					}
				}

				$rootScope.loading = false;
				deferred.resolve($scope.popoverWrapper);
			});

			//------single student access--

			if (sharedProperties.getActionMode() == 'UPDATE') {
				// $scope.editableOption = true;
				// $scope.wrapper.gradeID = sharedProperties.getGradeID();
				// $scope.wrapper.sectionID = sharedProperties.getSectionID();
				$scope.fetchStudentDiary();

			}

			return deferred.promise;
		}   //------------------- ends loadData Function-----------------       





		//--------------start saveData Function-----------------

		$scope.saveData = function () {

			//alert(" saveData call ");
			$scope.submitted = true;

			if ($scope.loginForm.$valid) {


				methodAction = "updateStudentDiary";


				message = {

					"gradeID": $scope.wrapper.gradeID,
					"sectionID": $scope.wrapper.sectionID,
					"subjectID": $scope.wrapper.subjectID,
					"diaryDate": commonControls.dateFormat($scope.wrapper.diaryDate),
					"message": $scope.wrapper.message,
					"messageID": $scope.wrapper.messageID,
					"delivered": 'N',
					"studentID": "", //sharedProperties.getStudentID(),
					"refNo": "",//sharedProperties.getRefNo()

				};

				console.log(JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {



						result = value.updateStudentDiary;


						console.log(" updateStudentDiaryvalue result = " + JSON.stringify(result));
						if (value.success == true) {

							//alert(" value.success is true ");

							console.log(" updateStudentDiaryvalue = " + JSON.stringify(value));

							if (result.validSession == true && result.studentDiaryWrapper[0].recordFound == true) {
								//alert("  result.studentDiaryWrapper[0].recordFound is true ");

								messageFactory(appConstants.RECORD_UPDATED);
								$ctrl.ok();
								//$scope.fetchStudentDiary();


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


		//------------start fetchStudentDiary Function-------------
		$scope.fetchStudentDiary = function () {

			//alert(" fetchStudentDiary call ");

			$scope.fetchSubmitted = true;


			//if ($scope.form.gradeID.$valid && $scope.form.sectionID.$valid) {

				methodAction = "fetchStudentDiary";

				message = {
					"gradeID": $scope.wrapper.gradeID,
					"sectionID": $scope.wrapper.sectionID,
					"subjectID": $scope.wrapper.subjectID,
					"diaryDate": commonControls.dateFormatYYYYMMDD($scope.wrapper.diaryDate),
					"studentID": "", //sharedProperties.getStudentID()
					"messageID": $scope.wrapper.messageID


				};

				console.log("fetchStudentDiary message = "+JSON.stringify(message));

				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);

				jsonData.returnData(function (value) {

					if (value != null) {

						result = value.fetchStudentDiary;

						console.log("fetchStudentDiary value="+JSON.stringify(value));


						if (value.success == true) {

							console.log("fetchStudentDiary result="+JSON.stringify(result));

							//document.writeln("value = "+JSON.stringify(value));

							if (result.validSession == true && result.studentDiaryWrapper[0].recordFound == true) {
								//alert("success");

								$scope.wrapper = result.studentDiaryWrapper[0];

								$scope.wrapper.diaryDate = commonControls.setDateFormat(result.studentDiaryWrapper[0].diaryDate);

								// if ($scope.wrapper.diaryDate != null && $scope.wrapper.diaryDate.length >= 10) {

								// 	var YYYY = $scope.wrapper.diaryDate.substring(6);
								// 	var MM = $scope.wrapper.diaryDate.substring(3, 5);
								// 	var DD = $scope.wrapper.diaryDate.substring(0, 2);

								// 	$scope.wrapper.diaryDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

								// }

								//--pagination--

								//  $scope.totalItems = result.studentDiaryWrapper.length;
								//  $scope.currentPage = 1;
								// 	 $scope.itemsPerPage =5;
								// 	 $scope.maxSize = 5; //Number of pager buttons to show


								// 	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
								// 	  {
								// 		$scope.pagination=true;

								// 	  }
								//---pagination end--
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
				});

			//}


		}
		//------------ends fetchStudentDiary Function-------------	


		//------------start fetchStudentDiary_M Function-------------
		$scope.fetchStudentDiary_M = function () {



			methodAction = "fetchStudentDiary";

			message = {
				"gradeID": sharedProperties.getGradeID(),
				"sectionID": sharedProperties.getSectionID(),
				"studentID": sharedProperties.getStudentID()

			};

			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchStudentDiary;

					if (value.success == true) {

						if (result.validSession == true && result.studentDiaryWrapper[0].recordFound == true) {


							$scope.wrapper = result.studentDiaryWrapper;


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
			});




		}
		//------------ends fetchStudentDiary_M Function-------------	






		// $scope.setRowData = function(diaryDate,messageID,subjectID,message) {

		// 	  $scope.wrapper.diaryDate = '';
		// 	  $scope.wrapper.messageID = '';
		// 	  $scope.wrapper.subjectID = '';
		// 	  $scope.wrapper.message = '';


		// 	 // alert('code '+ code + 'desc '+description +'filter ='+filter);

		// 	  $scope.wrapper.diaryDate= diaryDate;
		// 	  $scope.wrapper.messageID = messageID;
		// 	  $scope.wrapper.subjectID=subjectID;
		// 	  $scope.wrapper.message= message;

		//   };




		$scope.datepickers = {
			diaryDate: false

		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};




		/*$scope.nextPage=function(){ 
				
					//$rootScope.selectedIndex = 1;
				//$location.path('/' + 'identification');
				
		}
				*/

		// //---------- back button---------
		// $scope.btnBack = function () {

		// 	if (sharedProperties.getActionMode() == 'UPDATE') {

		// 		$location.path('/queue');
		// 	}
		// 	else {
		// 		$location.path('/dashBoard');
		// 	}


		// }

		//----------end -back button----------
	}]);

})();









