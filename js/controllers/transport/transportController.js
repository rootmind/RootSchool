(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('transportController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'appConstants', 'messageFactory', '$filter', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, appConstants, messageFactory, $filter, $q, $uibModalInstance, passInfo) {


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
			tsRefNo: $ctrl.passInfo[0], mode: $ctrl.passInfo[1], viewModule:$ctrl.passInfo[2]
		};


		console.log('item ' + $ctrl.selected.tsRefNo);

		$scope.codeDisabled=false;

		if(sharedProperties.getActionMode()=='UPDATE' || sharedProperties.getActionMode()=='UPDATE_RESPONSE')
		{
			$scope.wrapper.tsRefNo = $ctrl.selected.tsRefNo;

			$scope.codeDisabled=true;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.tsRefNo);
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
                    "tableName": "MST_TripType",
                    "filter": ""
                },
                {
                    "tableName": "MST_Status",
                    "filter": ""
                },
                {
                    "tableName": "MST_Hostel",
                    "filter": ""
                },
                {
                    "tableName": "MST_TransportStatus",
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
				if(sharedProperties.getActionMode()=='UPDATE' || sharedProperties.getActionMode()=='UPDATE_RESPONSE')
				{
					$scope.searchData();
				}

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
                
                if(sharedProperties.getActionMode()=='ADD')
                {
                    methodAction = "insertTransport";

                    message = {

                        "studentID": $scope.wrapper.studentID,
                        "hostelID": $scope.wrapper.hostelID,
                        "blockNo": $scope.wrapper.blockNo,
                        "roomNo": $scope.wrapper.roomNo,
                        "reason": $scope.wrapper.reason,
                        "destination": $scope.wrapper.destination,
                        "noOfPersons": $scope.wrapper.noOfPersons,
                        "journeyDateTime": commonControls.dateFormat($scope.wrapper.journeyDateTime),
                        "returnDateTime": commonControls.dateFormat($scope.wrapper.returnDateTime),
                        "allocationDate": commonControls.dateFormat($scope.wrapper.allocationDate),
                        "desc": $scope.wrapper.desc,
                        //"recordStatus": $scope.wrapper.recordStatus,
                        "tripType": $scope.wrapper.tripType
    
                    };
                }
                if(sharedProperties.getActionMode()=='UPDATE')
                {
                    methodAction = "updateTransport";
                    message = {

                        "tsRefNo":$scope.wrapper.tsRefNo,
						"reason": $scope.wrapper.reason,
						"destination": $scope.wrapper.destination,
                        "noOfPersons": $scope.wrapper.noOfPersons,
                        "journeyDateTime": commonControls.dateFormat($scope.wrapper.journeyDateTime),
                        "returnDateTime": commonControls.dateFormat($scope.wrapper.returnDateTime)
                        //"requestStatus": $scope.wrapper.requestStatus,
    
                    };

                }
                if(sharedProperties.getActionMode()=='UPDATE_RESPONSE')
                {
                    methodAction = "updateTransportResponse";
                    message = {

                        "tsRefNo":$scope.wrapper.tsRefNo,
                        "desc": $scope.wrapper.desc,
                        "allocationDate": commonControls.dateFormat($scope.wrapper.allocationDate),
                        "requestStatus": $scope.wrapper.requestStatus,
                        "recordStatus": $scope.wrapper.recordStatus
    
                    };

                }				

				console.log('save message = '+ JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					$rootScope.loading = false;
					//alert('Value Data= '+JSON.stringify(value));

                    if(sharedProperties.getActionMode()=='ADD')
                    {
                        result = value.insertTransport;
                    }
                    if(sharedProperties.getActionMode()=='UPDATE')
                    {
                        result = value.updateTransport;
                    }
                    if(sharedProperties.getActionMode()=='UPDATE_RESPONSE')
                    {
                        result = value.updateTransportResponse;

                    }

					//alert('result Data= '+JSON.stringify(result));
					if (value.success == true) {

						if (result.validSession == true && result.transportWrapper[0].recordFound == true) {

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

         //--------fetchuserMenu------------
         $scope.searchData = function () {

            var deferred = $q.defer();

            //alert('test3');
            //if ($scope.loginForm.wrapper.academicYearID.$valid) {

                methodAction = "fetchTransport";

                message = {

					"tsRefNo":$scope.wrapper.tsRefNo,
					"hostelID":($ctrl.selected.viewModule == 'transport'?"":"hostelID") //this to filter for hostel records

                };

                $rootScope.loading = true;

                console.log('cal message ' + JSON.stringify(message));

                jsonData = connectHostFactory(methodAction, message);

                jsonData.returnData(function (value) {

                    if (value != null) {

                        result = value.fetchTransport;

                        console.log('cal result ' + JSON.stringify(result));

                        if (value.success == true) {

                            if (result.validSession == true && result.transportWrapper[0].recordFound == true) {
								$scope.wrapper = result.transportWrapper[0];
								
								$scope.wrapper.journeyDateTime = commonControls.setDateFormat(result.transportWrapper[0].journeyDateTime);
								$scope.wrapper.returnDateTime = commonControls.setDateFormat(result.transportWrapper[0].returnDateTime);
								$scope.wrapper.allocationDate = commonControls.setDateFormat(result.transportWrapper[0].allocationDate);

								// if ($scope.wrapper.journeyDateTime != null && $scope.wrapper.journeyDateTime.length >= 10) {

								// 	var YYYY = $scope.wrapper.journeyDateTime.substring(6);
								// 	var MM = $scope.wrapper.journeyDateTime.substring(3, 5);
								// 	var DD = $scope.wrapper.journeyDateTime.substring(0, 2);
	
								// 	$scope.wrapper.journeyDateTime = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));
	
								// }
								// if ($scope.wrapper.returnDateTime != null && $scope.wrapper.returnDateTime.length >= 10) {
	
								// 	var YYYY = $scope.wrapper.returnDateTime.substring(6);
								// 	var MM = $scope.wrapper.returnDateTime.substring(3, 5);
								// 	var DD = $scope.wrapper.returnDateTime.substring(0, 2);
	
								// 	$scope.wrapper.returnDateTime = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));
	
                                // }
								// if ($scope.wrapper.allocationDate != null && $scope.wrapper.allocationDate.length >= 10) {
	
								// 	var YYYY = $scope.wrapper.allocationDate.substring(6);
								// 	var MM = $scope.wrapper.allocationDate.substring(3, 5);
								// 	var DD = $scope.wrapper.allocationDate.substring(0, 2);
	
								// 	$scope.wrapper.allocationDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));
	
                                // }
                                

                            }
                            else {

                                $scope.wrapper = [];
                            }
                        }


                    }

                    $rootScope.loading = false;
                    deferred.resolve($scope.wrapper);
                });
            //}

            return deferred.promise;
        }
        //-------end fetchuserMenu---------


		$scope.datepickers = {

			journeyDateTime: false,
            returnDateTime: false,
            allocationDate: false
		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};

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









