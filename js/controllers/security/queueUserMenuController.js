(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('queueUserMenuController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder',  '$q', '$uibModal', '$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q,$uibModal, $compile) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		$scope.studentID="";
		$scope.wrapper=[];


		// $scope.menuName = sharedProperties.getMenuName();
		// $scope.modalHidden = false;


		//----------------
		var $ctrl = this;


		//------------------DT code
		var dt = this;
		dt.message = '';
		//dt.someClickHandler = someClickHandler;
		dt.edit = edit;
		dt.dtInstance = {};
		dt.infos = {};
		
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
				[0, "desc"]
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
      DTColumnBuilder.newColumn("userid").withTitle("Staff ID").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("menuIDValue").withTitle("Menu").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("menuID").withTitle("Menu ID").withOption('defaultContent', '-').notVisible(),
			DTColumnBuilder.newColumn("makerID").withTitle("Maker").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("makerDateTime").withTitle("Date&Time").withOption('defaultContent', '-'),			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn('delete').withTitle("Delete").renderWith(function (id){ return '<div class="text-center"><span class="icon icon-trash text-primary" style="cursor: pointer;"></span></div>'}) //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
			DTColumnBuilder.newColumn(null).withTitle('Delete').notSortable().renderWith(actionsHtml)

		];
		// dt.newPromise = newPromise;
    // dt.reloadData = reloadData;
		// dt.dtInstance = {};
		
		// function newPromise() {
		// 	return $scope.searchData();
		// }
		// function reloadData() {
		// 	var resetPaging = true;
		// 	dt.dtInstance.reloadData(callback, resetPaging);
		// }

		// function callback(json) {
		// 		console.log(json);
		// }

		// dt.dtInstanceCallback = function(_dtInstance) {
		// 	dt.dtInstance = _dtInstance;
		// 	dt.dtInstance.reloadData(); 
		// }

		// function someClickHandler(info) {
		// 	dt.message = info.userid + ' - ' + info.menuID;
		// 	console.log('click '+ dt.message);
		// 	var passInfo = [info.userid,info.menuID];
		// 	//$ctrl.openModal('sm','', passInfo);
		// 	$scope.saveData(info.userid,info.menuID);
		// }

		// function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		// 	// Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
		// 	$('td', nRow).unbind('click');
		// 	$('td', nRow).bind('click', function() {
		// 			$scope.$apply(function() {
		// 					dt.someClickHandler(aData);
		// 			});
		// 	});
		// 	return nRow;
		// }

		function createdRow(row, data, dataIndex) {
			// Recompiling so we can bind Angular directive to the DT
			$compile(angular.element(row).contents())($scope);
		}

		function actionsHtml(data, type, full, meta) {
				var id_data = data;
				id_data["id"]=meta.row;  //add id element
				// console.log('actionsHtml: ' + JSON.stringify( id_data));
				dt.infos[id_data.id] = data;
				return '<div class="text-center">'  +
							'<span class="icon icon-trash text-primary" style="cursor: pointer;" ng-click="dt.edit(dt.infos['+id_data.id+'])"></span></div>' //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
		}

		function edit(info) {
				// console.log('You are trying to edit the row: ' + JSON.stringify(info));
			var passInfo = [info.userid,info.menuID];

			Swal.fire({
				title: 'Do you want to delete?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {
					$scope.saveData(info.userid,info.menuID);
				}
			})

		}

		$ctrl.openModal = function (size, parentSelector, passInfo) {
			var parentElem = parentSelector ? 
			angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/security/user-menu.html',
			controller: 'userMenuController',
			controllerAs: '$ctrl',
			size: size,
			scope:$scope,
			appendTo: parentElem,
			keyboard:false,
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
			});
		};

		




		//---------end of DT code




	// //------------start loadData Function----------------

    // $scope.loadData = function () {


    //     var deferred = $q.defer();

    //     methodAction = "fetchMultiPopoverData";

    //     message = [
    //         {
    //             "tableName": "TeachersProfile",
    //             "filter": ""
    //         },

    //         {
    //             "tableName": "MST_Menu",
    //             "filter": ""
    //         }

    //     ];

    //     $rootScope.loading = true;

    //     jsonData = connectHostFactory(methodAction, message);
    //     jsonData.returnData(function (value) {

    //         //alert('Popover Data='+JSON.stringify(value));

    //         if (value != null) {

    //             result = value.fetchMultiPopoverData;

    //             if (value.success == true) {
    //                 if (result.validSession == true) {
    //                     $scope.popoverWrapper = result.popoverWrapper;

    //                     deferred.resolve($scope.popoverWrapper);
    //                 }
    //             }

    //         }

    //         $rootScope.loading = false;

    //     });

    //     return deferred.promise;


    // }   //------------------- ends loadData Function-----------------       


		//------------start saveData Function----------------

		//call from search button
		$scope.dtSearch = function(){

			//alert('test1');

			if(!angular.equals(dt.dtInstance, {})){
				//alert('test2');
				dt.dtInstance.reloadData();
				dt.dtInstance.changeData(function () { return $scope.searchData() });
			}

		}

		
		//--------fetchuserMenu------------
		$scope.searchData = function () {

			//$scope.submittedFetchSubjects = true;

			//if ($scope.loginForm.staffUserID.$valid) {

				// console.log($scope.wrapper.staffUserID);

				var deferred = $q.defer();

				methodAction = "fetchUserMenu";


				message = {
					//"userid": $scope.wrapper.staffUserID
				};

				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);

				jsonData.returnData(function (value) {

					if (value != null) {

						result = value.fetchUserMenu;

						if (value.success == true) {

							if (result.validSession == true && result.userMenuWrapper[0].recordFound == true) {
								$scope.wrapper = result.userMenuWrapper;
								//$scope.wrapper.deleteEnable = true;

								console.log('wrapper ' + JSON.stringify($scope.wrapper));

							

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


		$scope.doAdd = function()
		{
			$ctrl.openModal('sm','', '');
		}



			//--------------start saveData Function-----------------

			$scope.saveData = function (userid,menuID) {


				$scope.submitted = true;
	
				// if ($scope.loginForm.$valid) {
	
	
				
	
	
						methodAction = "updateUserMenu";
	
						message = {
	
	
							"userid": userid,
							"menuID": menuID,
							"deleteFlag": "Y" //--'Y' or 'N'
	
						};
	
						console.log('message = '+JSON.stringify(message));	
						$scope.buttonDisabled = true;
						$rootScope.loading = true;
	
						jsonData = connectHostFactory(methodAction, message);
						jsonData.returnData(function (value) {
	
							console.log('Value personal Data= '+JSON.stringify(value));
	
							if (value != null) {
	
	
								result = value.updateUserMenu;
	
	
	
								if (value.success == true) {
	
	
	
	
									if (result.validSession == true && result.userMenuWrapper[0].recordFound == true) {
	
	
	
										// if (deleteFlag == 'Y') {
											 messageFactory(appConstants.RECORD_DELETED, appConstants.info);
											 $scope.dtSearch();

										// }
										// else {
										//	messageFactory(appConstants.RECORD_UPDATED);
										//	$ctrl.ok();
										// }
	
										//$scope.clear();
	
										//$scope.fetchUserMenu();
	
										//alert(JSON.stringify(result));
	
	
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
							$scope.buttonDisabled = false;
						});
	
	
	
				//}//----if form validation
	
	
	
	
			}  //------------ends saveData Function-------------

	}]);

})();