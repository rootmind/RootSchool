(function () {
	"use strict";

	var app = angular.module('elephant');

	app.factory('loginFactory', ['$rootScope', 'connectHostFactory', '$location', 'userAuth', 'messageFactory', 'aesCryptoFactory', 'appConstants', 'sharedProperties', 'firestorageFactory', '$window',   function ($rootScope, connectHostFactory, $location, userAuth, messageFactory, aesCryptoFactory, appConstants, sharedProperties, firestorageFactory, $window) {

		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;

		var key = null;

		var email=null;

		$rootScope.schoolAvatar = null;
		$rootScope.userMenu=[];

		var login = function (username, password, userGroup) {



			methodAction = "validateUser";

			if(username.indexOf(".com")>0)
			{
				email = username;
			}

			message = {
				"userid": username,
				"email":email,
				"password": aesCryptoFactory(password),
				"deviceToken": "",
				"userGroup": userGroup
			};
			//console.log('userid =' + username);
			$rootScope.userid = username;
			console.log('message ' + JSON.stringify(message));

			$rootScope.loading = true;


			jsonData = connectHostFactory(methodAction, message);

			jsonData.returnData(function (value) {



				console.log('Value '+JSON.stringify(value));


				if (value != null) {



					result = value.validateUser;

					console.log('result Data = '+JSON.stringify(result));

					if (value.success == true && result.usersWrapper[0].recordFound == true) {



						if (result.usersWrapper[0].validUser == false) {

							$rootScope.deviceToken = '';
							$rootScope.sessionid = '';
							$rootScope.isUserLogged = false;


							messageFactory('Invalid userid or password', appConstants.error);



						}
						else {



							$rootScope.userid = result.usersWrapper[0].userid;
							$rootScope.lastLoginDate = result.usersWrapper[0].lastLoginDate;
							$rootScope.deviceToken = result.usersWrapper[0].deviceToken;
							$rootScope.sessionid = result.usersWrapper[0].sessionid;
							$rootScope.isUserLogged = true;
							$rootScope.isTabBarDisable = true;
							sharedProperties.setAcademicYearID(result.usersWrapper[0].currentAcademicYear);
							sharedProperties.setSchoolID(result.usersWrapper[0].schoolID);


							if (result.usersWrapper[0].userGroup == 'STUDENT') {
								sharedProperties.setRefNo(result.usersWrapper[0].studentProfileWrapper[0].refNo);
								sharedProperties.setStudentID(result.usersWrapper[0].studentID);
								sharedProperties.setStudentName(result.usersWrapper[0].studentProfileWrapper[0].studentName);
								sharedProperties.setSurname(result.usersWrapper[0].studentProfileWrapper[0].surname);
								sharedProperties.setGradeID(result.usersWrapper[0].studentProfileWrapper[0].gradeID);
								sharedProperties.setGradeIDValue(result.usersWrapper[0].studentProfileWrapper[0].gradeIDValue);
								sharedProperties.setSectionID(result.usersWrapper[0].studentProfileWrapper[0].sectionID);
								sharedProperties.setSectionIDValue(result.usersWrapper[0].studentProfileWrapper[0].sectionIDValue);
								sharedProperties.setAcademicYearID(result.usersWrapper[0].studentProfileWrapper[0].academicYearID);
								sharedProperties.setAcademicYearIDValue(result.usersWrapper[0].studentProfileWrapper[0].academicYearIDValue);
								sharedProperties.setSchoolIDValue(result.usersWrapper[0].studentProfileWrapper[0].schoolIDValue);

								$rootScope.name = result.usersWrapper[0].studentProfileWrapper[0].studentName;
								$rootScope.avatar = result.usersWrapper[0].studentProfileWrapper[0].avatar;
								$rootScope.refNo=result.usersWrapper[0].studentProfileWrapper[0].refNo;


							}

							if (result.usersWrapper[0].userGroup == 'STAFF') {

								sharedProperties.setRefNo(result.usersWrapper[0].teachersProfileWrapper.staffRefNo);
								$rootScope.name = result.usersWrapper[0].teachersProfileWrapper.name;
								$rootScope.avatar = result.usersWrapper[0].teachersProfileWrapper.avatar;
								$rootScope.refNo=result.usersWrapper[0].teachersProfileWrapper.staffRefNo;



							}


							//----Service
							userAuth.setUserId(result.usersWrapper[0].userid);
							userAuth.setDeviceToken(result.usersWrapper[0].deviceToken);
							userAuth.setSessionId(result.usersWrapper[0].sessionid);

							//---User Group

							$rootScope.userGroup = result.usersWrapper[0].userGroup;
							$rootScope.schoolName = result.usersWrapper[0].schoolName;






							//------- user menu
							if (result.usersWrapper[0].userMenuWrapper != null) {
								for (var i = 0; i < result.usersWrapper[0].userMenuWrapper.length; i++) {

									console.log('User Menu id= '+ i + " - " +JSON.stringify(result.usersWrapper[0].userMenuWrapper[i].menuID));

										$rootScope.userMenu[i] = result.usersWrapper[0].userMenuWrapper[i].menuID;

								}

								console.log('userMenu array ='+JSON.stringify($rootScope.userMenu));

								

							}



							//saikiran 13-Apr-2019
							//updateFireStore();

							//----get school image----
							//saikiran 13-Apr-2019
							//downloadFileFirestorage();

							if (result.usersWrapper[0].userGroup == 'STUDENT') {
								$location.path('/parentdashboard-parent1');
							}
							if (result.usersWrapper[0].userGroup == 'STAFF') {
								$location.path('/dashboard-admin1');
							}




						}

					}
					else {

						messageFactory('Invalid userid or password');

						//schoolRegister();
						

					}




				}
				else {


					messageFactory(appConstants.SYSTEM_ERROR);



				}//--response---else condition close---





				$rootScope.loading = false;


			});//--------return data function close----



		}//------login function close






		// function padString(source) {
		// 	var paddingChar = ' ';
		// 	var size = 16;
		// 	var x = source.length % size;
		// 	var padLength = size - x;

		// 	for (var i = 0; i < padLength; i++) source += paddingChar;

		// 	return source;
		// }



		//19-Mar-2019
		// var geolocation = function () {

		// 	// Try HTML5 geolocation.
		// 	if ($window.navigator.geolocation) {

		// 		$window.navigator.geolocation.getCurrentPosition(successCallback,
		// 			errorCallback, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });

		// 	} else {
		// 		// Browser doesn't support Geolocation
		// 		//alert('Browser doesnot support Geolocation');
		// 		handleLocationError(false, infoWindow, map.getCenter());
		// 	}

		// } //geolocation

		// var handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
		// 	console.log(browserHasGeolocation ?
		// 		'Error: The Geolocation service failed.' :
		// 		'Error: Your browser doesn\'t support geolocation.');
		// }

		// //Success function
		// var successCallback = function (position) {

		// 	$rootScope.latitude = position.coords.latitude;
		// 	$rootScope.longitude = position.coords.longitude;


		// 	var geocoder = new google.maps.Geocoder;

		// 	var latlng = { lat: parseFloat($rootScope.latitude), lng: parseFloat($rootScope.longitude) };
		// 	geocoder.geocode({ 'location': latlng }, function (results, status) {
		// 		if (status === 'OK') {
		// 			if (results[0]) {
		// 				console.log(results[0].formatted_address);
		// 				$rootScope.geolocation = results[0].formatted_address;

		// 				updateFireStore();

		// 			} else {
		// 				console.log('No results found');
		// 			}
		// 		} else {
		// 			console.log('Geocoder failed due to: ' + status);
		// 		}
		// 	});


		//  } //----end of successCallback

		// var errorCallback = function () {

		// 	//Android.showToast("errorCallback");

		// 	// alert('errorCallback');
		// 	handleLocationError(true, infoWindow, map.getCenter());
		// 	//alert(error.message);

		// }

		


		//-----------get image from firestorage-----
		var downloadFileFirestorage = function () {

			console.log('inside download ' + sharedProperties.getStudentID());

			firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/school/avatar/' + sharedProperties.getSchoolID())
				.then(function (result) {

					//console.log('result ' + result);
					$rootScope.schoolAvatar = result;

				});




		}
		//---------end of fetchimage storage

		//--------------create firestore register after successful server side completion
		var updateFireStore = function () {

			$rootScope.latitude="latitude";
			$rootScope.longitude="longitude";
			$rootScope.geolocation="geolocation";


			var message = {
				latitude: $rootScope.latitude, longitude: $rootScope.longitude,
				geolocation: $rootScope.geolocation, userid: $rootScope.userid, timestamp: firebase.firestore.FieldValue.serverTimestamp()
			}

			var loginRef = firebase.firestore().collection("web").doc()
			loginRef
				.set(message)
				.then(function (docRef) {
					console.log("Document created");
				})
				.catch(function (error) {
					console.error("Error adding document: ", error);
				});




		}//-------------


		var schoolRegister = function () {
			//console.log($rootScope.isUserLogged);

			$location.path('/schoolRegister');

		}


		//19-Mar-2019
		//---------these functions to be executed after all function declarations
		//geolocation();



		return {


			loginApp: login

		}



	}]);

})();