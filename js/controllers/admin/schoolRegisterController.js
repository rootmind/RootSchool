(function(){
    "use strict";
    
    var app = angular.module('elephant');
 
	app.controller('schoolRegisterController',['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager','messageFactory','appConstants','aesCryptoFactory','$window','$http','firestorageFactory','loginFactory', function($scope ,$rootScope, connectHostFactory,connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, aesCryptoFactory, $window, $http, firestorageFactory, loginFactory){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		
		$scope.wrapper=[];
	    // $scope.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
		
		// $scope.menuName= sharedProperties.getMenuName();
		// $scope.refNo= sharedProperties.getRefNo();
		$scope.actionMode=sharedProperties.getActionMode();
		$scope.schoolID = sharedProperties.getSchoolID();

		$scope.avatar="";

		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();
		
		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		*/
		
		//$rootScope.isTabBarDisable=true;
		
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
		
		//-----------------
		
		//------------start loadData Function----------------
		

		// $scope.loadData=function(){
			
			
		// 	methodAction="fetchMultiPopoverData";
								
		// 	message=[
			               
		// 			     {
		// 					 "tableName" : "MST_Branch",
		// 				 	 "filter" : ""    		
		// 			     },
		// 			     {
		// 					 "tableName" : "MST_City",
		// 				 	 "filter" : ""    		
		// 			     },
		// 			     {
		// 					 "tableName" : "MST_State",
		// 				 	 "filter" : ""    		
		// 			     },
		// 			     {
		// 					 "tableName" : "MST_District",
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
											
		// 									if(result.validSession==true){
											
		// 										$scope.popoverWrapper=result.popoverWrapper;
		// 									}
		// 									else 
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
				

		// 			if(sharedProperties.getActionMode()=='UPDATE')
		// 			{
				 
		// 			 			$scope.loadStudentProfile();
					 			
		// 			 			$scope.fetchProfileImage();
							
	 	// 	 		}	
		
		//  }   //------------------- ends loadData Function-----------------       
		
		// //this funciton is called from index.html
		// $scope.loadData=function(){


		// 		if($rootScope.firebase==null)
		// 		{
		// 			console.log('firebase initialized');

		// 			$rootScope.firebase = null;
		// 			$rootScope.firestore = null;

		// 			var config = {
		// 				apiKey: "AIzaSyCID5HDbCh3nfivHe4hPCrDmrks6jMjJvY",
		// 				authDomain: "maabadi-270cf.firebaseapp.com",
		// 				databaseURL: "https://maabadi-270cf.firebaseio.com",
		// 				projectId: "maabadi-270cf",
		// 				storageBucket: "maabadi-270cf.appspot.com",
		// 				messagingSenderId: "787336213564"
		// 			};
		// 			//firebase.initializeApp(config);

		// 			// Initialize the default app
		// 			$rootScope.firebase = firebase.initializeApp(config);
		// 			$rootScope.firestore = firebase.firestore();

		// 			//console.log($rootScope.firebaseApp.name);  // "[DEFAULT]"
		// 		}


		// }
		// //-------end of firebase load
		
			
		 
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(){   
			

			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			 if ($scope.form.$valid) {
				 
						

				if(sharedProperties.getActionMode()=='UPDATE')
				{
							 
					methodAction="updateSchoolRegister";

					message={

						// "refNo": sharedProperties.getRefNo(),
						"code": $scope.wrapper.schoolID,  
						"desc": $scope.wrapper.schoolName,  
						"schoolID": $scope.wrapper.schoolID,  
						// "branchID": $scope.wrapper.branchID,   
						"schoolName": $scope.wrapper.schoolName,  
						"address1": $scope.wrapper.address1, 
						"address2": $scope.wrapper.address2,   
						"address3": $scope.wrapper.address3,   
						"city": $scope.wrapper.city,   
						"district": $scope.wrapper.district,   
						"state": $scope.wrapper.state,   
						"pinCode": $scope.wrapper.pinCode,   
						"mobile": $scope.wrapper.mobile,   
						"email": $scope.wrapper.email,   
						"phone": $scope.wrapper.phone,   
						"status": 'ACTIVE',  //$scope.wrapper.status,   
						// "imageID": $scope.wrapper.imageID,   
						// "thumbnailID": $scope.wrapper.thumbnailID,   
						"recordStatus" : sharedProperties.getRecordStatus()
							
					};
	
		   
				}
				else 
				{
				
					methodAction="schoolRegister";

					message={

						// "refNo": sharedProperties.getRefNo(),
						"code": $scope.wrapper.schoolID,  
						"desc": $scope.wrapper.schoolName,  
						"schoolID": $scope.wrapper.schoolID,  
						// "branchID": $scope.wrapper.branchID,   
						"schoolName": $scope.wrapper.schoolName,  
						"address1": $scope.wrapper.address1, 
						"address2": $scope.wrapper.address2,   
						"address3": $scope.wrapper.address3,   
						"city": $scope.wrapper.city,   
						"district": $scope.wrapper.district,   
						"state": $scope.wrapper.state,   
						"pinCode": $scope.wrapper.pinCode,   
						"mobile": $scope.wrapper.mobile,   
						"email": $scope.wrapper.email,   
						"phone": $scope.wrapper.phone,   
						"userid": $scope.wrapper.adminID,   
						"status": 'ACTIVE',  //$scope.wrapper.status,   
						// "imageID": $scope.wrapper.imageID,   
						// "thumbnailID": $scope.wrapper.thumbnailID,   
						"recordStatus" : sharedProperties.getRecordStatus(),
						"adminID":$scope.wrapper.adminID,
						"password": aesCryptoFactory($scope.wrapper.password)   
							
					};
	
				}

	


				if(sharedProperties.getActionMode()=='UPDATE'){

					$scope.registerSchool(methodAction,message);

				}
				else
				{

					var confirm = $mdDialog.confirm()
						.title('Confirm')
						.content('Would you like to register school - "' + $scope.wrapper.schoolName +'"? ' + 'Your admin login id is - "' + $scope.wrapper.adminID + '@' + $scope.wrapper.schoolID +  '". Please remember/write down Admin ID and password to proceed.')
						.ok('Ok')
						.cancel('Cancel');
						
					$mdDialog.show(confirm).then(function() {

							$scope.registerSchool(methodAction,message);

					}); //------confirmation dialog

				}



			} //---valid confirmaiton

			
		        	
		}  //------------ends saveData Function-------------




		
		//------TO ASSIGN DATA TO FIELDS----------
		// $scope.loadSchoolRegistration=function(){
		
			
		// 	methodAction="fetchSchoolRegistration";
			
		// 	message={
		// 			      "refNo" :sharedProperties.getRefNo()
		// 		    };
				 		
		// 	$rootScope.loading=true;	 	
			
		// 	jsonData=connectHostFactory(methodAction,message);
			
		// 		jsonData.returnData(function(value){
					
		// 			if(value != null){
							
		// 					result=value.fetchSchoolRegistration;
							
		// 					if(value.success == true){
								
		// 								if(result.validSession==true && result.schoolWrapper[0].recordFound==true )
		// 								{
		// 										$scope.wrapper=result.schoolWrapper[0];
												
		// 										$scope.schoolName= $scope.wrapper.schoolName;
		// 								}
		// 								else if(result.validSession==false)
		// 								{
		// 										messageFactory(appConstants.SYSTEM_INVALIDSESSION);
		// 								}
		// 								else{
		// 										messageFactory(appConstants.SYSTEM_NORECORDS);
		// 								}
		// 					}
							
		// 					else{
		// 							messageFactory(appConstants.SYSTEM_NORESPONSE);
		// 					}
					
		// 			}
		// 			else{
		// 				messageFactory(appConstants.SYSTEM_ERROR);
		// 			}

		// 			$rootScope.loading=false;
		// 		});
		 
			
			

		// }
		//----------end-----
		
     //----------Start Fetch profile image--------
		
	// 	$scope.fetchProfileImage=function(){			
			  

	// 		 methodAction="fetchImageDetails";			
	// 		 message={
							
	// 				 		"refNo" : sharedProperties.getRefNo(),								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
	// 						"studentID": sharedProperties.getStudentID(),											//'SA21OCT2015156_25JAN2016173153751.jpg',
	// 						"docID" : 'DOC001'													//'C://onboard//images//SA21OCT2015156',
	// 																							//'25JAN2016173153751'
	// 				};  
			
			 
			 
	// 		 $rootScope.loading=true;
			 
	// 		jsonData=connectHostImageFactory(methodAction,message);
	// 		jsonData.returnData(function(value){
			
	// 				//alert('Value Data= '+JSON.stringify(value));
	// 				if(value != null){
							
						
	// 					result=value.fetchImageDetails;
						
	// 					//alert(' fetchImageDetails result= '+JSON.stringify(result));
						
	// 					//alert('docIDValue '+result.imageDetailsWrapper[0].docIDValue);
						
	// 						if(value.success == true){
								
	// 							if(result.validSession==true){
								
	// 								$scope.image=value.image;
	// 								$scope.docName=result.imageDetailsWrapper[0].docIDValue;
	// 								$scope.profileImage=true;
	// 							}
	// 							else
	// 							{
	// 									messageFactory(appConstants.SYSTEM_INVALIDSESSION); //(result.validSession==false)
	// 							}
								
	// 						}
	// 						else{
	// 							//messageFactory(appConstants.SYSTEM_NORESPONSE);
	// 							$scope.profileImage=false;
								
	// 						}
						
	// 				}
	// 				else{
	// 					 messageFactory(appConstants.SYSTEM_ERROR);
	// 				}
	// 				$rootScope.loading=false;
	// 		});
		
	// }		
		
//---------------End Fetch profile image---------
		
		//   $scope.datepickers = {
  	    //     	dob: false,
  	    //     	joinDate: false,
  	    //     	passportIssueDate:false,
  	    //     	passportExpiryDate:false
  	    //   }
		  
		  
		//   $scope.open = function($event, which) {
		   
  	  	// 		$event.preventDefault();
  	  	// 		$event.stopPropagation();
  	  	// 		$scope.datepickers[which]= true;
		//   };
		  
		
			
			/*$scope.nextPage=function(){ 
					
			  		//$rootScope.selectedIndex = 1;
					//$location.path('/' + 'identification');
					
			}*/
			 
			// function dateDiff(date1, date2) {
			//     return new Date(Math.abs(date1.getTime() - date2.getTime()));
			// }
			  
			// /* Calculates the age */
		    // $scope.getAge = function(dob) {
		    // 	//alert('dob '+dob);
		    //     var now = new Date();
		    //     var age = dateDiff(now, new Date(dob));
		    //     $scope.dobAge = age.getFullYear() - 1970;
		        
		    //     //alert('dobAge '+$scope.dobAge);
		    // };
		    
    
			//--------START btnBack function-----------
			//   $scope.btnBack=function(){
			// 		$location.path('/queue');
			//    }
			//--------ends btnBack function----------- 

			
		//--------move to login-----------
			$scope.login=function(){
				$location.path('/login');
			}
		//--------ends btnBack function----------- 




		$scope.geolocation=function(){

			 // Try HTML5 geolocation.
			 if ($window.navigator.geolocation) {
                
				$window.navigator.geolocation.getCurrentPosition($scope.successCallback,
																 $scope.errorCallback,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
				
			} else {
				// Browser doesn't support Geolocation
				//alert('Browser doesnot support Geolocation');
				handleLocationError(false, infoWindow, $scope.map.getCenter());
			}

		} //geolocation

		$scope.handleLocationError=function (browserHasGeolocation, infoWindow, pos) {
			console.log(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
		}

		//Success function
		$scope.successCallback=function(position){

			$rootScope.latitude=position.coords.latitude;
			$rootScope.longitude=position.coords.longitude;

			// $rootScope.pos = {
			// 	lat: position.coords.latitude,
			// 	lng: position.coords.longitude
			// };

			// console.log('lag '+ $rootScope.latitude);
			// console.log('lng ' + $rootScope.longitude);

			var geocoder = new google.maps.Geocoder;

			var latlng = {lat: parseFloat($rootScope.latitude), lng: parseFloat($rootScope.longitude)};
			geocoder.geocode({'location': latlng}, function(results, status) {
				if (status === 'OK') {
						if (results[0]) {
							console.log(results[0].formatted_address);
							$rootScope.geolocation = results[0].formatted_address;
						} else {
							console.log('No results found');
						}
				} else {
					 console.log('Geocoder failed due to: ' + status);
				}
			});


		} //----end of successCallback



		// $scope.firebaseAuth = function(response){

		// 	// Initialize the FirebaseUI Widget using Firebase.
		// 	var ui = new firebaseui.auth.AuthUI(firebase.auth());

		// 	var uiConfig = {
		// 		callbacks: {
		// 		  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
		// 			// User successfully signed in.
		// 			// Return type determines whether we continue the redirect automatically
		// 			// or whether we leave that to developer to handle.
		// 			return true;
		// 		  },
		// 		  uiShown: function() {
		// 			// The widget is rendered.
		// 			// Hide the loader.
		// 			document.getElementById('loader').style.display = 'none';
		// 		  }
		// 		},
		// 		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		// 		signInFlow: 'popup',
		// 		signInSuccessUrl: '<url-to-redirect-to-on-success>',
		// 		signInOptions: [
		// 		  // Leave the lines as is for the providers you want to offer your users.
		// 		  {
		// 			provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
		// 			recaptchaParameters: {
		// 			  type: 'image', // 'audio'
		// 			  size: 'normal', // 'invisible' or 'compact'
		// 			  badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
		// 			},
		// 			defaultCountry: 'IN', // Set default country to the United Kingdom (+44).
		// 			// For prefilling the national number, set defaultNationNumber.
		// 			// This will only be observed if only phone Auth provider is used since
		// 			// for multiple providers, the NASCAR screen will always render first
		// 			// with a 'sign in with phone number' button.
		// 			defaultNationalNumber: $scope.wrapper.mobile,
		// 			// You can also pass the full phone number string instead of the
		// 			// 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
		// 			// the first country ID that matches the country code will be used to
		// 			// populate the country selector. So for countries that share the same
		// 			// country code, the selected country may not be the expected one.
		// 			// In that case, pass the 'defaultCountry' instead to ensure the exact
		// 			// country is selected. The 'defaultCountry' and 'defaultNationaNumber'
		// 			// will always have higher priority than 'loginHint' which will be ignored
		// 			// in their favor. In this case, the default country will be 'GB' even
		// 			// though 'loginHint' specified the country code as '+1'.
		// 			loginHint: '+911234567890'
		// 		  }				],
		// 		// Terms of service url.
		// 		tosUrl: '<your-tos-url>'
		// 	  };

			  
		// 	  // The start method will wait until the DOM is loaded.
		// 	ui.start('#firebaseui-auth-container', uiConfig);

		// }


		// //--------firebase phone authentication starts-----//
		// $scope.firebaseAuth = function(response){

		// 	console.log('2');

		// 	var auth = $firebaseAuth();
		// 	$scope.message=null;
		// 	$scope.error = null;

		// 	//auth.useDeviceLanguage();
		// 	window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
		// 		'size': 'normal',
		// 		'callback': function(response) {
		// 		  // reCAPTCHA solved, allow signInWithPhoneNumber.

		// 		  console.log('3');

		// 		  $scope.onSignInSubmit(response,auth);
		// 		}
		// 	});

		// }
		// $scope.onSignInSubmit=function(response){

		// 	var phoneNumber = $scope.wrapper.mobile();
		// 	var appVerifier = window.recaptchaVerifier;

		// 	console.log('4');


		// 	auth.signInWithPhoneNumber(phoneNumber, appVerifier)
		// 		.then(function (confirmationResult) {
		// 		  // SMS sent. Prompt user to type the code from the message, then sign the
		// 		  // user in with confirmationResult.confirm(code).
		// 		  window.confirmationResult = confirmationResult;

		// 		  var confirm = $mdDialog.prompt()
		// 			.title('OTP')
		// 			.textContent('Please enter OTP received in your mobile')
		// 			.placeholder('otp')
		// 			.ariaLabel('otp')
		// 			.initialValue('')
		// 			.targetEvent(ev)
		// 			.required(true)
		// 			.ok('Proceed')
		// 			.cancel('Cancel');

		// 			$mdDialog.show(confirm).then(function(code) {
		// 				//$scope.status = 'You decided to name your dog ' + code + '.';

		// 				//var code = getCodeFromUserInput();
		// 				confirmationResult.confirm(code).then(function (result) {
		// 				  // User signed in successfully.
		// 				  var user = result.user;
		// 				  console.log('confirmation success ' + users);

		// 				  response= "success";
		// 				  // ...
		// 				}).catch(function (error) {
		// 				  // User couldn't sign in (bad verification code?)
		// 				  // ...
		// 				  console.log('error in confirmationResult');

		// 				  response= "failred";

	  
		// 				});
	  

		// 			}, function() {
		// 				//$scope.status = 'You didn\'t name your dog.';
						
		// 			});


		// 		}).catch(function (error) {
		// 		  // Error; SMS not sent
		// 		  // ...
		// 			console.log('error in SMS not sent');
				  
		// 	});


		// }


		// window.recaptchaVerifier.render().then(function(widgetId) {
		// 	grecaptcha.reset(widgetId);
		// }
		//--------------end of firebase auth


		//------to udpate server
		$scope.registerSchool=function(methodAction,message){


				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,JSON.parse(JSON.stringify(message))); //to avoid null error
				jsonData.returnData(function(value){
					
					if(value != null){
						
								if(sharedProperties.getActionMode()=='UPDATE'){

										result=value.updateSchoolRegister;
								}
								else{

										result=value.schoolRegister;

								}
					
						
									if(value.success == true){
										
										//console.log(JSON.stringify(result));
										
										if(result.validSession==true && result.schoolWrapper[0].recordFound==true)
										{
											
											
													
													//$scope.refNo= result.schoolWrapper[0].refNo;
													
													if(sharedProperties.getActionMode()=='UPDATE'){

														$scope.updateFireStore(result);
														messageFactory(appConstants.RECORD_UPDATED);

													}
													else
													{
														
														//$scope.enableFirebase();
														$scope.updateFireStore(result);
														messageFactory(result.schoolWrapper[0].schoolName  + " profile is created");
														//$location.path('/login');

														loginFactory.loginApp($scope.wrapper.adminID+"@"+$scope.wrapper.schoolID,$scope.wrapper.password,'STAFF');

													}
												
										}
										else if(result.validSession==false)
										{
												messageFactory(appConstants.SYSTEM_INVALIDSESSION);
										}
										else{
											
										
												
												for(var i=0; i<result.errorWrapper.length; i++)
												{
													
													$scope.error = result.errorWrapper[i].errorDesc;
													alertsManager.addAlert($scope.error, 'alert-error');
													$scope.alerts = alertsManager.alerts;
													
												}
											
											
											}
									
								} 
								else
								{
									
									messageFactory(appConstants.SYSTEM_NORESPONSE);
								}
									
					}
					else{
						
						messageFactory(appConstants.SYSTEM_ERROR);
					}
						
					$rootScope.loading=false;
					$scope.buttonDisabled=false;
				});
				//alert('message = '+JSON.stringify(message));



		}
		//---------------end of update server



		//------fetch school register----------
		$scope.loadSchoolRegister=function(){
		
			
			methodAction="fetchSchoolRegister";
			
			message={
					      "code" : sharedProperties.getSchoolID()
				    };
				 		
			$rootScope.loading=true;	 	
			
			jsonData=connectHostFactory(methodAction,message);
			
				jsonData.returnData(function(value){
					
					if(value != null){
							
							result=value.fetchSchoolRegister;
							
							if(value.success == true){

										//console.log(JSON.stringify(result));
								
										if(result.validSession==true && result.schoolWrapper[0].recordFound==true )
										{
												$scope.wrapper=result.schoolWrapper[0];

												$scope.downloadFileFirestorage();
												
										}
										else if(result.validSession==false)
										{
												messageFactory(appConstants.SYSTEM_INVALIDSESSION);
										}
										else{
											
												for(var i=0; i<result.errorWrapper.length; i++)
												{
													
													$scope.error = result.errorWrapper[i].errorDesc;
													alertsManager.addAlert($scope.error, 'alert-error');
													$scope.alerts = alertsManager.alerts;
													
												}
											
											
										}
							}
							
							else{
									messageFactory(appConstants.SYSTEM_NORESPONSE);
							}
					
					}
					else{
						messageFactory(appConstants.SYSTEM_ERROR);
					}

					$rootScope.loading=false;
				});
		 
			
			

		}
		//----------end of fetch School Register


		//this funciton is called from index.html
		// $scope.enableFirebase=function()
		// {


		// 		if(!firebase.apps.length)
		// 		{

		// 			$rootScope.firebase = null;
		// 			$rootScope.firestore = null;
		// 			$rootScope.firestorage=null;


		// 			var config = {
		// 				apiKey: "AIzaSyCID5HDbCh3nfivHe4hPCrDmrks6jMjJvY",
		// 				authDomain: "maabadi-270cf.firebaseapp.com",
		// 				databaseURL: "https://maabadi-270cf.firebaseio.com",
		// 				projectId: "maabadi-270cf",
		// 				storageBucket: "maabadi-270cf.appspot.com",
		// 				messagingSenderId: "787336213564"
		// 			};
		// 			//firebase.initializeApp(config);

		// 			// Initialize the default app
		// 			$rootScope.firebase = firebase.initializeApp(config);
		// 			$rootScope.firestore = firebase.firestore();
		// 			$rootScope.firestorage = firebase.storage();

		// 			//console.log($rootScope.firebaseApp.name);  // "[DEFAULT]"
		// 		}


		// }
		//-------end of firebase load

		//--------------create firestore register after successful server side completion
		$scope.updateFireStore=function(result)
		{

			var registerRef = firebase.firestore().collection("register").doc(result.schoolWrapper[0].schoolID)
			
			if(sharedProperties.getActionMode()=='UPDATE'){

				registerRef
				.update(result.schoolWrapper[0])
				.then(function(docRef) {
					console.log("Document udpated");
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
	
			}
			else{

				registerRef
				.set(result.schoolWrapper[0])
				.then(function(docRef) {
					console.log("Document created");
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
	
			}

			registerRef
			.update({latitude:$rootScope.latitude, longitude:$rootScope.longitude, 
				geolocation:$rootScope.geolocation, userid:$rootScope.userid, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
			.then(function(docRef) {
				console.log("Document locaiton created :");
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});


		}//-------------

		$scope.showHelp = function() {

			console.log('SHOW HELP');
			var docRef = $rootScope.firestore.collection("help").doc("register")
			
			docRef.get().then(function(doc) {
				if (doc.exists) {
					
					console.log("Document data:", doc.data());

				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});


			$mdDialog.show(
			  $mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Help')
				.textContent('You can specify some description text in here.')
				.ariaLabel('Help')
				.ok('Got it!')
			);

		  };

		  //-----------get image from firestorage-----
		$scope.downloadFileFirestorage=function(){

			//console.log ('inside download ' + sharedProperties.getStudentID());
			firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/school/avatar/'+sharedProperties.getSchoolID())
			.then(function(result)
			{

				//console.log('result ' + result);
				$scope.avatar = result;
				$scope.profileImage=true;

			});

		}
		//---------end of fetchimage storage
		//------------start uploadFile Function----------------
		$scope.uploadFileFirestorge = function () {


			
			if ($scope.form.$valid) {


				if (document.getElementById("file").value != "") {

					$scope.submitted = true;
					$scope.buttonDisabled = true;
		

					firestorageFactory.fileUploadFirestorage(sharedProperties.getSchoolID() + '/images/school/avatar/'+sharedProperties.getSchoolID(), $scope.myFile)
					.then(function(result)
					{
		
						//console.log('result ' + result);
						$scope.avatar = result;
						$scope.profileImage=true;
		
					});
				
					$scope.submitted = false;
					$scope.buttonDisabled = false;
		

				}
			}
		}
		//-------end of upload file firestorage



		  //---------these functions to be executed after all function declarations
		  $scope.geolocation();
		  //$scope.loadData();

		  

	}]);  
	
})();



// $http({
			// 	method: 'GET',
			// 	url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCID5HDbCh3nfivHe4hPCrDmrks6jMjJvY'
			//   }).then(function successCallback(data) {
			// 	  // this callback will be called asynchronously
			// 	  // when the response is available
			// 	  //console.log('success ' + JSON.stringify(data));

			// 			if (data.results) {

			// 				console.log("curr loc " + JSON.stringify(data.results[0].formatted_address));

			// 				//this.global.currentLocation=data.results[0].formatted_address;

			// 				var country = null, countryCode = null, city = null, cityAlt = null;
			// 				var c, lc, component;
			// 				for (var r = 0, rl = data.results.length; r < rl; r += 1) {
			// 					var result = data.results[r];
				
			// 					if (!city && result.types[0] === 'locality') {
			// 						for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
			// 							component = result.address_components[c];
				
			// 							if (component.types[0] === 'locality') {
			// 								city = component.long_name;
			// 								break;
			// 							}
			// 						}
			// 					}
			// 					else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
			// 						for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
			// 							component = result.address_components[c];
				
			// 							if (component.types[0] === 'administrative_area_level_1') {
			// 								cityAlt = component.long_name;
			// 								break;
			// 							}
			// 						}
			// 					} else if (!country && result.types[0] === 'country') {
			// 						country = result.address_components[0].long_name;
			// 						countryCode = result.address_components[0].short_name;
			// 					}
				
			// 					if (city && country) {
			// 						break;
			// 					}
			// 				}
				
			// 				console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);

			// 				// this.global.city = city;
			// 				// this.global.country = country;
							
							
			// 			}



			// 	}, function errorCallback(response) {
			// 	  // called asynchronously if an error occurs
			// 	  // or server returns response with an error status.

			// 	  console.log('failed');

			// 	});