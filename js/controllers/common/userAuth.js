(function(){
    "use strict";
    
    var app = angular.module('elephant');
       
	app.service('userAuth', function(){
	
		   var objectValue = {
				   				userid : '',
				   				password : '',
				   				deviceToken : '',
				   				sessionid : ''
				   				
			    			 };
		 
			    	  return {
			        
							        setUserId: function(userid)
							        {
							        	
							            objectValue.userid = userid;
							            
							        },
			        
							        setPassword: function(password)
							        {
							        	
							            objectValue.password = password;
							            
							        },
							        
							        setDeviceToken: function(deviceToken)
							        {
							        	
							            objectValue.deviceToken = deviceToken;
							            
							        },
			        
							        setSessionId: function(sessionid) 
							        {
							        	
							            objectValue.sessionid = sessionid;
							            
							        },
							        
			        
								        getUserId: function()
								        {
								        	
								            return objectValue.userid;
								        },
								        
								        getPassword: function()
								        {
								        	
								            return objectValue.password;
								        },
								        
								        getDeviceToken: function()
								        {
								        	
								            return objectValue.deviceToken;
								        },
								        
								        getSessionId: function()
								        {
								        	
								            return objectValue.sessionid;
								        }
			    	  			}
	})
	
})(); //function close