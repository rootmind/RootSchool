(function () {
    "use strict";

    var app = angular.module('elephant');

    app.controller('documentUploadController', ['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', 'messageFactory', 'appConstants', 'firestorageFactory', '$q', '$uibModalInstance', 'passInfo', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, messageFactory, appConstants, firestorageFactory, $q, $uibModalInstance, passInfo) {


        var methodAction = null;
        var message = null;
        var jsonData = null;
        var result = null;


        $scope.wrapper = [];
        $scope.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        $scope.menuName = sharedProperties.getMenuName();
        $scope.refNo = sharedProperties.getRefNo();
        $scope.actionMode = sharedProperties.getActionMode();
        $scope.schoolID = sharedProperties.getSchoolID();

        //$scope.avatar = "";
        $scope.imageProgress = $rootScope.imageProgress;

        $scope.myFile = [];



        //---------modal data receiver------
        var $ctrl = this;
        $ctrl.passInfo = passInfo;
        $ctrl.selected = {
            refNo: $ctrl.passInfo[0],
            mode: $ctrl.passInfo[1]

        };

        //console.log ('item ' + $ctrl.selected.studentID);
        $scope.wrapper.refNo = $ctrl.selected.refNo;
        $scope.actionMode = $ctrl.selected.mode;
        $scope.wrapper.viewStartDate = new Date();

        $scope.wrapper.chapterStartDate = new Date();
        $scope.wrapper.chapterEndDate = new Date();




        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.refNo);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        //---------------


        //-----------------
        $scope.imageUpload = function (element) {
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(element.files[0]);
        }
        $scope.imageIsLoaded = function (e) {

            $scope.$apply(function () {
                $scope.selectedContainer = [];
                $scope.selectedContainer.push(e.target.result);
            });
        }

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
                },
                {
                    "tableName": "MST_AcademicYear",
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


                        }

                    }

                }

                $rootScope.loading = false;
                deferred.resolve($scope.popoverWrapper);

            });



            if (sharedProperties.getActionMode() == 'UPDATE') {

                $scope.buttonDisabled = false;

                $scope.fetchImageDetails();
                //$scope.downloadFileFirestorage();

            }

            return deferred.promise;

        }   //------------------- ends loadData Function-----------------       





        //----------Start Fetch profile image--------

        $scope.fetchImageDetails = function () {


            var deferred = $q.defer();


            methodAction = "fetchImageDetails";
            message = {

                "refNo": $scope.wrapper.refNo,
                "docID": 'DOC003'

            };

            console.log('message fetchimage Data= ' + JSON.stringify(message));


            $rootScope.loading = true;

            //jsonData = connectHostImageFactory(methodAction, message);
            jsonData = connectHostFactory(methodAction, message);
            jsonData.returnData(function (value) {

                console.log('Value Data= ' + JSON.stringify(value));
                if (value != null) {


                    result = value.fetchImageDetails;

                    console.log(' fetchImageDetails result= ' + JSON.stringify(result));


                    if (value.success == true) {


                        console.log(' fetchImageDetails result2= ' + JSON.stringify(result));

                        if (result.validSession == true) {

                            if (result.imageDetailsWrapper[0].recordFound == true) {

                                $scope.wrapper = result.imageDetailsWrapper[0];

                                $scope.wrapper.chapterStartDate = commonControls.setDateFormat(result.imageDetailsWrapper[0].chapterStartDate);
                                $scope.wrapper.chapterEndDate = commonControls.setDateFormat(result.imageDetailsWrapper[0].chapterEndDate);
                                $scope.wrapper.viewStartDate = commonControls.setDateFormat(result.imageDetailsWrapper[0].viewStartDate);
                                $scope.wrapper.viewEndDate = commonControls.setDateFormat(result.imageDetailsWrapper[0].viewEndDate);

                                // if ($scope.wrapper.chapterStartDate != null && $scope.wrapper.chapterStartDate.length >= 10) {

                                //     var YYYY = $scope.wrapper.chapterStartDate.substring(6);
                                //     var MM = $scope.wrapper.chapterStartDate.substring(3, 5);
                                //     var DD = $scope.wrapper.chapterStartDate.substring(0, 2);

                                //     $scope.wrapper.chapterStartDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

                                // }
                                // if ($scope.wrapper.chapterEndDate != null && $scope.wrapper.chapterEndDate.length >= 10) {

                                //     var YYYY = $scope.wrapper.chapterEndDate.substring(6);
                                //     var MM = $scope.wrapper.chapterEndDate.substring(3, 5);
                                //     var DD = $scope.wrapper.chapterEndDate.substring(0, 2);

                                //     $scope.wrapper.chapterEndDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

                                // }

                                // if ($scope.wrapper.viewStartDate != null && $scope.wrapper.viewStartDate.length >= 10) {

                                //     var YYYY = $scope.wrapper.viewStartDate.substring(6);
                                //     var MM = $scope.wrapper.viewStartDate.substring(3, 5);
                                //     var DD = $scope.wrapper.viewStartDate.substring(0, 2);

                                //     $scope.wrapper.viewStartDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

                                // }
                                // if ($scope.wrapper.viewEndDate != null && $scope.wrapper.viewEndDate.length >= 10) {

                                //     var YYYY = $scope.wrapper.viewEndDate.substring(6);
                                //     var MM = $scope.wrapper.viewEndDate.substring(3, 5);
                                //     var DD = $scope.wrapper.viewEndDate.substring(0, 2);

                                //     $scope.wrapper.viewEndDate = new Date(parseInt(YYYY, 10), parseInt(MM, 10) - 1, parseInt(DD, 10));

                                // }

                                $scope.setFileType();

                            }
                            else {
                                result.imageDetailsWrapper = [];
                            }


                        }
                        else {
                            messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                        }

                    }
                    else {
                        $scope.profileImage = false;

                    }

                }
                else {
                    messageFactory(appConstants.SYSTEM_ERROR);
                }
                $rootScope.loading = false;

                deferred.resolve(result.imageDetailsWrapper);

            });


            return deferred.promise;

        }

        //---------------End Fetch profile image---------

        $scope.datepickers = {
            dob: false,
            joinDate: false,
            passportIssueDate: false,
            passportExpiryDate: false
        }


        $scope.open = function ($event, which) {

            $event.preventDefault();
            $event.stopPropagation();
            $scope.datepickers[which] = true;
        };


        $scope.setFileType = function () {
            $scope.iconType = "icon icon-file-image-o";

            switch ($scope.wrapper.imageFileType) {
                case 'pdf':
                    $scope.iconType = "icon icon-file-pdf-o text-danger ";
                    break;
                case 'docx':
                    $scope.iconType = "icon icon-file-word-o text-primary ";
                    break;
                case 'xlsx':
                    $scope.iconType = "icon icon-file-excel-o text-success ";
                    break;
                default:
                    $scope.iconType = "icon icon-file-image-o text-info ";

            }
        }

		/*$scope.nextPage=function(){ 
				
					//$rootScope.selectedIndex = 1;
				//$location.path('/' + 'identification');
				
		}*/

        function dateDiff(date1, date2) {
            return new Date(Math.abs(date1.getTime() - date2.getTime()));
        }




        //-----------get image from firestorage-----
        $scope.downloadFileFirestorage = function () {

            //console.log ('inside download ' + sharedProperties.getStudentID());
            firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/student/' + sharedProperties.getStudentID() + '/avatar/' + sharedProperties.getStudentID())
                .then(function (result) {

                    //console.log('result ' + result);
                    $scope.avatar = result;
                    if ($scope.avatar) {
                        $scope.profileImage = true;
                    }

                });

        }
        //---------end of fetchimage storage
        //------------start uploadFile Function----------------
        $scope.uploadFileFirestorge = function () {


            $scope.submitted = true;

            var imageUploadStatus = false;


            if ($scope.loginForm.$valid) {

                //console.log('doc value '+ $scope.myFile);

                if (document.getElementById("file").value != "") {

                    for (var i = 0; i < $scope.myFile.length; i++) {
                        console.log('file loop ' + i);

                        firestorageFactory.fileUploadFirestorage(sharedProperties.getSchoolID() + '/images/document/', $scope.myFile[i], document.getElementById('file').files[i].name)
                            .then(function (result) {

                                console.log('result ' + i + ' ' + result.fileType);

                                imageUploadStatus = true;
                                $scope.updateImageDetails(result.fileName, result.downloadURL, result.fileType, result.contentType, imageUploadStatus);
                                //console.log('result ' + result);
                                // $scope.avatar = result.downloadURL;
                                // $scope.profileImage = true;
                                // $scope.fileType = result.fileType;
                                $ctrl.ok();
                            });
                    }
                }
                else {

                    //this is for youtube ADD and UPDATE mode
                    if ($scope.wrapper.youtube !== '') {
                        imageUploadStatus = true;
                        $scope.updateImageDetails($scope.wrapper.youtube, $scope.wrapper.youtube, 'youtube', 'youtube', imageUploadStatus);
                        $ctrl.ok();

                    }
                    else if (sharedProperties.getActionMode() == "UPDATE") {

                        imageUploadStatus = false;
                        $scope.updateImageDetails("", "", "", "", imageUploadStatus);
                        $ctrl.ok();

                    }
                }
            }
        }
        //-------end of upload file firestorage


        //------download image

        $scope.loadImage = function () {

            if (sharedProperties.getActionMode() == "UPDATE") {

                $scope.fetchImageDetails();
            }

        }

        //-------






        //------------start insertImageDetails Function----------------
        $scope.updateImageDetails = function (fileName, downloadURL, fileType, contentType, imageUploadStatus) {


            $scope.submitted = true;


            if (sharedProperties.getActionMode() == "UPDATE") {
                methodAction = "updateImageDetails"; //update of image details
            }
            else {
                methodAction = "uploadImageDetails"; //insert of image details

            }

            // var monthNames = [
            // 	"JAN", "FEB", "MAR",
            // 	"APR", "MAY", "JUN", "JUL",
            // 	"AUG", "SEP", "OCT",
            // 	"NOV", "DEC"
            // ];

            // var date = new Date();
            // //var day = date.getDate();
            // var monthIndex = date.getMonth();
            // //var year = date.getFullYear();
            // //var hh=date.getHours();
            // //var mm=date.getMinutes();
            // //var ss=date.getSeconds();
            // //var ms=date.getMilliseconds();


            // // alert('date Format2='+day+monthNames[monthIndex]+year+hh+mm+ss+ms);
            // //var imageId=day+monthNames[monthIndex]+year+hh+mm+ss+ms;

            // var imageId = date.getDate() + monthNames[monthIndex] + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

            // alert('imageId='+imageId);


            message = {

                "refNo": $scope.wrapper.refNo,
                "imageId": "document",
                "imageFileName": fileName,            //if file not acched in update mode then don't overwrite
                "imageFileFolder": downloadURL,
                "imageFileType": fileType,
                "imageContentType": contentType,
                "imageStatus": 'ACTIVE',
                "docID": "DOC003",
                "fileTitleRefNo": $scope.wrapper.fileTitleRefNo,
                "fileTitle": $scope.wrapper.fileTitle,
                "gradeID": $scope.wrapper.gradeID,
                "sectionID": $scope.wrapper.sectionID,
                "subjectID": $scope.wrapper.subjectID,
                "termID": $scope.wrapper.termID,
                "chapterStartDate": commonControls.dateFormat($scope.wrapper.chapterStartDate),
                "chapterEndDate": commonControls.dateFormat($scope.wrapper.chapterEndDate),
                "viewStartDate": commonControls.dateFormat($scope.wrapper.viewStartDate),
                "viewEndDate": commonControls.dateFormat($scope.wrapper.viewEndDate),
                "imageUploadStatus": imageUploadStatus		//server requires this flag

            };

            console.log('message= ' + JSON.stringify(message));

            $scope.buttonDisabled = true;
            $rootScope.loading = true;

            //jsonData = connectHostImageFactory(methodAction, message, destination, file);

            jsonData = connectHostFactory(methodAction, message);

            jsonData.returnData(function (value) {


                //document.writeln('Image Value Data= '+JSON.stringify(value))

                console.log('Image Value Data= ' + JSON.stringify(value));


                if (value != null) {

                    if (sharedProperties.getActionMode() == "UPDATE") {
                        result = value.updateImageDetails; //update of image details

                    }
                    else {
                        result = value.uploadImageDetails; //insert of image details

                    }
                    //alert('success= '+ value.success);

                    if (value.success == true) {

                        if (result.validSession == true && (result.imageDetailsWrapper[0].recordFound) == true) {

                            messageFactory('Image uploaded successfuly');

                        }
                        else if (result.validSession == false) {

                            messageFactory(appConstants.SYSTEM_INVALIDSESSION);
                        }
                        else {
                            messageFactory('Image upload failed,Try again');

                        }
                        console.log('imageFileName ' + result.imageDetailsWrapper[0].imageFileName);
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



        };  //------------ends insertImageDetails Function----------------


        $scope.$watch(function () {
            return $rootScope.imageProgress;
        }, function () {
            $scope.imageProgress = $rootScope.imageProgress;
        }, true);


    }]);

})();









