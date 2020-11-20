(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('teachersProfileController', ['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		var destination = null;

		$scope.wrapper = [];
		$scope.teachersProfileWrapper = [];
		$scope.imgArray = [];
		$scope.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

		// $scope.menuName= sharedProperties.getMenuName();
		// $scope.refNo= sharedProperties.getRefNo();
		// $scope.actionMode=sharedProperties.getActionMode();
		// $scope.schoolID = sharedProperties.getSchoolID();


		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();

		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		*/

		//$rootScope.isTabBarDisable=true;

		//---------modal data receiver------
		var $ctrl = this;

		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			staffRefNo: $ctrl.passInfo[0], mode: $ctrl.passInfo[1]
		};

		$scope.wrapper.staffRefNo = $ctrl.selected.staffRefNo;


		if ($ctrl.selected.mode == "edit") {
			$scope.codeDisabled = true;
		}
		else {
			$scope.codeDisabled = false;
		}

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.staffRefNo);
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
					"tableName": "MST_StaffType",
					"filter": ""
				}


			];

			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				console.log('Popover Data='+JSON.stringify(value));

				if (value != null) {



					result = value.fetchMultiPopoverData;

					if (value.success == true) {

						if (result.validSession == true) {

							$scope.popoverWrapper = result.popoverWrapper;

							console.log('$scope.popoverWrapper ='+JSON.stringify($scope.popoverWrapper));
						}

					}

					$rootScope.loading = false;

					if ($ctrl.selected.mode == "edit") {

						$scope.fetchTeachersProfile();
					}


				}

				deferred.resolve($scope.popoverWrapper);


			});

			return deferred.promise;

		}

		//--------------start saveData Function-----------------

		$scope.saveData = function () {


			//alertsManager.clearAlerts();

			//$scope.submitted = true;



			if ($scope.loginForm.$valid) {

				// if (sharedProperties.getActionMode() == 'UPDATE') {

					methodAction = "updateTeachersProfile";

				// }
				// else {

				// 	methodAction = "insertTeachersProfile";
				// }



				message = {

					"staffUserID": $scope.wrapper.staffUserID,
					"staffRefNo": $scope.wrapper.staffRefNo,  //staff Ref no
					"header": $scope.wrapper.header,
					"name": $scope.wrapper.name,
					"profile": $scope.wrapper.profile,
					"mobileNo": $scope.wrapper.mobileNo,
					"emailID": $scope.wrapper.emailID,
					"staffType":$scope.wrapper.staffType
					//"orderNumber": $scope.wrapper.orderNumber,   

				};


				//alert('message = '+JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {

						// if (sharedProperties.getActionMode() == 'UPDATE') {

							result = value.updateTeachersProfile;

						// }
						// else {

						// 	result = value.insertTeachersProfile;
						// }

						if (value.success == true) {


							if (result.validSession == true && result.teachersProfileWrapper[0].recordFound == true) {

								$scope.wrapper = result.teachersProfileWrapper[0];

								//sharedProperties.setRefNo(result.teachersProfileWrapper[0].staffRefNo);
								//$scope.wrapper.staffRefNo= result.teachersProfileWrapper[0].staffRefNo;

								// if (sharedProperties.getActionMode() == 'UPDATE') {
									messageFactory(appConstants.RECORD_UPDATED);
								// }
								// else {

								// 	messageFactory(result.teachersProfileWrapper[0].name + " profile is created");
								// }


								// sharedProperties.setActionMode('UPDATE');

								// $scope.clear();

								$ctrl.ok();


							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							// else {

							// 	for (var i = 0; i < result.errorWrapper.length; i++) {

							// 		$scope.error = result.errorWrapper[i].errorDesc;
							// 		alertsManager.addAlert($scope.error, 'alert-error');
							// 		$scope.alerts = alertsManager.alerts;

							// 	}


							// }

						}
						else {

							messageFactory(appConstants.SYSTEM_NORESPONSE);
						}

					}
					else {

						messageFactory(appConstants.SYSTEM_ERROR);
					}

					$rootScope.loading = false;
					// $scope.buttonDisabled = false;
				});
			}


		}  //------------ends saveData Function-------------


		//----------Start Fetch Teachers profile --------

		$scope.fetchTeachersProfile = function () {


			var deferred = $q.defer();


			methodAction = "fetchTeachersProfile";
			message = {

				"staffRefNo" : $scope.wrapper.staffRefNo								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
				//"docID" : 'DOC001'													//'C://onboard//images//SA21OCT2015156',
				//'25JAN2016173153751'
			};


			console.log ('message Data= '+JSON.stringify(message));
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				console.log ('Value Data= '+JSON.stringify(value));
				if (value != null) {


					result = value.fetchTeachersProfile;

					console.log("Teachers profile " +JSON.stringify(result));

					//alert('docIDValue '+result.imageDetailsWrapper[0].docIDValue);

					if (value.success == true) {

						if (result.validSession == true  && result.teachersProfileWrapper[0].recordFound == true) {

							$scope.wrapper = result.teachersProfileWrapper[0];

							deferred.resolve($scope.wrapper);
							//$scope.profileImage=true;
							//alert('$scope.teachersProfileWrapper= '+JSON.stringify($scope.teachersProfileWrapper));

							//--pagination--

							// $scope.totalItems = result.teachersProfileWrapper.length;
							// $scope.currentPage = 1;
							// $scope.itemsPerPage = 5;
							// $scope.maxSize = 5; //Number of pager buttons to show


							// if ($scope.totalItems > $scope.itemsPerPage && $scope.totalItems != null) {
							// 	$scope.pagination = true;

							// }
							//---pagination end--
						}
					}
					else {
						//messageFactory(appConstants.SYSTEM_NORESPONSE);
						$scope.profileImage = false;

					}

				}
				else {
					messageFactory(appConstants.SYSTEM_ERROR);
				}
				$rootScope.loading = false;

				

			});

			return deferred.promise;
		}

		//---------------End Fetch profile image---------	



		//----------Start Fetch Teachers profile image--------

		$scope.fetchTeachersProfileImage = function () {


			methodAction = "fetchImageDetails";
			message = {

				"refNo": '7777777777',
				"imageStatus": "ACTIVE"
			};




			$rootScope.loading = true;

			jsonData = connectHostImageFactory(methodAction, message, destination);
			jsonData.returnData(function (value) {


				if (value != null) {


					result = value.fetchImageDetails;


					if (value.success == true) {

						if (result.validSession == true && result.imageDetailsWrapper[0].recordFound == true) {
							//$scope.wrapper=result.imageDetailsWrapper;

							//Android.openDialog("Alert",JSON.stringify(result.imageDetailsWrapper));

							for (var i = 0; i <= result.imageDetailsWrapper.length - 1; i++) {

								//$scope.imageFileNames[i]=result.imageDetailsWrapper[i].imageFileName;
								sharedProperties.setImageId(result.imageDetailsWrapper[i].imageId);
								$scope.fetchImages_M(i);
							}

							/*$scope.image=value.image;
							$scope.docName=result.imageDetailsWrapper[0].docIDValue;
							$scope.profileImage=true;*/

						}
						else if (result.validSession == false) {
							messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						}

					}
					else {
						//messageFactory(appConstants.SYSTEM_NORESPONSE);
						$scope.profileImage = false;

					}

				}
				else {
					messageFactory(appConstants.SYSTEM_ERROR);
				}
				$rootScope.loading = false;
			});

		}

		//---------------End Fetch Teachers profile image---------



		//----------Start Fetch Images_M--------

		$scope.fetchImages_M = function (i) {

			//messageFactory("I Value "+i);
			methodAction = "fetchImageDetails";
			message = {

				"refNo": '7777777777',
				"imageId": sharedProperties.getImageId()
			};

			//$rootScope.loading=true;

			jsonData = connectHostImageFactory(methodAction, message, destination);
			jsonData.returnData(function (value) {

				if (value != null) {

					//Android.openDialog("value ",JSON.stringify(value));

					result = value.fetchImageDetails;

					if (value.success == true) {

						if (result.validSession == true) {

							$scope.imgArray[i] = value.image;

							//Android.storeImage(value.image);
						}
						else if (result.validSession == false) {
							messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						}

					}
					else {
						//messageFactory(appConstants.SYSTEM_NORESPONSE);
					}

				}

				//$rootScope.loading=false;
				else {
					// messageFactory(appConstants.SYSTEM_ERROR);
				}

			});

		}

		//---------------End Fetch Images_M---------


		// $scope.setRowData = function(staffUserID,staffRefNo,header,name,profile,mobileNo,emailID)
		// {
		// 			  $scope.editableOption =true;

		// 			  $scope.wrapper.staffUserID= '';
		// 			  $scope.wrapper.staffRefNo= '';
		// 			  $scope.wrapper.header= '';
		// 			  $scope.wrapper.name= '';

		// 			  $scope.wrapper.profile= '';
		// 			  $scope.wrapper.mobileNo= '';
		// 			  $scope.wrapper.emailID= '';
		// 			 //$scope.wrapper.orderNumber= '';

		// 			 // alert('code '+ code + 'desc '+description +'filter ='+filter);

		// 			  $scope.wrapper.staffUserID= staffUserID;
		// 			  $scope.wrapper.staffRefNo=staffRefNo;
		// 			  $scope.wrapper.header= header;
		// 			  $scope.wrapper.name= name;

		// 			  $scope.wrapper.profile= profile;
		// 			  $scope.wrapper.mobileNo=mobileNo;
		// 			  $scope.wrapper.emailID= emailID;

		// 			  sharedProperties.setActionMode('UPDATE');

		// 			  //$scope.wrapper.orderNumber= orderNumber;

		// };



		//    $scope.clear = function(){

		// 				  $scope.editableOption = false;

		// 			      $scope.submitted = false;


		// 			      $scope.wrapper.staffUserID= '';
		// 				  $scope.wrapper.staffRefNo= '';
		// 				  $scope.wrapper.header= '';
		// 				  $scope.wrapper.name= '';

		// 				  $scope.wrapper.profile= '';
		// 				  $scope.wrapper.mobileNo= '';
		// 				  $scope.wrapper.emailID= '';
		// 				 // $scope.wrapper.orderNumber= '';

		// 			      $scope.form.staffUserID.$invalid=true;
		// 			      $scope.form.staffUserID.$dirty=false;
		// 			      $scope.form.staffRefNo.$invalid=true;
		// 			      $scope.form.staffRefNo.$dirty=false;
		// 			      $scope.form.header.$invalid=true;
		// 			      $scope.form.header.$dirty=false;
		// 			      $scope.form.name.$invalid=true;
		// 			      $scope.form.name.$dirty=false;
		// 			      $scope.form.profile.$invalid=true;
		// 			      $scope.form.profile.$dirty=false;
		// 			      $scope.form.mobileNo.$invalid=true;
		// 			      $scope.form.mobileNo.$dirty=false;
		// 			      $scope.form.emailID.$invalid=true;
		// 			      $scope.form.emailID.$dirty=false;
		// 			      //$scope.form.orderNumber.$invalid=true;
		// 			      //$scope.form.orderNumber.$dirty=false;

		// 			       sharedProperties.setActionMode('NEW');

		// 	}











		// //--------START btnBack function-----------
		//   $scope.btnBack=function(){
		// 		$location.path('/dashBoard');
		//    }
		// //--------ends btnBack function----------- 
	}]);

})();









