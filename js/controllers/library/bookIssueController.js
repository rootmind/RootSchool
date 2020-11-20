(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('bookIssueController', ['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', '$uibModalInstance', 'passInfo', 'uibDateParser', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q, $uibModalInstance, passInfo, uibDateParser) {

		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];
		$scope.popoverWrapper = [];
		$scope.bookCatalogueWrapper=[];

		$scope.isButtonDisable = false;
		$scope.menuName = sharedProperties.getMenuName();


		//---------book catalog
		$scope.currentBook = {};
		//--------



		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			issueRefNo: $ctrl.passInfo[0], mode: $ctrl.passInfo[1]
		};

		$scope.wrapper.issueRefNo = $ctrl.selected.issueRefNo;

		if ($ctrl.selected.mode == "UPDATE") {
			$scope.codeDisabled = true;
		}
		else {
			$scope.codeDisabled = false;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.issueRefNo);
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
					"tableName": "MST_BookStatus",
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

				$scope.loadBookIssue();

			}
			else
			{
				//for new load book catalog
				$scope.fetchBookCatalog();
			}

			return deferred.promise;

		}   //------------------- ends loadData Function-----------------  


		//--------------start saveData Function-----------------

		$scope.saveData = function () {

			
			alertsManager.clearAlerts();

			$scope.submitted = true;



			if ($scope.loginForm.$valid) {

				// if (sharedProperties.getActionMode() == 'UPDATE') {

					methodAction = "updateBookIssue";

				// }
				// else {

				// 	methodAction = "insertBookIssue";
				// }



				message = {
					"issueRefNo": $scope.wrapper.issueRefNo,
					"studentID": $scope.wrapper.studentID,
					"bookID": $scope.wrapper.bookID,
					"issueDate": commonControls.dateFormat($scope.wrapper.issueDate),
					"returnDate": commonControls.dateFormat($scope.wrapper.returnDate),
					"damageFine": $scope.wrapper.damageFine,
					"lateFine": $scope.wrapper.lateFine,
					"totalFine": $scope.wrapper.totalFine,
					"dueDays": $scope.wrapper.dueDays,
					"bookStatus": $scope.wrapper.bookStatus
				};


				console.log('message = ' + JSON.stringify(message));

				$scope.isButtonDisable = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {

						console.log('value = ' + JSON.stringify(value));

						// if (sharedProperties.getActionMode() == 'UPDATE') {

							result = value.updateBookIssue;

						// }
						// else {

						// 	result = value.insertBookIssue;
						// }

						if (value.success == true) {


							if (result.validSession == true && result.bookIssueWrapper[0].recordFound == true) {

								$scope.wrapper = result.bookIssueWrapper[0];


								$scope.wrapper.issueRefNo = result.bookIssueWrapper[0].issueRefNo;

								// if (sharedProperties.getActionMode() == 'UPDATE') {
									messageFactory(appConstants.RECORD_UPDATED);
								// }
								// else {

								// 	messageFactory(result.bookIssueWrapper[0].bookID + "book added to Book Issue");
								// }

								$ctrl.ok();

								// sharedProperties.setBookRefNo(result.bookIssueWrapper[0].bookRefNo);

								// sharedProperties.setActionMode('UPDATE');

								// $scope.loadBookIssue();




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
		$scope.loadBookIssue = function () {

			var deferred = $q.defer();

			methodAction = "fetchBookIssue";

			message = {
				"issueRefNo": sharedProperties.getRefNo()
			};

			$rootScope.loading = true;

			console.log('fetchBookIssue message' + JSON.stringify(message));

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchBookIssue;

					console.log('fetchBookIssue result' + JSON.stringify(result));


					if (value.success == true) {

						if (result.validSession == true && result.bookIssueWrapper[0].recordFound == true) {

							if (result.bookIssueWrapper[0].issueDate != null && result.bookIssueWrapper[0].issueDate.length >= 10) {

								var YYYY =result.bookIssueWrapper[0].issueDate.substring(6);
								var MM = result.bookIssueWrapper[0].issueDate.substring(3, 5);
								var DD = result.bookIssueWrapper[0].issueDate.substring(0, 2);

								result.bookIssueWrapper[0].issueDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

							}
							if (result.bookIssueWrapper[0].returnDate != null && result.bookIssueWrapper[0].returnDate.length >= 10) {

								var YYYY = result.bookIssueWrapper[0].returnDate.substring(6);
								var MM = result.bookIssueWrapper[0].returnDate.substring(3, 5);
								var DD = result.bookIssueWrapper[0].returnDate.substring(0, 2);

								result.bookIssueWrapper[0].returnDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

							}

							$scope.wrapper = result.bookIssueWrapper[0];

							$scope.currentBook.selected = {'bookID':$scope.wrapper.bookID};

						}
					}


				}

				$rootScope.loading = false;
				deferred.resolve($scope.wrapper);

			});

			return deferred.promise;
		}

		//------date control--------

		$scope.datepickers = {

			issueDate: false,  //---date of purchase
			returnDate: false

		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};


		//--------get book catalog book id
		$scope.updateBookCatalog = function($item, $model) {
			$scope.currentBook.bookID = $model.bookID;
			console.log('selected bookid ' + $model.bookID)
			$scope.wrapper.bookID = $model.bookID;
		};
			
		//----------fetch book id and name  from book catalog-----
		$scope.fetchBookCatalog = function () {


			var deferred = $q.defer();

			methodAction = "fetchBookSearch";

			message = {
				"bookID": $scope.wrapper.bookID
			};

			console.log('Search fetchBookCatalog Data= ' + JSON.stringify(message));
			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				console.log('fetchBookCatalog Data= ' + JSON.stringify(value));
				if (value != null) {

					result = value.fetchBookSearch;

					if (value.success == true) {

						if (result.validSession == true && result.bookCatalogueWrapper[0].recordFound == true) {
							$scope.bookCatalogueWrapper = result.bookCatalogueWrapper;
							$scope.currentBook.selected = $scope.bookCatalogueWrapper[0];
							$scope.currentBook.bookID = $scope.bookCatalogueWrapper[0].bookID;
							console.log('fetchBookCatalog ' + JSON.stringify($scope.bookCatalogueWrapper));

						}
						else {

							$scope.bookCatalogueWrapper = [];

						}
					}
				}
				deferred.resolve($scope.bookCatalogueWrapper);

			});

			return deferred.promise;
		}

		//--------end date control-------

		// //--------START btnBack function-----------
		// $scope.btnBack = function () {
		// 	//$location.path('/booksQueue');
		// 	$location.path('/' + sharedProperties.getMenu());
		// }
		// //--------ends btnBack function----------- 


	}]); //----controller  end-----

})();//----main function end-----









