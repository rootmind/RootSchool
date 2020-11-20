(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('masterController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'appConstants', 'messageFactory', '$q', '$uibModalInstance', 'passInfo',function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, appConstants, messageFactory, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		var mode=null;

		// var masterTableName = null;
		// var masterFilter = null;

		$scope.wrapper = [];

		$scope.menuName = sharedProperties.getMenuName();


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			code: $ctrl.passInfo[0], desc: $ctrl.passInfo[1], tableName:$ctrl.passInfo[2], mode:$ctrl.passInfo[3]
		};

		console.log('item ' + $ctrl.selected.code);

		$scope.wrapper.code = $ctrl.selected.code;
		$scope.wrapper.desc = $ctrl.selected.desc;
		$scope.wrapper.tableName = $ctrl.selected.tableName;
		mode=$ctrl.selected.mode;

		if(mode=="edit")
		{
			$scope.codeDisabled=true;
		}
		else
		{
			$scope.codeDisabled=false;
		}

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.code);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------




		/* save data*/
		$scope.saveData = function () {

			console.log('button save');


			$scope.submitted = true;


			//alert('button save2');

			if ($scope.loginForm.$valid) {

				//alert('tablename '+masterTableName);

				methodAction = "updateMasterData";
				message = {

					"tableName": $scope.wrapper.tableName,
					"code": $scope.wrapper.code,
					"desc": $scope.wrapper.desc,
					"filter": ""

				};

				console.log('save message = '+ JSON.stringify(message));

				$rootScope.loading = true;
				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					$rootScope.loading = false;
					//alert('Value Data= '+JSON.stringify(value));

					result = value.updateMasterData;

					console.log('result Data= '+JSON.stringify(result));
					if (value.success == true) {

						if (result.validSession == true && result.popoverWrapper[0].recordFound == true) {

							messageFactory(appConstants.RECORD_UPDATED);
							$ctrl.ok();

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



				});

			}



		}               //close saveData function



		
	  

	}]);



})();









