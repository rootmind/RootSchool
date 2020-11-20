(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('changePasswordController', ['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'aesCryptoFactory', 'appConstants', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, aesCryptoFactory, appConstants, DTOptionsBuilder, DTColumnBuilder, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		//$scope.usersStaffWrapper=[];
		$scope.wrapper = [];


		$scope.menuName = sharedProperties.getMenuName();
		//$scope.refNo= sharedProperties.getRefNo();
		//$scope.actionMode=sharedProperties.getActionMode();
		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();

		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			staffID: $ctrl.passInfo[0], status: $ctrl.passInfo[1]
		};

		console.log('item ' + $ctrl.selected.staffID);

		$scope.wrapper.userid = $ctrl.selected.staffID;
		$scope.wrapper.status = $ctrl.selected.status;

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.staffID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------

		//------------start loadData Function----------------
		$scope.loadData = function () {


			var deferred = $q.defer();

			methodAction = "fetchUsersStaff";

			message = {};


			console.log('message = ' + JSON.stringify(message));
			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchUsersStaff;

					if (value.success == true) {

						console.log('value = ' + JSON.stringify(value));

						if (result.validSession == true && result.usersWrapper[0].recordFound == true) {

							$scope.wrapper = result.usersWrapper;

							$scope.wrapper.password = ''; //clear existing password to enter new password

							deferred.resolve($scope.wrapper);

							console.log('$scope.wrapper = ' + JSON.stringify($scope.wrapper));




						}
					}

				}

				$rootScope.loading = false;
				$scope.buttonDisabled = false;
			});


			return deferred.promise;

		}

		//------------end loadData Function------------------


		$scope.saveData = function () {


			//alertsManager.clearAlerts();

			$scope.submitted = true;



			if ($scope.loginForm.$valid) {


				if ($scope.wrapper.password || $scope.wrapper.retypepassword) {

					if (!angular.equals($scope.wrapper.password, $scope.wrapper.retypepassword)) {
						messageFactory("Password and reenter password are not same");
						return; //alert('password and reentered passwords are same ');
					}
				}

				if (angular.equals($scope.wrapper.userid.trim().toUpperCase(), "ADMIN@DEMO")) {
					messageFactory("ADMIN@DEMO password reset is restricted");
					//alert('Demo Admin password reset is restricted');

					return;
				}


				methodAction = "changePassword";

				console.log('staff status' + $scope.wrapper.status);

				message = {

					"userid": $rootScope.userid,
					"staffUserID": $scope.wrapper.userid,
					"password": ($scope.wrapper.password?aesCryptoFactory($scope.wrapper.password):$scope.wrapper.password),    //$scope.wrapper.password,  
					"status": $scope.wrapper.status
				};


				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {


						result = value.changePassword;



						if (value.success == true) {


							if (result.validSession == true && result.usersWrapper[0].recordFound == true) {


								messageFactory("Record update successfully");

								$ctrl.ok(); //unload modal view

							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {


								messageFactory("Record not updated");


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

		// 	$scope.showToast = function(message) {
		//   toast.pop({
		//     title: "message",
		//     body: message,
		//     type: "success",
		//     showCloseButton: false
		//   });
		// };


		// $scope.setRowData = function(userid,status) {
		// 	  //$scope.editableOption =true;

		// 	  $scope.wrapper.userid= '';
		// 	  $scope.wrapper.status= '';

		// 	  $scope.wrapper.userid=userid;
		// 	  $scope.wrapper.status=status;

		// 	  $scope.wrapper.password='';
		// 	  $scope.wrapper.retypePassword='';

		// 	  //alert('userid 1'+userid +' status 1'+status);

		// 	  //alert('  $scope.wrapper.userid '+  $scope.wrapper.userid +'   $scope.wrapper.status '+  $scope.wrapper.status);

		//   };



		// $scope.clear = function(){

		//   //$scope.editableOption = false;

		//     $scope.submitted = false;


		//     $scope.wrapper.userid='';
		//     $scope.wrapper.status='';

		//     $scope.wrapper.password='';
		//   $scope.wrapper.retypePassword='';


		//     $scope.form.userid.$invalid=true;
		//     $scope.form.userid.$dirty=false;
		//     $scope.form.status.$invalid=true;
		//     $scope.form.status.$dirty=false;


		// }




		// //--------START btnBack function-----------
		//   $scope.btnBack=function(){
		// 		$location.path('/dashBoard');
		//    }
		// //--------ends btnBack function----------- 

	}]);

})();









