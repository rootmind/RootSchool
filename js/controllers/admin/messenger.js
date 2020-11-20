var app = angular.module("elephant");

app.service("MessengerAdminService", ["$q", "$rootScope", "$timeout", 'connectHostFactory', 'sharedProperties', 'messageFactory', 'appConstants',


    function MessengerAdminService($q, $rootScope, $timeout, connectHostFactory, sharedProperties, messageFactory, appConstants) {



        $("#messenger_compose_message").keyup(function (event) {
            if (event.keyCode === 13) {
                $("#messenger_compose_button").click();
            }
        });


        this.getConversationList = function getConversationList() {
            var deferred = $q.defer();

            var methodAction = null;
            var message = null;
            var jsonData = null;
            var result = null;

            var messengerServiceWrapper = [];

            methodAction = "fetchMessengerServiceList";
            message = {
            };
            //$rootScope.loading = true;
            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.fetchMessengerServiceList;

                    console.log('result Data= ' + JSON.stringify(result));


                    if (value.success == true) {

                        if (result.validSession == true && result.messengerServiceWrapper[0].recordFound == true) {

                            console.log('messengerServiceWrapper ' + JSON.stringify(result.messengerServiceWrapper));

                            messengerServiceWrapper = result.messengerServiceWrapper;


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
                //$scope.wrapper.message = '';
                //$rootScope.loading = false;

                deferred.resolve(messengerServiceWrapper);


            });

            return deferred.promise;
        };



        // $timeout(function () {
        //     defer.resolve(
        //         [{
        //             "id": 601274412,
        //             "name": "Sophia Evans",
        //             "photo": "img/0601274412.jpg",
        //             "last": {
        //                 "timestamp": "04:27:55 PM",
        //                 "message": "Curabitur vel mi ante."
        //             },
        //             "conversation": [{
        //                 "isMe": true,
        //                 "timestamp": "10:38:36 PM",
        //                 "messages": ["Sed a tellus egestas, venenatis ligula ut, tincidunt lorem.", "Mauris eget sem rhoncus, ultrices neque eu, rutrum augue."]
        //             }, {
        //                 "isMe": false,
        //                 "timestamp": "04:27:55 PM",
        //                 "messages": ["Phasellus eget tempor turpis. Morbi vitae justo tempor, molestie tellus ultricies rhoncus tortor phasellus vulputate dolor orci.", "Phasellus fermentum felis rhoncus suscipit vulputate.", "Curabitur vel mi ante."]
        //             }]
        //         }, {
        //             "id": 1099386850,
        //             "name": "Jessica Brown",
        //             "photo": "img/1099386850.jpg",
        //             "last": {
        //                 "timestamp": "11:41:02 AM",
        //                 "message": "Aenean tempor purus iaculis, faucibus risus in, eleifend justo."
        //             },
        //             "conversation": [{
        //                 "isMe": false,
        //                 "timestamp": "11:31:42 AM",
        //                 "messages": ["Fusce cursus felis in dui tempus, vitae dignissim magna vehicula.", "Vivamus tincidunt orci a turpis consectetur, a pretium nibh auctor.", "Cras scelerisque sapien non sodales luctus."]
        //             }, {
        //                 "isMe": true,
        //                 "timestamp": "11:41:02 AM",
        //                 "messages": ["Sed imperdiet dui sit amet turpis commodo, et fermentum nisl ultricies.", "Suspendisse efficitur risus non ipsum ullamcorper commodo.", "Aenean tempor purus iaculis, faucibus risus in, eleifend justo."]
        //             }]
        //         }, {
        //             "id": 1182824800,
        //             "name": "Ella Davis",
        //             "photo": "img/1182824800.jpg",
        //             "last": {
        //                 "timestamp": "10:04:34 AM",
        //                 "message": "You: Nullam nec neque rhoncus, rutrum dui non, volutpat arcu."
        //             },
        //             "conversation": [{
        //                 "isMe": true,
        //                 "timestamp": "04:31:46 PM",
        //                 "messages": ["Cras viverra felis quis risus condimentum, ut cursus libero varius.", "Nullam quis nisi id odio mattis consectetur viverra eu odio."]
        //             }, {
        //                 "isMe": true,
        //                 "timestamp": "10:04:34 AM",
        //                 "messages": ["Phasellus dictum velit et arcu tincidunt luctus.", "Nullam nec neque rhoncus, rutrum dui non, volutpat arcu."]
        //             }]
        //         }]
        //     );
        // }, 500);

        // return defer.promise;

        this.getConversation = function getConversation(param) {
            var deferred = $q.defer();

            var methodAction = null;
            var message = null;
            var jsonData = null;
            var result = null;

            var messengerServiceWrapper = [];

            methodAction = "fetchMessengerService";

            message = {

                "refNo": param.refNo,
                "studentID": param.studentID

            };
            //$rootScope.loading = true;

            console.log('message Data= ' + JSON.stringify(message));

            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.fetchMessengerService;

                    console.log('result Data= ' + JSON.stringify(result));


                    if (value.success == true) {

                        if (result.validSession == true && result.messengerServiceWrapper[0].recordFound == true) {

                            console.log('conversation ' + JSON.stringify(result.messengerServiceWrapper));

                            messengerServiceWrapper = result.messengerServiceWrapper;


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
                //$scope.wrapper.message = '';
                //$rootScope.loading = false;

                deferred.resolve(messengerServiceWrapper);


            });

            return deferred.promise;
        };



        this.saveConversation = function saveConversation(paramConversation, messenger_compose_message) {

            //--------------start saveData_M Function---Parent message from mobile--------------

            var deferred = $q.defer();

            var parentMessageWrapper = [];

            methodAction = "insertParentMessage";


            message = {

                "refNo": paramConversation[0].refNo,
                "studentID": paramConversation[0].studentID,
                "gradeID": paramConversation[0].gradeID,
                "sectionID": paramConversation[0].sectionID,
                "message": messenger_compose_message,
                "staffRefNo": sharedProperties.getRefNo(),
                "userGroup": $rootScope.userGroup  //'STAFF'
            };

            console.log("save message", JSON.stringify(message));


            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                if (value != null) {

                    result = value.insertParentMessage;

                    if (value.success == true) {

                        if (result.validSession == true && result.parentMessageWrapper[0].recordFound == true) {

                            //console.log('parentMessageWrapper ' + JSON.stringify(result.parentMessageWrapper));

                            parentMessageWrapper = result.parentMessageWrapper;
                            //messageFactory(appConstants.RECORD_UPDATED);

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

                deferred.resolve(parentMessageWrapper);

            });
            return deferred.promise;


        };//-----end of saveConversation

    }

]);

app.controller("MessengerController", ["$scope", "MessengerAdminService",
    function MessengerController($scope, MessengerAdminService) {
        $scope.conversations = [];
        $scope.currentConversation;

        $scope.sidebar = {};
        $scope.sidebar.isActive = true;
        $scope.messenger_compose_message = '';

        MessengerAdminService.getConversationList().then(function (conversations) {
            $scope.conversations = conversations;
        });

        $scope.show = function show(conversation) {
            $scope.setSidebarInactive().scrollTop();

            //$scope.currentConversation = conversation;
            //console.log('conversation' + conversation.refNo);

            MessengerAdminService.getConversation(conversation).then(function (paramConversation) {

                $scope.currentConversation = paramConversation[0];

                //console.log('paramConversation ' + JSON.stringify($scope.currentConversation.conversation));

                $scope.conversations.map(function (c) {
                    c.isActive = (c.id === conversation.id);
                });

            });


        };

        $scope.setSidebarActive = function setSidebarActive() {
            $scope.sidebar.isActive = true;
            return this;
        };

        $scope.setSidebarInactive = function setSidebarInactive() {
            $scope.sidebar.isActive = false;
            return this;
        };

        $scope.scrollTop = function scrollTop() {
            window.scrollTo(0, 0);
            return this;
        };


        $scope.saveData = function (conversation) {


            if ($scope.loginForm.$valid) {

                //console.log('conv ' + JSON.stringify(conversation));

                MessengerAdminService.saveConversation(conversation, $scope.messenger_compose_message)
                    .then(function (result) {

                        $scope.messenger_compose_message = '';
                        console.log('result ' + JSON.stringify(result));

                        //-------to refresh data after save----
                        if (result != null && result[0] != null) {
                            var param = [];
                            param.refNo = result[0].refNo;
                            param.studentID = result[0].studentID;

                            MessengerAdminService.getConversation(param).then(function (paramConversation) {
                                $scope.currentConversation = paramConversation[0];
                                //console.log('paramConversation ' + JSON.stringify($scope.currentConversation.conversation));
                            });
                        }
                        //------------------


                    });
            }


        };


    }
]);
