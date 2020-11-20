(function(){
    "use strict";
    
    var app = angular.module('elephant');
       
	app.factory('connectHostImageFactory',['$http','$rootScope', 'appConstants', function($http,$rootScope, appConstants){
		
		
		
		return function(methodAction, message, destination,file){
			
			var userProfile={
			      	  "userid" : $rootScope.userid,
			    	  "deviceToken" : $rootScope.deviceToken,
			    	  "sessionid" : $rootScope.sessionid	  
	    	};
			
			//alert('in connectHostImage');
			return new connectHostImage($http,userProfile,methodAction,message,destination,file, appConstants.HOST_URL);
		};	
		
		
	}]); //factory
	
	function connectHostImage($http,userProfile,methodAction,message,destination,file, HOST_URL){
		this.returnData=function(callBack){
			
			
			//alert('in connectHostImage 2');
			
			$http({
				method:"POST",
				headers: { 'Content-Type':undefined},
				//headers: { 'Content-Type': 'undefined','Accept':'application/json, text/plain, *'},
				url:HOST_URL,              //"http://rootmind.ddns.net:8086",
			/*	transformRequest: function(obj) {
					
					var formData = new FormData();
					
					
	                //now add all of the assigned files
	                for (var i = 0; i < data.files; i++) {
	                    //add each file to the form data and iteratively name them
	                    formData.append("file" + i, data.files[i]);
	                }
	                
					var str = [];
					for(var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					
					var retData=str.join("&");
					
					formData.append("userProfile", data.userProfile);
					formData.append("methodAction", data.methodAction);
					formData.append("destination", data.destination);
					return formData;
				},*/
				
				
				transformRequest: function(obj) {
					var formData = new FormData();
					var str = [];
					for(var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					//return str.join("&");
					
					formData.append("userProfile", JSON.stringify(userProfile));
					formData.append("methodAction", methodAction);
					formData.append("message",JSON.stringify(message));
					formData.append("destination", destination);
					formData.append("file", file);
					return formData;
				},
				
				transformResponse: function (data, headersGetter) {
					return  angular.fromJson(data) 
				},
				data:{userProfile: JSON.stringify(userProfile), methodAction:methodAction, message:JSON.stringify(message), destination:JSON.stringify(destination), file:file
				}
		})
		
		.then(function successCallback(response) {
		/*	callBack(JSON.stringify(response.data));*/
			callBack(response.data);
		}, function errorCallback(response) {
			callBack(response.data);
		});
			
			
		}
	};
	
})(); //function