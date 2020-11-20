(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('queueOnlinePaymentController', ['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal','$compile', function ($scope, $rootScope, connectHostFactory, $location, sharedProperties, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal,$compile) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;
        //$scope.studentID = "";
        $scope.wrapper = [];

        $scope.onlinePaymentWrapper=[];

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
                [3, "desc"]
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
            DTColumnBuilder.newColumn("paymentRefNo").withTitle("Payment Ref No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("cardType").withTitle("CardType").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("cardNo").withTitle("Card No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("amount").withTitle("Amount").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("status").withTitle("Status").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("refNo").withTitle("Ref No").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("studentID").withTitle("Student ID").withOption('defaultContent', '-'),
            //DTColumnBuilder.newColumn("gradeIDValue").withTitle("Grade").withOption('defaultContent', '-'),
            //DTColumnBuilder.newColumn("sectionIDValue").withTitle("Section").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("paymentType").withTitle("Payment Type").withOption('defaultContent', '-'),
            DTColumnBuilder.newColumn("bankName").withTitle("Bank").withOption('defaultContent', '-'),
            //DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtml),
            DTColumnBuilder.newColumn("cardIssuer").withTitle("Issuer").withOption('defaultContent', '-'),	
            //DTColumnBuilder.newColumn(null).withTitle('Delete').notSortable().renderWith(actionsHtml),
            //DTColumnBuilder.newColumn('cardNo').withTitle("Card No").renderWith(function (id) { return '<div class="text-center"><span class="icon icon-trash text-primary" style="cursor: pointer;"></span></div>' }), //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
            DTColumnBuilder.newColumn("nameOnCard").withTitle("Name on card").withOption('defaultContent', '-'),

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
        //     $scope.wrapper.staffUserID = info.staffUserID;

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

            sharedProperties.setActionMode("UPDATE");
            var passInfo = [info.messageID, "UPDATE"];
            $ctrl.openModal('md', '', passInfo);


            // $scope.wrapper.academicYearID=info.academicYearID;
            // $scope.wrapper.gradeID=info.gradeID;
            // $scope.wrapper.subjectID=info.subjectID;
            // $scope.wrapper.staffUserID = info.staffUserID;

            // Swal.fire({
			// 	title: 'Do you want to delete?',
			// 	text: "You won't be able to revert this!",
			// 	type: 'warning',
			// 	showCancelButton: true,
			// 	confirmButtonColor: '#3085d6',
			// 	cancelButtonColor: '#d33',
			// 	confirmButtonText: 'Yes, delete it!'
			// }).then((result) => {
			// 	if (result.value) {
            //         $scope.saveData();
			// 	}
			// })

        }

        $ctrl.openModal = function (size, parentSelector, passInfo) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/admin/school-message.html',
                controller: 'schoolMessageController',
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

        // $scope.loadData = function () {

        //     var deferred = $q.defer();

        //     methodAction = "fetchMultiPopoverData";

        //     message = [
        //         {
        //             "tableName": "MST_Grade",
        //             "filter": ""
        //         },

        //         {
        //             "tableName": "MST_Subject",
        //             "filter": ""
        //         },
        //         {
        //             "tableName": "MST_AcademicYear",
        //             "filter": ""
        //         }
        //     ];

        //     $rootScope.loading = true;

        //     jsonData = connectHostFactory(methodAction, message);
        //     jsonData.returnData(function (value) {

        //         //alert('Popover Data='+JSON.stringify(value));

        //         if (value != null) {



        //             result = value.fetchMultiPopoverData;

        //             if (value.success == true) {

        //                 if (result.validSession == true) {

        //                     $scope.popoverWrapper = result.popoverWrapper;
        //                     deferred.resolve($scope.popoverWrapper);
        //                 }
        //             }

        //         }

        //         $rootScope.loading = false;

        //     });


        //     return deferred.promise;

        // }   //------------------- ends loadData Function-----------------      


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

                methodAction="fetchOnlinePayment";
				
				message={
							//"academicYearID": $scope.wrapper.academicYearID,
							//"studentID": sharedProperties.getStudentID()//$scope.wrapper.staffUserID, 
							//"gradeID": $scope.wrapper.gradeID,
							//"subjectID": $scope.wrapper.subjectID
					    };

                $rootScope.loading = true;

                jsonData = connectHostFactory(methodAction, message);

                jsonData.returnData(function (value) {

                    if (value != null) {

                        result = value.fetchOnlinePayment;

                        if (value.success == true) {

                            if(result.validSession==true && result.onlinePaymentWrapper[0].recordFound==true)
                            {
                                    $scope.onlinePaymentWrapper=result.onlinePaymentWrapper;
                                     //$scope.wrapper.deleteEnable = true;
                                    

                            }
                            else {

                                $scope.onlinePaymentWrapper = [];
                            }
                        }


                    }

                    $rootScope.loading = false;
                    deferred.resolve($scope.onlinePaymentWrapper);
                });
            //}

            return deferred.promise;
        }
        //-------end fetchuserMenu---------


        $scope.doAdd = function () {
            sharedProperties.setActionMode("ADD");
            var passInfo = ["", "ADD"];
            $ctrl.openModal('md', '', passInfo);
        }



        //--------------start saveData Function-----------------

        $scope.saveData = function () {


            $scope.submitted = true;

            //if ($scope.form.$valid) {



                methodAction = "insertOnlinePayment";

                message={
						
                    "refNo": $scope.wrapper.refNo,
                    "studentID": $scope.wrapper.studentID,
                    "gradeID": $scope.wrapper.gradeID,   
                    "subjectID": $scope.wrapper.subjectID,
                    "paymentType":$scope.wrapper.paymentType,
                    "bankName":$scope.wrapper.bankName,
                    "cardType":$scope.wrapper.cardType,
                    "cardIssuer":$scope.wrapper.cardIssuer,
                    "cardNo":$scope.wrapper.cardNo,
                    "nameOnCard":$scope.wrapper.nameOnCard,
                    "cvv":$scope.wrapper.cvv,
                    "expiryMonth":$scope.wrapper.expiryMonth,
                    "expiryYear":$scope.wrapper.expiryYear,
                    "amount":$scope.wrapper.amount

                    
                };

                console.log('message = '+JSON.stringify(message));	
                $scope.buttonDisabled = true;
                $rootScope.loading = true;

                jsonData = connectHostFactory(methodAction, message);
                jsonData.returnData(function (value) {

                    console.log('Value personal Data= '+JSON.stringify(value));

                    if (value != null) {


                        result = value.insertOnlinePayment;



                        if (value.success == true) {


                            if (result.validSession == true && result.onlinePaymentWrapper[0].recordFound == true) {

                                messageFactory('Payment completed');

                                //$scope.wrapper=[]; //clear data before search

                                //$scope.dtSearch();


                                //alert(JSON.stringify(result));

                                //$location.path('/online-payment-confirmation');



                            }
                            else if (result.validSession == false) {
                                messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                            }
                            else {


                                messageFactory(appConstants.SYSTEM_NORECORDS);

                            }

                        }
                        else {

                            messageFactory(appConstants.SYSTEM_NORESPONSE);
                        }

                    }
                    else {

                        messageFactory(appConstants.SYSTEM_ERROR);
                    }

                    $rootScope.loading = false;
                    $scope.buttonDisabled = false;
                });

            //}//----if form validation

        }  //------------ends saveData Function-------------


        $scope.step1Proceed=function(){

            console.log('step1');

            //$location.path('/.payment');

        }

    }]);

})();