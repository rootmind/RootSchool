(function () {
    "use strict";

    var app = angular.module('elephant');

    app.factory('firestorageFactory', ['$filter','$q', '$rootScope', function ($filter,$q,$rootScope) {


        var fileUpload = function(firestorePath, file, filePath)
        {

                firebaseAuth();

                var deferred = $q.defer();

                var storageRef = firebase.storage().ref();
                
                console.log('filePath before upload ' + firestorePath);

                console.log('filePath  ' + filePath);

                var fileType = getFileExtension(getFileName(filePath));

                if(fileType=="")
                {

                    deferred.reject('Invalid file type');
                    return deferred.promise;
                }

                var fileSize = file.size;

				//30000 - 30kb; 1024000- 1024kb - 1 mb
                if(fileSize > 1024000)
                {
                    deferred.reject('File size  should less than 1MB');
                    return deferred.promise;
                }

                
                var fileName = generateFileName() + '.' + fileType;
                var contentType = getFileHeaderType(file);

                console.log('filePath before upload full ' + firestorePath + fileName );


                // Create a reference to 'images/mountains.jpg'
                var imageRef = storageRef.child( firestorePath + fileName);


                // Create file metadata including the content type
                var metadata = {
                    contentType: contentType //'image/jpeg'
                };


                //var file = $scope.myFile; // use the Blob or File API
                var uploadTask = imageRef.put(file, metadata);//.then(function (snapshot) {
                    //     console.log('Uploaded a blob or file!');
                    // });


                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');

                        $rootScope.imageProgress = 'Upload is ' + progress + '% done';
                        $rootScope.$digest();
                        
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }

                    }, function (error) {

                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                deferred.reject("User doesn't have permission to access the object");
                                return deferred.promise;
                                break;

                            case 'storage/canceled':
                                // User canceled the upload
                                deferred.reject("User canceled the upload");
                                return deferred.promise;
                                break;

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                deferred.reject("Unknown error occurred, inspect error.serverResponse");
                                return deferred.promise;
                                break;
                        }
                    }, function () {
                        // Upload completed successfully, now we can get the download URL
                        //var downloadURL = uploadTask.snapshot.downloadURL;

                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            console.log('File available at downloadURL ', downloadURL);
                            //console.log('upload downloadURL ' + downloadURL);
                            deferred.resolve({downloadURL:downloadURL, fileName:fileName, fileType:fileType, contentType:contentType});
    
                        });


                    });


                    return deferred.promise;


        };

        var fileDownload = function(filePath)
        {

                    firebaseAuth();

                    var deferred = $q.defer();


                    var storageRef = firebase.storage().ref();

                    //console.log('download filepath ' + filePath);

                    // Create a reference to the file we want to download
                    var imageRef = storageRef.child(filePath);

                    // Get the download URL
                    imageRef.getDownloadURL().then(function(downloadURL) {
                    // Insert url into an <img> tag to "download"

                        //console.log('download url ' + downloadURL);

                        deferred.resolve(downloadURL);

                        
                    }).catch(function(error) {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object_not_found':
                        // File doesn't exist
                        deferred.reject("File doesn't exist");
                        return deferred.promise;
                        break;

                        case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        deferred.reject("User doesn't have permission to access the object");
                        return deferred.promise;
                        break;

                        case 'storage/canceled':
                        // User canceled the upload
                        deferred.reject("User canceled the upload");
                        return deferred.promise;
                        break;

                        case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        deferred.reject("Unknown error occurred, inspect the server response");
                        return deferred.promise;
                        break;
                    }
                    });



                    return deferred.promise;

        };


        //---------file device download
        var fileDeviceDownload = function(filePath)
        {

                    firebaseAuth();

                    var deferred = $q.defer();


                    var storageRef = firebase.storage().ref();

                    //console.log('download filepath ' + filePath);

                    // Create a reference to the file we want to download
                    var imageRef = storageRef.child(filePath);

                    // Get the download URL
                    imageRef.getDownloadURL().then(function(downloadURL) {
                    // Insert url into an <img> tag to "download"

                        //console.log('download url ' + downloadURL);

                        // This can be downloaded directly:
                        deferred.resolve(downloadURL);
                        
                        
                    }).catch(function(error) {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object_not_found':
                        // File doesn't exist
                        deferred.reject("File doesn't exist");
                        return deferred.promise;
                        break;

                        case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        deferred.reject("User doesn't have permission to access the object");
                        return deferred.promise;
                        break;

                        case 'storage/canceled':
                        // User canceled the upload
                        deferred.reject("User canceled the upload");
                        return deferred.promise;
                        break;

                        case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        deferred.reject("Unknown error occurred, inspect the server response");
                        return deferred.promise;
                        break;

                    }
                    });



                    return deferred.promise;

        }; ///-------file device download 


        //---------file delete from firestorate 
        var fileDelete = function(filePath)
        {

                    firebaseAuth();

                    var deferred = $q.defer();


                    var storageRef = firebase.storage().ref();

                    //console.log('download filepath ' + filePath);

                    // Create a reference to the file we want to download
                    var imageRef = storageRef.child(filePath);

                    // Get the download URL
                    imageRef.delete().then(function() {
                    // Insert url into an <img> tag to "download"

                        //console.log('download url ' + downloadURL);

                        // This can be downloaded directly:
                        deferred.resolve('File deleted successfully');
                        
                        
                    }).catch(function(error) {

                        deferred.reject("An error occurred, delete failed " + error);

                    });



                    return deferred.promise;

        }; ///-------file Delete from firestorage         

        //---firebase authentication before storage--
        var firebaseAuth = function(){

            var deferred = $q.defer();

            var signInStatus=null;

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  console.log('user signed in');
                  signInStatus="user signed in";
                  //console.log(user.displayName);

                } else {
                    // No user is signed in.

                 //console.log('user not signed in');

                  firebase.auth().signInWithEmailAndPassword("demo@rootmindtech.com", "demo123")
                  .then(function(result)
                  {
                    console.log('user signed in using credentials');
                    signInStatus="user signed in using credentials";

                  })
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    console.log('user signed in using credentials error ' + error.message );
                    signInStatus="user signed in using credentials error"  + error.message; 


                  });

                }
              });

              deferred.resolve(signInStatus);
              return deferred.promise;


            
        };

        //---firebase authentication before storage--
        var getFileHeaderType = function(file){

                var arr = (new Uint8Array(file)).subarray(0, 4);
				var header = "";
				for(var i = 0; i < arr.length; i++) {
				   header += arr[i].toString(16);
                }
                var type=null;
				console.log( 'header before ' + header);
				// Check the file signature against known types

				switch (header) {
					case "89504e47":
						type = "image/png";
						break;
					case "47494638":
						type = "image/gif";
						break;
					case "ffd8ffe0":
					case "ffd8ffe1":
					case "ffd8ffe2":
					case "ffd8ffe3":
					case "ffd8ffe8":
						type = "image/jpeg";
						break;
					case "25504446":
						type = "application/pdf";
						break;
					default:
						type = file.type;//"unknown"; // Or you can use the blob.type as fallback
						break;
                }
                
                console.log('header ' + type);

                return type;

        };

        		//------get filename
		var getFileName = function(filePath)
		{
			var fullPath = filePath; //file.value;//document.getElementById('file').value;
			if (fullPath) {
				var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
				var filename = fullPath.substring(startIndex);
				if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
					filename = filename.substring(1);
				}
				console.log(filename);
				return filename;
			}
		}
		//--------------


		//----to get file extension
		var getFileExtension = function (fileName) {

			var a = fileName.split(".");

			if (a.length === 1 || (a[0] === "" && a.length === 2)) {
				return "";
			}
            return a.pop();    // feel free to tack .toLowerCase() here if you want
		}
		//-------------


        //--------to generate file name
        var generateFileName = function()
        {

            var monthNames = [
                "JAN", "FEB", "MAR",
                "APR", "MAY", "JUN", "JUL",
                "AUG", "SEP", "OCT",
                "NOV", "DEC"
            ];
            var date = new Date();
            var monthIndex = date.getMonth();

            var fileName = date.getDate() + monthNames[monthIndex] + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

            return fileName;
            
        }
        //-------generate file name


        return{


            fileUploadFirestorage: fileUpload,
            fileDownloadFirestorage: fileDownload,
            fileDeviceDownloadFirestorage: fileDeviceDownload,
            fileDeleteFirestorage: fileDelete,
            firestorageAuth: firebaseAuth

        }

        

    }]);



})(); //function