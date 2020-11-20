(function(){
    "use strict";
    
    var app = angular.module('elephant');
       
    app.factory('alertsManager', function() {
        return {
            alerts: {},
            addAlert: function(message, type) {
                this.alerts[type] = this.alerts[type] || [];
                this.alerts[type].push(message);
            },
            clearAlerts: function() {
                for(var x in this.alerts) {
               delete this.alerts[x];
            }
            }
        };
    });
	

	
})(); //function