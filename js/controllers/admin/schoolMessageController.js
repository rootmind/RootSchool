(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('schoolMessageController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];
		$scope.schoolMessageWrapper = [];

		$scope.menuName = sharedProperties.getMenuName();


		// $scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		// $scope.gradeIDValue= sharedProperties.getGradeIDValue();
		// $scope.sectionIDValue= sharedProperties.getSectionIDValue();

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
			messageID: $ctrl.passInfo[0], mode: $ctrl.passInfo[1]
		};

		$scope.wrapper.messageID = $ctrl.selected.messageID;
		//$scope.wrapper.studentName = sharedProperties.getStudentName();


		if ($ctrl.selected.mode == "UPDATE") {
			$scope.codeDisabled = true;

		}
		else {
			$scope.codeDisabled = false;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.messageID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------

		//------------start loadData Function----------------


		// $scope.loadData=function(){



		// 	methodAction="fetchMultiPopoverData";

		// 	message=[

		// 	             {
		// 					 "tableName" : "MST_Grade",
		// 				 	 "filter" : ""    		
		// 			     }


		// 			];

		// 		    $rootScope.loading=true;

		// 			jsonData=connectHostFactory(methodAction,message);
		// 			jsonData.returnData(function(value){

		// 					//alert('Popover Data='+JSON.stringify(value));

		// 					if(value != null){



		// 								result=value.fetchMultiPopoverData;

		// 								if(value.success == true){
		// 									if(result.validSession==true)
		// 									{
		// 									$scope.popoverWrapper=result.popoverWrapper;
		// 									//alert('popoverWrapper '+JSON.stringify($scope.popoverWrapper));
		// 									}
		// 									else 
		// 									{
		// 											messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 									}
		// 								}
		// 								else{

		// 									messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 								}

		// 					}
		// 					else{

		// 						messageFactory(appConstants.SYSTEM_ERROR);

		// 					}

		// 					$rootScope.loading=false;

		// 				});





		//  }   //------------------- ends loadData Function-----------------       




		//--------------start saveData Function-----------------

		$scope.saveData = function () {


			$scope.submitted = true;

			if ($scope.loginForm.$valid) {



				if (sharedProperties.getActionMode() == 'UPDATE') {

					methodAction = "updateSchoolMessage";

				}
				else
				{

					methodAction = "insertSchoolMessage";

				}

				message = {

					"messageID": $scope.wrapper.messageID,
					"message": $scope.wrapper.message,
					"gradeList": $scope.wrapper.gradeID,
					"delivered": 'N'

				};
				//alert('message '+JSON.stringify(message));
				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {


						if (sharedProperties.getActionMode() == 'UPDATE') {

							result = value.updateSchoolMessage;

						}
						else
						{
							result = value.insertSchoolMessage;
						}

						if (value.success == true) {


							if (result.validSession == true && result.schoolMessageWrapper[0].recordFound == true) {

								// $scope.submitted = false; // when fetchSchoolMessage call grade and message fields not required to enter it

								// $scope.form.gradeID.$invalid=true;
								// $scope.form.gradeID.$dirty=false;
								// $scope.form.message.$invalid=true;
								// $scope.form.message.$dirty=false;

								messageFactory(appConstants.RECORD_UPDATED);
								$ctrl.ok();

								//$scope.fetchSchoolMessage(); 

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

		$scope.loadData = function () {


			if (sharedProperties.getActionMode() == 'UPDATE') {

				$scope.fetchSchoolMessage();

			}

		}


		//------------start fetchSchoolMessage Function----------------

		$scope.fetchSchoolMessage = function () {


			var deferred = $q.defer();

			methodAction = "fetchSchoolMessage";

			message = {
				"messageID": $scope.wrapper.messageID
			};


			$rootScope.loading = true;

			console.log('message:' + JSON.stringify(message));


			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchSchoolMessage;

					console.log('result:' + JSON.stringify(result));

					if (value.success == true) {

						if (result.validSession == true && result.schoolMessageWrapper[0].recordFound == true) {


							$scope.wrapper = result.schoolMessageWrapper[0];

							console.log('$scope.wrapper:'+JSON.stringify($scope.wrapper));

							//--pagination--

							// $scope.totalItems = result.schoolMessageWrapper.length;
							// $scope.currentPage = 1;
							// $scope.itemsPerPage = 5;
							// $scope.maxSize = 5; //Number of pager buttons to show


							// if ($scope.totalItems > $scope.itemsPerPage && $scope.totalItems != null) {
							// 	$scope.pagination = true;

							// }
							//---pagination end--
						}
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
				deferred.resolve($scope.wrapper);
			});

			return deferred.promise;

		}   //------------------- ends fetchSchoolMessage Function-----------------       





		// //---------- back button---------
		// $scope.btnBack = function () {

		// 	$location.path('/dashBoard');
		// }

		// //----------end -back button----------



	}]);

})();









