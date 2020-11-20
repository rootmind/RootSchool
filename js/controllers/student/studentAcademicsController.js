(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('studentAcademicsController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', 'firestorageFactory', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, firestorageFactory, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];

		$scope.academicsWrapper = [];

		// $scope.menuName= sharedProperties.getMenuName();
		// $scope.refNo= sharedProperties.getRefNo();
		// $scope.studentName=sharedProperties.getStudentName();
		// $scope.surname=sharedProperties.getSurname();
		// $scope.avatar=null;

		// $scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		// $scope.gradeIDValue= sharedProperties.getGradeIDValue();
		// $scope.sectionIDValue= sharedProperties.getSectionIDValue();


		// $scope.currentAcademicYearID= sharedProperties.getAcademicYearID();

		// $scope.academicYearID= sharedProperties.getAcademicYearID();
		// $scope.gradeID= sharedProperties.getGradeID();
		// $scope.sectionID= sharedProperties.getSectionID();

		/*$scope.menu= sharedProperties.getMenu();

	
		$scope.actionMode=sharedProperties.getActionMode();*/



		//$scope.editableOption = true;
		//$rootScope.isTabBarDisable=true;


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			refNo: $ctrl.passInfo[0], studentID: $ctrl.passInfo[1], gradeID: $ctrl.passInfo[2],
			sectionID: $ctrl.passInfo[3], subjectID: $ctrl.passInfo[4], termID: $ctrl.passInfo[5],
			studentName: $ctrl.passInfo[6], securedMarks: $ctrl.passInfo[7]
		};

		//console.log ('item ' + $ctrl.selected.studentID);
		$scope.wrapper.refNo = $ctrl.selected.refNo;
		$scope.wrapper.studentID = $ctrl.selected.studentID;
		$scope.wrapper.gradeID = $ctrl.selected.gradeID;
		$scope.wrapper.sectionID = $ctrl.selected.sectionID;
		$scope.wrapper.subjectID = $ctrl.selected.subjectID;
		$scope.wrapper.termID = $ctrl.selected.termID;
		$scope.wrapper.studentName = $ctrl.selected.studentName;
		$scope.wrapper.securedMarks = $ctrl.selected.securedMarks;

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.studentID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------


		//--------fetchuserMenu------------
		$scope.loadData = function () {

			var deferred = $q.defer();

			//console.log('test3 '+$scope.loginForm.$valid);
			//if ($scope.loginForm.$valid) {

			methodAction = "fetchStudentAcademics";

			message = {

				"academicYearID": "",//$scope.wrapper.academicYearID,
				"refNo": $scope.wrapper.refNo,
				"studentID": $scope.wrapper.studentID,
				"gradeID": $scope.wrapper.gradeID,
				"sectionID": $scope.wrapper.sectionID,
				"termID": $scope.wrapper.termID,
				"subjectID": $scope.wrapper.subjectID



			};

			$rootScope.loading = true;

			console.log('message academics ' + JSON.stringify(message));

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchStudentAcademics;

					console.log('result academics ' + JSON.stringify(result));

					if (value.success == true) {

						if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {
							$scope.wrapper = result.studentAcademicsWrapper[0];
							$scope.wrapper.studentName = $ctrl.selected.studentName;


						}
						else {

							$scope.studentAcademicsWrapper = '';
						}
					}


				}

				$rootScope.loading = false;
				deferred.resolve($scope.studentAcademicsWrapper);
			});
			//}


			return deferred.promise;
		}
		//-------end fetchuserMenu---------


		//     //------------start loadData Function----------------

		// $scope.loadData=function(){



		// 	methodAction="fetchMultiPopoverData";

		// 	message=[

		// 	             {
		// 					 "tableName" : "MST_Term",
		// 				 	 "filter" : ""    		
		// 			     },

		// 			     {
		// 					 "tableName" : "MST_Subject",
		// 				     "filter" : ""    		
		// 				 },
		// 				 {
		// 					 "tableName" : "MST_AcademicYear",
		// 				 	 "filter" : ""    		
		// 			     },
		// 				 {
		// 					 "tableName" : "MST_Grade",
		// 				 	 "filter" : ""    		
		// 			     },
		// 			     {
		// 					 "tableName" : "MST_Section",
		// 				 	 "filter" : ""    		
		// 			     },
		// 			     {
		// 					 "tableName" : "MST_Rank",
		// 				 	 "filter" : ""    		
		// 			     }
		// 			];

		// 		    $rootScope.loading=true;

		// 			jsonData=connectHostFactory(methodAction,message);
		// 			jsonData.returnData(function(value){

		// 					//alert('Popover Data='+JSON.stringify(value));

		// 					if(value != null){



		// 								result=value.fetchMultiPopoverData;

		// 								if(value.success == true){

		// 									if(result.validSession==true)
		// 									{
		// 									$scope.popoverWrapper=result.popoverWrapper;


		// 									$scope.wrapper.studentID= sharedProperties.getStudentID();
		// 									$scope.wrapper.studentName= sharedProperties.getStudentName();
		// 									$scope.wrapper.gradeID= sharedProperties.getGradeID();
		// 									$scope.wrapper.sectionID= sharedProperties.getSectionID();
		// 									$scope.wrapper.academicYearID= sharedProperties.getAcademicYearID();

		// 									$scope.downloadFileFirestorage($scope.wrapper.studentID);

		// 									//sharedProperties.setAcademicYearID('');
		// 									sharedProperties.setGradeID('');
		// 									sharedProperties.setSectionID('');
		// 									}
		// 									else if(result.validSession==false)
		// 									{
		// 											messageFactory(appConstants.SYSTEM_INVALIDSESSION);
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

		// 			 if(sharedProperties.getActionMode()=='UPDATE'){

		// 				 //alert('$scope.wrapper.academicYearID = '+$scope.wrapper.academicYearID);

		// 				 $scope.searchData();

		// 					/*methodAction="fetchStudentAcademics";

		// 					message={
		// 							      "refNo" : sharedProperties.getRefNo(),
		// 							      "studentID" : sharedProperties.getStudentID(),
		// 							      "academicYearID" :sharedProperties.getAcademicYearID() //$scope.wrapper.academicYearID,
		// 						    };

		// 					$rootScope.loading=true;	 	

		// 					jsonData=connectHostFactory(methodAction,message);

		// 						jsonData.returnData(function(value){

		// 							if(value != null){

		// 									result=value.fetchStudentAcademics;

		// 									if(value.success == true){

		// 												if(result.studentAcademicsWrapper[0].recordFound==true)
		// 												{
		// 														$scope.wrapper=result.studentAcademicsWrapper;

		// 														$scope.wrapper.studentID= result.studentAcademicsWrapper[0].studentID;
		// 														$scope.wrapper.academicYearID= result.studentAcademicsWrapper[0].academicYearID;
		// 														$scope.wrapper.gradeID= result.studentAcademicsWrapper[0].gradeID;
		// 														$scope.wrapper.sectionID= result.studentAcademicsWrapper[0].sectionID;

		// 														$scope.totalItems = $scope.wrapper.length;

		// 														//alert('totalItems = '+$scope.totalItems);

		// 														//--pagination--
		// 														 $scope.currentPage = 1;
		// 													  	 $scope.itemsPerPage =5;
		// 													  	 $scope.maxSize = 5; //Number of pager buttons to show

		// 												  	  if($scope.totalItems >  $scope.itemsPerPage && $scope.totalItems != null)
		// 												  	  {
		// 												  		$scope.pagination=true;
		// 												  	  }
		// 												  	  //---pagination end--
		// 												}

		// 												else{
		// 														messageFactory(appConstants.SYSTEM_NORECORDS);
		// 												}
		// 									}

		// 									else{
		// 											messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 									}

		// 							}
		// 							else{
		// 								messageFactory(appConstants.SYSTEM_ERROR);
		// 							}

		// 							$rootScope.loading=false;
		// 						});*/

		//  			}	



		//  }   //------------------- ends loadData Function-----------------       





		//--------------start saveData Function-----------------

		$scope.saveData = function () {

			/*if($scope.wrapper.securedMarks > $scope.wrapper.targetMarks)
			{
				messageFactory('Secured marks should be less than target marks');
				return;
			}*/

			alertsManager.clearAlerts();

			//$scope.submitted = true;

			if ($scope.loginForm.$valid) {


				methodAction = "updateStudentAcademics";



				message = {

					"refNo": $scope.wrapper.refNo,
					"studentID": $scope.wrapper.studentID,
					"academicYearID": $scope.wrapper.academicYearID,
					"gradeID": $scope.wrapper.gradeID,
					"sectionID": $scope.wrapper.sectionID,
					"termID": $scope.wrapper.termID,
					"subjectID": $scope.wrapper.subjectID,
					// "targetMarks" : $scope.wrapper.targetMarks,
					"securedMarks": $scope.wrapper.securedMarks,
					"percentage": $scope.wrapper.percentage,
					"rankID": $scope.wrapper.rankID
					//"recordStatus" : sharedProperties.getRecordStatus()

				};

				console.log('save message =' + JSON.stringify(message));

				$scope.buttonDisabled = true;
				$rootScope.loading = true;


				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					console.log('Value personal Data= ' + JSON.stringify(value));

					if (value != null) {

						result = value.updateStudentAcademics;

						console.log('result academics ' + JSON.stringify(result));


						if (value.success == true) {

							if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {


								console.log('result1 academics ' + JSON.stringify(result));


								messageFactory(appConstants.RECORD_UPDATED, appConstants.success);
								$ctrl.ok();


							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {


								for (var i = 0; i < result.errorWrapper.length; i++) {

									$scope.error = result.errorWrapper[i].errorDesc;
									alertsManager.addAlert($scope.error, 'alert-error');
									$scope.alerts = alertsManager.alerts;
									messageFactory($scope.error, appConstants.warning);

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
					$scope.buttonDisabled = false;
				});
			}


		}  //------------ends saveData Function-------------



		// $scope.searchData = function () {

		// 	//alert('search data');

		// 	//---------TO RELOAD UPDATED RECORD--------
		// 	methodAction = "fetchStudentAcademics";

		// 	message = {
		// 		"refNo": sharedProperties.getRefNo(),
		// 		"studentID": sharedProperties.getStudentID(),
		// 		"academicYearID": $scope.wrapper.academicYearID
		// 	};

		// 	//alert('SearchData message ' +JSON.stringify(message));

		// 	$rootScope.loading = true;

		// 	jsonData = connectHostFactory(methodAction, message);

		// 	jsonData.returnData(function (value) {

		// 		if (value != null) {

		// 			result = value.fetchStudentAcademics;

		// 			//alert('Value  Data= '+JSON.stringify(value));

		// 			if (value.success == true) {

		// 				if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {

		// 					$scope.academicsWrapper = result.studentAcademicsWrapper;
		// 					//alert('$scope.academicsWrapper= '+JSON.stringify($scope.academicsWrapper));

		// 					$scope.wrapper.studentID = result.studentAcademicsWrapper[0].studentID;
		// 					$scope.wrapper.academicYearID = result.studentAcademicsWrapper[0].academicYearID;
		// 					$scope.wrapper.gradeID = result.studentAcademicsWrapper[0].gradeID;
		// 					$scope.wrapper.sectionID = result.studentAcademicsWrapper[0].sectionID;


		// 					//alert('allocation ');
		// 					//--------
		// 					$scope.submitted = false;
		// 					$scope.form.termID.$invalid = true;
		// 					$scope.form.termID.$dirty = false;
		// 					$scope.form.subjectID.$invalid = true;
		// 					$scope.form.subjectID.$dirty = false;
		// 					//$scope.form.targetMarks.$invalid=true;
		// 					//$scope.form.targetMarks.$dirty=false;
		// 					$scope.form.securedMarks.$invalid = true;
		// 					$scope.form.securedMarks.$dirty = false;
		// 					//$scope.form.percentage.$invalid=true;
		// 					//$scope.form.percentage.$dirty=false;
		// 					//$scope.form.rankID.$invalid=true;
		// 					//$scope.form.rankID.$dirty=false;
		// 					//-------------


		// 					//alert('pagination start');


		// 					//--pagination--

		// 					$scope.totalItems = result.studentAcademicsWrapper.length;
		// 					//alert('totalItems = '+$scope.totalItems);
		// 					$scope.currentPage = 1;
		// 					$scope.itemsPerPage = 5;
		// 					$scope.maxSize = 5; //Number of pager buttons to show


		// 					if ($scope.totalItems > $scope.itemsPerPage && $scope.totalItems != null) {
		// 						$scope.pagination = true;

		// 					}
		// 					//---pagination end--

		// 					//alert('pagination end');

		// 				}
		// 				else if (result.validSession == false) {
		// 					messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 				}
		// 				else {
		// 					messageFactory(appConstants.SYSTEM_NORECORDS);
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

		// 	//return;
		// 	//--------------END--------------------
		// }


		//------------start loadStudentAcademics Function----------------

		$scope.loadScholastic = function () {


			//$scope.downloadFileFirestorage(sharedProperties.getStudentID());

			methodAction = "fetchStudentAcademicScholastic";

			message = {
				"refNo": sharedProperties.getRefNo(),
				"studentID": sharedProperties.getStudentID(),
				"gradeID": sharedProperties.getGradeID()

			};
			//alert('message='+JSON.stringify(message));
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				//alert('value='+JSON.stringify(value));
				if (value != null) {

					result = value.fetchStudentAcademicScholastic;

					if (value.success == true) {

						if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {
							$scope.wrapper = result.studentAcademicsWrapper;


							//alert("Scholastic wrapper "+JSON.stringify($scope.wrapper));
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
			});



		}   //------------------- ends loadStudentAcademics Function-----------------






		//--------START btnBack function-----------

		//  $scope.btnBack=function(){

		//   	$location.path('/queue');
		//  }

		//--------ends btnBack function----------- 


		// $scope.setRowData = function(studentID,academicYearID,gradeID,sectionID,termID,subjectID,securedMarks) {

		//   $scope.editableOption =true;

		//   $scope.wrapper.studentID= '';
		//   $scope.wrapper.academicYearID= '';
		//   $scope.wrapper.gradeID= '';
		//   $scope.wrapper.sectionID= '';

		//   $scope.wrapper.termID= '';
		//   $scope.wrapper.subjectID= '';
		//  // $scope.wrapper.targetMarks= '';
		//   $scope.wrapper.securedMarks= '';
		//   //$scope.wrapper.percentage= '';
		//   //$scope.wrapper.rankID= '';

		//  // alert('code '+ code + 'desc '+description +'filter ='+filter);

		//   $scope.wrapper.studentID= studentID;
		//   $scope.wrapper.academicYearID=academicYearID;
		//   $scope.wrapper.gradeID= gradeID;
		//   $scope.wrapper.sectionID= sectionID;

		//   $scope.wrapper.termID= termID;
		//   $scope.wrapper.subjectID=subjectID;
		//   //$scope.wrapper.targetMarks= targetMarks;
		//   $scope.wrapper.securedMarks= securedMarks;
		//  // $scope.wrapper.percentage= percentage;
		//   //$scope.wrapper.rankID=rankID;
		// };



		// $scope.clear = function(){

		//   $scope.editableOption = false;

		//     $scope.submitted = false;


		//      $scope.wrapper.code='';
		//      $scope.wrapper.description='';
		//      $scope.wrapper.filterName='';

		//   //$scope.wrapper.academicYearID='';
		//  // $scope.wrapper.gradeID= '';
		//   //$scope.wrapper.sectionID= '';

		//   $scope.wrapper.termID= '';
		//   $scope.wrapper.subjectID= '';
		//   //$scope.wrapper.targetMarks= '';
		//   $scope.wrapper.securedMarks= '';
		//   //$scope.wrapper.percentage= '';
		//  // $scope.wrapper.rankID='';

		//     //$scope.form.academicYearID.$invalid=true;
		//    //$scope.form.academicYearID.$dirty=false;
		//     //$scope.form.gradeID.$invalid=true;
		//     //$scope.form.gradeID.$dirty=false;
		//     //$scope.form.sectionID.$invalid=true;
		//     //$scope.form.sectionID.$dirty=false;
		//     $scope.form.termID.$invalid=true;
		//     $scope.form.termID.$dirty=false;
		//     $scope.form.subjectID.$invalid=true;
		//     $scope.form.subjectID.$dirty=false;
		//     $scope.form.securedMarks.$invalid=true;
		//     $scope.form.securedMarks.$dirty=false;
		//     //$scope.form.rankID.$invalid=true;
		//     //$scope.form.rankID.$dirty=false;

		// }

		//-----------get image from firestorage-----
		$scope.downloadFileFirestorage = function (studentID) {

			//console.log(JSON.stringify($scope.wrapper));

			//let is used to avoid variable problem inside promise
			//console.log ('inside download ' + sharedProperties.getStudentID());
			firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/student/' + studentID + '/avatar/' + studentID)
				.then(function (result) {
					// console.log('result ' + result);
					// console.log('schoolID ' + $scope.wrapper[i].schoolID);
					$scope.avatar = result;

				});

		}

		/*  //-----fetch report
			$scope.printReport=function(){
			  
				//reportsController.printReport("RPT005S","S",$scope.wrapper.studentID,"","");
			  
				alert('click');
			 
							$scope.$root.$broadcast("myEvent",
									{"paramReportID":"RPT005S",
											"paramReportFilter":"S",
											"paramValue1":$scope.wrapper.studentID,
											"paramValue2":"",
											"paramValue3":""});
									  
			  
			}*/


	}]);

})();









