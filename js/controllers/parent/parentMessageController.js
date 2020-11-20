(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('parentMessageController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];
		$scope.parentMessageWrapper = [];



		/*$scope.menuName= sharedProperties.getMenuName();*/

		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		$scope.actionMode=sharedProperties.getActionMode();*/

		//$scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		//$scope.gradeIDValue= sharedProperties.getGradeIDValue();
		//$scope.sectionIDValue= sharedProperties.getSectionIDValue();



		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			studentID: $ctrl.passInfo[0], mode: $ctrl.passInfo[1]
		};

		$scope.wrapper.studentID = sharedProperties.getStudentID();
		$scope.wrapper.studentName = sharedProperties.getStudentName();


		//if ($ctrl.selected.mode == "UPDATE") {
			$scope.codeDisabled = true;
		//}
		//else {
		//	$scope.codeDisabled = false;
		//}


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

			methodAction = "fetchParentMessage";

			message = {



			};

			$rootScope.loading = true;

			console.log("fetchParentMessage "+JSON.stringify(message));

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchParentMessage;

					console.log("fetchParentMessage Data "+JSON.stringify(result));


					if (value.success == true) {

						if (result.validSession == true && result.parentMessageWrapper[0].recordFound == true) {
							$scope.wrapper = result.parentMessageWrapper;


							//--pagination--

							//  $scope.totalItems = result.parentMessageWrapper.length;

							//  $scope.currentPage = 1;
							//  $scope.itemsPerPage =5;
							//  $scope.maxSize = 5; //Number of pager buttons to show

							//   if($scope.totalItems >  $scope.itemsPerPage && $scope.totalItems != null)
							//   {
							// 	$scope.pagination=true;
							//   }
							//---pagination end--

						}
					}

				}

				$rootScope.loading = false;

				deferred.resolve($scope.wrapper);

			});

			return deferred.promise;


		}   //------------------- ends loadData Function-----------------       



		//--------------start saveData_M Function---Parent message from mobile--------------

		$scope.saveData = function () {


			//messageFactory(userGroup);

			if ($scope.loginForm.$valid) {

				methodAction = "insertParentMessage";

				message = {

					"academicYearID": sharedProperties.getAcademicYearID(),
					"refNo": sharedProperties.getRefNo(),
					"studentID": sharedProperties.getStudentID(),
					"gradeID": sharedProperties.getGradeID(),
					"sectionID": sharedProperties.getSectionID(),
					"message": $scope.wrapper.message,
					"userGroup": $rootScope.userGroup  //'STAFF'
				};

				console.log("save message", JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {

						result = value.insertParentMessage;

						if (value.success == true) {

							if (result.validSession == true && result.parentMessageWrapper[0].recordFound == true) {

								console.log('parentMessageWrapper ' + JSON.stringify(result.parentMessageWrapper));

								//$scope.fetchParentMessage_M();
								messageFactory(appConstants.RECORD_UPDATED);
								$ctrl.ok();

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
					$rootScope.loading = false;
					$scope.buttonDisabled = false;
				});
			}
			// else {
			// 	//return ;
			// }


		}  //------------ends saveData_M Function-------------


		//--------------start fetchParentMessage Function- for mobile----------------

		$scope.fetchParentMessage_M = function () {



			methodAction = "fetchParentMessage";

			message = {

				"academicYearID": sharedProperties.getAcademicYearID(),
				"refNo": sharedProperties.getRefNo(),
				"studentID": sharedProperties.getStudentID(),
				"gradeID": sharedProperties.getGradeID(),
				"sectionID": sharedProperties.getSectionID()
			};

			//Android.openDialog("save message",JSON.stringify(message));


			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				//Android.openDialog("value",JSON.stringify(value));
				if (value != null) {

					result = value.fetchParentMessage;

					if (value.success == true) {

						if (result.validSession == true && result.parentMessageWrapper[0].recordFound == true) {
							$scope.messageWrapper = result.parentMessageWrapper;

							//Android.openDialog("$scope.wrapper",JSON.stringify($scope.messageWrapper));

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



		}  //------------ends fetchParentMessage Function-------------


		$scope.toggleExpandView = function ($index) {
			//$scope.isVisible = $scope.isVisible == 0 ? true : false;

			$scope.activePosition = $scope.activePosition == $index ? -1 : $index;

		};

		//--------------start saveData Function--reply to parent from web---------------

		$scope.replyParentMessage = function (academicYearID, refNo, studentID, gradeID, sectionID, userGroup) {


			//messageFactory(academicYearID+" "+refNo+" "+studentID+" "+gradeID+" "+sectionID+" "+userGroup);

			if (document.getElementById("message").value != "") {


				methodAction = "insertParentMessage";

				message = {

					"academicYearID": academicYearID,
					"refNo": refNo,
					"studentID": studentID,
					"gradeID": gradeID,
					"sectionID": sectionID,
					"message": $scope.messageWrapper.message,
					"userGroup": userGroup //'STAFF'
				};

				//alert("save message"+JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {

						result = value.insertParentMessage;

						if (value.success == true) {

							if (result.validSession == true && result.parentMessageWrapper[0].recordFound == true) {
								$scope.loadData();
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
					$scope.messageWrapper.message = '';
					$rootScope.loading = false;
					$scope.buttonDisabled = false;
				});
			}
			else {
				messageFactory("Please enter message ");
			}


		}  //------------ends saveData Function-------------


		//--------START btnBack function-----------
		$scope.btnBack = function () {
			$location.path('/dashBoard');
		}
		//--------ends btnBack function----------- 

	}]);

})();









