(function(){
    "use strict";
    
    var app = angular.module('elephant');
       
	app.service('sharedProperties',function(){
	
		   var objectValue = {
						        refNo: '',
						        cifNumber: '',
						        recordStatus: '',
						        accountType: '',
						        actionMode: '',
						        menu:'',
						        menuName: '',
						        imageFileName:'',
						        imageFileFolder:'',
						        imageId:'',
						        tableName:'',
						        filter:'',
						        accountPortfolio:'',
						        depositsPortfolio:'',
						        loanPortfolio:'',
						        ccPortfolio:'',
						        accountNumber:'',
						        creditCardNumber:'',
						        customerName: '',
						       
						        studentID:'',
						        studentName:'',
						        surname:'',
						        gradeID:'',
						        gradeIDValue:'',
						        sectionID:'',
						        sectionIDValue:'',
						        schoolID:'',
						        schoolIDValue:'',
						        academicYearID:'',
						        academicYearIDValue:'',
						        menuID:'',
						        menuIDValue:'',
								bookRefNo:'',
								staffID:'',
								status:''
						        
						        	
		   					 };
		  
		   
		   var pathStatus = {
						        personal: '',
						        identity:'',
						        occupation:'',
						        contact:'',
						        address:'',
						        product:'',
						        docs:'',
						        kyc:'',
						        kyc2:'',
						        kycTran:'',
						        kycTran2:'',
						        kycEDD:''
						        
						      
		   					};
		   

			    
			    return {
			        
					        setRefNo: function(refNo) {
					        	
					            objectValue.refNo = refNo;
					            
					        },
					        
					        setCIFNumber: function(cifNumber) {
					        	
					            objectValue.cifNumber = cifNumber;
					            
					        },
					        
					        
					        setAccountType: function(accountType) {
					        	
					            objectValue.accountType = accountType;
					            
					        },
					        
					        setRecordStatus: function(recordStatus) {
					        	
					            objectValue.recordStatus = recordStatus;
					            
					        },
					        
					        setActionMode: function(actionMode) {
					        	
					            objectValue.actionMode = actionMode;
					            
					        },
					        
					        setImageFileName: function(imageFileName) {
					        	
					            objectValue.imageFileName = imageFileName;
					            
					        },
					        
					        setImageFileFolder: function(imageFileFolder) {
					        	
					            objectValue.imageFileFolder = imageFileFolder;
					            
					        },
					        
					        setImageId: function(imageId) {
					        	
					            objectValue.imageId = imageId;
					            
					        },
					        setMenu: function(menu) {
					        	
					            objectValue.menu = menu;
					            
					        },
					        
					        setMenuName: function(menuName) {
					        	
					            objectValue.menuName = menuName;
					            
					        },
					        
					        setTableName: function(tableName) {
					        	
					            objectValue.tableName = tableName;
					            
							},
					        setStaffID: function(staffID) {
					        	
					            objectValue.staffID = staffID;
					            
							},
							
					        setStatus: function(status) {
					        	
					            objectValue.status = status;
					            
							},
			
					        getRefNo: function() {
					        	
					            return objectValue.refNo;
					        },
					        
					        getCIFNumber: function() {
					        	
					            return objectValue.cifNumber;
					        },
					        getAccountType: function() {
					        	
					            return objectValue.accountType;
					        },
					        
					        getRecordStatus: function() {
					        	
					            return objectValue.recordStatus;
					        },
					        
					        getActionMode: function() {
					        	
					            return objectValue.actionMode;
					        },
					        
					        getImageFileName: function() {
					        	
					            return objectValue.imageFileName;
					        },
					        getImageFileFolder: function() {
					        	
					            return objectValue.imageFileFolder;
					        },
					        getImageId: function() {
					        	
					            return objectValue.imageId;
					        },
					        
					        getMenu: function() {
					        	
					            return objectValue.menu;
					        },
					        
					        getMenuName: function() {
					        	
					            return objectValue.menuName;
					        },
					        
					        getTableName: function() {
					        	
					            return objectValue.tableName;
					        },
					       
					        setAccountPortfolio: function(accountPortfolio) {
					        	
					        	
					        	objectValue.accountPortfolio = accountPortfolio;
					        	
					            
					        },
					        getAccountPortfolio: function() {
					        	
					            return objectValue.accountPortfolio;
					            
					        },
					        
					        setDepositsPortfolio: function(depositsPortfolio) {
					        	
					        	
					        	objectValue.depositsPortfolio = depositsPortfolio;
					        	
					            
					        },
					        getDepositsPortfolio: function() {
					        	
					            return objectValue.depositsPortfolio;
					            
					        },
					        setLoanPortfolio: function(loanPortfolio) {
					        	
					        	
					        	objectValue.loanPortfolio = loanPortfolio;
					        	
					            
					        },
					        getLoanPortfolio: function() {
					        	
					            return objectValue.loanPortfolio;
					            
					        },
					        
					        setCCPortfolio: function(ccPortfolio) {
					        	
					        	
					        	objectValue.ccPortfolio = ccPortfolio;
					        	
					            
					        },
					        getCCPortfolio: function() {
					        	
					            return objectValue.ccPortfolio;
					            
					        },
					        
					        setAccountNumber: function(accountNumber) {
					        	
					        	objectValue.accountNumber = accountNumber;
					            
					        },
					        getAccountNumber: function() {
					        	
					            return objectValue.accountNumber;
					        },
					        setCreditCardNumber: function(creditCardNumber) {
					        	
					            objectValue.creditCardNumber = creditCardNumber;
					            
					        },
					        getCreditCardNumber: function() {
					        	
					            return objectValue.creditCardNumber;
					        },
					        setFilter: function(filter) {
					        	
					            objectValue.filter = filter;
					            
					        },
					        getFilter: function() {
					        	
					            return objectValue.filter;
					        },
					        
					        setCustomerName: function(customerName) {
					        	
					            objectValue.customerName = customerName;
					            
					        },
					        getCustomerName: function() {
					        	
					            return objectValue.customerName;
					        },
					        
   
					        /*Path Status*/
					        setPersonalStatus: function(personal) {
					        	
					            pathStatus.personal = personal;
					            
					        },
			
					        getPersonalStatus: function() {
					        	
					            return pathStatus.personal;
					        },
					        setIdentityStatus: function(identity) {
					        	
					            pathStatus.identity = identity;
					            
					        },
			
					        getIdentityStatus: function() {
					        	
					            return pathStatus.identity;
					        },
					        
					        setOccupationStatus: function(occupation) {
					        	
					            pathStatus.occupation = occupation;
					            
					        },
			
					        getOccupationStatus: function() {
					        	
					            return pathStatus.occupation;
					        },
					        
					        setContactStatus: function(contact) {
					        	
					            pathStatus.contact = contact;
					            
					        },
			
					        getContactStatus: function() {
					        	
					            return pathStatus.contact;
					        },
					        
					        setAddressStatus: function(address) {
					        	
					            pathStatus.address = address;
					            
					        },
			
					        getAddressStatus: function() {
					        	
					            return pathStatus.address;
					        },
					        
					        setProductStatus: function(product) {
					        	
					            pathStatus.product = product;
					            
					        },
			
					        getProductStatus: function() {
					        	
					            return pathStatus.product;
					        },
					        setDocsStatus: function(docs) {
					        	
					            pathStatus.docs = docs;
					            
					        },
			
					        getDocsStatus: function() {
					        	
					            return pathStatus.docs;
					        },
					        
					        setKYCStatus: function(kyc) {
					        	
					            pathStatus.kyc = kyc;
					            
					        },
			
					        getKYCStatus: function() {
					        	
					            return pathStatus.kyc;
					        },
					       
					        setKYC2Status: function(kyc2) {
					        	
					            pathStatus.kyc2 = kyc2;
					            
					        },
			
					        getKYC2Status: function() {
					        	
					            return pathStatus.kyc2;
					        },
					        
					        setKYCTranStatus: function(kycTran) {
					        	
					            pathStatus.kycTran = kycTran;
					            
					        },
			
					        getKYCTranStatus: function() {
					        	
					            return pathStatus.kycTran;
					        },
					        
					        setKYCTran2Status: function(kycTran2) {
					        	
					            pathStatus.kycTran2 = kycTran2;
					            
					        },
			
					        getKYCTran2Status: function() {
					        	
					            return pathStatus.kycTran2;
					        },
					        
					        
					        setKYCEDDStatus: function(kycEDD) {
					        	
					            pathStatus.kycEDD = kycEDD;
					            
					        },
			
					        getKYCEDDStatus: function() {
					        	
					            return pathStatus.kycEDD;
					        },
					        
					   
					        /*end path status*/
					        
					        
					        //   -----SchoolApp--------
					        
					        
					        setStudentID: function(studentID) {
					        	
					        	
					        	objectValue.studentID = studentID;
					        	
					            
					        },
					        getStudentID: function() {
					        	
					            return objectValue.studentID;
					            
					        },
					        
					        setStudentName: function(studentName) {
					        	
					        	
					        	objectValue.studentName = studentName;
					        	
					            
					        },
					        getStudentName: function() {
					        	
					            return objectValue.studentName;
					            
					        },
					        
					        setSurname: function(surname) {
					        	
					        	
					        	objectValue.surname = surname;
					        	
					            
					        },
					        getSurname: function() {
					        	
					            return objectValue.surname;
					            
					        },
					        
					        setGradeID: function(gradeID) {
					        	
					        	
					        	objectValue.gradeID = gradeID;
					        	
					            
					        },
					        getGradeID: function() {
					        	
					            return objectValue.gradeID;
					            
					        },
					        
					        
					        setGradeIDValue: function(gradeIDValue) {
					        	
					        	
					        	objectValue.gradeIDValue = gradeIDValue;
					        	
					            
					        },
					        getGradeIDValue: function() {
					        	
					            return objectValue.gradeIDValue;
					            
					        },
					        setSectionID: function(sectionID) {
					        	
					        	
					        	objectValue.sectionID = sectionID;
					        	
					            
					        },
					        getSectionID: function() {
					        	
					            return objectValue.sectionID;
					            
					        },
					        
					        setSectionIDValue: function(sectionIDValue) {
					        	
					        	
					        	objectValue.sectionIDValue = sectionIDValue;
					        	
					            
					        },
					        getSectionIDValue: function() {
					        	
					            return objectValue.sectionIDValue;
					            
					        },
					        
					        setAcademicYearID: function(academicYearID) {
					        	
					        	
					        	objectValue.academicYearID = academicYearID;
					        	
					            
					        },
					        getAcademicYearID: function() {
					        	
					            return objectValue.academicYearID;
					            
					        }
					        ,
					        
					        setAcademicYearIDValue: function(academicYearIDValue) {
					        	
					        	
					        	objectValue.academicYearIDValue = academicYearIDValue;
					            
					        },
					        getAcademicYearIDValue: function() {
					        	
					            return objectValue.academicYearIDValue;
					            
					        }
					        ,
					        setSchoolID: function(schoolID) {
					        	
					        	
					        	objectValue.schoolID = schoolID;
					        	
					            
					        },
					        getSchoolID: function() {
					        	
					            return objectValue.schoolID;
					            
					        },
					        
					        setSchoolIDValue: function(schoolIDValue) {
					        	
					        	
					        	objectValue.schoolIDValue = schoolIDValue;
					        	
					            
					        },
					        getSchoolIDValue: function() {
					        	
					            return objectValue.schoolIDValue;
					            
					        },
					        
					        setMenuID: function(menuID) {
					        	
					            objectValue.menuID = menuID;
					            
					        },
					        getMenuID: function() {
					        	
					            return objectValue.menuID;
					        },
					        
					        setMenuIDValue: function(menuIDValue) {
					        	
					        	
					        	objectValue.menuIDValue = menuIDValue;
					        	
					            
					        },
					        getMenuIDValue: function() {
					        	
					            return objectValue.menuIDValue;
					            
					        },
					        
					        setBookRefNo: function(bookRefNo) {
					        	
					            objectValue.bookRefNo = bookRefNo;
					            
					        },
					        getBookRefNo: function() {
					        	
					            return objectValue.bookRefNo;
					            
							},
							getStaffID: function() {
					        	
					            return objectValue.staffID;
					            
					        },
							getStatus: function() {
					        	
					            return objectValue.status;
					            
					        }



			    	 }
	})
	
})(); //function close