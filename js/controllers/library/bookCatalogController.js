(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('bookCatalogController', ['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo', 'uibDateParser', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q, $uibModalInstance, passInfo, uibDateParser) {

		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];
		$scope.popoverWrapper = [];

		$scope.isButtonDisable = false;
		$scope.menuName = sharedProperties.getMenuName();


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			bookRefNo: $ctrl.passInfo[0], bookName: $ctrl.passInfo[1], mode: $ctrl.passInfo[2]
		};

		$scope.wrapper.bookRefNo = $ctrl.selected.bookRefNo;

		if ($ctrl.selected.mode == "edit") {
			$scope.codeDisabled = true;
		}
		else {
			$scope.codeDisabled = false;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.bookRefNo);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------


		// $scope.datepickers = [
		// 	{
		// 		format: "dd/MM/yyyy",
		// 	}];

		// // Default Datepicker Options
		// $scope.datepickers.forEach(function (obj) {
		// 	obj.date = new Date();
		// 	obj.opened = false;
		// 	obj.options = {
		// 		showWeeks: false
		// 	};
		// });

		// Open Datepicker
		$scope.open = function (datepicker) {
			datepicker.opened = true;
		};


		//------------start loadData Function----------------

		$scope.loadData = function () {

			var deferred = $q.defer();

			methodAction = "fetchMultiPopoverData";

			message = [
				{
					"tableName": "MST_BookCategory",
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

			if (sharedProperties.getActionMode() == 'UPDATE') {

				$scope.loadBookDetails();

			}

			return deferred.promise;


		}   //------------------- ends loadData Function-----------------  


		//--------------start saveData Function-----------------

		$scope.saveData = function () {

			console.log('save button');
			alertsManager.clearAlerts();

			$scope.submitted = true;



			if ($scope.loginForm.$valid) {

				if (sharedProperties.getActionMode() == 'UPDATE') {

					methodAction = "updateBookDetails";

				}
				else {

					methodAction = "insertBookDetails";
				}



				message = {
					"bookRefNo": $scope.wrapper.bookRefNo,
					"bookID": $scope.wrapper.bookID,
					"bookName": $scope.wrapper.bookName,
					"author": $scope.wrapper.author,
					"edition": $scope.wrapper.edition,
					"publisher": $scope.wrapper.publisher,
					"price": $scope.wrapper.price,
					"yop": commonControls.dateFormatYYYY($scope.wrapper.yop),
					"bookCount": $scope.wrapper.bookCount,
					"bookCategory": $scope.wrapper.bookCategory,
					"dop": commonControls.dateFormat($scope.wrapper.dop)
				};


				console.log('message = ' + JSON.stringify(message));

				$scope.isButtonDisable = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {

						console.log('value = ' + JSON.stringify(value));

						if (sharedProperties.getActionMode() == 'UPDATE') {

							result = value.updateBookDetails;

						}
						else {

							result = value.insertBookDetails;
						}

						if (value.success == true) {


							if (result.validSession == true && result.bookCatalogueWrapper[0].recordFound == true) {

								$scope.wrapper = result.bookCatalogueWrapper[0];


								$scope.wrapper.bookRefNo = result.bookCatalogueWrapper[0].bookRefNo;

								if (sharedProperties.getActionMode() == 'UPDATE') {
									messageFactory(appConstants.RECORD_UPDATED);
								}
								else {

									messageFactory(result.bookCatalogueWrapper[0].bookName + "book added to catalog");
								}

								$ctrl.ok();

								//sharedProperties.setBookRefNo(result.bookCatalogueWrapper[0].bookRefNo);

								//sharedProperties.setActionMode('UPDATE');

								//$scope.loadBookDetails();




							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {

								for (var i = 0; i < result.errorWrapper.length; i++) {

									$scope.error = result.errorWrapper[i].errorDesc;
									alertsManager.addAlert($scope.error, 'alert-error');
									$scope.alerts = alertsManager.alerts;

								}


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
					$scope.isButtonDisable = false;
				});
			}


		}  //------------ends saveData Function-------------


		//------TO ASSIGN DATA TO FIELDS----------
		$scope.loadBookDetails = function () {

			var deferred = $q.defer();

			methodAction = "fetchBookDetails";

			message = {
				"bookRefNo": sharedProperties.getBookRefNo()
			};

			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchBookDetails;

					console.log('loadBookDetails ' + JSON.stringify(result));

					if (value.success == true) {

						if (result.validSession == true && result.bookCatalogueWrapper[0].recordFound == true) {
							$scope.wrapper = result.bookCatalogueWrapper[0];


							if ($scope.wrapper.dop != null && $scope.wrapper.dop.length >= 10) {

								var YYYY = $scope.wrapper.dop.substring(6);
								var MM = $scope.wrapper.dop.substring(3, 5);
								var DD = $scope.wrapper.dop.substring(0, 2);

								$scope.wrapper.dop = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

							}
							if ($scope.wrapper.yop != null && $scope.wrapper.yop.length >= 4) {

								console.log('yop ' + $scope.wrapper.yop);

								var YYYY = $scope.wrapper.yop;
								console.log('year ' + YYYY);
								// var MM = $scope.wrapper.yop.substring(3, 5);
								// var DD = $scope.wrapper.yop.substring(0, 2);

								$scope.wrapper.yop = new Date(parseInt(YYYY, 10), parseInt('01', 10) - 1, parseInt('01', 10));

							}


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

				deferred.resolve($scope.wrapper);

			});

			return deferred.promise;
		}

		//------date control--------

		$scope.datepickers = {

			yop: false,
			dop: false,  //---date of purchase

		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};




		//--------end date control-------

		// //--------START btnBack function-----------
		//   $scope.btnBack=function(){
		// 		//$location.path('/booksQueue');
		// 	   $location.path('/' + sharedProperties.getMenu());
		//    }
		// //--------ends btnBack function----------- 


	}]); //----controller  end-----

})();//----main function end-----









