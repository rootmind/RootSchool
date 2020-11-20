(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('imageUploadController', ['$scope', '$rootScope', 'connectHostFactory', 'sharedProperties', 'commonControls', 'messageFactory', 'appConstants', 'firestorageFactory', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, sharedProperties, commonControls, messageFactory, appConstants, firestorageFactory, $q, $uibModalInstance, passInfo) {


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

		


		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			refNo: $ctrl.passInfo[0], studentID: $ctrl.passInfo[1], 
            studentName: $ctrl.passInfo[2], mode: $ctrl.passInfo[3], 
            docID:$ctrl.passInfo[4], resourceType:$ctrl.passInfo[5],
            imageID:$ctrl.passInfo[6]

		};

		//console.log ('item ' + $ctrl.selected.studentID);
		$scope.wrapper.refNo = $ctrl.selected.refNo;
		$scope.wrapper.studentID = $ctrl.selected.studentID;
		$scope.wrapper.studentName = $ctrl.selected.studentName;
        $scope.actionMode = $ctrl.selected.mode;
        $scope.wrapper.docID = $ctrl.selected.docID;
        $scope.wrapper.resourceType=$ctrl.selected.resourceType;
        $scope.wrapper.imageID = $ctrl.selected.imageID;


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

		

		//----------Start Fetch profile image--------

		$scope.fetchProfileImage = function () {


			var deferred = $q.defer();


			methodAction = "fetchImageDetails";
			message = {

				//"refNo": sharedProperties.getRefNo(),								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
				"studentID":   $scope.wrapper.studentID,//sharedProperties.getStudentID(),											//'SA21OCT2015156_25JAN2016173153751.jpg',
				"docID": $scope.wrapper.docID//'DOC001'													//'C://onboard//images//SA21OCT2015156',
				//'25JAN2016173153751'
			};

			console.log('message fetchimage Data= '+JSON.stringify(message));


			$rootScope.loading = true;

			//jsonData = connectHostImageFactory(methodAction, message);
			jsonData = connectHostFactory(methodAction,message);
			jsonData.returnData(function (value) {

				console.log('Value Data= '+JSON.stringify(value));
				if (value != null) {


					result = value.fetchImageDetails;

					console.log(' fetchImageDetails result= '+JSON.stringify(result));


					if (value.success == true) {

						if (result.validSession == true) {

							//console.log('docIDValue '+result.imageDetailsWrapper[0].docIDValue);

							//$scope.image = value.image;
							$scope.avatar = result.imageDetailsWrapper[0].imageFileFolder;
							//$scope.docName = result.imageDetailsWrapper[0].docIDValue;
							if($scope.avatar)
							{
								$scope.profileImage = true;
							}

							//$scope.downloadFileFirestorage();

						}
						else {
							messageFactory(appConstants.SYSTEM_INVALIDSESSION); //(result.validSession==false)
						}

					}
					else {
						//messageFactory(appConstants.SYSTEM_NORESPONSE);
						$scope.profileImage = false;

					}

				}
				else {
					messageFactory(appConstants.SYSTEM_ERROR);
				}
				$rootScope.loading = false;

				deferred.resolve(result.imageDetailsWrapper);

			});

			
			return deferred.promise;

		}

		
		//-----------get image from firestorage-----
		$scope.downloadFileFirestorage = function () {

			//console.log ('inside download ' + sharedProperties.getStudentID()); //sharedProperties.getStudentID()
			firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/'+ $scope.wrapper.imageID + '/' + $scope.wrapper.studentID )
				.then(function (result) {

					//console.log('result ' + result);
					$scope.avatar = result;
					if($scope.avatar)
					{
						$scope.profileImage = true;
					}

				});

		}
		//---------end of fetchimage storage
		//------------start uploadFile Function----------------
		$scope.uploadFileFirestorge = function () {


			$scope.submitted = true;

			if ($scope.loginForm.$valid) {

				//console.log('doc value '+ $scope.myFile);

				if (document.getElementById("file").value != "") {

					$rootScope.loading = true;

					firestorageFactory.fileUploadFirestorage(sharedProperties.getSchoolID() + '/images/ '+ $scope.wrapper.resourceType +' /' + $scope.wrapper.studentID + '/'+$scope.wrapper.imageID+'/' + $scope.wrapper.studentID + '_', $scope.myFile[0], document.getElementById('file').files[0].name)
						.then(function (result) {

							$scope.updateImageDetails(result.fileName, result.downloadURL);
							//console.log('result ' + result);
							$scope.avatar = result.downloadURL;
							$scope.profileImage = true;
							$rootScope.loading = false;

							$ctrl.ok();


						});



				}
			}
		}
		//-------end of upload file firestorage


		//------download image

		$scope.loadImage = function () {

			$scope.fetchProfileImage();

		}

		//-------

		




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
				"studentID": $scope.wrapper.studentID, //sharedProperties.getStudentID(), 								//'2343245678',
				"imageId": $scope.wrapper.imageID, //"avatar", //imageId								//'19DEC2015180907002'
				"imageFileName": fileName,
				"imageFileFolder": downloadURL,
				"imageStatus": 'ACTIVE',
				"docID": $scope.wrapper.docID,//"DOC001", //$scope.wrapper.docID,                  //'DOC004',
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









