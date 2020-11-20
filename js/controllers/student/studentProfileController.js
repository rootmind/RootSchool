(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('studentProfileController', ['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', 'firestorageFactory', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, firestorageFactory, $q, $uibModalInstance, passInfo) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;


		$scope.wrapper = [];
		$scope.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

		$scope.menuName = sharedProperties.getMenuName();
		$scope.refNo = sharedProperties.getRefNo();
		$scope.actionMode = sharedProperties.getActionMode();
		$scope.schoolID = sharedProperties.getSchoolID();

		$scope.avatar = "";
		$scope.imageProgress = $rootScope.imageProgress;

		

		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();

		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		*/

		//$rootScope.isTabBarDisable=true;

		//$scope.buttonDisabled = true;


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			refNo: $ctrl.passInfo[0], studentID: $ctrl.passInfo[1], 
			studentName: $ctrl.passInfo[2], mode: $ctrl.passInfo[3], userid:$ctrl.passInfo[4]

		};

		//console.log ('item ' + $ctrl.selected.studentID);
		$scope.wrapper.refNo = $ctrl.selected.refNo;
		$scope.wrapper.studentID = $ctrl.selected.studentID;
		$scope.wrapper.studentName = $ctrl.selected.studentName;
		$scope.actionMode = $ctrl.selected.mode;


		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.studentID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------


		//-----------------
		$scope.imageUpload = function (element) {
			var reader = new FileReader();
			reader.onload = $scope.imageIsLoaded;
			reader.readAsDataURL(element.files[0]);
		}
		$scope.imageIsLoaded = function (e) {

			$scope.$apply(function () {
				$scope.selectedContainer = [];
				$scope.selectedContainer.push(e.target.result);
			});
		}

		//------------start loadData Function----------------

		$scope.loadData = function () {

			var deferred = $q.defer();


			methodAction = "fetchMultiPopoverData";

			message = [

				{
					"tableName": "MST_School",
					"filter": ""
				},
				{
					"tableName": "MST_Branch",
					"filter": ""
				},
				{
					"tableName": "MST_City",
					"filter": ""
				},
				{
					"tableName": "MST_State",
					"filter": ""
				},
				{
					"tableName": "MST_Gender",
					"filter": ""
				},
				{
					"tableName": "MST_Occupation",
					"filter": ""
				},
				{
					"tableName": "MST_Education",
					"filter": ""
				},
				{
					"tableName": "MST_AcademicYear",
					"filter": ""
				},
				{
					"tableName": "MST_District",
					"filter": ""
				},
				{
					"tableName": "MST_Grade",
					"filter": ""
				},
				{
					"tableName": "MST_Section",
					"filter": ""
				},
				{
					"tableName": "MST_Religion",
					"filter": ""
				},
				{
					"tableName": "MST_Decision",
					"filter": ""
				},
				{
					"tableName": "MST_Caste",
					"filter": ""
				},
				{
					"tableName": "MST_BloodGroup",
					"filter": ""
				},
				{
					"tableName": "MST_Bank",
					"filter": ""
				},
				{
					"tableName": "MST_BusPickupPoint",
					"filter": ""
				},
				{
					"tableName": "MST_BusRoute",
					"filter": ""
				},
				{
					"tableName": "MST_CasteCategory",
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

				$scope.buttonDisabled = false;
				$scope.loadStudentProfile();

				//$scope.fetchProfileImage();
				//$scope.downloadFileFirestorage();

			}

			return deferred.promise;

		}   //------------------- ends loadData Function-----------------       



		$scope.setPermAdd = function (flag) {

			if (flag) {

				$scope.wrapper.permAddress1 = $scope.wrapper.address1;
				$scope.wrapper.permAddress2 = $scope.wrapper.address2;
				$scope.wrapper.permAddress3 = $scope.wrapper.address3;
				$scope.wrapper.permCityID = $scope.wrapper.cityID;
				$scope.wrapper.permPINCode = $scope.wrapper.pinCode;
				$scope.wrapper.permDistrictID = $scope.wrapper.districtID;
				$scope.wrapper.permStateID = $scope.wrapper.stateID;

			}
			else {

				$scope.wrapper.permAddress1 = '';
				$scope.wrapper.permAddress2 = '';
				$scope.wrapper.permAddress3 = '';
				$scope.wrapper.permCityID = '';
				$scope.wrapper.permPINCode = '';
				$scope.wrapper.permDistrictID = '';
				$scope.wrapper.permStateID = '';

			}
		};

		//--------------start saveData Function-----------------

		$scope.saveData = function () {


			alertsManager.clearAlerts();

			$scope.submitted = true;

			if ($scope.loginForm.$valid) {


				if (sharedProperties.getActionMode() == 'UPDATE') {

					methodAction = "updateStudentProfile";

				}
				else {

					methodAction = "insertStudentProfile";
				}


				message = {


					"refNo": sharedProperties.getRefNo(),
					"schoolID": $scope.wrapper.schoolID,
					"branchID": $scope.wrapper.branchID,
					"studentID": $scope.wrapper.studentID,
					"studentName": $scope.wrapper.studentName,
					"surname": $scope.wrapper.surname,
					"address1": $scope.wrapper.address1,
					"address2": $scope.wrapper.address2,
					"address3": $scope.wrapper.address3,
					"cityID": $scope.wrapper.cityID,
					"pinCode": $scope.wrapper.pinCode,
					"districtID": $scope.wrapper.districtID,
					"stateID": $scope.wrapper.stateID,
					"permAddress1": $scope.wrapper.permAddress1,
					"permAddress2": $scope.wrapper.permAddress2,
					"permAddress3": $scope.wrapper.permAddress3,
					"permCityID": $scope.wrapper.permCityID,
					"permPINCode": $scope.wrapper.permPINCode,
					"permDistrictID": $scope.wrapper.permDistrictID,
					"permStateID": $scope.wrapper.permStateID,
					"gradeID": $scope.wrapper.gradeID,
					"sectionID": $scope.wrapper.sectionID,
					"academicYearID": $scope.wrapper.academicYearID,
					"joinDate": commonControls.dateFormat($scope.wrapper.joinDate),
					"studentPhotoID": $scope.wrapper.studentPhotoID,
					"dob": commonControls.dateFormat($scope.wrapper.dob),
					"gender": $scope.wrapper.gender,
					"fatherName": $scope.wrapper.fatherName,
					"fatherSurname": $scope.wrapper.fatherSurname,
					"fatherOccupation": $scope.wrapper.fatherOccupation,
					"fatherAge": $scope.wrapper.fatherAge,
					"fatherEducation": $scope.wrapper.fatherEducation,
					"motherName": $scope.wrapper.motherName,
					"motherSurname": $scope.wrapper.motherSurname,
					"motherOccupation": $scope.wrapper.motherOccupation,
					"motherAge": $scope.wrapper.motherAge,
					"motherEducation": $scope.wrapper.motherEducation,
					"primaryMobile": $scope.wrapper.primaryMobile,
					"secondaryMobile": $scope.wrapper.secondaryMobile,
					"primaryEmail": $scope.wrapper.primaryEmail,
					"secondaryEmail": $scope.wrapper.secondaryEmail,
					"userid": $scope.wrapper.userid,
					"status": 'ACTIVE',  //$scope.wrapper.status,   
					"imageID": $scope.wrapper.imageID,
					"thumbnailID": $scope.wrapper.thumbnailID,
					"classTeacher": $scope.wrapper.classTeacher,
					"recordStatus": sharedProperties.getRecordStatus(),
					"aadhaarNo": $scope.wrapper.aadhaarNo,
					"religion": $scope.wrapper.religion,
					"caste": $scope.wrapper.caste,
					"bloodGroup": $scope.wrapper.bloodGroup,
					"busRouteNo": $scope.wrapper.busRouteNo,
					"busPickupPoint": $scope.wrapper.busPickupPoint,
					"driverName": $scope.wrapper.driverName,
					"driverName2": $scope.wrapper.driverName2,
					"driverMobileNo": $scope.wrapper.driverMobileNo,
					"driverMobileNo2": $scope.wrapper.driverMobileNo2,
					"studentEmail": $scope.wrapper.studentEmail,
					"physicallyChallenged": $scope.wrapper.physicallyChallenged,
					"identityMark1": $scope.wrapper.identityMark1,
					"identityMark2": $scope.wrapper.identityMark2,
					"dobInWords": $scope.wrapper.dobInWords,
					"bankAccountNo": $scope.wrapper.bankAccountNo,
					"bankName": $scope.wrapper.bankName,
					"rationCardNo": $scope.wrapper.rationCardNo,
					"fatherAadhaarNo": $scope.wrapper.fatherAadhaarNo,
					"motherAadhaarNo": $scope.wrapper.motherAadhaarNo,
					"parentAnnualIncome": $scope.wrapper.parentAnnualIncome,
					"admissionNo": $scope.wrapper.admissionNo,
					"emiratesID": $scope.wrapper.emiratesID,
					"visaNo": $scope.wrapper.visaNo,
					"uidNo": $scope.wrapper.uidNo,
					"passportNo": $scope.wrapper.passportNo,
					"passportExpiryDate": commonControls.dateFormat($scope.wrapper.passportExpiryDate),
					"passportIssueDate": commonControls.dateFormat($scope.wrapper.passportIssueDate),
					"passportIssuePlace": $scope.wrapper.passportIssuePlace,
					"sameAddressFlag": $scope.wrapper.sameAddressFlag,
					"casteCategory": $scope.wrapper.casteCategory,
					"userid": $scope.wrapper.userid





				};


				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled = true;
				$rootScope.loading = true;

				jsonData = connectHostFactory(methodAction, message);
				jsonData.returnData(function (value) {

					if (value != null) {

						if (sharedProperties.getActionMode() == 'UPDATE') {

							result = value.updateStudentProfile;

						}
						else {

							result = value.insertStudentProfile;

						}


						if (value.success == true) {


							if (result.validSession == true && result.studentProfileWrapper[0].recordFound == true) {




								//sharedProperties.setRefNo(result.studentProfileWrapper[0].refNo);
								$scope.refNo = result.studentProfileWrapper[0].refNo;

								if (sharedProperties.getActionMode() == 'UPDATE') {
									messageFactory(appConstants.RECORD_UPDATED);
								}
								else {

									messageFactory(result.studentProfileWrapper[0].studentName + " " + result.studentProfileWrapper[0].surname + " profile is created");
								}

								sharedProperties.setRefNo(result.studentProfileWrapper[0].refNo);

								sharedProperties.setActionMode('UPDATE');

								$scope.loadStudentProfile();

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
									messageFactory($scope.error);

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

		//------TO ASSIGN DATA TO FIELDS----------
		$scope.loadStudentProfile = function () {

			var deferred = $q.defer();

			methodAction = "fetchStudentProfile";

			message = {
				"refNo": sharedProperties.getRefNo()
			};

			$rootScope.loading = true;

			console.log('fetchStudentProfile  message' + JSON.stringify(message));

			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {

				if (value != null) {

					result = value.fetchStudentProfile;

					console.log('fetchStudentProfile  result' + JSON.stringify(result));


					if (value.success == true) {

						if (result.validSession == true && result.studentProfileWrapper[0].recordFound == true) {
							$scope.wrapper = result.studentProfileWrapper[0];

							$scope.studentName = $scope.wrapper.studentName;
							$scope.surname = $scope.wrapper.surname;

							sharedProperties.setStudentID($scope.wrapper.studentID);

							$scope.wrapper.dob = commonControls.setDateFormat(result.studentProfileWrapper[0].dob);
							$scope.wrapper.joinDate = commonControls.setDateFormat(result.studentProfileWrapper[0].joinDate);
							$scope.wrapper.passportExpiryDate = commonControls.setDateFormat(result.studentProfileWrapper[0].passportExpiryDate);
							$scope.wrapper.passportIssueDate = commonControls.setDateFormat(result.studentProfileWrapper[0].passportIssueDate);


							// if ($scope.wrapper.dob != null && $scope.wrapper.dob.length >= 10) {

							// 	var YYYY = $scope.wrapper.dob.substring(6);
							// 	var MM = $scope.wrapper.dob.substring(3, 5);
							// 	var DD = $scope.wrapper.dob.substring(0, 2);

							// 	$scope.wrapper.dob = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

							// }
							// if ($scope.wrapper.joinDate != null && $scope.wrapper.joinDate.length >= 10) {


							// 	var YYYY = $scope.wrapper.joinDate.substring(6);
							// 	var MM = $scope.wrapper.joinDate.substring(3, 5);
							// 	var DD = $scope.wrapper.joinDate.substring(0, 2);

							// 	$scope.wrapper.joinDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));



							// }
							// if ($scope.wrapper.passportExpiryDate != null && $scope.wrapper.passportExpiryDate.length >= 10) {


							// 	var YYYY = $scope.wrapper.passportExpiryDate.substring(6);
							// 	var MM = $scope.wrapper.passportExpiryDate.substring(3, 5);
							// 	var DD = $scope.wrapper.passportExpiryDate.substring(0, 2);

							// 	$scope.wrapper.passportExpiryDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));



							// }
							// if ($scope.wrapper.passportIssueDate != null && $scope.wrapper.passportIssueDate.length >= 10) {


							// 	var YYYY = $scope.wrapper.passportIssueDate.substring(6);
							// 	var MM = $scope.wrapper.passportIssueDate.substring(3, 5);
							// 	var DD = $scope.wrapper.passportIssueDate.substring(0, 2);

							// 	$scope.wrapper.passportIssueDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));


							// }

							if($scope.wrapper.avatar)
							{
								$scope.profileImage = true;
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
		//----------end-----

		//moved to imageupload controller
		//----------Start Fetch profile image--------

		// $scope.fetchProfileImage = function () {


		// 	var deferred = $q.defer();


		// 	methodAction = "fetchImageDetails";
		// 	message = {

		// 		//"refNo": sharedProperties.getRefNo(),								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
		// 		"studentID": sharedProperties.getStudentID(),											//'SA21OCT2015156_25JAN2016173153751.jpg',
		// 		"docID": 'DOC001'													//'C://onboard//images//SA21OCT2015156',
		// 		//'25JAN2016173153751'
		// 	};

		// 	console.log('message fetchimage Data= '+JSON.stringify(message));


		// 	$rootScope.loading = true;

		// 	//jsonData = connectHostImageFactory(methodAction, message);
		// 	jsonData = connectHostFactory(methodAction,message);
		// 	jsonData.returnData(function (value) {

		// 		console.log('Value Data= '+JSON.stringify(value));
		// 		if (value != null) {


		// 			result = value.fetchImageDetails;

		// 			console.log(' fetchImageDetails result= '+JSON.stringify(result));


		// 			if (value.success == true) {

		// 				if (result.validSession == true) {

		// 					//console.log('docIDValue '+result.imageDetailsWrapper[0].docIDValue);

		// 					//$scope.image = value.image;
		// 					$scope.avatar = result.imageDetailsWrapper[0].imageFileFolder;
		// 					//$scope.docName = result.imageDetailsWrapper[0].docIDValue;
		// 					if($scope.avatar)
		// 					{
		// 						$scope.profileImage = true;
		// 					}

		// 					//$scope.downloadFileFirestorage();

		// 				}
		// 				else {
		// 					messageFactory(appConstants.SYSTEM_INVALIDSESSION); //(result.validSession==false)
		// 				}

		// 			}
		// 			else {
		// 				//messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 				$scope.profileImage = false;

		// 			}

		// 		}
		// 		else {
		// 			messageFactory(appConstants.SYSTEM_ERROR);
		// 		}
		// 		$rootScope.loading = false;

		// 		deferred.resolve(result.imageDetailsWrapper);

		// 	});

			
		// 	return deferred.promise;

		// }

		//---------------End Fetch profile image---------

		$scope.datepickers = {
			dob: false,
			joinDate: false,
			passportIssueDate: false,
			passportExpiryDate: false
		}


		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};



		/*$scope.nextPage=function(){ 
				
					//$rootScope.selectedIndex = 1;
				//$location.path('/' + 'identification');
				
		}*/

		function dateDiff(date1, date2) {
			return new Date(Math.abs(date1.getTime() - date2.getTime()));
		}

		/* Calculates the age */
		$scope.getAge = function (dob) {
			//alert('dob '+dob);
			var now = new Date();
			var age = dateDiff(now, new Date(dob));
			$scope.dobAge = age.getFullYear() - 1970;

			//alert('dobAge '+$scope.dobAge);
		};


		// //-----------get image from firestorage-----
		// $scope.downloadFileFirestorage = function () {

		// 	//console.log ('inside download ' + sharedProperties.getStudentID());
		// 	firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/avatar/' + sharedProperties.getStudentID())
		// 		.then(function (result) {

		// 			//console.log('result ' + result);
		// 			$scope.avatar = result;
		// 			if($scope.avatar)
		// 			{
		// 				$scope.profileImage = true;
		// 			}

		// 		});

		// }
		//---------end of fetchimage storage
		// //------------start uploadFile Function----------------
		// $scope.uploadFileFirestorge = function () {


		// 	$scope.submitted = true;

		// 	if ($scope.loginForm.$valid) {

		// 		//console.log('doc value '+ $scope.myFile);

		// 		if (document.getElementById("file").value != "") {

		// 			firestorageFactory.fileUploadFirestorage(sharedProperties.getSchoolID() + '/images/student/' + sharedProperties.getStudentID() + '/avatar/' + sharedProperties.getStudentID() + '_', $scope.myFile[0], document.getElementById('file').files[0].name)
		// 				.then(function (result) {

		// 					$scope.updateImageDetails(result.fileName, result.downloadURL);
		// 					//console.log('result ' + result);
		// 					$scope.avatar = result.downloadURL;
		// 					$scope.profileImage = true;
		// 					$ctrl.ok();


		// 				});



		// 		}
		// 	}
		// }
		// //-------end of upload file firestorage


		// //------download image

		// $scope.loadImage = function () {

		// 	$scope.fetchProfileImage();

		// }

		// //-------

		//--------START btnBack function-----------
		$scope.btnBack = function () {
			$location.path('/queue');
		}
		//--------ends btnBack function----------- 





		//------------start insertImageDetails Function----------------
		$scope.updateImageDetails = function (fileName, downloadURL) {


			$scope.submitted = true;



			//alert('image file c '+JSON.stringify(file));

			//destination = sharedProperties.getRefNo();  //"C://school//images//"


			methodAction = "updateImageDetails";

			// var monthNames = [
			// 	"JAN", "FEB", "MAR",
			// 	"APR", "MAY", "JUN", "JUL",
			// 	"AUG", "SEP", "OCT",
			// 	"NOV", "DEC"
			// ];

			// var date = new Date();
			// //var day = date.getDate();
			// var monthIndex = date.getMonth();
			// //var year = date.getFullYear();
			// //var hh=date.getHours();
			// //var mm=date.getMinutes();
			// //var ss=date.getSeconds();
			// //var ms=date.getMilliseconds();


			// // alert('date Format2='+day+monthNames[monthIndex]+year+hh+mm+ss+ms);
			// //var imageId=day+monthNames[monthIndex]+year+hh+mm+ss+ms;

			// var imageId = date.getDate() + monthNames[monthIndex] + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

			// alert('imageId='+imageId);


			message = {

				//"refNo": sharedProperties.getRefNo(), 					//sharedProperties.getRefNo() //SA28OCT201500001
				"studentID": sharedProperties.getStudentID(), 								//'2343245678',
				"imageId": "avatar", //imageId								//'19DEC2015180907002'
				"imageFileName": fileName,
				"imageFileFolder": downloadURL,
				"imageStatus": 'ACTIVE',
				"docID": "DOC001", //$scope.wrapper.docID,                  //'DOC004',
				"imageUploadStatus": true		//server requires this flag

			};
			console.log('message= ' + JSON.stringify(message));

			$scope.buttonDisabled = true;
			$rootScope.loading = true;

			//jsonData = connectHostImageFactory(methodAction, message, destination, file);

			jsonData = connectHostFactory(methodAction,message);

			jsonData.returnData(function (value) {


				//document.writeln('Image Value Data= '+JSON.stringify(value))

				console.log('Image Value Data= ' + JSON.stringify(value));


				if (value != null) {

					result = value.updateImageDetails;
					//alert('success= '+ value.success);

					if (value.success == true) {


						if (result.validSession == true && (result.imageDetailsWrapper[0].imageUploadStatus) == true) {

							messageFactory('Image uploaded successfuly');

							//--------Dialog end----------------
						}
						else if (result.validSession == false) {
							messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						}
						else {
							messageFactory('Image upload failed,Try again');

						}
						//$scope.wrapper=result.imageDetailsWrapper[0];

						console.log('imageFileName ' + result.imageDetailsWrapper[0].imageFileName);
					}
					else {
						//messageFactory('No response from host system');

						messageFactory(appConstants.SYSTEM_NORESPONSE);
					}
				}
				else {
					//messageFactory('Error encountered,Please contact system administrator');
					messageFactory(appConstants.SYSTEM_ERROR);
				}

				$rootScope.loading = false;

				$scope.buttonDisabled = false;
			});



		};  //------------ends insertImageDetails Function----------------


		$scope.$watch(function() {
			return $rootScope.imageProgress;
		  }, function() {
			$scope.imageProgress = $rootScope.imageProgress;
		  }, true);


	}]);

})();









