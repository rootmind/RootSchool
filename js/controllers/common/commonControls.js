(function(){
    "use strict";
    
    var app = angular.module('elephant');
       
	app.factory('commonControls',['$filter', function ($filter) {
        
		
        return {

        	dateFormat: function(inputDate){
        		return $filter('date')(inputDate,'dd/MM/yyyy');
        	},
        	
        	dateFormatYYYYMMDD: function(inputDate){
        		return $filter('date')(inputDate,'yyyy-MM-dd');
        	},
        	dateFormatMMM: function(inputDate){
        		return $filter('date')(inputDate,'dd/MMM/yyyy');
        	},
        
        	carYear: function(inputDate){
        		return $filter('date')(inputDate,'yyyy');
        	},

			dateFormatYYYY: function(inputDate){
        		return $filter('date')(inputDate,'yyyy');
        	},
			
        	dateFormatMMDDYYYY: function(inputDate){
        		return $filter('date')(inputDate,'MM/dd/yyyy');
        	},
        	dateFormatHHMM: function(inputDate){
        		return $filter('date')(inputDate,'HH:mm');
			},
			setDateFormat:function(inputDate){

				if (inputDate != null && inputDate.length >= 10) {
					var YYYY = inputDate.substring(6);
					var MM = inputDate.substring(3, 5);
					var DD = inputDate.substring(0, 2);
					return inputDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));
				}
				else
				{
					return inputDate;
				}
			}
			
        	
       
        }
    }]); //factory
	

	
})(); //function