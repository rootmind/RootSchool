(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueMasterController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal', '$compile',function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        $scope.studentID = "";
        $scope.wrapper = [];

        // var masterTableName = null;
        // var masterFilter = null;

        // $scope.menuName = sharedProperties.getMenuName();

        // $scope.modalHidden = false;


        //----------------
        var $ctrl = this;


        //------------------DT code
        var dt = this;
        dt.message = '';
        // dt.someClickHandler = someClickHandler;
        dt.edit = edit;
        dt.dtInstance = {};
        dt.infos = {};


        dt.options = DTOptionsBuilder
            .fromFnPromise(function () { return $scope.searchData() }) //  //call from search button
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
            DTColumnBuilder.newColumn("code").withTitle("Code").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("desc").withTitle("Description").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
            // DTColumnBuilder.newColumn('edit').withTitle("Edit").renderWith(function (id) { return '<div class="text-center"><span class="icon icon-edit text-primary" style="cursor: pointer;"></span></div>' }), //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
            DTColumnBuilder.newColumn("tableName").withTitle("Table").withOption('defaultContent', '-').notVisible(),
            DTColumnBuilder.newColumn("makerID").withTitle("Maker").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("makerDateTime").withTitle("Date&Time").withOption('defaultContent', '-')			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
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
        //     dt.message = info.code + ' - ' + info.desc +' - '+ info.tableName;
        //     console.log('click ' + dt.message);
        //     var passInfo = [info.code, info.desc, info.tableName, "edit"];
        //     $ctrl.openModal('sm','', passInfo);
        //     //$scope.saveData(info.userid, info.menuID);
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
            var passInfo = [info.code, info.desc, info.tableName, "edit"];
            $ctrl.openModal('sm','', passInfo);
        }

        $ctrl.openModal = function (size, parentSelector, passInfo) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/security/master.html',
                controller: 'masterController',
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

            methodAction = "fetchTableNames";

            //dummy request
            message = {
                "tableName": "MST_TableNames"
            };

            $rootScope.loading = true;

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {

                //alert('value '+JSON.stringify(value));
                if (value != null) {

                    result = value.fetchTableNames;

                    //alert('result '+result);

                    if (value.success == true) {

                        if (result.validSession == true && result.popoverWrapper[0].recordFound == true) {

                            $scope.tableNameWrapper = result.popoverWrapper;

                            deferred.resolve($scope.tableNameWrapper);
                        }

                    }

                }

                $rootScope.loading = false;

                return deferred.promise;

            });


        }
        //------------ends loadData Function---------------- 


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


        //----------// getTableData Function

        $scope.searchData = function () {

            var deferred = $q.defer();

            console.log('test3 ' + $scope.tableName);
            // $scope.wrapper.code = '';
            // $scope.wrapper.description = '';
            // $scope.wrapper.filterName = '';

            if(!$scope.tableName)
            {
                $scope.tableName='MST_AcademicYear';
            }

            methodAction = "fetchMasterData";

            //masterTableName = $scope.tableNames.code.substring(0, $scope.tableNames.code.length - 1);
            //masterFilter = $scope.tableNames.code.substring($scope.tableNames.code.length - 1, $scope.tableNames.code.length);

            message = {

                "tableName": $scope.tableName, //.code,//masterTableName, 										//"GENDER",  
                "filter": ''//masterFilter
            };

            // if (masterFilter == 'Y') {
            //     $scope.filterEnabled = false;
            // }
            // else {
            //     $scope.filterEnabled = true;

            // }


            console.log('Master message= '+JSON.stringify(message));
            $rootScope.loading = true;
            $scope.popoverWrapper = "";

            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                $rootScope.loading = false;

                console.log('Master Popover value Data= '+JSON.stringify(value));

                if (value != null) {

                    result = value.fetchMasterData;

                    if (value.success == true) {

                        if (result.validSession) {

                            if (result.recordFound == true) {

                                console.log('Master   result Data= '+JSON.stringify(result));
                                $scope.wrapper = result.popoverWrapper;

                                deferred.resolve($scope.wrapper);
                                //popoverWrapperLength=$scope.popoverWrapper.length;
                            }

                        }



                    }
                }

            });

            return deferred.promise;

        }
        // end getTableData Function       


        //-----------------

        $scope.doAdd = function () {
            var passInfo = ["", "", $scope.tableName, "add"];
            $ctrl.openModal('sm', '', passInfo);
        }





    }]);

})();