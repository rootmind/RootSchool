(function(){
    "use strict";
    
    var app = angular.module('elephant');
       
	app.constant('appConstants',{
			
		

			//HOST_URL:'https://rootmindtech.ddns.net/RootSchoolWeb/RootSchool',  
			//HOST_URL:'https://maabadi-270cf.appspot.com', //rootmindtech@gmail.com registration -old
			//HOST_URL:'https://maabadi-219919.appspot.com', //skgandham@gmail.com registration -old
			//HOST_URL:'http://192.168.1.110:8089/RootSchoolWeb/RootSchool',
			//HOST_URL:'http://rootmindtech.ddns.net:8089/RootSchoolWeb/RootSchool', 

			//HOST_URL:'https://rootschool-dot-school-30cc4.appspot.com', //bannu.phani@gmail.com registration --current one
			//HOST_URL:'https://emirateshost.rootmindtech.com/RootSchoolWeb/RootSchool', //using godaddy

			//20-NOV-2020 -- link to local
			HOST_URL:'http://rootmind.ddns.net:8089/RootSchoolWeb/RootSchool', 

			HOST_REPORTSURL:'http://rootmindtech.ddns.net:8082/SchoolReports/ReportsServlet',
		   //HOST_REPORTSURL:'http://rootmindpc3:8080/SchoolReports/ReportsServlet',
		   REPORTS_DSN:'SCHOOLJRDSN',
		   //REPORTS_DSN:'SWARNANDHRAJRDSN',
		   SYSTEM_ERROR:'Network unavailable, please contact system administrator',
		   SYSTEM_NORESPONSE:'No response from host system',
		   SYSTEM_NORECORDS:'No records found',
		   SYSTEM_INVALIDSESSION:'Invalid session, please login again',
		   RECORD_UPDATED:'Record updated successfully',
		   RECORD_DELETED:'Record deleted successfully',
		   RECORD_EXISTED:'Record already existed',
		   GCM_PROJECTID:'school-1258',
		   AES_ENCRYPTKEY:'Sri534260$#%&@^$',      //'AbcDefGhILmnoPQr'

		   success:"success",		//saikiran 03-May-2019
		   info:"info",
		   warning:"warning",
		   error:"error"


	});
	

	
})(); //function close