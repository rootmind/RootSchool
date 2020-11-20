(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('studentMessageController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.menuName = sharedProperties.getMenuName();

		$scope.academicYearIDValue = sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue = sharedProperties.getGradeIDValue();
		$scope.sectionIDValue = sharedProperties.getSectionIDValue();

		$scope.wrapper = [];
		$scope.studentMessageWrapper=[];


		$scope.editableOption = true;
		$scope.codeDisabled = true;

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
			refNo: $ctrl.passInfo[0], studentID: $ctrl.passInfo[1],
			studentName: $ctrl.passInfo[2], mode: $ctrl.passInfo[3]
			

		};

		//console.log ('item ' + $ctrl.selected.studentID);
		$scope.wrapper.studentID = $ctrl.selected.studentID;
		$scope.wrapper.studentName = $ctrl.selected.studentName;
		$scope.actionMode = $ctrl.selected.mode;

		sharedProperties.setStudentID($ctrl.selected.studentID);
		

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

			//  if(sharedProperties.getActionMode()=='UPDATE'){


			methodAction = "fetchStudentMessage";

			message = {
				"studentID": sharedProperties.getStudentID()   //$scope.wrapper.studentID
			};

			$rootScope.loading = true;

			console.log('loadData ' + JSON.stringify(message));

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchStudentMessage;

					if (value.success == true) {

						if (result.validSession == true && result.studentMessageWrapper[0].recordFound == true) {
							$scope.studentMessageWrapper = result.studentMessageWrapper;

							console.log('studentMessageWrapper ' + JSON.stringify($scope.studentMessageWrapper));


						}
						// else if(result.validSession==false)
						// {
						// 		messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						// }

						// else{
						// 		messageFactory(appConstants.SYSTEM_NORECORDS);
						// }
					}

					// else{
					// 		messageFactory(appConstants.SYSTEM_NORESPONSE);
					// }

				}
				// else{
				// 	messageFactory(appConstants.SYSTEM_ERROR);
				// }

				$rootScope.loading = false;

				deferred.resolve($scope.studentMessageWrapper);
			});

			return deferred.promise;
			//}	

		}   //------------------- ends loadData Function-----------------       





		//--------------start saveData Function-----------------

		$scope.saveData = function () {

			//alertsManager.clearAlerts();

			$scope.submitted = true;


			//console.log($scope.loginForm1.$valid + '='  + $scope.wrapper.messageID + '-' + $scope.wrapper.message);


			if ($scope.loginForm.$valid) {


				// if (sharedProperties.getActionMode() == 'UPDATE') {

				// 	methodAction = "updateStudentMessage";

				// }
				// else {

					methodAction = "updateStudentMessage";
				//}



				message = {

					//"refNo": $scope.wrapper.refNo,
					"studentID": $scope.wrapper.studentID,
					"messageID": $scope.wrapper.messageID,
					"message": $scope.wrapper.message
					//"messageDateTime" : $scope.wrapper.messageDateTime,
					//"delivered": $scope.wrapper.delivered,
					//"recordStatus" : sharedProperties.getRecordStatus()

				};

				console.log('savedata ' + JSON.stringify(message));


				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {

						// if (sharedProperties.getActionMode() == 'UPDATE') {

						// 	result = value.updateStudentMessage;

						// }
						// else {

							result = value.updateStudentMessage;

						//}


						if (value.success == true) {


							if (result.validSession == true && result.studentMessageWrapper[0].recordFound == true) {

								//sharedProperties.setActionMode('UPDATE');

								messageFactory('Message sent');
								$ctrl.ok();

							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {

								for (var i = 0; i < result.errorWrapper.length; i++) {

									$scope.error = result.errorWrapper[i].errorDesc;
									alertsManager.addAlert($scope.error, 'alert-error');
									$scope.alerts = alertsManager.alerts;

								}

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


		// $scope.nextPage=function(){ 

		//   		//$rootScope.selectedIndex = 1;
		// 		//$location.path('/' + 'identification');

		// }



		// //--------START btnBack function-----------
		//   $scope.btnBack=function(){
		// 		//$location.path('/queue');
		//    }
		// //--------ends btnBack function----------- 
	}]);

})();









