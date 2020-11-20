
var app = angular
.module('elephant')
.run(['$rootScope', '$state', '$stateParams','$transitions','$location', function($rootScope, $state, $stateParams, $transitions, $location) {

  $transitions.onStart({to:'**'}, function(transition) {
        var $state = transition.router.stateService;

        console.log("statechange start " +$rootScope.isUserLogged);
        // check if the state should be protected
        if (!$rootScope.isUserLogged) {
          // redirect to the 'login' state
          console.log("statechange login");
          //return $state.target('login');

          $location.path('/login'); //saikiran 13-Apr-2019 change to login after development
          
        }
   });

//   $rootScope.$on('$stateChangeSuccess',function(){
//     document.body.scrollTop = document.documentElement.scrollTop = 0;
//   });

//   console.log('stateChangeSuccess ' + $state);
  
//   $rootScope.$state = $state;
//   return $rootScope.$stateParams = $stateParams;

}]);


