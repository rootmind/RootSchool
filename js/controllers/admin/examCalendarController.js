(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('examCalendarController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$filter', '$q', '$uibModalInstance', 'passInfo', 'uibDateParser', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $filter, $q, $uibModalInstance, passInfo, uibDateParser) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;


		$scope.calendarWrapper = [];
		$scope.wrapper = [];

		$scope.popoverWrapper = [];
		$scope.isButtonDisable = true;


		$scope.menuName = sharedProperties.getMenuName();

		$scope.currentAcademicYearID = sharedProperties.getAcademicYearID();
		$scope.academicYearIDValue = sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue = sharedProperties.getGradeIDValue();
		$scope.sectionIDValue = sharedProperties.getSectionIDValue();

		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		$scope.actionMode=sharedProperties.getActionMode();*/

		//$rootScope.isTabBarDisable=true;

		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			academicYearID: $ctrl.passInfo[0], gradeID: $ctrl.passInfo[1], subjectID: $ctrl.passInfo[2], 
			termID: $ctrl.passInfo[3], statusID: $ctrl.passInfo[4], examDate: $ctrl.passInfo[5], mode:$ctrl.passInfo[6]
		};



		$scope.wrapper.academicYearID = $ctrl.selected.academicYearID;
		$scope.wrapper.gradeID = $ctrl.selected.gradeID;
		$scope.wrapper.subjectID = $ctrl.selected.subjectID;
		$scope.wrapper.termID = $ctrl.selected.termID;
		$scope.wrapper.statusID = $ctrl.selected.statusID;
		$scope.wrapper.examDate = uibDateParser.parse($ctrl.selected.examDate, "dd/MM/yyyy");

		console.log('examDate... ' + $scope.wrapper.examDate);


		if($ctrl.selected.mode=="edit")
		{
			$scope.codeDisabled=true;
		}
		else
		{
			$scope.codeDisabled=false;
		}


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.gradeID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------


		$scope.datepickers = [
            {
                examDate: false
            }];

        $scope.open = function ($event, which) {

            $event.preventDefault();
            $event.stopPropagation();
            $scope.datepickers[which] = true;
        };


		//------------start loadData Function----------------

		$scope.loadData = function () {

			var deferred = $q.defer();

			methodAction = "fetchMultiPopoverData";

			message = [

				{
					"tableName": "MST_Term",
					"filter": ""
				},
				{
					"tableName": "MST_Grade",
					"filter": ""
				},
				{
					"tableName": "MST_ExamStatus",
					"filter": ""
				},
				{
					"tableName": "MST_AcademicYear",
					"filter": ""
				},
				{
					"tableName": "MST_Subject",
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

							//alert('$scope.popoverWrapper ='+JSON.stringify($scope.popoverWrapper));
						}

					}

				}

				$rootScope.loading = false;
				return deferred.promise;

			});

			// /*-----fetchGradeSubjects------*/

			// methodAction="fetchGradeSubjects";

			// message={
			// 			"academicYearID" : $scope.wrapper.academicYearID

			// 		};

			// 			$rootScope.loading=true;

			// 		jsonData=connectHostFactory(methodAction, message);
			// 		jsonData.returnData(function(value){


			// 				if(value != null){


			// 							result=value.fetchGradeSubjects;

			// 							//alert('fetchGradeSubjects result='+JSON.stringify(result));

			// 							if(value.success == true)
			// 							{


			// 								if(result.validSession==true && result.gradeSubjectsWrapper[0].recordFound==true)
			// 								{
			// 									$scope.wrapper=result.gradeSubjectsWrapper;
			// 									$scope.currentAcademicYearID= sharedProperties.getAcademicYearID();
			// 									$scope.wrapper.academicYearID = $scope.currentAcademicYearID
			// 									//alert('$scope.Wrapper ='+JSON.stringify($scope.wrapper));
			// 								}
			// 								else 
			// 								{
			// 										messageFactory(appConstants.SYSTEM_NORECORDS);

			// 								}

			// 							}
			// 							else{

			// 								messageFactory(appConstants.SYSTEM_NORESPONSE);
			// 							}

			// 				}
			// 				else{

			// 					messageFactory(appConstants.SYSTEM_ERROR);

			// 				}

			// 				$rootScope.loading=false;

			// 			});
			// /*-----fetchGradeSubjects end------*/



		}   //------------------- ends loadData Function-----------------       





		//--------------start saveData Function-----------------

		$scope.saveData = function () {


			//alert('messageArrayFlag  '+messageArrayFlag);

			// alertsManager.clearAlerts();

			// $scope.submitted = true;

			if ($scope.loginForm.$valid) {


				console.log('exam date ' + $scope.wrapper.examDate);

				methodAction = "updateExamCalendar";



				// if (messageArrayFlag) //--when the table save call(multiple array)
				// {
				// 	var message = [];

				// 	for (var i = 0; i <= $scope.calendarWrapper.length - 1; i++) {
				// 		message.push({
				// 			"academicYearID": $scope.wrapper[0].academicYearID,
				// 			"gradeID": $scope.calendarWrapper[i].gradeID,
				// 			"termID": $scope.wrapper.termID,
				// 			"subjectID": $scope.calendarWrapper[i].subjectID,
				// 			"examDate": commonControls.dateFormat($scope.calendarWrapper[i].examDate),
				// 			"targetMarks": $scope.calendarWrapper[i].targetMarks
				// 			//"statusID" : $scope.calendarWrapper[i].listpopup[0].statusID

				// 		});
				// 	}
				// } else {
				//------single subject insert
				message = [{
					"academicYearID": $scope.wrapper.academicYearID,
					"gradeID": $scope.wrapper.gradeID,
					"termID": $scope.wrapper.termID,
					"subjectID": $scope.wrapper.subjectID,
					"examDate": commonControls.dateFormat($scope.wrapper.examDate),
					"targetMarks": "0",//$scope.wrapper.targetMarks,
					"statusID" : $scope.wrapper.statusID

				}];
				//}

				console.log('message '+JSON.stringify(message));

				$scope.isButtonDisable = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {


						result = value.updateExamCalendar;

						if (value.success == true) {


							if (result.validSession == true && result.examCalendarWrapper[0].recordFound == true) {

								messageFactory(appConstants.RECORD_UPDATED);
								$ctrl.ok();
								// $scope.clear();
								// $scope.fetchExamCalendar(); // To fetch exam calendar function

							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {



								// for (var i = 0; i < result.errorWrapper.length; i++) {

								// 	$scope.error = result.errorWrapper[i].errorDesc;
								// 	alertsManager.addAlert($scope.error, 'alert-error');
								// 	$scope.alerts = alertsManager.alerts;

								// }


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

		//-------FETCH EXAM CALENDAR-------------//
		$scope.fetchExamCalendar = function () {


			//alert($scope.wrapper.gradeID );  

			if ($scope.form.academicYearID.$valid) {


				methodAction = "fetchExamCalendar";

				message = {
					"academicYearID": $scope.wrapper.academicYearID,
					"gradeID": $scope.wrapper.gradeID,
					"termID": $scope.wrapper.termID
				};

				//alert('fetchExamCalendar message '+JSON.stringify(message));
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);

				jsonData.returnData(function (value) {

					if (value != null) {

						result = value.fetchExamCalendar;

						//document.writeln('result ='+JSON.stringify(result));

						if (value.success == true) {

							if (result.validSession == true && result.recordFound == true && result.examCalendarWrapper[0].recordFound == true) {
								$scope.calendarWrapper = result.examCalendarWrapper;

								// $scope.isButtonDisable = false;
								// //alert('$scope.calendarWrapper ='+JSON.stringify($scope.calendarWrapper));
								// //--pagination--

								// $scope.totalItems = result.examCalendarWrapper.length;
								// $scope.currentPage = 1;
								// $scope.itemsPerPage = 6;
								// $scope.maxSize = 6; //Number of pager buttons to show


								// if ($scope.totalItems > $scope.itemsPerPage && $scope.totalItems != null) {
								// 	$scope.pagination = true;

								// }
								// //---pagination  end--
							}
							else if (result.validSession == false) {
								messageFactory(appConstants.SYSTEM_INVALIDSESSION);
							}
							else {
								$scope.calendarWrapper = '';
								messageFactory(appConstants.SYSTEM_NORECORDS);
							}

							$scope.submitted = false;
							/*$scope.form.subjectID.$invalid=true;
								$scope.form.subjectID.$dirty=false;
								
								$scope.form.examDate.$invalid=true;
								$scope.form.examDate.$dirty=false;*/
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

			}


		}

		//-------FETCH EXAM CALENDAR------------//


		//-------FETCH EXAM CALENDAR_M-------------//
		$scope.fetchExamCalendar_M = function () {


			methodAction = "fetchExamCalendar";

			message = {

				"gradeID": sharedProperties.getGradeID()

			};


			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchExamCalendar;



					if (value.success == true) {

						if (result.validSession == true && result.recordFound == true && result.examCalendarWrapper[0].recordFound == true) {
							$scope.calendarWrapper = result.examCalendarWrapper;
							$scope.isButtonDisable = false;
						}
						else if (result.validSession == false) {
							messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						}
						else {
							messageFactory(appConstants.SYSTEM_NORECORDS);
						}

						$scope.submitted = false;

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



		}

		//-------FETCH EXAM CALENDAR_M------------//



		//  $scope.datepickers = {
		// 		 examDate: false,

		//      }

		//  $scope.open = function($event, which) {

		//   			$event.preventDefault();
		//   			$event.stopPropagation();
		//   			$scope.datepickers[which]= true;
		//  };

		//  $scope.setRowData = function(academicYearIDValue,gradeIDValue,termIDValue,subjectIDValue,examDate,targetMarks) {


		// 	  //alert('AY ='+ academicYearIDValue + 'GV ='+gradeIDValue +'TV ='+termIDValue +'SIDV ='+subjectIDValue+'ED ='+examDate);
		// 	  $scope.wrapper.academicYearID = academicYearIDValue;

		// 	  $scope.wrapper.gradeID = gradeIDValue;

		// 	  $scope.wrapper.termID= termIDValue;

		// 	  $scope.wrapper.subjectID = subjectIDValue;


		// 	  if(examDate!=null && examDate.length>=10)
		// 	  {


		// 		var YYYY = examDate.substring(6);
		// 		var MM = examDate.substring(3, 5);
		// 		var DD = examDate.substring(0,2);

		// 		// console.log( YYYY + " " + MM + " " + DD );
		// 		var newDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10)); 
		// 		// console.log(newDate);

		// 		$scope.wrapper.examDate = newDate;


		// 	  }

		// 	  $scope.wrapper.targetMarks = targetMarks;

		// 	  //$scope.wrapper.statusID = statusID;

		//  };

		//  $scope.clear = function(){

		// 	  $scope.calendarWrapper='';
		// 	  $scope.submitted = false;
		// 	  $scope.wrapper.gradeID= '';
		// 	  $scope.wrapper.termID= '';
		// 	  $scope.wrapper.subjectID= '';
		// 	  $scope.wrapper.examDate= '';
		// 	  $scope.wrapper.targetMarks = '';
		// 	  //$scope.wrapper.statusID = '';

		//       $scope.form.gradeID.$invalid=true;
		//       $scope.form.gradeID.$dirty=false;
		//       $scope.form.termID.$invalid=true;
		//       $scope.form.termID.$dirty=false;
		//       $scope.form.subjectID.$invalid=true;
		//       $scope.form.subjectID.$dirty=false;
		//       $scope.form.examDate.$invalid=true;
		//       $scope.form.examDate.$dirty=false;

		//     //   $scope.form.targetMarks.$invalid=true;
		//     //   $scope.form.targetMarks.$dirty=false;
		//       //$scope.form.statusID.$invalid=true;
		//       //$scope.form.statusID.$dirty=false;


		//   }


		//---------
		/*$scope.showStatus = function(list) {
			//alert('showStatus code'+list);
				if(list.statusID && $scope.popoverWrapper.length) {
					var selected = $filter('filter')($scope.popoverWrapper, {code: list.code});
					return selected.length ? selected[0].text : 'Not set';
				} else {
					return list.statusIDValue || 'Not set';
				}
			};*/
		//--------

		$scope.setTerm = function (term) {

			if (term != null) {
				//alert('term code'+term);

				$scope.termValues = [];
				$scope.termValues = $filter('filter')($scope.popoverWrapper, { tableName: 'MST_Term' }); //| filter:{gradeID:wrapper.gradeID}//{termID:term}

				// alert('  $scope.termValues  value'+ JSON.stringify( $scope.termValues));

				var termObj = $filter('filter')($scope.termValues, { code: term });
				//alert('  termObj  value '+ JSON.stringify(termObj));
				$scope.term = termObj[0].desc;
				//alert('  $scope.term  '+ JSON.stringify($scope.term));
			}

		}


		//  //---------- back button---------
		//    $scope.btnBack=function(){

		// 		$location.path('/dashBoard');
		//    }

		//----------end -back button----------


	}]);

})();









