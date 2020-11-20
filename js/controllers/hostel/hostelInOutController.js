(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('hostelInOutController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'appConstants', 'messageFactory', '$filter', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, appConstants, messageFactory, $filter, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		var popoverWrapperLength = null;

		var masterTableName = null;
		var masterFilter = null;

		$scope.wrapper = [];

        $scope.menuName = sharedProperties.getMenuName();
        
            // Default Timepicker
        $scope.wrapper.inOutTime = new Date();
        $scope.hstep = 1;
        $scope.mstep = 1;


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
			inOutRefNo: $ctrl.passInfo[0], mode: $ctrl.passInfo[6] 
		};


		console.log('item ' + $ctrl.selected.inOutRefNo);

		$scope.codeDisabled=false;

		if(sharedProperties.getActionMode()=='UPDATE')
		{
			$scope.wrapper.inOutRefNo = $ctrl.selected.inOutRefNo;

			$scope.codeDisabled=true;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.inOutRefNo);
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

				// {
				// 	"tableName": "MST_Supervisor",
				// 	"filter": ""
				// },
				{
					"tableName": "MST_Hostel",
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

		$scope.searchData = function () {                                               // getTableData Function


			methodAction = "fetchHostelInOut";


			message = {

                "inOutRefNo":$scope.wrapper.inOutRefNo

			};


			console.log('Master message= '+JSON.stringify(message));
			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				$rootScope.loading = false;

				console.log('Master Popover value Data= '+JSON.stringify(value));

				result = value.fetchHostelInOut;

				if (value.success == true) {

					if (result.validSession == true && result.hostelInOutWrapper[0].recordFound == true) {

						console.log('Master   result Data= '+JSON.stringify(result));
						$scope.wrapper = result.hostelInOutWrapper[0];

						if ($scope.wrapper.inOutMode=='IN')
						{ 
							$scope.wrapper.inDateTime = commonControls.setDateFormat(result.hostelInOutWrapper[0].inDateTime);
						}
						if ($scope.wrapper.inOutMode=='OUT')
						{
							$scope.wrapper.outDateTime = commonControls.setDateFormat(result.hostelInOutWrapper[0].outDateTime);

						}
						
						// $scope.wrapper.inDateTime != null && $scope.wrapper.inDateTime.length >= 10) {

                        //     var YYYY = $scope.wrapper.inDateTime.substring(6);
                        //     var MM = $scope.wrapper.inDateTime.substring(3, 5);
                        //     var DD = $scope.wrapper.inDateTime.substring(0, 2);


                        //     console.log('yyy ' + $scope.wrapper.inDateTime.substring(6));


                        //     $scope.wrapper.inOutDateTime = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

                        // }
						
						
						// && $scope.wrapper.outDateTime != null && $scope.wrapper.outDateTime.length >= 10) {

                        //     var YYYY = $scope.wrapper.outDateTime.substring(6);
                        //     var MM = $scope.wrapper.outDateTime.substring(3, 5);
                        //     var DD = $scope.wrapper.outDateTime.substring(0, 2);


                        //     $scope.wrapper.inOutDateTime = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

                        // }
						
						if ($scope.wrapper.inOutTime != null && $scope.wrapper.inOutTime.length >= 5) {

                            var HH = $scope.wrapper.inOutTime.substring(0,2);
                            var mm = $scope.wrapper.inOutTime.substring(3);

                            console.log('hh ' + HH);

                            console.log('ss ' + mm);

                            $scope.wrapper.inOutTime = new Date('2019', '01', '01', HH, mm );

                        }


                        // $scope.totalItems = $scope.wrapper.length;
                        

						// //alert('totalItems = '+$scope.totalItems);

						// //--pagination--
						// $scope.currentPage = 1;
						// $scope.itemsPerPage = 5;
						// $scope.maxSize = 5; //Number of pager buttons to show

						// if ($scope.totalItems > $scope.itemsPerPage && $scope.totalItems != null) {
						// 	$scope.pagination = true;
						// }
						//---pagination end--

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
			});


		}
		//---------- end fetch Hostel Function   ---------------    

		//----------Start saveData function----------------------	


		$scope.saveData = function () {

			//alert('button save');

			$scope.submitted = true;


			//alert('button save2');

			if ($scope.loginForm.$valid) {

				//alert('tablename '+masterTableName);
				
                methodAction = "updateHostelInOut";

                var message=[];

				message.push({
					"inOutRefNo": $scope.wrapper.inOutRefNo,
					"hostelID": $scope.wrapper.hostelID,
					"studentID": $scope.wrapper.studentID,
					"inOutMode": $scope.wrapper.inOutMode,
					"inDateTime": ($scope.wrapper.inOutMode=='IN'?commonControls.dateFormat($scope.wrapper.inOutDateTime):""),
                    "outDateTime": ($scope.wrapper.inOutMode=='OUT'?commonControls.dateFormat($scope.wrapper.inOutDateTime):""),
                    "inOutTime": commonControls.dateFormatHHMM($scope.wrapper.inOutTime),
				});

				console.log('save message = '+ JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					$rootScope.loading = false;
					//alert('Value Data= '+JSON.stringify(value));

					result = value.updateHostelInOut;

					//alert('result Data= '+JSON.stringify(result));
					if (value.success == true) {

						if (result.validSession == true && result.hostelInOutWrapper[0].recordFound == true) {



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


        $scope.datepickers = [
            {
                inOutDateTime: false
            }];

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









