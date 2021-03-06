(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('queueStaffController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder',  '$q', '$uibModal','$compile',function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q,$uibModal, $compile) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		$scope.studentID="";
		$scope.wrapper="";

		// $scope.menuName = sharedProperties.getMenuName();
		// $scope.modalHidden = false;


		//----------------
		var $ctrl = this;


		//------------------DT code
		var dt = this;
		dt.message = '';
		// dt.someClickHandler = someClickHandler;
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
			DTColumnBuilder.newColumn("status").withTitle("Status").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml)
			// DTColumnBuilder.newColumn('edit').withTitle("Edit").renderWith(function (id){ return '<div class="text-center"><span class="icon icon-edit text-primary" style="cursor: pointer;"></span></div>'}), //<button class="btn btn-outline-primary btn-icon sq-24"></button>
			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn("surname").withTitle("Surname").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn("userid").withTitle("userid").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn("status").withTitle("status").withOption('defaultContent', '-')

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
		// 	dt.message = info.userid + ' - ' + info.status;
		// 	console.log('click '+ dt.message);
		// 	var passInfo = [info.userid,info.status];
		// 	sharedProperties.setStaffID(info.userid);
		// 	sharedProperties.setStatus(info.status);
		// 	$ctrl.openModal('sm','', passInfo);
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
                   '<span class="icon icon-edit text-primary" style="cursor: pointer;" ng-click="dt.edit(dt.infos['+id_data.id+'])"></span></div>' //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
        }

        function edit(info) {
            // console.log('You are trying to edit the row: ' + JSON.stringify(info));
			var passInfo = [info.userid,info.status];
			sharedProperties.setStaffID(info.userid);
			sharedProperties.setStatus(info.status);
			$ctrl.openModal('sm','', passInfo);
		}


		$ctrl.openModal = function (size, parentSelector, passInfo) {
			var parentElem = parentSelector ? 
			angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/security/change-password.html',
			controller: 'changePasswordController',
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

		

		// function openModal(size) {
		// 	var modalInstance = $uibModal.open({
		// 	  animation: true,
		// 	  ariaLabelledBy: "modal-title",
		// 	  ariaDescribedBy: "modal-body",
		// 	  templateUrl: "views/security/login-profile.html",
		// 	  controller: "loginProfileController",
		// 	  controllerAs: "mo",
		// 	  size: size,
		// 	  keyboard: false, 
		// 	  resolve: {
		// 			actualData: function () {
		// 				return self.sampleData;
		// 			}
		// 		} // data passed to the controller
		// 	});
	  
		// 	modalInstance.result.then(function(selectedItem) {
		// 	//   mo.selected = selectedItem;
		// 	}, function() {
		// 	  //console.log("Modal dismissed at: " + new Date());
		// 	});

		//   };



		//---------end of DT code



		// //------------start loadData Function----------------
		// $scope.loadData = function () {

		// 	methodAction = "fetchMultiPopoverData";

		// 	message = [



		// 		{
		// 			"tableName": "MST_Grade",
		// 			"filter": ""
		// 		},
		// 		{
		// 			"tableName": "MST_Section",
		// 			"filter": ""
		// 		}

		// 	];

		// 	$rootScope.loading = true;

		// 	jsonData = connectHostFactory(methodAction, message);
		// 	jsonData.returnData(function (value) {
		// 		//alert('Popover Data='+JSON.stringify(value));

		// 		if (value != null) {


		// 			result = value.fetchMultiPopoverData;

		// 			if (value.success == true) {

		// 				if (result.validSession == true) {
		// 					$scope.popoverWrapper = result.popoverWrapper;
		// 				}
		// 				else {
		// 					messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 				}
		// 			}
		// 			else {

		// 				messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 			}

		// 		}
		// 		else {

		// 			messageFactory(appConstants.SYSTEM_ERROR);

		// 		}

		// 		$rootScope.loading = false;

		// 	});

		// 	/* methodAction="fetchStudentsQueue";

		// 	 recordStatus = "Active";

		// 	 message={
		// 							 "status" : recordStatus,
		// 							 "makerId"    :	$rootScope.userid											//makerid

		// 		 };



		// 	 $rootScope.loading=true;
		//  jsonData=connectHostFactory(methodAction,message);
		// 				 jsonData.returnData(function(value){




		// 						if(value != null){

		// 						 //alert('Queue Data value= '+JSON.stringify(value));

		// 							 result=value.fetchStudentsQueue;
		// 							 if(value.success == true){

		// 								 $scope.wrapper=result.studentProfileWrapper;

		// 								 //document.writeln('result.personalDetailsWrapper = '+JSON.stringify(result.personalDetailsWrapper));

		// 									$scope.totalItems = result.studentProfileWrapper.length;

		// 								 // alert('totalItems length '+$scope.totalItems);

		// 									//--pagination--
		// 									$scope.currentPage = 1;
		// 										$scope.itemsPerPage =5;
		// 										$scope.maxSize = 5; //Number of pager buttons to show

		// 										 if($scope.totalItems >  $scope.itemsPerPage && $scope.totalItems != null)
		// 										 {
		// 										 $scope.pagination=true;
		// 										 }
		// 										 //---pagination end--

		// 							 }
		// 							 else{
		// 								 //messageFactory('No response from host system');
		// 								 messageFactory(appConstants.SYSTEM_NORECORDS);
		// 							 }
		// 						}
		// 						else{
		// 						 // messageFactory('Error encountered,Please contact system administrator');
		// 							messageFactory(appConstants.SYSTEM_ERROR);
		// 						}
		// 						$rootScope.loading=false;

		// 				 });*/
		// } //------------ends loadData Function----------------



		//------------start loadData Function----------------
		$scope.loadData = function () {

			var deferred = $q.defer();


			methodAction = "fetchMultiPopoverData";
			message = [
				{
					"tableName": "MST_Grade",
					"filter": ""
				},
				{
					"tableName": "MST_Section",
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

							deferred.resolve($scope.popoverWrapper);

						}
					}

				}

				$rootScope.loading = false;

			});

			return deferred.promise;

		} //------------ends loadData Function----------------


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

		$scope.searchData = function () {


			var deferred = $q.defer();

			//if($scope.form.studentID.$valid || $scope.form.studentName.$valid || $scope.form.surname.$valid || $scope.form.grade.$valid || $scope.form.sectionID.$valid) {	 


			methodAction = "fetchUsersStaff";

			message = {};

			console.log('Search Student Data= '+JSON.stringify(message));
			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				$scope.pagination = false;

				//console.log('OnBoard Data= '+JSON.stringify(value));
				if (value != null) {

					result = value.fetchUsersStaff;

					if (value.success == true) {

						if (result.validSession == true && result.usersWrapper[0].recordFound == true) {

							$scope.wrapper = result.usersWrapper;

							
							// profileTable.clear();
							// profileTable.rows.add($scope.wrapper);
							// profileTable.draw();

							// profileTable.on('click', 'tr', function () {
							// 	console.log(profileTable.row(this).data());
							// 	var rowData = profileTable.row(this).data();
							// 	console.log(rowData.refNo + "'s salary is: " + rowData["studentName"]);

							// });

							//$scope.modalHidden = true;

							//$scope.downloadFileFirestorage(); //saikiran 13-Apr-2019
							//--pagination--

							//alert('OnBoard Data= '+JSON.stringify($scope.wrapper));
							console.log('profile data ' + JSON.stringify($scope.wrapper));


						}
						else {

							$scope.wrapper = '';
						}
					}
				}

				deferred.resolve($scope.wrapper);

				$rootScope.loading = false;
				$scope.buttonDisabled = false;

			});

			return deferred.promise;

		}


		//  //------------start saveData Function----------------
		// $scope.searchData=function(){


		// 	//($scope.form.academicYear.$valid && ($scope.form.studentName.$valid || $scope.form.surname.$valid) )


		// 	 //if($scope.form.studentID.$valid || $scope.form.studentName.$valid || $scope.form.surname.$valid || $scope.form.grade.$valid || $scope.form.sectionID.$valid) {	 


		// 				    methodAction="fetchStudentSearch";

		// 					message={
		// 				    		      "studentID" : "",//$scope.wrapper.studentID,
		// 				    		      "studentName" : "rajesh",//$scope.wrapper.studentName,
		// 				    		      "surname" : "",//$scope.wrapper.surname,
		// 				    		      "gradeID" : "",//$scope.wrapper.grade,
		// 				    		      "sectionID" : "",//$scope.wrapper.sectionID

		// 				    		     /* "academicYearID" : $scope.wrapper.academicYear*/


		// 							    };

		// 					//alert('Search Student Data= '+JSON.stringify(message));
		// 					$scope.buttonDisabled=true;
		// 					$rootScope.loading=true;

		// 					jsonData=connectHostFactory(methodAction,message);
		// 									jsonData.returnData(function(value){



		// 										 $scope.pagination=false;

		// 										//alert('OnBoard Data= '+JSON.stringify(value));
		// 										if(value != null){

		// 											result=value.fetchStudentSearch;

		// 											if(value.success == true){

		// 													if(result.validSession==true && result.studentProfileWrapper[0].recordFound==true)
		// 													{

		// 														$scope.wrapper=result.studentProfileWrapper;

		// 														profileTable.clear();
		// 														profileTable.rows.add($scope.wrapper);
		// 														profileTable.draw();

		// 														profileTable.on( 'click', 'tr', function () {
		// 															console.log( profileTable.row( this ).data() );
		// 																var rowData = profileTable.row( this ).data() ;
		// 																console.log( rowData.refNo +"'s salary is: "+ rowData["studentName"] );

		// 														} );

		// 														$scope.modalHidden=true;

		// 														//$scope.downloadFileFirestorage(); //saikiran 13-Apr-2019
		// 														 //--pagination--

		// 														 //alert('OnBoard Data= '+JSON.stringify($scope.wrapper));
		// 														console.log('profile data ' +JSON.stringify($scope.wrapper));


		// 														 $scope.totalItems = result.studentProfileWrapper.length;
		// 														 $scope.currentPage = 1;
		// 													  	 $scope.itemsPerPage =5;
		// 													  	 $scope.maxSize = 5; //Number of pager buttons to show


		// 													  	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
		// 													  	  {
		// 													  		$scope.pagination=true;

		// 													  	  }
		// 													  	  //---pagination end--

		// 													}
		// 													else if(result.validSession==false)
		// 													{
		// 															messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 													}
		// 													else{

		// 														$scope.wrapper='';

		// 														messageFactory(appConstants.SYSTEM_NORECORDS);

		// 													}
		// 											}
		// 											else{
		// 												//messageFactory('No response from host system');
		// 												messageFactory(appConstants.SYSTEM_NORECORDS);

		// 											}
		// 										}
		// 										else{
		// 											//messageFactory('Error encountered,Please contact system administrator');
		// 											messageFactory(appConstants.SYSTEM_ERROR);
		// 										}
		// 										$rootScope.loading=false;
		// 										 $scope.buttonDisabled=false;

		// 									});
		// 	 		//}

		// 		//else{


		// 			    /*if (angular.isDefined($scope.wrapper.academicYear) || $scope.wrapper.academicYear != null) {

		// 				    messageFactory('Please enter Name or Surname to search with academic year');

		// 			   }
		// 			   else{*/

		// 				 //messageFactory('Enter data before search');
		// 			   //}
		// 			//}
		// }

		/*end search Data*/
		// $scope.selectedData = function (refNo, studentID, studentName, surname, gradeID, sectionID, academicYearID) {





		// 	sharedProperties.setRefNo(refNo);


		// 	sharedProperties.setStudentID(studentID);
		// 	sharedProperties.setStudentName(studentName);
		// 	sharedProperties.setSurname(surname);
		// 	sharedProperties.setGradeID(gradeID);
		// 	sharedProperties.setSectionID(sectionID);
		// 	sharedProperties.setAcademicYearID(academicYearID);

		// 			//alert('shared data'+sharedProperties.getRefNo() +sharedProperties.getStudentID() +sharedProperties.getStudentName()  +sharedProperties.getGrade() +sharedProperties.getSection() +sharedProperties.getAcademicYear());



		// 			//$rootScope.isTabBarDisable = true;
		// 			//$rootScope.selectedIndex = 0;
		// 		/*	if(sharedProperties.getMenu() == 'studentProfile')
		// 			{
		// 			*/	sharedProperties.setActionMode('UPDATE');
		// 	//}

		// 	// console.log('sel ' + sharedProperties.getMenu());


		// 	$location.path('/' + sharedProperties.getMenu());

		// }


		// $scope.datepickers = {
		// 	searchStartDate: false,
		// 	searchEndDate: false
		// }

		// $scope.open = function ($event, which) {

		// 	$event.preventDefault();
		// 	$event.stopPropagation();

		// 	$scope.datepickers[which] = true;

		// };

		//-----pagenation--
		/* $scope.filteredTodos = [];
		 $scope.currentPage = 1;
		 $scope.numPerPage = 10;
		 $scope.maxSize = 5;
		 
		 $scope.makeTodos = function() {
			 $scope.wrapper = [];
			 for (var i=0;i<=$scope.wrapper.length-1;i++) {
				 $scope.wrapper.push({ text:'todo '+i, done:false});
			 }
		 };
		 //$scope.makeTodos(); 
		 
		 $scope.$watch('currentPage + numPerPage', function() {
			 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			 , end = begin + $scope.numPerPage;
			 
			 $scope.filteredTodos = $scope.wrapper.slice(begin, end);
			 
		 });*/


		//-----------get image from firestorage-----
		$scope.downloadFileFirestorage = function () {

			//console.log(JSON.stringify($scope.wrapper));

			//let is used to avoid variable problem inside promise
			for (let i = 0; i < $scope.wrapper.length; i++) {
				//console.log ('inside download ' + sharedProperties.getStudentID());
				firestorageFactory.fileDownloadFirestorage($scope.wrapper[i].schoolID + '/images/student/' + $scope.wrapper[i].studentID + '/avatar/' + $scope.wrapper[i].studentID)
					.then(function (result) {
						// console.log('result ' + result);
						// console.log('schoolID ' + $scope.wrapper[i].schoolID);
						$scope.wrapper[i].avatar = result;

					});
			}

		}

		//-----pagenation end--

		//---------- back button---------
		// $scope.btnBack = function () {

		// 	$location.path('/dashBoard');
		// }

		//----------end -back button----------





		// // Array to track the ids of the details displayed rows
		// var detailRows = [];

		// $('#example tbody').on( 'click', 'tr td.details-control', function () {
		// 		var tr = $(this).closest('tr');
		// 		var row = dt.row( tr );
		// 		var idx = $.inArray( tr.attr('id'), detailRows );

		// 		if ( row.child.isShown() ) {
		// 				tr.removeClass( 'details' );
		// 				row.child.hide();

		// 				// Remove from the 'open' array
		// 				detailRows.splice( idx, 1 );
		// 		}
		// 		else {
		// 				tr.addClass( 'details' );
		// 				row.child( format( row.data() ) ).show();

		// 				// Add to the 'open' array
		// 				if ( idx === -1 ) {
		// 						detailRows.push( tr.attr('id') );
		// 				}
		// 		}
		// } );

	}]);

})();