(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('calendarActivitiesController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'appConstants', 'messageFactory', '$filter', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, appConstants, messageFactory, $filter, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		var popoverWrapperLength = null;

		var masterTableName = null;
		var masterFilter = null;

		$scope.wrapper = [];

		$scope.menuName = sharedProperties.getMenuName();
		//$scope.calendarRefNo = sharedProperties.getCalendarRefNo();

		// $scope.disableSpace=function(event){  
		// 	//alert('alert-1'+event);
		// 	if (event.keyCode == 32) {
		//         event.returnValue = false;
		//         return false;
		//     }
		// }

		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			calendarRefNo: $ctrl.passInfo[0], mode: $ctrl.passInfo[1]
		};

		//console.log('item ' + $ctrl.selected.calendarRefNo);

		 $scope.wrapper.calendarRefNo = $ctrl.selected.calendarRefNo;
		// $scope.wrapper.subjectID = $ctrl.selected.subjectID;

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.calendarRefNo);
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
					"tableName": "MST_Status",
					"filter": ""
				},
				{
					"tableName": "MST_Hostel",
					"filter": ""
				},
				{
					"tableName": "MST_ActivityCategory",
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



						}
						// else if(result.validSession==false)
						// {
						// 		messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						// }
						// else
						// {
						// 	messageFactory(appConstants.SYSTEM_NORECORDS);
						// }

					}
					// else{
					// 	//messageFactory('No response from host system');
					// 	messageFactory(appConstants.SYSTEM_NORESPONSE);
					// }

				}
				// else{
				// 	//messageFactory('Error encountered,Please contact system administrator');

				// 	messageFactory(appConstants.SYSTEM_ERROR);
				// }

				$rootScope.loading = false;
				$scope.buttonDisabled = false;

			});

			if (sharedProperties.getActionMode() == 'UPDATE') {

				$scope.fetchCalendarActivities();

			}


			return deferred.promise;

		}
		//------------ends loadData Function----------------

		//---------- Start fetch CalendarActivities------------------

		$scope.fetchCalendarActivities = function () {                                               // getTableData Function

			//alert('alert1');
			methodAction = "fetchCalendarActivities";


			// if (messageValue == true) {

			// 	message = {

			// 		"searchCode": 'SUPERVISOR_MAINT_QUEUE'

			// 	};

			// }
			// else {

				message = {

					"calendarRefNo": $scope.wrapper.calendarRefNo//sharedProperties.getCalendarRefNo()

				};
			//}


			console.log('Master message= '+JSON.stringify(message));
			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				$rootScope.loading = false;

				console.log('Master Popover value Data= '+JSON.stringify(value));

				result = value.fetchCalendarActivities;

				if (value.success == true) {

					if (result.validSession == true && result.calendarActivitiesWrapper[0].recordFound == true) {

						console.log('Master   result Data= '+JSON.stringify(result));
						// if (messageValue == true) {
							$scope.wrapper = result.calendarActivitiesWrapper[0];

							$scope.wrapper.startDate = commonControls.setDateFormat(result.calendarActivitiesWrapper[0].startDate);
							$scope.wrapper.endDate = commonControls.setDateFormat(result.calendarActivitiesWrapper[0].endDate);

							// if ($scope.wrapper.startDate != null && $scope.wrapper.startDate.length >= 10) {

							// 	var YYYY = $scope.wrapper.startDate.substring(6);
							// 	var MM = $scope.wrapper.startDate.substring(3, 5);
							// 	var DD = $scope.wrapper.startDate.substring(0, 2);

							// 	$scope.wrapper.startDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

							// }
							// if ($scope.wrapper.endDate != null && $scope.wrapper.endDate.length >= 10) {

							// 	var YYYY = $scope.wrapper.endDate.substring(6);
							// 	var MM = $scope.wrapper.endDate.substring(3, 5);
							// 	var DD = $scope.wrapper.endDate.substring(0, 2);

							// 	$scope.wrapper.endDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

							// }

							//$scope.tableParams = new NgTableParams({}, { dataset: $scope.wrapper });
						// }

						// else {
						// 	$scope.wrapper = result.calendarActivitiesWrapper[0];
						// }


						//alert('totalItems = '+$scope.totalItems);





					}
					else if (result.validSession == false) {
						messageFactory(appConstants.SYSTEM_INVALIDSESSION);
					}
					else {
						messageFactory(appConstants.SYSTEM_NORECORDS);
					}



				}
				else {
					//messageFactory('No response from host system');
					messageFactory(appConstants.SYSTEM_NORESPONSE);
				}

				$scope.buttonDisabled = false;
				$rootScope.loading = false;
			});





		}
		//---------- end fetch CalendarActivities   ---------------  

		//-------start search data--------------------------

		$scope.searchData = function () {


			if ($scope.loginForm.$valid) {


				methodAction = "fetchCalendarActivities";

				// alert('alert-1');

				message = {
					"searchCode": 'CALENDAR_ACTIVITIES_SEARCH',
					"calendarRefNo": $scope.wrapper.calendarRefNo,
					"hostelID": $scope.wrapper.hostelID,
					"searchStartDate": commonControls.dateFormat($scope.wrapper.searchStartDate), //$scope.wrapper.searchStartDate,
					"searchEndDate": commonControls.dateFormat($scope.wrapper.searchEndDate)

				};

				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {



					$scope.pagination = false;

					//alert('fetchCalendarActivities value= '+JSON.stringify(value));
					if (value != null) {

						result = value.fetchCalendarActivities;

						if (value.success == true) {

							if (result.validSession == true && result.calendarActivitiesWrapper[0].recordFound == true) {
								$scope.calendarActivitiesWrapper = result.calendarActivitiesWrapper;

								//$scope.tableParams = new NgTableParams({}, { dataset: $scope.calendarActivitiesWrapper });



							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {

								$scope.calendarActivitiesWrapper = '';

								messageFactory(appConstants.SYSTEM_NORECORDS);

							}
						}
						else {
							//messageFactory('No response from host system');
							messageFactory(appConstants.SYSTEM_NORECORDS);

						}
					}
					else {
						//messageFactory('Error encountered,Please contact system administrator');
						messageFactory(appConstants.SYSTEM_ERROR);
					}
					$rootScope.loading = false;
					$scope.buttonDisabled = false;

				});
			}

			// else {
			// 	messageFactory('Enter data before search');
			// }
		}

		//-------end search data--------------------------


		//----------Start saveData function----------------------

		// $scope.createCalendarActivities = function () {

		// 	sharedProperties.setActionMode('NEW');

		// 	sharedProperties.setCalendarRefNo('');

		// 	$location.path('/calendarActivities');
		// }

		// $scope.selectedData = function (calendarRefNo) {


		// 	sharedProperties.setCalendarRefNo(calendarRefNo);

		// 	sharedProperties.setActionMode('UPDATE');

		// 	$location.path('/' + sharedProperties.getMenu());

		// }

		$scope.saveData = function () {

			alertsManager.clearAlerts();

			//alert('button save');

			$scope.submitted = true;


			//alert('button save2 '+ $scope.wrapper.calendarRefNo);

			if ($scope.loginForm.$valid) {

				//alert('tablename '+masterTableName);

				methodAction = "updateCalendarActivities";

				message = {

					"calendarRefNo": $scope.wrapper.calendarRefNo,   //sharedProperties.getCalendarRefNo(),
					//"hostelID": $scope.wrapper.hostelID,
					"activityCategory": $scope.wrapper.activityCategory,
					"startDate": commonControls.dateFormat($scope.wrapper.startDate),
					"endDate": commonControls.dateFormat($scope.wrapper.endDate),
					"desc": $scope.wrapper.desc,
					"status": $scope.wrapper.status

				};

				console.log('save message = '+ JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					$rootScope.loading = false;
					console.log('Value Data= '+JSON.stringify(value));

					result = value.updateCalendarActivities;

					console.log('result Data= '+JSON.stringify(result));
					if (value.success == true) {

						if (result.validSession == true && result.calendarActivitiesWrapper[0].recordFound == true) {
							//$scope.clear();

							$scope.calendarRefNo = result.calendarActivitiesWrapper[0].calendarRefNo;



							//if (sharedProperties.getActionMode() == 'UPDATE') {
								messageFactory(appConstants.RECORD_UPDATED);
							// }
							// else {

							// 	messageFactory(appConstants.RECORD_CREATED);
							// }
							$ctrl.ok();

							//$location.path('/calendarActivitiesQueue');

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



		// $scope.setRowData = function (calendarRefNo, hostelID, supervisorID, activityCategory, startDate, endDate, desc, status) {
		// 	$scope.editableOption = true;

		// 	$scope.wrapper.calendarRefNo = '';
		// 	$scope.wrapper.hostelID = '';
		// 	$scope.wrapper.activityCategory = '';
		// 	$scope.wrapper.startDate = '';
		// 	$scope.wrapper.endDate = '';
		// 	$scope.wrapper.desc = '';
		// 	$scope.wrapper.status = '';


		// 	// alert('code '+ code + 'desc '+description +'filter ='+filter);

		// 	$scope.wrapper.calendarRefNo = calendarRefNo;
		// 	$scope.wrapper.hostelID = hostelID;
		// 	$scope.wrapper.activityCategory = activityCategory;
		// 	$scope.wrapper.startDate = startDate;
		// 	$scope.wrapper.endDate = endDate;
		// 	$scope.wrapper.desc = desc;
		// 	$scope.wrapper.status = status;

		// 	//$scope.wrapper.filterName = filter;



		// };



		// $scope.clear = function () {

		// 	//alert('clear alerts');
		// 	$scope.editableOption = false;
		// 	$scope.submitted = false;

		// 	$scope.wrapper.calendarRefNo = '';
		// 	$scope.wrapper.hostelID = '';
		// 	$scope.wrapper.activityCategory = '';
		// 	$scope.wrapper.startDate = '';
		// 	$scope.wrapper.endDate = '';
		// 	$scope.wrapper.desc = '';
		// 	$scope.wrapper.status = '';


		// 	$scope.form.calendarRefNo.$invalid = true;
		// 	$scope.form.calendarRefNo.$dirty = false;
		// 	$scope.form.hostelID.$invalid = true;
		// 	$scope.form.hostelID.$dirty = false;
		// 	$scope.form.activityCategory.$invalid = true;
		// 	$scope.form.activityCategory.$dirty = false;
		// 	$scope.form.startDate.$invalid = true;
		// 	$scope.form.startDate.$dirty = false;
		// 	$scope.form.endDate.$invalid = true;
		// 	$scope.form.endDate.$dirty = false;
		// 	$scope.form.desc.$invalid = true;
		// 	$scope.form.desc.$dirty = false;
		// 	$scope.form.status.$invalid = true;
		// 	$scope.form.status.$dirty = false;

		// }



		$scope.datepickers = {

			startDate: false,
			endDate: false,
		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};




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









