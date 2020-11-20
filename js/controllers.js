angular.module("elephant")
  .controller("AppCtrl", ["$rootScope", "$location", function AppCtrl($rootScope, $location) {
    var app = this,
        def = ["layout", "layout-header-fixed"];

    app.sidebar = {};
    app.sidebar.isCollapsed = false;
    app.sidebar.toggle = function toggle() {
      this.isCollapsed = !this.isCollapsed;
    };

    app.sidebar.xs = {};
    app.sidebar.xs.isCollapsed = true;
    app.sidebar.xs.toggle = function toggle() {
      this.isCollapsed = !this.isCollapsed;
    };

    $rootScope.$on("$stateChangeStart", function handleStateChangeStart(evt, toState) {
      app.title = _.get(toState, "data.title", "App");
      app.cssClasses = _.join(_.get(toState, "data.cssClasses", def), " ");
      app.sidebar.isFixed = _.includes(app.cssClasses, "layout-sidebar-fixed");


      
      //saikiran 18-Apr-2019
      if (!$rootScope.isUserLogged) {
        // no logged user, redirect to /login
          $location.path("/login");
      }



    });


    //app.config(function(){

          // Initialize Firebase
          $rootScope.firebase = '';
          $rootScope.firestore = '';

          var config = {
            apiKey: "AIzaSyCID5HDbCh3nfivHe4hPCrDmrks6jMjJvY",
            authDomain: "maabadi-270cf.firebaseapp.com",
            databaseURL: "https://maabadi-270cf.firebaseio.com",
            projectId: "maabadi-270cf",
            storageBucket: "maabadi-270cf.appspot.com",
            messagingSenderId: "787336213564"
          };
          //firebase.initializeApp(config);

          // Initialize the default app
          $rootScope.firebase = firebase.initializeApp(config);
          // $rootScope.firestore = firebase.firestore();

    //});


    $(window).on("scroll", function handleWindowScroll(evt) {
      var currPos = window.pageYOffset;
      var alpha1 = Math.min(0.090, currPos * 0.001);
      var alpha2 = Math.min(0.075, currPos * 0.001);
      $("div.layout-header").css({
        "box-shadow": "inset 0 1px 0 rgba(255,255,255, " + alpha1 + ")," +
          "0 1px 5px rgba(0, 0, 0, " + alpha2 + ")"
      });
    });

  }]);
