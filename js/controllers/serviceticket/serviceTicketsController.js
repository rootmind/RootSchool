(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('serviceTicketsController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'appConstants', 'messageFactory', '$filter', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, appConstants, messageFactory, $filter, $q, $uibModalInstance, passInfo) {


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
			stRefNo: $ctrl.passInfo[0], mode: $ctrl.passInfo[1], viewModule:$ctrl.passInfo[2]
		};


		console.log('item ' + $ctrl.selected.stRefNo);

		$scope.codeDisabled=false;

		if(sharedProperties.getActionMode()=='UPDATE')
		{
			$scope.wrapper.stRefNo = $ctrl.selected.stRefNo;

			$scope.codeDisabled=true;
		}


		//if student raising service tickets then populate student id
		if($ctrl.selected.viewModule  == 'service-tickets')
		{
			$scope.wrapper.studentID = sharedProperties.getStudentID();
			$scope.wrapper.studentName = sharedProperties.getStudentName();
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.stRefNo);
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
                    "tableName": "MST_Severity",
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
                    "tableName": "MST_ServiceID",
                    "filter": ""
                },
                {
                    "tableName": "MST_RequestStatus",
                    "filter": ""
                },
                {
                    "tableName": "MST_RequestType",
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
				if(sharedProperties.getActionMode()=='UPDATE')
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
                    methodAction = "insertServiceTicket";

                    message = {

                        "studentID": $scope.wrapper.studentID,
                        "hostelID": $scope.wrapper.hostelID,
                        "blockNo": $scope.wrapper.blockNo,
                        "roomNo": $scope.wrapper.roomNo,
                        "serviceID": $scope.wrapper.serviceID,
                        "severity": $scope.wrapper.severity,
                        "desc": $scope.wrapper.desc,
                        "requestType": $scope.wrapper.requestType,
                        "proposedRoomNo": $scope.wrapper.proposedRoomNo,
                        "recordStatus": $scope.wrapper.recordStatus,
                        "studentName": $scope.wrapper.studentName,
    
                    };
                }
                if(sharedProperties.getActionMode()=='UPDATE')
                {
                    methodAction = "updateServiceTicket";
                    message = {

                        "stRefNo":$scope.wrapper.stRefNo,
                        "proposedRoomNo": $scope.wrapper.proposedRoomNo,
                        "responseDesc": $scope.wrapper.responseDesc,
                        "expectedResolutionDate": commonControls.dateFormat($scope.wrapper.expectedResolutionDate),
                        "resolutionDate": commonControls.dateFormat($scope.wrapper.resolutionDate),
                        "requestStatus": $scope.wrapper.requestStatus,
                        "recordStatus": $scope.wrapper.recordStatus,
                        "desc": $scope.wrapper.desc
    
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
                        result = value.insertServiceTicket;
                    }
                    if(sharedProperties.getActionMode()=='UPDATE')
                    {
                        result = value.updateServiceTicket;
                    }

					//alert('result Data= '+JSON.stringify(result));
					if (value.success == true) {

						if (result.validSession == true && result.serviceTicketsWrapper[0].recordFound == true) {

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

                methodAction = "fetchServiceTicket";

                message = {

                    "stRefNo":$scope.wrapper.stRefNo

                    
                };

                $rootScope.loading = true;

                console.log('cal message ' + JSON.stringify(message));

                jsonData = connectHostFactory(methodAction, message);

                jsonData.returnData(function (value) {

                    if (value != null) {

                        result = value.fetchServiceTicket;

                        console.log('cal result ' + JSON.stringify(result));

                        if (value.success == true) {

                            if (result.validSession == true && result.serviceTicketsWrapper[0].recordFound == true) {
								$scope.wrapper = result.serviceTicketsWrapper[0];
								
								$scope.wrapper.expectedResolutionDate = commonControls.setDateFormat(result.serviceTicketsWrapper[0].expectedResolutionDate);
								$scope.wrapper.resolutionDate = commonControls.setDateFormat(result.serviceTicketsWrapper[0].resolutionDate);

								// if ($scope.wrapper.expectedResolutionDate != null && $scope.wrapper.expectedResolutionDate.length >= 10) {

								// 	var YYYY = $scope.wrapper.expectedResolutionDate.substring(6);
								// 	var MM = $scope.wrapper.expectedResolutionDate.substring(3, 5);
								// 	var DD = $scope.wrapper.expectedResolutionDate.substring(0, 2);
	
								// 	$scope.wrapper.expectedResolutionDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));
	
								// }
								// if ($scope.wrapper.resolutionDate != null && $scope.wrapper.resolutionDate.length >= 10) {
	
								// 	var YYYY = $scope.wrapper.resolutionDate.substring(6);
								// 	var MM = $scope.wrapper.resolutionDate.substring(3, 5);
								// 	var DD = $scope.wrapper.resolutionDate.substring(0, 2);
	
								// 	$scope.wrapper.resolutionDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));
	
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

			expectedResolutionDate: false,
			resolutionDate: false,
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









