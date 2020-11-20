(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueTransportController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal','$compile', '$state', '$stateParams', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile, $state, $stateParams ) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        $scope.studentID = "";
        $scope.wrapper = [];
        $scope.transportWrapper=[];
		$scope.addButtonView = true;

		$scope.viewHeader = $stateParams.viewHeader;
		var viewModule = $stateParams.viewModule;
		var viewUrl = $stateParams.viewUrl; //getting viewUrl
		var viewController = $stateParams.viewController; //getting viewController
		var viewSize = $stateParams.viewSize; //getting viewSize


		console.log('viewUrl ' + viewUrl);
		console.log('viewController ' + viewController);


		if (viewModule == 'transport-admin') {
			$scope.addButtonView = false;
		}



        // $scope.menuName = sharedProperties.getMenuName();
        // $scope.modalHidden = false;


        //----------------
        var $ctrl = this;


        //------------------DT code
        var dt = this;
        dt.message = '';
        //dt.someClickHandler = someClickHandler;
        dt.edit = edit;
        dt.dtInstance = {};
        dt.infos = {};

        dt.options = DTOptionsBuilder
            .fromFnPromise(function () { return $scope.searchData() }) //call from search button
            .withDOM('Blrtip')
            .withDOM(`<"row"<"col-sm-6"i><"col-sm-6"f>>
				<"table-responsive"tr><"row"<"col-sm-6"l><"col-sm-6"p>>`)
            .withBootstrap()
            .withLanguage({
                paginate: {
                    previous: "&laquo;",
                    next: "&raquo;",
                },
                search: "_INPUT_",
                searchPlaceholder: "Search…"
            })
            .withOption("order", [
                [1, "desc"]
            ])
            .withOption("responsive", true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);
            // .withOption('rowCallback', rowCallback);
        // .withButtons([
        // 	'columnsToggle',
        // 	'colvis',
        // 	'copy',
        // 	'print',
        // 	'excel',
        // 	{
        // 			text: 'Some button',
        // 			key: '1',
        // 			action: function (e, dt, node, config) {
        // 					alert('Button activated');
        // 			}
        // 	}
        // ]);			

        dt.columns = [
            DTColumnBuilder.newColumn("tsRefNo").withTitle("Ref No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
            //DTColumnBuilder.newColumn("studentName").withTitle("Student Name").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("tat").withTitle("TAT").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("tatColor").withTitle('TAT').notSortable().renderWith(actionsHtmlClock),
            DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
            DTColumnBuilder.newColumn("reason").withTitle("Reason").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("destination").withTitle("Destination").withOption('defaultContent', '-'),			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("desc").withTitle("Description").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("noOfPersons").withTitle("Persons").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("tripTypeValue").withTitle("Trip Type").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("requestStatusValue").withTitle("Request Status").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("hostelIDValue").withTitle("Hostel").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("blockNo").withTitle("Block No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("roomNo").withTitle("Room No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("recordStatusValue").withTitle("Status").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("journeyDateTime").withTitle("Journey Date").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("returnDateTime").withTitle("Return Date").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("allocationDate").withTitle("Allocation Date").withOption('defaultContent', '-'),


        ];
        // dt.newPromise = newPromise;
        // dt.reloadData = reloadData;
        // dt.dtInstance = {};

        // function newPromise() {
        //     return $scope.searchData();
        // }
        // function reloadData() {
        //     var resetPaging = true;
        //     dt.dtInstance.reloadData(callback, resetPaging);
        // }

        // function callback(json) {
        //     console.log(json);
        // }

        // dt.dtInstanceCallback = function (_dtInstance) {
        //     dt.dtInstance = _dtInstance;
        //     dt.dtInstance.reloadData();
        // }

        // function someClickHandler(info) {
        //     dt.message = info.gradeID + ' - ' + info.subjectID;
        //     console.log('click ' + dt.message);
        //     var passInfo = [info.gradeID, info.subjectID];
        //     //$ctrl.openModal('sm','', passInfo);

        //     $scope.wrapper.academicYearID=info.academicYearID;
        //     $scope.wrapper.gradeID=info.gradeID;
        //     $scope.wrapper.subjectID=info.subjectID;

        //     $scope.saveData();
        // }

        // function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        //     // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        //     $('td', nRow).unbind('click');
        //     $('td', nRow).bind('click', function () {
        //         $scope.$apply(function () {
        //             dt.someClickHandler(aData);
        //         });
        //     });
        //     return nRow;
        // }


        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function actionsHtml(data, type, full, meta) {
             var id_data = data;
             id_data["id"]=meta.row;  //add id element
            // console.log('actionsHtml: ' + JSON.stringify( id_data));
            dt.infos[id_data.id] = data;
            return '<div class="text-center">'  +
                   '<span class="icon icon-edit text-primary" style="cursor: pointer;" ng-click="dt.edit(dt.infos['+id_data.id+'])"></span></div>' //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
        }

        function edit(info) {
            // console.log('You are trying to edit the row: ' + JSON.stringify(info));
            var passInfo;
            
            passInfo= [info.tsRefNo, "UPDATE", viewModule];
            sharedProperties.setActionMode("UPDATE");

            if (viewModule == 'transport-admin') {

                passInfo= [info.tsRefNo, "UPDATE_RESPONSE", viewModule];
                sharedProperties.setActionMode("UPDATE_RESPONSE");
    
            }
			$ctrl.openModal(viewSize, '', passInfo, viewUrl, viewController);
        }

        function actionsHtmlClock(data, type, full, meta) {
			// var id_data = data;
			// id_data["id"] = meta.row;  //add id element
			//console.log('actionsHtmlMorningStatus: ' + JSON.stringify( data));
			// dt.infos[id_data.id] = data;

			var iconType = "icon-clock-o text-default ";

			if (data == 'RED') {
				iconType = "icon-clock-o text-danger ";
			}
			if (data == 'GREEN') {
				iconType = "icon-clock-o text-primary ";
			}

            return '<div class="text-center">' +
				'<span class="icon ' + iconType + '" style="cursor: pointer;" "></span></div>';
        }
        
        $ctrl.openModal = function (size, parentSelector, passInfo, paramViewUrl, paramViewController) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: paramViewUrl, //'views/hostel/service-tickets.html',
                controller: paramViewController, //'serviceTicketsController',
                controllerAs: '$ctrl',
                size: size,
                scope: $scope,
                appendTo: parentElem,
                keyboard: false,
                resolve: {
                    passInfo: function () {
                        return passInfo;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
                console.log('$ctrl.selected: ' + $ctrl.selected);
                $scope.dtSearch();
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };






        //---------end of DT code


        //------------start loadData Function----------------

        $scope.loadData = function () {

            var deferred = $q.defer();

            methodAction = "fetchMultiPopoverData";

            message = [
                {
                    "tableName": "MST_TripType",
                    "filter": ""
                },
                {
                    "tableName": "MST_Status",
                    "filter": ""
                },
                {
                    "tableName": "MST_Hostel",
                    "filter": ""
                },
                {
                    "tableName": "MST_TransportStatus",
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

            });


            return deferred.promise;

        }   //------------------- ends loadData Function-----------------      


        //------------start saveData Function----------------

        //call from search button
        $scope.dtSearch = function () {

            //alert('test1');
            if (!angular.equals(dt.dtInstance, {})) {
                //alert('test2');
                dt.dtInstance.reloadData();
                dt.dtInstance.changeData(function () { return $scope.searchData() });
            }

        }


        //--------fetchuserMenu------------
        $scope.searchData = function () {

            var deferred = $q.defer();

            //alert('test3');
            //if ($scope.loginForm.wrapper.academicYearID.$valid) {

                methodAction = "fetchTransport";

                message = {

                    "hostelID":(viewModule == 'transport'?"":"hostelID")
                };

                $rootScope.loading = true;

                console.log('cal message ' + JSON.stringify(message));

                jsonData = connectHostFactory(methodAction, message);

                jsonData.returnData(function (value) {

                    if (value != null) {

                        result = value.fetchTransport;

                        console.log('cal result ' + JSON.stringify(result));

                        if (value.success == true) {

                            if (result.validSession == true && result.transportWrapper[0].recordFound == true) {
                                
                                $scope.transportWrapper = result.transportWrapper;

                            }
                            else {

                                $scope.transportWrapper = [];
                            }
                        }


                    }

                    $rootScope.loading = false;
                    deferred.resolve($scope.transportWrapper);
                });
            //}

            return deferred.promise;
        }
        //-------end fetchuserMenu---------


        $scope.doAdd = function () {
            sharedProperties.setActionMode("ADD");
            var passInfo = ["", "ADD", viewModule];
			$ctrl.openModal(viewSize, '', passInfo, viewUrl, viewController);
            
        }


        //--------------start saveData Function-----------------

        // $scope.saveData = function () {


        //     $scope.submitted = true;

        //     //if ($scope.form.$valid) {



        //         methodAction = "updateGradeSubjects";

        //         message = {

        //             "academicYearID": $scope.wrapper.academicYearID,
        //             "gradeID": $scope.wrapper.gradeID,
        //             "subjectID": $scope.wrapper.subjectID,
        //             "deleteFlag": "Y" //--'Y' or 'N'

        //         };

        //         //alert('message = '+JSON.stringify(message));	
        //         $scope.buttonDisabled = true;
        //         $rootScope.loading = true;

        //         jsonData = connectHostFactory(methodAction, message);
        //         jsonData.returnData(function (value) {

        //             //alert('Value personal Data= '+JSON.stringify(value));

        //             if (value != null) {


        //                 result = value.updateGradeSubjects;



        //                 if (value.success == true) {


        //                     if (result.validSession == true && result.gradeSubjectsWrapper[0].recordFound == true) {

        //                         messageFactory(appConstants.RECORD_DELETED);

        //                         $scope.wrapper=[]; //to clear before search
        //                         $scope.dtSearch();


        //                         //alert(JSON.stringify(result));



        //                     }
        //                     else if (result.validSession == false) {
        //                         messageFactory(appConstants.SYSTEM_INVALIDSESSION);
        //                     }
        //                     else {


        //                         messageFactory(appConstants.SYSTEM_NORECORDS);

        //                     }

        //                 }
        //                 else {

        //                     messageFactory(appConstants.SYSTEM_NORESPONSE);
        //                 }

        //             }
        //             else {

        //                 messageFactory(appConstants.SYSTEM_ERROR);
        //             }

        //             $rootScope.loading = false;
        //             $scope.buttonDisabled = false;
        //         });





        //     //}//----if form validation





        // }  //------------ends saveData Function-------------

    }]);

})();