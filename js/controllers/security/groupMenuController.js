(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('groupMenuController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager',  'messageFactory', 'appConstants',  '$q',  '$uibModalInstance','passInfo',  function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager,  messageFactory, appConstants, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		$scope.groupMenuWrapper = [];



		//$scope.staffUserID= sharedProperties.userid();
		$scope.menuIDValue = sharedProperties.getMenuIDValue();

		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			groupID: $ctrl.passInfo[0], menuID:$ctrl.passInfo[1], assignFlag:$ctrl.passInfo[2],
			mode: $ctrl.passInfo[3] 
		};

		//console.log ('item ' + $ctrl.selected.userID);

		// $scope.wrapper.userid = $ctrl.selected.userID;
		// $scope.wrapper.menuID = $ctrl.selected.menuID;

		$scope.codeDisabled=false;

		if(sharedProperties.getActionMode()=='UPDATE')
		{
			$scope.wrapper.groupID = $ctrl.selected.groupID;
			$scope.wrapper.menuID = $ctrl.selected.menuID;
			$scope.wrapper.assignFlag = $ctrl.selected.assignFlag;

			$scope.codeDisabled=true;
		}

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.groupID);
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
					"tableName": "MST_UserGroup",
					"filter": ""
				},

				{
					"tableName": "MST_Menu",
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
		
		//--------------start saveData Function-----------------

		$scope.saveData = function () {


			$scope.submitted = true;

			if ($scope.loginForm.$valid) {


			


					methodAction = "updateGroupMenu";

					message = {


						"groupID": $scope.wrapper.groupID,
                        "menuID": $scope.wrapper.menuID,
                        "assignFlag": $scope.wrapper.assignFlag,
						"deleteFlag": "" //--'Y' or 'N'

					};

					console.log('message = '+JSON.stringify(message));	
					$scope.buttonDisabled = true;
					$rootScope.loading = true;

					jsonData = connectHostFactory(methodAction, message);
					jsonData.returnData(function (value) {


						if (value != null) {


							result = value.updateGroupMenu;

							console.log('Value personal Data= '+JSON.stringify(result));


							if (value.success == true) {




								if (result.validSession == true && result.groupMenuWrapper[0].recordFound == true) {



									// if (deleteFlag == 'Y') {
									// 	messageFactory(appConstants.RECORD_DELETED);
									// }
									// else {
										messageFactory(appConstants.RECORD_UPDATED);
										$ctrl.ok();
									// }

									//$scope.clear();

									//$scope.fetchUserMenu();

									//alert(JSON.stringify(result));


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



			}//----if form validation




		}  //------------ends saveData Function-------------


		

		// alert('test8');

		// $scope.searchData = function(){


		// }

		// alert('test9');







		// $scope.setRowData = function (staffUserID, menuID) {


		// 	//alert('selected data '+staffUserID +' '+menuID);
		// 	$scope.wrapper.deleteEnable = false;

		// 	$scope.wrapper.staffUserID = '';

		// 	$scope.wrapper.menuID = '';

		// 	$scope.wrapper.staffUserID = staffUserID;

		// 	$scope.wrapper.menuID = menuID;

		// 	//alert('selected end ');

		// };

		// $scope.clear = function () {


		// 	$scope.submitted = false;

		// 	$scope.wrapper.staffUserID = '';
		// 	$scope.wrapper.menuID = '';


		// 	$scope.form.staffUserID.$invalid = true;
		// 	$scope.form.staffUserID.$dirty = false;
		// 	$scope.form.menuID.$invalid = true;
		// 	$scope.form.menuID.$dirty = false;


		// }











		/*$scope.nextPage=function(){ 
				
					//$rootScope.selectedIndex = 1;
				//$location.path('/' + 'identification');
				
		}*/



		// //--------START btnBack function-----------
		// $scope.btnBack = function () {
		// 	$location.path('/dashBoard');
		// }
		// //--------ends btnBack function----------- 

	}]);



})();
