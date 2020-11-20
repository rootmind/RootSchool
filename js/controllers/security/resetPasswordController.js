(function(){
    "use strict";
    
    var app = angular.module('elephant');
 
	app.controller('resetPasswordController',['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager','messageFactory','aesCryptoFactory','appConstants', function($scope ,$rootScope, connectHostFactory,connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory,aesCryptoFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		
	
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.userID= $rootScope.userid;
		//$scope.refNo= sharedProperties.getRefNo();
		//$scope.actionMode=sharedProperties.getActionMode();
		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();
		
     
		$scope.saveData=function(){   
			

			
			//alert('button click');
			
			 $scope.submitted = true;
			 
			
			 
			 if ($scope.loginForm.$valid) {
				 
				 if(!angular.equals($scope.wrapper.password,$scope.wrapper.retypepassword))
				 {
					 messageFactory("Password and reenter password are not same");
					 
					 return; //alert('password and reentered passwords are same ');
				 }
				 if(angular.equals($rootScope.userid.trim().toUpperCase(),"ADMIN@DEMO"))
				 {
					 messageFactory("ADMIN@DEMO password reset is restricted");
					//alert('Demo Admin password reset is restricted');
					 
					 return; 
				 }
				 	 
				 
				 		methodAction="changePassword";
				 		
				 		/*var key = CryptoJS.enc.Utf8.parse(appConstants.AES_ENCRYPTKEY);
			               
						var encryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($scope.wrapper.password), key,  
					                {  
					                    keySize: 128 / 8,  
					                  
					                    mode: CryptoJS.mode.ECB,  
					                    padding: CryptoJS.pad.Pkcs7  
					                });  */
					
				 		
						message={
								
								"userid": $rootScope.userid, 		
					    		"staffUserID":$rootScope.userid,
					    		"password": aesCryptoFactory($scope.wrapper.password)  
					    		
				    		};
				
						
				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
					
										 
									result=value.changePassword;
					
									
						
									if(value.success == true){
										
										
										if(result.validSession==true && result.usersWrapper[0].recordFound==true)
										{
													
											messageFactory("Password changed successfully");
											$location.path('/dashboard');
												
										}
										else if(result.validSession==false)
										{
												messageFactory(appConstants.SYSTEM_INVALIDSESSION);
										}
										else{
											
										
											messageFactory("Password not changed");
												
											
											
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
			 }
			
		        	
		}  //------------ends saveData Function-------------
		
	

			
			
    
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					$location.path('/dashBoard');
			   }
			//--------ends btnBack function----------- 
	}]);  
	
})();









