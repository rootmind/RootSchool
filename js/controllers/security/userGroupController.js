(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('userGroupController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'messageFactory', 'appConstants', '$filter', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, messageFactory, appConstants, $filter, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		var recordStatus = null;
		$scope.searchWrapper = [];
		$scope.wrapper=[];

		$scope.menuName = sharedProperties.getMenuName();
		//$scope.userEntitleID = sharedProperties.getUserEntitleID();


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			userid: $ctrl.passInfo[0], groupID: $ctrl.passInfo[1], assignFlag: $ctrl.passInfo[2],
			mode: $ctrl.passInfo[3] 
		};


		console.log('item ' + $ctrl.selected.code);

		$scope.codeDisabled=false;

		if(sharedProperties.getActionMode()=='UPDATE')
		{
			$scope.wrapper.userid = $ctrl.selected.userid;
			$scope.wrapper.groupID = $ctrl.selected.groupID;
			$scope.wrapper.assignFlag = $ctrl.selected.assignFlag;

			$scope.codeDisabled=true;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.userid);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------



		//--onLoad page function calls
		$scope.loadData = function () {

			var deferred = $q.defer();

			methodAction = "fetchMultiPopoverData";

			message = [
				{
					"tableName": "TeachersProfile",
					"filter": ""
				},

				{
					"tableName": "MST_UserGroup",
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

			// var deferred = $q.defer();

			// //alert('alert-1');
			// methodAction = "fetchUserGroupList";

			// message = {
			// 	"userid": $scope.wrapper.userid			//sharedProperties.getUserEntitleID() //sharedProperties.getSurveyorID()

			// };

			// //alert('message  Data= '+JSON.stringify(message));
			// $scope.buttonDisabled = true;
			// $rootScope.loading = true;

			// jsonData = connectHostFactory(methodAction, message);
			// jsonData.returnData(function (value) {



			// 	$scope.pagination = false;

			// 	//alert('fetchUserGroupList value= '+JSON.stringify(value));
			// 	if (value != null) {

			// 		result = value.fetchUserGroupList;

			// 		if (value.success == true) {

			// 			if (result.userGroupWrapper[0].recordFound == true) //result.validSession==true &&
			// 			{
			// 				$scope.wrapper = result.userGroupWrapper;
			// 				// $scope.searchWrapper=$scope.wrapper;
			// 				//  //--pagination--

			// 				//  $scope.totalItems = result.userGroupWrapper.length;
			// 				//  $scope.currentPage = 1;
			// 				// 	 $scope.itemsPerPage =5;
			// 				// 	 $scope.maxSize = 5; //Number of pager buttons to show


			// 				// 	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
			// 				// 	  {
			// 				// 		$scope.pagination=true;

			// 				// 	  }
			// 				// 	  //---pagination end--

			// 			}
			// 			else if (result.validSession == false) {
			// 				messageFactory(appConstants.SYSTEM_INVALIDSESSION);
			// 			}
			// 			else {

			// 				$scope.wrapper = '';

			// 				messageFactory(appConstants.SYSTEM_NORECORDS);

			// 			}
			// 		}
			// 		else {
			// 			//messageFactory('No response from host system');
			// 			messageFactory(appConstants.SYSTEM_NORECORDS);

			// 		}
			// 	}
			// 	else {
			// 		//messageFactory('Error encountered,Please contact system administrator');
			// 		messageFactory(appConstants.SYSTEM_ERROR);
			// 	}
			// 	$rootScope.loading = false;
			// 	$scope.buttonDisabled = false;

			// 	deferred.resolve($scope.wrapper);


			// });


			// return deferred.promise;


		}



		//------save data----------


		$scope.saveData = function () {

			//alert(' alert-1 ');

			if ($scope.loginForm.$valid) {

				methodAction = "updateUserGroupList";

				var message=[];

				message.push({

						"userid": $scope.wrapper.userid,
						"groupID": $scope.wrapper.groupID,              //sharedProperties.getSurveyorID(),			//$scope.wrapper[i].eventID
						"assignFlag": $scope.wrapper.assignFlag
			
					});

				console.log(' updateHostel message '+JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {


						result = value.updateUserGroupList;

						console.log(' updateUserGroupList result '+JSON.stringify(result));


						if (value.success == true) {


							if (result.recordFound == true)//result.validSession==true && 
							{

								messageFactory(appConstants.RECORD_UPDATED);
								$ctrl.ok();



								$scope.buttonDisabled = false;

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

					//$scope.editBtnEnable=false;
				});

			}

		};



		// //--------table end-------------

		// $scope.$watch('searchMenuList', function (val) {
		// 	$scope.wrapper = $filter('filter')($scope.searchWrapper, val);
		// });




		// //-----pagenation end--

		// //---------- back button---------
		// $scope.btnBack = function (param) {
		// 	if (param == 'dashBoard') {
		// 		$rootScope.isDashboard = true;
		// 	}

		// 	$location.path('/' + param);
		// }

		// //----------end -back button----------


	}]);

})();