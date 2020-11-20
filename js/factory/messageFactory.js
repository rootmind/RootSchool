(function(){
    "use strict";
    
    var app = angular.module('elephant');
    
    app.factory('messageFactory',[  function(){
    	
    	return function(message, type){

                
					 var confirm="";
					 
                    if(!type)
                    {
                      type="info";
                    }

                    Swal.fire({
                      type: type,
                      title: message,
                      showConfirmButton: false,
                      timer: 1500,
                    })

                    return confirm;

             
	      
	    };

		
			
	}]); //factory
    

})(); //function close