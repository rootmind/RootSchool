(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('viewStudentAcademicsController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal', '$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;

        $scope.menuName = sharedProperties.getMenuName();

        $scope.academicYearIDValue = sharedProperties.getAcademicYearIDValue();
        $scope.gradeIDValue = sharedProperties.getGradeIDValue();
        $scope.sectionIDValue = sharedProperties.getSectionIDValue();

        $scope.wrapper = [];
        $scope.studentAcademicsWrapper = [];


        $scope.editableOption = true;
        $scope.codeDisabled = true;



        //----------------
        var $ctrl = this;


        //------------------DT code
        var dt = this;
        dt.message = '';
        dt.dtInstance = {};
        dt.infos = {};

        dt.options = DTOptionsBuilder
            .fromFnPromise(function () { return $scope.loadScholastic() }) //call from search button
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
            .withOption('createdRow', createdRow)
            .withOption('headerCallback', headerCallback);


        dt.columns = [
            DTColumnBuilder.newColumn("refNo").withTitle("Ref No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("termIDValue").withTitle("Term").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("subjectIDValue").withTitle("Subject").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa1SecuredMarks").withTitle("FA1").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa1Grade").withTitle("FA1 Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa1PercentDist").withTitle("FA1 %").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa2SecuredMarks").withTitle("FA2").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa2Grade").withTitle("FA2 Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa2PercentDist").withTitle("FA2 %").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa3SecuredMarks").withTitle("FA3").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa3Grade").withTitle("FA3 Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa3PercentDist").withTitle("FA3 %").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa4SecuredMarks").withTitle("FA4").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa4Grade").withTitle("FA4 Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("fa4PercentDist").withTitle("FA4 %").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sa1SecuredMarks").withTitle("SA1").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sa1Grade").withTitle("SA1 Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sa1PercentDist").withTitle("SA1 %").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sa2SecuredMarks").withTitle("SA2").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sa2Grade").withTitle("SA2 Grade").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("sa2PercentDist").withTitle("SA2 %").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("term1Total").withTitle("Term1 Total").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("term2Total").withTitle("Term2 Total").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("finalFATotal").withTitle("FA Total").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("finalSATotal").withTitle("SA Total").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("finalOverallTotal").withTitle("Overall Total").withOption('defaultContent', '-'),



        ];


        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function headerCallback(header) {
            if (!dt.headerCompiled) {
                // Use this headerCompiled field to only compile header once
                dt.headerCompiled = true;
                $compile(angular.element(header).contents())($scope);
            }
        }


        //------------start loadStudentAcademics Function----------------

		$scope.loadScholastic = function () {


			//$scope.downloadFileFirestorage(sharedProperties.getStudentID());

			var deferred = $q.defer();


			methodAction = "fetchStudentAcademicScholastic";

			message = {
				"refNo": sharedProperties.getRefNo(),
				"studentID": sharedProperties.getStudentID(),
				"gradeID": sharedProperties.getGradeID()

			};
			console.log('message='+JSON.stringify(message));
			$rootScope.loading = true;

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchStudentAcademicScholastic;

					console.log('fetchStudentAcademicScholastic result= '+JSON.stringify(result));

					if (value.success == true) {

						if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {
							$scope.studentAcademicsWrapper = result.studentAcademicsWrapper;


							console.log("Scholastic wrapper "+JSON.stringify($scope.studentAcademicsWrapper));
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

				deferred.resolve($scope.studentAcademicsWrapper);

			});


			return deferred.promise;

		}   //------------------- ends loadStudentAcademics Function-----------------





        // //--------------start saveData Function-----------------

        // $scope.saveData = function () {

        // 	//alertsManager.clearAlerts();

        // 	$scope.submitted = true;


        // 	//console.log($scope.loginForm1.$valid + '='  + $scope.wrapper.messageID + '-' + $scope.wrapper.message);


        // 	if ($scope.loginForm.$valid) {


        // 		// if (sharedProperties.getActionMode() == 'UPDATE') {

        // 		// 	methodAction = "updateStudentMessage";

        // 		// }
        // 		// else {

        // 			methodAction = "updateStudentMessage";
        // 		//}



        // 		message = {

        // 			//"refNo": $scope.wrapper.refNo,
        // 			"studentID": $scope.wrapper.studentID,
        // 			"messageID": $scope.wrapper.messageID,
        // 			"message": $scope.wrapper.message
        // 			//"messageDateTime" : $scope.wrapper.messageDateTime,
        // 			//"delivered": $scope.wrapper.delivered,
        // 			//"recordStatus" : sharedProperties.getRecordStatus()

        // 		};

        // 		console.log('savedata ' + JSON.stringify(message));


        // 		$scope.buttonDisabled = true;
        // 		$rootScope.loading = true;

        // 		jsonData = connectHostFactory(methodAction, message);
        // 		jsonData.returnData(function (value) {

        // 			if (value != null) {

        // 				// if (sharedProperties.getActionMode() == 'UPDATE') {

        // 				// 	result = value.updateStudentMessage;

        // 				// }
        // 				// else {

        // 					result = value.updateStudentMessage;

        // 				//}


        // 				if (value.success == true) {


        // 					if (result.validSession == true && result.studentMessageWrapper[0].recordFound == true) {

        // 						//sharedProperties.setActionMode('UPDATE');

        // 						messageFactory('Message sent');
        // 						$ctrl.ok();

        // 					}
        // 					else if (result.validSession == false) {
        // 						messageFactory(appConstants.SYSTEM_INVALIDSESSION);
        // 					}
        // 					else {

        // 						for (var i = 0; i < result.errorWrapper.length; i++) {

        // 							$scope.error = result.errorWrapper[i].errorDesc;
        // 							alertsManager.addAlert($scope.error, 'alert-error');
        // 							$scope.alerts = alertsManager.alerts;

        // 						}

        // 					}

        // 				}
        // 				else {

        // 					messageFactory(appConstants.SYSTEM_NORESPONSE);
        // 				}

        // 			}
        // 			else {

        // 				messageFactory(appConstants.SYSTEM_ERROR);
        // 			}

        // 			$rootScope.loading = false;
        // 			$scope.buttonDisabled = false;
        // 		});
        // 	}


        // }  //------------ends saveData Function-------------


        // $scope.nextPage=function(){ 

        //   		//$rootScope.selectedIndex = 1;
        // 		//$location.path('/' + 'identification');

        // }



        // //--------START btnBack function-----------
        //   $scope.btnBack=function(){
        // 		//$location.path('/queue');
        //    }
        // //--------ends btnBack function----------- 
    }]);

})();









