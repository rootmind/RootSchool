(function(){
    "use strict";
    
    var app = angular.module('elephant');
    
    app.factory('aesCryptoFactory',['appConstants', function(appConstants){
    	
    	return function(password){


	 			
    		var key = CryptoJS.enc.Utf8.parse(appConstants.AES_ENCRYPTKEY);
            
			var encryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key,  
		                {  
		                    keySize: 128 / 8,  
		                  
		                    mode: CryptoJS.mode.ECB,  
		                    padding: CryptoJS.pad.Pkcs7  
		                }); 

            return  encryptedPassword.toString();



	      
	    };



			
			
	}]); //factory
    

})(); //function close