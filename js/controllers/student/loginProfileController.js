(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('loginProfileController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'alertsManager', 'messageFactory', 'aesCryptoFactory', 'appConstants', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, alertsManager, messageFactory, aesCryptoFactory, appConstants, DTOptionsBuilder, DTColumnBuilder, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;




		$scope.menuName = sharedProperties.getMenuName();
		$scope.refNo = sharedProperties.getRefNo();
		$scope.actionMode = sharedProperties.getActionMode();
		$scope.studentName = sharedProperties.getStudentName();
		$scope.surname = sharedProperties.getSurname();


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			studentID: $ctrl.passInfo[0]
		};

		console.log('item ' + $ctrl.selected.studentID);

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.studentID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------

		// //------------------DT code
		// var dt = this;

		// dt.options = DTOptionsBuilder
		// 	.fromFnPromise(function(){return $scope.loadData()})
		// 	.withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
		// 		<"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
		// 	.withBootstrap()
		// 	.withLanguage({
		// 		paginate: {
		// 			previous: "&laquo;",
		// 			next: "&raquo;",
		// 		},
		// 		search: "_INPUT_",
		// 		searchPlaceholder: "Search…"
		// 	})
		// 	.withOption("order", [
		// 		[1, "desc"]
		// 	])
		// 	.withOption("responsive", true);

		// dt.columns = [
		// 	DTColumnBuilder.newColumn("userid").withTitle("Name"),
		// 	DTColumnBuilder.newColumn("studentID").withTitle("Position"),
		// 	DTColumnBuilder.newColumn("status").withTitle("Office"),
		// 	DTColumnBuilder.newColumn("userid").withTitle("Age"),
		// 	DTColumnBuilder.newColumn("studentID").withTitle("Start date"),
		// 	DTColumnBuilder.newColumn("status").withTitle("Salary")
		// ];
		// //---------end of DT code


		//------------start loadData Function----------------
		$scope.loadData = function () {

			var deferred = $q.defer();

			methodAction = "fetchLoginProfile";
			message = {
				"studentID": sharedProperties.getStudentID()
			};
			console.log('message = ' + JSON.stringify(message));
			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchLoginProfile;

					if (value.success == true) {

						//console.log('value = ' + JSON.stringify(value));

						if (result.validSession == true && result.usersWrapper[0].recordFound == true) {

							$scope.wrapper = result.usersWrapper[0];
							console.log('$scope.wrapper loadData = ' + JSON.stringify($scope.wrapper));

							$scope.wrapper.password = ''; //clear existing password to enter new password

							deferred.resolve($scope.wrapper);
						}
					}

				}

				$rootScope.loading = false;
				$scope.buttonDisabled = false;
			});

			return deferred.promise;

		}

		//------------end loadData Function------------------

		// //------------start loadData Function----------------
		// $scope.loadData=function(){  


		// 		 		methodAction="fetchLoginProfile";

		// 				message={

		// 			    		"studentID": sharedProperties.getStudentID()  

		// 		    		};


		// 		console.log('message = '+JSON.stringify(message));
		// 		$scope.buttonDisabled=true;
		// 		$rootScope.loading=true; 

		// 		jsonData=connectHostFactory(methodAction,message);
		// 		jsonData.returnData(function(value){

		// 			if(value != null){

		// 							result=value.fetchLoginProfile;

		// 							if(value.success == true){

		// 								console.log('value = '+JSON.stringify(value));

		// 								if(result.validSession==true && result.usersWrapper[0].recordFound==true)
		// 								{

		// 										$scope.wrapper= result.usersWrapper[0];


		// 										console.log('$scope.wrapper = '+JSON.stringify($scope.wrapper));

		// 								}
		// 								else if(result.validSession==false)
		// 								{
		// 										messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 								}
		// 								else
		// 								{


		// 										for(var i=0; i<result.errorWrapper.length; i++)
		// 										{

		// 											$scope.error = result.errorWrapper[i].errorDesc;
		// 											alertsManager.addAlert($scope.error, 'alert-error');
		// 											$scope.alerts = alertsManager.alerts;

		// 										}


		// 								}

		// 						} 
		// 						else
		// 						{

		// 							messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 						}

		// 			}
		// 			else{

		// 				messageFactory(appConstants.SYSTEM_ERROR);
		// 			}

		// 			$rootScope.loading=false;
		// 			$scope.buttonDisabled=false;
		// 		});

		// } 

		// //------------end loadData Function------------------


		$scope.saveData = function () {


			alertsManager.clearAlerts();

			$scope.submitted = true;



			if ($scope.loginForm.$valid) {

				if ($scope.wrapper.password || $scope.wrapper.retypepassword) {
					if (!angular.equals($scope.wrapper.password, $scope.wrapper.retypepassword)) {
						messageFactory("Password and retype password are not same");

						return; //alert('password and reentered passwords are same ');
					}
				}


				//saikiran 19-Apr-2019, no easy confirmation dialong hence commented
				// var confirm = $mdDialog.confirm()
				// .title('Confirm')
				// .content('Would you like to reset password for ' + $scope.wrapper.userid +'?')
				// .ok('Ok')
				// .cancel('Cancel');

				// $mdDialog.show(confirm).then(function() {





				methodAction = "updateLoginProfile";

				/*var key = CryptoJS.enc.Utf8.parse(appConstants.AES_ENCRYPTKEY);
				
				var encryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($scope.wrapper.password), key,  
							{  
								keySize: 128 / 8,  
							
								mode: CryptoJS.mode.ECB,  
								padding: CryptoJS.pad.Pkcs7  
							});*/


				console.log($scope.wrapper.status);
				message = {


					"userid": $scope.wrapper.userid,  		//sharedProperties.getRefNo(),  
					"password": ($scope.wrapper.password ? aesCryptoFactory($scope.wrapper.password) : $scope.wrapper.password),//encryptedPassword.toString(),   
					"studentID": sharedProperties.getStudentID(),
					"refNo": sharedProperties.getRefNo(),
					"status": $scope.wrapper.status
				};


				console.log('message = ' + JSON.stringify(message));
				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {


						result = value.updateLoginProfile;



						if (value.success == true) {


							if (result.validSession == true && result.usersWrapper[0].recordFound == true) {

								messageFactory("Record updated successfully");

								$ctrl.ok(); //unload modal view

							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {


								messageFactory("Record not updated");
								/*for(var i=0; i<result.errorWrapper.length; i++)
								{
									
									$scope.error = result.errorWrapper[i].errorDesc;
									alertsManager.addAlert($scope.error, 'alert-error');
									$scope.alerts = alertsManager.alerts;
									
								}*/


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


				//saikiran 19-Apr-2019	
				// }, function() {

				// 	//$scope.status = 'confirm Result cancel.';


				// });//------confirmation for password reset


			} //--form validation


		}  //------------ends saveData Function-------------




		//--------START btnBack function-----------
		$scope.btnBack = function () {
			$location.path('/queue');
		}
		//--------ends btnBack function----------- 
	}]);

})();









