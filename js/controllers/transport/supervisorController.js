(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('supervisorController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'appConstants', 'messageFactory', '$filter', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, appConstants, messageFactory, $filter, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		var popoverWrapperLength = null;

		var masterTableName = null;
		var masterFilter = null;

		$scope.wrapper = [];

		$scope.menuName = sharedProperties.getMenuName();

		// $scope.disableSpace=function(event){  
		// 	//alert('alert-1'+event);
		// 	if (event.keyCode == 32) {
		//             event.returnValue = false;
		//             return false;
		//         }
		// }


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			code: $ctrl.passInfo[0], desc: $ctrl.passInfo[1], mobileNo: $ctrl.passInfo[2], 
			email: $ctrl.passInfo[3], photoID: $ctrl.passInfo[4], 
			mode: $ctrl.passInfo[5] 
		};


		console.log('item ' + $ctrl.selected.code);

		$scope.codeDisabled=false;

		if(sharedProperties.getActionMode()=='UPDATE')
		{
			$scope.wrapper.code = $ctrl.selected.code;
			$scope.wrapper.desc = $ctrl.selected.desc;
			$scope.wrapper.mobileNo = $ctrl.selected.mobileNo;
			$scope.wrapper.email = $ctrl.selected.email;
			$scope.wrapper.photoID = $ctrl.selected.photoID;

			$scope.codeDisabled=true;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.code);
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
					"tableName": "MST_Supervisor",
					"filter": ""
				},
				{
					"tableName": "MST_UserGroup",
					"filter": ""
				}

			];


			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				//alert('value '+JSON.stringify(value));
				if (value != null) {

					result = value.fetchMultiPopoverData;

					//alert('result '+result);

					if (value.success == true) {

						if (result.validSession == true && result.popoverWrapper[0].recordFound == true) {

							$scope.popoverWrapper = result.popoverWrapper;
							deferred.resolve($scope.popoverWrapper);


							//$scope.fetchHostel();
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
				$scope.buttonDisabled = false;

			});

			return deferred.promise;


		}
		//------------ends loadData Function----------------



		//---------- Start fetch Hostel Function------------------

		// $scope.fetchHostel = function (tableName) {                                               // getTableData Function


		// 	methodAction = "fetchHostel";


		// 	message = {


		// 		"code": ''	//hostelID

		// 	};


		// 	//alert('Master message= '+JSON.stringify(message));
		// 	$scope.buttonDisabled = true;
		// 	$rootScope.loading = true;

		// 	jsonData = connectHostFactory(methodAction, message);
		// 	jsonData.returnData(function (value) {

		// 		$rootScope.loading = false;

		// 		//alert('Master Popover value Data= '+JSON.stringify(value));

		// 		result = value.fetchHostel;

		// 		if (value.success == true) {

		// 			if (result.validSession == true && result.recordFound == true) {

		// 				//alert('Master   result Data= '+JSON.stringify(result));
		// 				$scope.wrapper = result.hostelWrapper;

		// 				$scope.totalItems = $scope.wrapper.length;

		// 				//alert('totalItems = '+$scope.totalItems);

		// 				//--pagination--
		// 				$scope.currentPage = 1;
		// 				$scope.itemsPerPage = 5;
		// 				$scope.maxSize = 5; //Number of pager buttons to show

		// 				if ($scope.totalItems > $scope.itemsPerPage && $scope.totalItems != null) {
		// 					$scope.pagination = true;
		// 				}
		// 				//---pagination end--

		// 			}
		// 			else if (result.validSession == false) {
		// 				messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 			}
		// 			else {
		// 				messageFactory(appConstants.SYSTEM_NORECORDS);
		// 			}



		// 		}
		// 		else {
		// 			//messageFactory('No response from host system');
		// 			messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 		}

		// 		$scope.buttonDisabled = false;
		// 	});





		// }
		// //---------- end fetch Hostel Function   ---------------    

		//----------Start saveData function----------------------	


		$scope.saveData = function () {

			//alert('button save');

			$scope.submitted = true;


			//alert('button save2');

			if ($scope.loginForm.$valid) {

				//alert('tablename '+masterTableName);
				
				methodAction = "updateSupervisor";
				message = {

					"code": $scope.wrapper.code,
					"desc": $scope.wrapper.desc,
					"mobileNo": $scope.wrapper.mobileNo,
					"email": $scope.wrapper.email,
					"photoID": $scope.wrapper.photoID,

				};

				console.log('save message = '+ JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					$rootScope.loading = false;
					//alert('Value Data= '+JSON.stringify(value));

					result = value.updateSupervisor;

					//alert('result Data= '+JSON.stringify(result));
					if (value.success == true) {

						if (result.validSession == true && result.supervisorWrapper[0].recordFound == true) {

							messageFactory(appConstants.RECORD_UPDATED);
							$ctrl.ok();

							// $scope.fetchHostel(); //to reload data
							// $scope.clear();

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

					$scope.buttonDisabled = false;

				});

			}



		}               //---close saveData function------------------



		// $scope.setRowData = function (hostelID, hostelName, totalRooms, vacantRooms, hostelGroup) {
		// 	$scope.editableOption = true;

		// 	$scope.wrapper.hostelID = '';
		// 	$scope.wrapper.hostelName = '';
		// 	$scope.wrapper.totalRooms = '';
		// 	$scope.wrapper.vacantRooms = '';
		// 	$scope.wrapper.hostelGroup = '';
		// 	//$scope.wrapper.supervisorID='';

		// 	// alert('code '+ code + 'desc '+description +'filter ='+filter);
		// 	$scope.wrapper.hostelID = hostelID;
		// 	$scope.wrapper.hostelName = hostelName;
		// 	$scope.wrapper.totalRooms = totalRooms;
		// 	$scope.wrapper.vacantRooms = vacantRooms;
		// 	$scope.wrapper.hostelGroup = hostelGroup;
		// 	//$scope.wrapper.supervisorID = supervisorID;

		// 	//$scope.wrapper.filterName = filter;



		// };



		/*
			$scope.$watch('search', function(val)
			{ 
				$scope.instituteValue = $filter('filter')($scope.instituteTypeWrapper, val);
			});
			
			
		  */



		// $scope.clear = function () {

		// 	$scope.editableOption = false;
		// 	$scope.submitted = false;

		// 	$scope.wrapper.hostelID = '';
		// 	$scope.wrapper.hostelName = '';
		// 	$scope.wrapper.totalRooms = '';
		// 	$scope.wrapper.vacantRooms = '';
		// 	$scope.wrapper.hostelGroup = '';
		// 	// $scope.wrapper.supervisorID='';

		// 	$scope.form.hostelID.$invalid = true;
		// 	$scope.form.hostelID.$dirty = false;
		// 	$scope.form.hostelName.$invalid = true;
		// 	$scope.form.hostelName.$dirty = false;
		// 	$scope.form.totalRooms.$invalid = true;
		// 	$scope.form.totalRooms.$dirty = false;
		// 	$scope.form.vacantRooms.$invalid = true;
		// 	$scope.form.vacantRooms.$dirty = false;
		// 	$scope.form.hostelGroup.$invalid = true;
		// 	$scope.form.hostelGroup.$dirty = false;
		// 	//$scope.form.supervisorID.$invalid=true;
		// 	// $scope.form.supervisorID.$dirty=false;

		// }


		// //--------START btnBack function-----------
		// $scope.btnBack = function (param) {

		// 	if (param == 'dashBoard') {
		// 		$rootScope.isDashboard = true;
		// 	}
		// 	$location.path('/' + param);
		// }
		// //--------ends btnBack function----------- 

	}]);



})();









