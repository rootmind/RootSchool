(function () {
	"use strict";

	var app = angular.module('elephant');

	app.controller('loginController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'appConstants', '$window','loginFactory','messageFactory', function ($scope, $rootScope, connectHostFactory, $location, appConstants, $window, loginFactory, messageFactory) {

		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		$scope.wrapper = [];
		var key = null;


		$scope.clearCache = function () {

			$rootScope.userid = '';
			$rootScope.lastLoginDate = '';
			$rootScope.deviceToken = '';
			$rootScope.sessionid = '';
			$rootScope.userGroup = '';
			$rootScope.isUserLogged = false;
			$rootScope.isTabBarDisable = false;
			$rootScope.isBackButton = false;
			$rootScope.studentID = '';
			$rootScope.refNo = '';
			$rootScope.userMenu = [];
			$rootScope.loading = false;
			$rootScope.selectedIndex = 0;

			// $rootScope.firebase = null;
			// $rootScope.firestore = null;
			// $rootScope.firestorage=null;

			$rootScope.latitude = '';
			$rootScope.longitude = '';
			$rootScope.geolocation = '';

		}
		
		$scope.clearCache();

		

		$rootScope.schoolAvatar = null;

		$rootScope.isUserLogged = false;

		//saikiran 27-Apr-2019
		//$scope.wrapper.username="prakashj@demo";
		//$scope.wrapper.password="demo123";

		// Example - http://my.site.com/?myparam=33
		if ( $location.search().hasOwnProperty( 'userid' ) ) {
			var userid = $location.search()['userid'];
			var password = $location.search()['password'];
			// 'myvalue' now stores '33'
			console.log('received ' + userid + password);
			loginFactory.loginApp(userid,password,'web');

		 }

		
		$scope.login = function (userGroup) {


			if ($scope.loginForm.$valid) {


				if ($scope.wrapper.username.indexOf("@") < 0) {

					messageFactory('Invalid username format');
					return;

				}



				//saikiran 15-Apr-2019
				//$rootScope.isUserLogged=true;
				//$location.path("/dashboard");
				loginFactory.loginApp($scope.wrapper.username,$scope.wrapper.password,'web');




				// methodAction = "validateUser";


				// message = {
				// 	"userid": $scope.wrapper.username,
				// 	"password": aesCryptoFactory($scope.wrapper.password),                
				// 	"deviceToken": "",
				// 	"userGroup": userGroup
				// };
				// //alert('userid ='+$scope.wrapper.username);
				// $rootScope.userid = $scope.wrapper.username;
				// //alert('message '+JSON.stringify(message));

				// $rootScope.loading = true;

				// jsonData = connectHostFactory(methodAction, message);

				// jsonData.returnData(function (value) {



				// 	//alert('Value '+JSON.stringify(value));


				// 	if (value != null) {



				// 		result = value.validateUser;

				// 		//alert('result Data = '+JSON.stringify(result));

				// 		if (value.success == true && result.usersWrapper[0].recordFound == true) {



				// 			if (result.usersWrapper[0].validUser == false) {

				// 				$rootScope.deviceToken = '';
				// 				$rootScope.sessionid = '';
				// 				$rootScope.isUserLogged = false;


				// 				messageFactory('Invalid userid or password');





				// 			}
				// 			else {



				// 				$rootScope.userid = result.usersWrapper[0].userid;

				// 				$rootScope.lastLoginDate = result.usersWrapper[0].lastLoginDate;
				// 				$rootScope.deviceToken = result.usersWrapper[0].deviceToken;
				// 				$rootScope.sessionid = result.usersWrapper[0].sessionid;
				// 				$rootScope.isUserLogged = true;
				// 				$rootScope.isTabBarDisable = true;
				// 				sharedProperties.setAcademicYearID(result.usersWrapper[0].currentAcademicYear);
				// 				sharedProperties.setSchoolID(result.usersWrapper[0].schoolID);


				// 				if (result.usersWrapper[0].userGroup == 'STUDENT') {
				// 					sharedProperties.setRefNo(result.usersWrapper[0].studentProfileWrapper[0].refNo);
				// 					sharedProperties.setStudentID(result.usersWrapper[0].studentID);
				// 					sharedProperties.setStudentName(result.usersWrapper[0].studentProfileWrapper[0].studentName);
				// 					sharedProperties.setSurname(result.usersWrapper[0].studentProfileWrapper[0].surname);
				// 					sharedProperties.setGradeID(result.usersWrapper[0].studentProfileWrapper[0].gradeID);
				// 					sharedProperties.setGradeIDValue(result.usersWrapper[0].studentProfileWrapper[0].gradeIDValue);
				// 					sharedProperties.setSectionID(result.usersWrapper[0].studentProfileWrapper[0].sectionID);
				// 					sharedProperties.setSectionIDValue(result.usersWrapper[0].studentProfileWrapper[0].sectionIDValue);
				// 					sharedProperties.setAcademicYearID(result.usersWrapper[0].studentProfileWrapper[0].academicYearID);
				// 					sharedProperties.setAcademicYearIDValue(result.usersWrapper[0].studentProfileWrapper[0].academicYearIDValue);
				// 					sharedProperties.setSchoolIDValue(result.usersWrapper[0].studentProfileWrapper[0].schoolIDValue);

				// 				}



				// 				//----Service
				// 				userAuth.setUserId(result.usersWrapper[0].userid);
				// 				userAuth.setDeviceToken(result.usersWrapper[0].deviceToken);
				// 				userAuth.setSessionId(result.usersWrapper[0].sessionid);

				// 				//---User Group

				// 				$rootScope.userGroup = result.usersWrapper[0].userGroup;
				// 				$rootScope.schoolName = result.usersWrapper[0].schoolName;





				// 				//------- user menu
				// 				if (result.usersWrapper[0].userMenuWrapper != null) {
				// 					for (var i = 0; i < result.usersWrapper[0].userMenuWrapper.length; i++) {
				// 						//alert('User Menu id= '+JSON.stringify(result.usersWrapper[0].userMenuWrapper[i].menuId));

				// 						$rootScope.userMenu[i] = result.usersWrapper[0].userMenuWrapper[i].menuID;

				// 					}

				// 					//alert('userMenu array ='+$rootScope.userMenu);

				// 				}



				// 				$scope.updateFireStore();

				// 				//----get school image----
				// 				$scope.downloadFileFirestorage();

				// 				$location.path('/dashBoard');



				// 			}

				// 		}
				// 		else {

				// 			messageFactory('Invalid userid or password');


				// 		}




				// 	}
				// 	else {


				// 		messageFactory(appConstants.SYSTEM_ERROR);



				// 	}//--response---else condition close---





				// 	$rootScope.loading = false;


				// });//--------return data function close----

			}//------form validation close

		}//------login function close


		



		// function padString(source) {
		// 	var paddingChar = ' ';
		// 	var size = 16;
		// 	var x = source.length % size;
		// 	var padLength = size - x;

		// 	for (var i = 0; i < padLength; i++) source += paddingChar;

		// 	return source;
		// }



		// $scope.geolocation = function () {

		// 	// Try HTML5 geolocation.
		// 	if ($window.navigator.geolocation) {

		// 		$window.navigator.geolocation.getCurrentPosition($scope.successCallback,
		// 			$scope.errorCallback, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });

		// 	} else {
		// 		// Browser doesn't support Geolocation
		// 		//alert('Browser doesnot support Geolocation');
		// 		handleLocationError(false, infoWindow, $scope.map.getCenter());
		// 	}

		// } //geolocation

		// $scope.handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
		// 	console.log(browserHasGeolocation ?
		// 		'Error: The Geolocation service failed.' :
		// 		'Error: Your browser doesn\'t support geolocation.');
		// }

		// //Success function
		// $scope.successCallback = function (position) {

		// 	$rootScope.latitude = position.coords.latitude;
		// 	$rootScope.longitude = position.coords.longitude;


		// 	var geocoder = new google.maps.Geocoder;

		// 	var latlng = { lat: parseFloat($rootScope.latitude), lng: parseFloat($rootScope.longitude) };
		// 	geocoder.geocode({ 'location': latlng }, function (results, status) {
		// 		if (status === 'OK') {
		// 			if (results[0]) {
		// 				console.log(results[0].formatted_address);
		// 				$rootScope.geolocation = results[0].formatted_address;

		// 				$scope.updateFireStore();

		// 			} else {
		// 				console.log('No results found');
		// 			}
		// 		} else {
		// 			console.log('Geocoder failed due to: ' + status);
		// 		}
		// 	});


		// } //----end of successCallback

		// //-----------get image from firestorage-----
		// $scope.downloadFileFirestorage = function () {

		// 	console.log('inside download ' + sharedProperties.getStudentID());

		// 	firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/school/avatar/' + sharedProperties.getSchoolID())
		// 		.then(function (result) {

		// 			//console.log('result ' + result);
		// 			$rootScope.schoolAvatar = result;

		// 		});




		// }
		// //---------end of fetchimage storage

		// //--------------create firestore register after successful server side completion
		// $scope.updateFireStore = function () {


		// 	var message = {
		// 		latitude: $rootScope.latitude, longitude: $rootScope.longitude,
		// 		geolocation: $rootScope.geolocation, userid: $rootScope.userid, timestamp: firebase.firestore.FieldValue.serverTimestamp()
		// 	}

		// 	var loginRef = firebase.firestore().collection("web").doc()
		// 	loginRef
		// 		.set(message)
		// 		.then(function (docRef) {
		// 			console.log("Document created");
		// 		})
		// 		.catch(function (error) {
		// 			console.error("Error adding document: ", error);
		// 		});




		// }//-------------


		// $scope.schoolRegister = function () {
		// 	//console.log($rootScope.isUserLogged);

		// 	$location.path('/schoolRegister');

		// }


		// //---------these functions to be executed after all function declarations
		// $scope.geolocation();


	}]);

})();