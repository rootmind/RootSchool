(function(){
    "use strict";
    
    var app = angular.module('elephant');
 
	app.controller('teacherSubjectsController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory','appConstants', '$uibModalInstance','passInfo',function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants,$uibModalInstance,passInfo){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		$scope.subjectsWrapper=[];


		
		/*$scope.menuName= sharedProperties.getMenuName();*/
		
		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		$scope.actionMode=sharedProperties.getActionMode();*/
		
		// $scope.currentAcademicYearID = sharedProperties.getAcademicYearID();
		// $scope.academicYearID= sharedProperties.getAcademicYearID();
		// $scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		// $scope.gradeIDValue= sharedProperties.getGradeIDValue();
		// $scope.sectionIDValue= sharedProperties.getSectionIDValue();
		
		//---------modal data receiver------
		var $ctrl = this;
		$ctrl.passInfo = passInfo;
		$ctrl.selected = {
			gradeID: $ctrl.passInfo[0], subjectID:$ctrl.passInfo[1]
		};

		console.log ('item ' + $ctrl.selected.gradeID);

		// $scope.wrapper.gradeID = $ctrl.selected.gradeID;
		// $scope.wrapper.subjectID = $ctrl.selected.subjectID;

		$ctrl.ok = function () {
			$uibModalInstance.close($ctrl.selected.gradeID);
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		//---------------

		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
			
		
			
			methodAction="fetchMultiPopoverData";
								
			message=[
							{
								 "tableName" : "MST_Grade",
							    "filter" : ""    		
							},
												     
						     {
								 "tableName" : "MST_Subject",
							     "filter" : ""    		
							 },
							 {
								 "tableName" : "MST_AcademicYear",
							 	 "filter" : ""    		
						     },
						     {
								 "tableName" : "TeachersProfile",
							 	 "filter" : ""    		
						     }
					];
				    
				    $rootScope.loading=true;
						 			
					jsonData=connectHostFactory(methodAction,message);
					jsonData.returnData(function(value){
						
							//alert('Popover Data='+JSON.stringify(value));
						
							if(value != null){
								
										
								      
										result=value.fetchMultiPopoverData;
									
										if(value.success == true){
											
											
											if(result.validSession==true)
											{
												$scope.popoverWrapper=result.popoverWrapper;
											}
											else if(result.validSession==false)
											{
													messageFactory(appConstants.SYSTEM_INVALIDSESSION);
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

		
		 }   //------------------- ends loadData Function-----------------       
		

        //--------------start saveData Function-----------------
		
		$scope.saveData=function(deleteFlag){   
			
		
			 $scope.submitted = true;
			 
			 if ($scope.loginForm.$valid) {
				 
				

				// var content="Do you want to save?";

				// if(deleteFlag=='Y')
				// {
				// 	content="Do you want to delete?";
				// }

				// var confirm = $mdDialog.confirm()
				// .title('Confirm')
				// .content(content)
				// .ok('Ok')
				// .cancel('Cancel');
				
  			    // $mdDialog.show(confirm).then(function() {


							 
				 		methodAction="updateTeacherSubjects";
	
						message={
						
					    			"academicYearID": $scope.wrapper.academicYearID,
					    			"staffUserID": $scope.wrapper.staffUserID,
					    			"gradeID": $scope.wrapper.gradeID,   
					    			"subjectID": $scope.wrapper.subjectID,
					    			"deleteFlag":"N" //--'Y' or 'N'
					    			
				    		    };
				

								$scope.buttonDisabled=true;
								$rootScope.loading=true; 
								
								jsonData=connectHostFactory(methodAction,message);
								jsonData.returnData(function(value){
									
									//alert('Value personal Data= '+JSON.stringify(value));
								
									if(value != null){
										
														
													result=value.updateTeacherSubjects;
									
													
										
													if(value.success == true){
														
														
													
														
														if(result.validSession==true && result.teacherSubjectsWrapper[0].recordFound==true)
														{

															// if(deleteFlag=='Y')
															// {
															// 	messageFactory(appConstants.RECORD_DELETED);
															// }
															// else
															// {
																 messageFactory(appConstants.RECORD_UPDATED);
																 $ctrl.ok();
															//}
	
															//$scope.clear()
															//$scope.fetchTeacherSubjects();
						
																	//alert(JSON.stringify(result));

																	//$scope.customerName= result.personalDetailsWrapper[0].firstName+" "+ result.personalDetailsWrapper[0].middleName+ " " +result.personalDetailsWrapper[0].lastName;
																	
																	//sharedProperties.setCustomerName($scope.customerName);
																	
																	//alert($scope.customerName);
																			
													
														}
														else if(result.validSession==false)
														{
																messageFactory(appConstants.SYSTEM_INVALIDSESSION);
														}
														else{
															
																
															messageFactory(appConstants.SYSTEM_NORECORDS);
															
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


						// 	}, function() {
									
						// 		//$scope.status = 'confirm Result cancel.';
								
								
						// }); ///---alert condition
				


						 }//----if form validation
			 
		
		 
		        	
		}  //------------ends saveData Function-------------
		
		
		
		//--------fetchteacherSubjects------------
		$scope.fetchTeacherSubjects=function(){
			
			// $scope.submittedFetchSubjects = true;

			
			 
			if ($scope.form.academicYearID.$valid) {
			
				methodAction="fetchTeacherSubjects";
				
				message={
							"academicYearID": $scope.wrapper.academicYearID,
							"staffUserID": $scope.wrapper.staffUserID, 
							"gradeID": $scope.wrapper.gradeID,
							"subjectID": $scope.wrapper.subjectID
					    };
					 		
				$rootScope.loading=true;	 	
				
				jsonData=connectHostFactory(methodAction,message);
				
					jsonData.returnData(function(value){
						
						if(value != null){
							   
								result=value.fetchTeacherSubjects;
								
								if(value.success == true){
									
											if(result.validSession==true && result.teacherSubjectsWrapper[0].recordFound==true)
											{
													$scope.subjectsWrapper=result.teacherSubjectsWrapper;
													 $scope.wrapper.deleteEnable = true;
													
													//--pagination--
													
													 $scope.totalItems = result.teacherSubjectsWrapper.length;
													
													 $scope.currentPage = 1;
												  	 $scope.itemsPerPage =5;
												  	 $scope.maxSize = 5; //Number of pager buttons to show
												  	 
												  	  if($scope.totalItems >  $scope.itemsPerPage && $scope.totalItems != null)
												  	  {
												  		$scope.pagination=true;
												  	  }
											  	  //---pagination end--
													
											}
											else if(result.validSession==false)
											{
													messageFactory(appConstants.SYSTEM_INVALIDSESSION);
											}
											else{
													$scope.subjectsWrapper=null;
													messageFactory(appConstants.SYSTEM_NORECORDS);
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
			
		}
		//-------end fetchteacherSubjects---------
		
		
		//--------fetchteacherSubjects_M------------
		$scope.fetchTeacherSubjects_M=function(){
			
			
			
				methodAction="fetchTeacherSubjects";
				
				message={
						    "staffUserID": $scope.wrapper.staffUserID, 
							"gradeID": sharedProperties.getGradeID() 
					    };
					 		
				$rootScope.loading=true;	 	
				
				jsonData=connectHostFactory(methodAction,message);
				
					jsonData.returnData(function(value){
						
						if(value != null){
								
							    
								
								result=value.fetchTeacherSubjects;
								
								if(value.success == true){
									
											if(result.validSession==true && result.teacherSubjectsWrapper[0].recordFound==true)
											{
													$scope.subjectsWrapper=result.teacherSubjectsWrapper;
	
											}
											else if(result.validSession==false)
											{
													messageFactory(appConstants.SYSTEM_INVALIDSESSION);
											}
											else{
													messageFactory(appConstants.SYSTEM_NORECORDS);
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
		//--------------------fetchteacherSubjects_M-----
		
		
		
		//  $scope.setRowData = function(staffUserID,academicYearIDValue,gradeIDValue,subjectIDValue) {
			 
			 
			 
		// 	  $scope.wrapper.deleteEnable = false;
			 
		// 	  $scope.wrapper.academicYearID = '';
			 
		// 	  $scope.wrapper.staffUserID=''; 
		// 	  $scope.wrapper.gradeID = '';
			 
		// 	  $scope.wrapper.subjectID = '';
			  
			 
		// 	  //alert('AY ='+ academicYearIDValue + 'GV ='+gradeIDValue  +'SIDV ='+subjectIDValue);
		// 	  $scope.wrapper.staffUserID=staffUserID; 
		// 	  $scope.wrapper.academicYearID = academicYearIDValue;
			 
		// 	  $scope.wrapper.gradeID=gradeIDValue;
			 
		// 	  $scope.wrapper.subjectID=subjectIDValue;
				 
			 
			  
		//  };
		 
		//  $scope.clear = function(){
			  
			 
		//       $scope.submitted = false;
			    
		//       //$scope.wrapper.academicYearID = '';
		//       $scope.wrapper.staffUserID='';
		// 	  $scope.wrapper.gradeID = '';
		// 	  $scope.wrapper.subjectID = '';

		//       //$scope.form.academicYearID.$invalid=true;
		//       //$scope.form.academicYearID.$dirty=false;
			 
		// 	  $scope.form.staffUserID.$invalid=true;
		//       $scope.form.staffUserID.$dirty=false;
			  
		//       $scope.form.gradeID.$invalid=true;
		//       $scope.form.gradeID.$dirty=false;
		//       $scope.form.subjectID.$invalid=true;
		//       $scope.form.subjectID.$dirty=false;
		     
			  
		//   }
		 
		 
		
		
		
		
		
		
		
		
			
			/*$scope.nextPage=function(){ 
					
			  		//$rootScope.selectedIndex = 1;
					//$location.path('/' + 'identification');
					
			}*/
			  	
			 
			  
		//  //--------START btnBack function-----------
		//   $scope.btnBack=function(){
		// 		$location.path('/dashBoard');
		//    }
		// //--------ends btnBack function----------- 

	}]);  
	
})();









