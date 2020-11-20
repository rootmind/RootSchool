(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('queueBookIssueController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'messageFactory', 'appConstants', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal', '$compile', '$state', '$stateParams', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, messageFactory, appConstants, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile, $state, $stateParams) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		//var recordStatus = null;
		$scope.wrapper = [];

		$scope.menuName = sharedProperties.getMenuName();


		//----------------
		var $ctrl = this;


		//------------------DT code
		var dt = this;
		dt.message = '';
		//dt.someClickHandler = someClickHandler;
		dt.edit = edit;
		dt.dtInstance = {};
		dt.infos = {};
		//dt.imageUpload = imageUpload;


		dt.options = DTOptionsBuilder
			.fromFnPromise(function () { return $scope.searchData() }) //call from search button
			.withDOM('Blrtip')
			.withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
				<"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
			.withBootstrap()
			.withLanguage({
				paginate: {
					previous: "&laquo;",
					next: "&raquo;",
				},
				search: "_INPUT_",
				searchPlaceholder: "Search…"
			})
			.withOption("order", [
				[3, "desc"]
			])
			.withOption("responsive", true)
			.withPaginationType('full_numbers')
			.withOption('createdRow', createdRow);
		// .withOption('rowCallback', rowCallback);
		// .withButtons([
		// 	'columnsToggle',
		// 	'colvis',
		// 	'copy',
		// 	'print',
		// 	'excel',
		// 	{
		// 			text: 'Some button',
		// 			key: '1',
		// 			action: function (e, dt, node, config) {
		// 					alert('Button activated');
		// 			}
		// 	}
		// ]);			

		dt.columns = [
			DTColumnBuilder.newColumn("issueRefNo").withTitle("Ref No").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("bookID").withTitle("Book ID").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
			DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("bookStatusValue").withTitle("Status").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("issueDate").withTitle("Issue").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("returnDate").withTitle("Return").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn("yop").withTitle("YOP").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn("dop").withTitle("DOP").withOption('defaultContent', '-')

		];

		function createdRow(row, data, dataIndex) {
			// Recompiling so we can bind Angular directive to the DT
			$compile(angular.element(row).contents())($scope);
		}

		function actionsHtml(data, type, full, meta) {
			var id_data = data;
			id_data["id"] = meta.row; //add id element
			// console.log('actionsHtml: ' + JSON.stringify( id_data));
			dt.infos[id_data.id] = data;
			return '<div class="text-center">' +
				'<span class="icon icon-edit text-primary" style="cursor: pointer;" ng-click="dt.edit(dt.infos[' + id_data.id + '])"></span></div>' //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
		}

		function edit(info) {
			// console.log('You are trying to edit the row: ' + JSON.stringify(info));
			dt.message = info.issueRefNo;
			var passInfo = [info.issueRefNo,  "UPDATE"];
			sharedProperties.setRefNo(info.issueRefNo);
			sharedProperties.setActionMode("UPDATE");
			$ctrl.openModal('lg', '', passInfo);
		}

		$ctrl.openModal = function (size, parentSelector, passInfo) {
			var parentElem = parentSelector ?
				angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/library/book-issue.html',
				controller: 'bookIssueController',
				controllerAs: '$ctrl',
				size: size,
				scope: $scope,
				appendTo: parentElem,
				backdrop: 'static',
				keyboard: false,
				resolve: {
					passInfo: function () {
						return passInfo;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$ctrl.selected = selectedItem;
				console.log('$ctrl.selected: ' + $ctrl.selected);
				$scope.dtSearch();
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
				$scope.dtSearch();
			});
		};


		//---------------for student image upload----------------
		// function actionsHtmlImage(data, type, full, meta) {
		// 	var id_data = data;
		// 	id_data["id"] = meta.row; //add id element
		// 	// console.log('actionsHtml: ' + JSON.stringify( id_data));
		// 	dt.infos[id_data.id] = data;
		// 	return '<div class="text-center">' +
		// 		'<span class="icon icon-eye text-primary" style="cursor: pointer;" ng-click="dt.imageUpload(dt.infos[' + id_data.id + '])"></span></div>'
		// }

		// function imageUpload(info) {
		// 	// console.log('You are trying to edit the row: ' + JSON.stringify(info));
		// 	dt.message = info.studentID + ' - ' + info.studentName;
		// 	var passInfo = [info.refNo, info.studentID, info.studentName, "UPDATE"];
		// 	sharedProperties.setRefNo(info.refNo);
		// 	sharedProperties.setStudentID(info.studentID);
		// 	sharedProperties.setSchoolID(info.schoolID);
		// 	sharedProperties.setActionMode("UPDATE");
		// 	viewUrl = 'views/student/student-image.html';
		// 	viewController = 'studentProfileController';
		// 	viewSize = 'sm'
		// 	$ctrl.openModal(viewSize, '', passInfo);

		// }

		// function actionsHtmlAvatar(data, type, full, meta) {

		// 	if (!data.avatar) {
		// 		data.avatar = 'img/student/empty_person.png';
		// 	}
		// 	return '<div class="text-center">' +
		// 		'<img class="circle" width="40" height="40" src="' + data.avatar + '"></div>'
		// }

		$scope.doAdd = function () {
			sharedProperties.setRefNo("");
			sharedProperties.setActionMode("ADD");
			$ctrl.openModal('lg', '', '');
		}



		//  //------------start loadData Function----------------
		// $scope.loadData=function(){

		// 	methodAction="fetchMultiPopoverData";

		// 	message=[



		// 			     {
		// 					 "tableName" : "MST_Grade",
		// 				 	 "filter" : ""    		
		// 			     },
		// 			     {
		// 					 "tableName" : "MST_Section",
		// 				 	 "filter" : ""    		
		// 			     }

		// 			];

		// 		    $rootScope.loading=true;

		// 			jsonData=connectHostFactory(methodAction, message);
		// 			jsonData.returnData(function(value){
		// 				//alert('Popover Data='+JSON.stringify(value));

		// 					if(value != null){


		// 								result=value.fetchMultiPopoverData;

		// 								if(value.success == true){

		// 									if(result.validSession==true)
		// 									{
		// 										$scope.popoverWrapper=result.popoverWrapper;
		// 									}
		// 									else 
		// 									{
		// 										messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 									}
		// 								}
		// 								else{

		// 									messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 								}

		// 					}
		// 					else{

		// 						messageFactory(appConstants.SYSTEM_ERROR);

		// 					}

		// 					$rootScope.loading=false;

		// 				});

		//  } //------------ends loadData Function----------------


		//call from search button
		$scope.dtSearch = function () {
			if ($scope.loginForm.$valid) {
				if (!angular.equals(dt.dtInstance, {})) {
					//dt.dtInstance.reloadData();
					dt.dtInstance.changeData(function () { return $scope.searchData() });
				}
			}

		}


		//------------start saveData Function----------------
		$scope.searchData = function () {



			var deferred = $q.defer();

			//if($scope.form.bookID.$valid || $scope.form.bookName.$valid || $scope.form.author.$valid || $scope.form.publisher.$valid || $scope.form.bookCategory.$valid) {	 


			methodAction = "fetchBookIssue";

			message = {
				"issueRefNo": $scope.wrapper.issueRefNo
				//   "bookName" : $scope.wrapper.bookName,
				//   "author" : $scope.wrapper.author,
				//   "publisher" : $scope.wrapper.publisher,
				//   "bookCategory" : $scope.wrapper.bookCategory


			};

			console.log('Search fetchBookIssue Data= ' + JSON.stringify(message));
			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {



				$scope.pagination = false;

				console.log('fetchBookIssue Data= ' + JSON.stringify(value));
				if (value != null) {

					result = value.fetchBookIssue;

					if (value.success == true) {

						if (result.validSession == true && result.bookIssueWrapper[0].recordFound == true) {
							$scope.wrapper = result.bookIssueWrapper;


							console.log('fetchBookSearch ' + JSON.stringify($scope.wrapper));

							//  //--pagination--

							//  $scope.totalItems = result.bookCatalogueWrapper.length;
							//  $scope.currentPage = 1;
							//  $scope.itemsPerPage =5;
							//  $scope.maxSize = 5; //Number of pager buttons to show


							//   if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
							//   {
							// 	$scope.pagination=true;

							//   }
							//   //---pagination end--

						}
						else {

							$scope.wrapper = [];

						}
					}
				}
				$rootScope.loading = false;
				$scope.buttonDisabled = false;

				deferred.resolve($scope.wrapper);

			});
			// 	}

			// else{


			// 		 messageFactory('Enter data before search');

			// 	}

			return deferred.promise;
		}

		// /*end search Data*/
		// $scope.selectedData=function(bookRefNo){


		// 			sharedProperties.setBookRefNo(bookRefNo);

		// 			alert('selected data'+bookRefNo );



		// 			sharedProperties.setActionMode('UPDATE');

		// 			$location.path('/' + sharedProperties.getMenu());

		// }


		$scope.datepickers = {
			searchStartDate: false,
			searchEndDate: false
		}

		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();

			$scope.datepickers[which] = true;

		};






		//  //---------- back button---------
		//    $scope.btnBack=function(){

		// 		$location.path('/dashBoard');
		//    }

		// 	//----------end -back button----------


	}]);

})();