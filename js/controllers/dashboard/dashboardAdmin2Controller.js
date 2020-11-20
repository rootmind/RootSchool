(function () {
  "use strict";

  var app = angular.module('elephant');

  // Dashboard Controller
  app.controller('dashboardAdmin2Controller', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', '$q', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, $q) {


    var methodAction = null;
    var message = null;
    var jsonData = null;
    var result = null;


    $scope.studentAcademicsWrapper=[];

    //------------start loadData Function----------------

    $scope.loadData = function () {

      var deferred = $q.defer();


      methodAction = "fetchMultiPopoverData";

      message = [


        {
          "tableName": "MST_Grade",
          "filter": ""
        },
        {
          "tableName": "MST_Subject",
          "filter": ""
        }
      ];

      $rootScope.loading = true;

      jsonData = connectHostFactory(methodAction, message);
      jsonData.returnData(function (value) {

        //alert('Popover Data='+JSON.stringify(value));

        if (value != null) {

          result = value.fetchMultiPopoverData;

          if (value.success == true) {

            if (result.validSession == true) {
              $scope.popoverWrapper = result.popoverWrapper;
              deferred.resolve($scope.popoverWrapper);

            }
          }

        }

        $rootScope.loading = false;

        $scope.fetchStudentAcademics();

      });

      return deferred.promise;

    }   //------------------- ends loadData Function-----------------       

    $scope.visitors = {
      series: ["Academics"],
      data: [
        [29432, 20314, 17665, 22162, 31194, 35053, 29298, 36682, 45325, 39140, 22190, 28014, 24121, 39355, 36064, 45033, 42995, 30519, 20246, 42399, 37536, 34607, 33807, 30988, 24562, 49143, 44579, 43600, 18064, 36068, 41605]
      ],
      labels: ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7", "Aug 8", "Aug 9", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 14", "Aug 15", "Aug 16", "Aug 17", "Aug 18", "Aug 19", "Aug 20", "Aug 21", "Aug 22", "Aug 23", "Aug 24", "Aug 25", "Aug 26", "Aug 27", "Aug 28", "Aug 29", "Aug 30", "Aug 31"],
      colors: [{
        backgroundColor: "#1c90fb",
        borderColor: "#1c90fb"
      }],
      options: {
        animation: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#f5f5f5"
            },
            ticks: {
              fontColor: "#bcc1c6",
              maxTicksLimit: 5
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              color: "#f5f5f5",
            },
            ticks: {
              fontColor: "#bcc1c6",
            }
          }]
        },
      },
    };

    $scope.sales = {
      series: ["Sales"],
      data: [
        [3601.09, 2780.29, 1993.39, 4277.07, 4798.58, 6390.75, 3337.37, 6786.94, 5632.1, 5460.43, 3905.17, 3070.82, 4263.55, 7132.64, 6103.88, 6020.76, 4662.25, 4084.34, 3464.87, 4947.89, 4486.55, 5898.46, 5528.33, 3616.03, 3255.17, 7881.06, 7293.8, 6863.6, 3161.31, 6711.08, 7942.9]
      ],
      labels: ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7", "Aug 8", "Aug 9", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 14", "Aug 15", "Aug 16", "Aug 17", "Aug 18", "Aug 19", "Aug 20", "Aug 21", "Aug 22", "Aug 23", "Aug 24", "Aug 25", "Aug 26", "Aug 27", "Aug 28", "Aug 29", "Aug 30", "Aug 31"],
      colors: [{
        backgroundColor: "#f75b50",
        borderColor: "#f75b50"
      }],
      options: {
        animation: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#f5f5f5"
            },
            ticks: {
              fontColor: "#bcc1c6",
              maxTicksLimit: 5
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              color: "#f5f5f5",
            },
            ticks: {
              fontColor: "#bcc1c6",
            }
          }]
        },
      },
    };




    //------for view--------------
    $scope.fetchStudentAcademics = function () {

      //alert('search data');

      var deferred = $q.defer();

      //---------TO RELOAD UPDATED RECORD--------
      methodAction = "fetchStudentAcademics";

      message = {
        "refNo": sharedProperties.getRefNo(),
        "studentID": sharedProperties.getStudentID(),
      };

      console.log('SearchData message ' + JSON.stringify(message));

      $rootScope.loading = true;

      jsonData = connectHostFactory(methodAction, message);

      jsonData.returnData(function (value) {

        if (value != null) {

          result = value.fetchStudentAcademics;

          console.log('Value  Data= ' + JSON.stringify(value));

          if (value.success == true) {

            if (result.validSession == true && result.studentAcademicsWrapper[0].recordFound == true) {

              $scope.studentAcademicsWrapper = result.studentAcademicsWrapper;
              console.log('$scope.academicsWrapper= ' + JSON.stringify($scope.studentAcademicsWrapper));


              var studentAcademicsDataPoints = [];

              for (var i = 0; i <= $scope.studentAcademicsWrapper.length - 1; i++) {


                if (typeof $scope.studentAcademicsWrapper[i] === 'undefined') {

                  //morningStatusPresentDataPoints.push({ label: months[i], data: 0 });

                }
                else {

                  studentAcademicsDataPoints.push({ label: $scope.studentAcademicsWrapper[i].subjectIDValue, data: parseInt($scope.studentAcademicsWrapper[i].securedMarks) });
                }

               


              }

              var labels = studentAcademicsDataPoints.map(function (e) {
                return e.label;
              });
              var source1 = studentAcademicsDataPoints.map(function (e) {
                return e.data;
              });

              // $scope.visitors.labels = labels;
              // $scope.visitors.data = [source1];

            }
            // else if (result.validSession == false) {
            //   messageFactory(appConstants.SYSTEM_INVALIDSESSION);
            // }
            // else {
            //   messageFactory(appConstants.SYSTEM_NORECORDS);
            // }
          }

          else {
            messageFactory(appConstants.SYSTEM_NORESPONSE);
          }

        }
        else {
          messageFactory(appConstants.SYSTEM_ERROR);
        }

        $rootScope.loading = false;

        deferred.resolve($scope.studentAcademicsWrapper);
      });


      return deferred.promise;
    }
    //--------------END--------------------

  }]);


})();