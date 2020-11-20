(function(){
    "use strict";
    
    var app = angular.module('elephant');
       
	app.factory('connectHostFactory',['$http','$rootScope','appConstants', function($http, $rootScope, appConstants){
		
		return function(methodAction,message){
			
				//saikiran 15-Apr-2019
				var userProfile={
					      	  "userid" : $rootScope.userid,
					    	  "deviceToken" : $rootScope.deviceToken,
							  "sessionid" : $rootScope.sessionid,
							  "refNo" : $rootScope.refNo,
							  "userGroup" : $rootScope.userGroup

			    	};
				return new connectHost($http,userProfile,methodAction,message, appConstants.HOST_URL);
			};	
	}]); //factory
	
	function connectHost($http,userProfile,methodAction,message,HOST_URL){
		this.returnData=function(callBack){
			$http({
				method:"POST",
				headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Accept':'application/json, text/plain, *'},
				url:HOST_URL,         //"http://rootmind.ddns.net:8070",
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				transformResponse: function (data, headersGetter) {
					return  angular.fromJson(data) 
				},
				//timeout:60,
				data:{userProfile: JSON.stringify(userProfile), methodAction:methodAction, message:JSON.stringify(message)
					
			
				}
				
			})
			.then(function successCallback(response) {
			/*	callBack(JSON.stringify(response.data));*/
				
				//alert('success '+JSON.stringify(response));
				
				callBack(response.data);		
				
				
			}, function errorCallback(response) {
				
				//var errorResponse={"errCode":"999","errDesc":"No response from host"};
				//alert('failure '+JSON.stringify(response));
				
				//callBack(errorReponse);	    
				callBack(response.data);
			});
		}
	};
	
})(); //function