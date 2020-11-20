(function () {

	var app = angular.module('elephant');


	app.controller('queueCircularController', ['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'messageFactory', 'appConstants', 'firestorageFactory', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$uibModal', '$compile', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, messageFactory, appConstants, firestorageFactory, DTOptionsBuilder, DTColumnBuilder, $q, $uibModal, $compile) {


		var methodAction = null;
		var message = null;
		var jsonData = null;
		var result = null;
		var destination = null;

		$scope.notesWrapper = [];

		//$scope.menu= sharedProperties.getMenu();
		$scope.menuName = sharedProperties.getMenuName();
		$scope.refNo = sharedProperties.getRefNo();
		$scope.studentName = sharedProperties.getStudentName();
		$scope.surname = sharedProperties.getSurname();

		$scope.currentAcademicYearID = sharedProperties.getAcademicYearID();


		//----------------
		var $ctrl = this;


		//------------------DT code
		var dt = this;
		dt.message = '';
		//dt.someClickHandler = someClickHandler;
		dt.edit = edit;
		dt.remove = remove;
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
				[2, "desc"]
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
			//DTColumnBuilder.newColumn("refNo").withTitle("Ref No").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn(null).withTitle("Type").notSortable().renderWith(actionsHtmlFileType),
			DTColumnBuilder.newColumn("fileTitleRefNo").withTitle("Circular No").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("fileTitle").withTitle("Title").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtmlEdit),
			//  DTColumnBuilder.newColumn("imageStatus").withTitle("Status").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn(null).withTitle('Download').notSortable().renderWith(actionsHtmlDownload),
			DTColumnBuilder.newColumn(null).withTitle('Active').notSortable().renderWith(actionsHtmlDelete),
			DTColumnBuilder.newColumn(null).withTitle('View').notSortable().renderWith(actionsHtmlView),
			DTColumnBuilder.newColumn("uploadUserId").withTitle("User").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("uploadDateTime").withTitle("Date&Time").withOption('defaultContent', '-'),			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn('delete').withTitle("Delete").renderWith(function (id) { return '<div class="text-center"><span class="icon icon-trash text-primary" style="cursor: pointer;"></span></div>' }), //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
			//DTColumnBuilder.newColumn("imageFileName").withTitle("File Name").withOption('defaultContent', '-'),
			//DTColumnBuilder.newColumn("imageFileFolder").withTitle("Folder").withOption('defaultContent', '-')
			//DTColumnBuilder.newColumn("subjectID").withTitle("Subject").withOption('defaultContent', '-').notVisible()

		];


		dt.columns.view = [
			//DTColumnBuilder.newColumn("refNo").withTitle("Ref No").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn(null).withTitle("Type").notSortable().renderWith(actionsHtmlFileType),
			DTColumnBuilder.newColumn("fileTitleRefNo").withTitle("Circular No").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("fileTitle").withTitle("Title").withOption('defaultContent', '-'),
			//DTColumnBuilder.newColumn(null).withTitle('Edit').notSortable().renderWith(actionsHtmlEdit),
			//  DTColumnBuilder.newColumn("imageStatus").withTitle("Status").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn(null).withTitle('Download').notSortable().renderWith(actionsHtmlDownload),
			//DTColumnBuilder.newColumn(null).withTitle('Active').notSortable().renderWith(actionsHtmlDelete),
			//DTColumnBuilder.newColumn(null).withTitle('View').notSortable().renderWith(actionsHtmlView),
			//DTColumnBuilder.newColumn("uploadUserId").withTitle("User").withOption('defaultContent', '-'),
			DTColumnBuilder.newColumn("uploadDateTime").withTitle("Date&Time").withOption('defaultContent', '-'),			// DTColumnBuilder.newColumn("studentName").withTitle("Name").withOption('defaultContent', '-'),
			// DTColumnBuilder.newColumn('delete').withTitle("Delete").renderWith(function (id) { return '<div class="text-center"><span class="icon icon-trash text-primary" style="cursor: pointer;"></span></div>' }), //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
			//DTColumnBuilder.newColumn("imageFileName").withTitle("File Name").withOption('defaultContent', '-'),
			//DTColumnBuilder.newColumn("imageFileFolder").withTitle("Folder").withOption('defaultContent', '-')
			//DTColumnBuilder.newColumn("subjectID").withTitle("Subject").withOption('defaultContent', '-').notVisible()

		];


		function createdRow(row, data, dataIndex) {
			// Recompiling so we can bind Angular directive to the DT
			$compile(angular.element(row).contents())($scope);
		}

		function actionsHtmlEdit(data, type, full, meta) {
			var id_data = data;
			id_data["id"] = meta.row;  //add id element
			// console.log('actionsHtml: ' + JSON.stringify( id_data));
			dt.infos[id_data.id] = data;
			return '<div class="text-center">' +
				'<span class="icon icon-edit text-primary" style="cursor: pointer;" ng-click="dt.edit(dt.infos[' + id_data.id + '])"></span></div>';
		}

		function actionsHtmlDelete(data, type, full, meta) {
			var id_data = data;
			id_data["id"] = meta.row;  //add id element
			// console.log('actionsHtml: ' + JSON.stringify( id_data));
			dt.infos[id_data.id] = data;

			var iconType = "icon-unlock text-success ";

			if (data.imageStatus == 'INACTIVE') {
				iconType = "icon-lock text-danger ";
			}
			return '<div class="text-center">' +
				'<span class="icon ' + iconType + '" style="cursor: pointer;" ng-click="dt.remove(dt.infos[' + id_data.id + '])"></span></div>';
		}

		function actionsHtmlFileType(data, type, full, meta) {
			var id_data = data;
			id_data["id"] = meta.row;  //add id element
			// console.log('actionsHtml: ' + JSON.stringify( id_data));
			dt.infos[id_data.id] = data;

			var iconType = "icon-file-image-o";

			switch (data.imageFileType) {
				case 'pdf':
					iconType = "icon-file-pdf-o text-danger ";
					break;
				case 'docx':
					iconType = "icon-file-word-o text-primary ";
					break;
				case 'xlsx':
					iconType = "icon-file-excel-o text-success ";
					break;
				default:
					iconType = "icon-file-image-o text-info ";


			}
			return '<div class="text-center">' +
				'<span class="icon ' + iconType + '" style="cursor: pointer;" ng-click="downloadFile(dt.infos[' + id_data.id + '])"></span></div>'

		}

		function actionsHtmlView(data, type, full, meta) {
			var id_data = data;
			id_data["id"] = meta.row;  //add id element
			// console.log('actionsHtml: ' + JSON.stringify( id_data));
			dt.infos[id_data.id] = data;

			var iconType = "icon-eye text-info ";

			//console.log('actionsHtmlView: ' + data.viewEndDate + ' - ' + commonControls.dateFormat(new Date()));

			if (data.viewEndDate <= commonControls.dateFormat(new Date())) {
				iconType = "icon-eye-slash text-danger ";
			}
			return '<div class="text-center">' +
				'<span class="icon ' + iconType + '" style="cursor: pointer;" ng-click="dt.edit(dt.infos[' + id_data.id + '])"></span></div>';
		}

		function edit(info) {
			// console.log('You are trying to edit the row: ' + JSON.stringify(info));

			sharedProperties.setActionMode("UPDATE");
			var passInfo = [info.refNo, "UPDATE"];
			$ctrl.openModal('sm', '', passInfo);
		}

		function remove(info) {
			// console.log('You are trying to edit the row: ' + JSON.stringify(info));
			//$scope.wrapper.gradeID=info.gradeID;
			//$scope.wrapper.subjectID=info.subjectID;

			var title = 'Do you want to inactivate?';

			if (info.imageStatus == 'INACTIVE') {
				title = 'Do you want to activate?';
			}
			Swal.fire({
				title: title,
				//text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes'
			}).then((result) => {
				if (result.value) {
					$scope.updateImageStatus(info);
				}
			})
		}

		$ctrl.openModal = function (size, parentSelector, passInfo) {
			var parentElem = parentSelector ?
				angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/admin/circular.html',
				controller: 'circularController',
				controllerAs: '$ctrl',
				size: size,
				scope: $scope,
				appendTo: parentElem,
				backdrop: 'static',
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


		function actionsHtmlDownload(data, type, full, meta) {
			var id_data = data;
			id_data["id"] = meta.row;  //add id element
			// console.log('actionsHtml: ' + JSON.stringify( id_data));
			dt.infos[id_data.id] = data;
			return '<div class="text-center">' +
				'<span class="icon icon-cloud-download text-primary" style="cursor: pointer;" ng-click="downloadFile(dt.infos[' + id_data.id + '])"></span></div>' //<button class="btn btn-outline-primary btn-icon sq-24" ></button>
		}



		//---------------selected image to display before upload---------------------

		$scope.imageUpload = function (element) {

			var blob = element.files[0];

			console.log(blob.type);

			var reader = new FileReader();
			//reader.onload = $scope.imageIsLoaded; //to display image on the screen

			// reader.onloadend = function(e) {


			// };
			reader.readAsDataURL(blob);
		}

		$scope.imageIsLoaded = function (e) {

			$scope.$apply(function () {
				$scope.selectedContainer = [];
				$scope.selectedContainer.push(e.target.result);
			});
		}
		//--------------------------------------    

		//------------start loadData Function----------------
		$scope.loadData = function () {


			var deferred = $q.defer();

			methodAction = "fetchMultiPopoverData";

			//var accountType=sharedProperties.getRefNo().substring(0,2);	

			message = [

				{
					"tableName": "MST_DocChecklistMaster",
					"filter": ''
				},

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


				//alert('Popover Data= '+JSON.stringify(value));
				if (value != null) {

					result = value.fetchMultiPopoverData;

					if (value.success == true) {
						if (result.validSession == true) {

							$scope.popoverWrapper = result.popoverWrapper;

							deferred.resolve($scope.popoverWrapper);

							//$scope.fetchNotes();

						}
					}

				}
				$rootScope.loading = false;
			});

			return deferred.promise;

		}    //------------ends loadData Function----------------    



		//call from search button
		$scope.dtSearch = function () {

			//alert('test1');

			if ($scope.loginForm.$valid) {

				if (!angular.equals(dt.dtInstance, {})) {
					//alert('test2');
					dt.dtInstance.reloadData();
					dt.dtInstance.changeData(function () { return $scope.searchData() });
				}
			}

		}

		//----------Start Fetch documents list --------

		$scope.searchData = function () {


			var deferred = $q.defer();


			methodAction = "fetchImageDetails";
			message = {

				//"refNo": sharedProperties.getRefNo(),								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
				"docID": 'DOC002'													//'C://onboard//images//SA21OCT2015156',
			};

			console.log('message fetchImageDetails Data= ' + JSON.stringify(message));


			$rootScope.loading = true;

			//jsonData = connectHostImageFactory(methodAction, message);
			jsonData = connectHostFactory(methodAction, message);
			jsonData.returnData(function (value) {

				console.log('fetchImageDetails Value Data= ' + JSON.stringify(value));
				if (value != null) {


					result = value.fetchImageDetails;

					console.log(' fetchImageDetails result= ' + JSON.stringify(result));


					if (value.success == true) {

						if (result.validSession == true) {

							//console.log('docIDValue '+result.imageDetailsWrapper[0].docIDValue);

							if (result.imageDetailsWrapper[0].recordFound == true) {


								//$scope.image = value.image;
								$scope.avatar = result.imageDetailsWrapper[0].imageFileFolder;
								//$scope.docName = result.imageDetailsWrapper[0].docIDValue;
								$scope.profileImage = true;

								//$scope.downloadFileFirestorage();
							}
							else {

								result.imageDetailsWrapper = [];

							}

						}
						else {
							messageFactory(appConstants.SYSTEM_INVALIDSESSION); //(result.validSession==false)
						}

					}
					else {
						//messageFactory(appConstants.SYSTEM_NORESPONSE);
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

		//---------------End fetch documents list---------

		//------------start uploadFile Function----------------
		$scope.uploadFile = function () {


			$scope.submitted = true;

			if ($scope.form.$valid) {


				if (document.getElementById("file").value != "") {
					// you have a file

					var filesrc = $scope.myFile.size;

					//alert('image filesrc  '+filesrc); 

					if (filesrc < 30000) // filesize validation
					{

						$scope.imageSrc = $scope.myFile;

						var file = $scope.myFile;


						//alert('image file c '+JSON.stringify(file));

						destination = sharedProperties.getRefNo();  //"C://school//images//"


						methodAction = "uploadImageDetails";

						var monthNames = [
							"JAN", "FEB", "MAR",
							"APR", "MAY", "JUN", "JUL",
							"AUG", "SEP", "OCT",
							"NOV", "DEC"
						];

						var date = new Date();
						//var day = date.getDate();
						var monthIndex = date.getMonth();
						//var year = date.getFullYear();
						//var hh=date.getHours();
						//var mm=date.getMinutes();
						//var ss=date.getSeconds();
						//var ms=date.getMilliseconds();


						// alert('date Format2='+day+monthNames[monthIndex]+year+hh+mm+ss+ms);
						//var imageId=day+monthNames[monthIndex]+year+hh+mm+ss+ms;

						var imageId = date.getDate() + monthNames[monthIndex] + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

						// alert('imageId='+imageId);


						message = {
							"docID": $scope.wrapper.docID,                  //'DOC004',
							//"refNo": sharedProperties.getRefNo(), 					//sharedProperties.getRefNo() //SA28OCT201500001
							"imageStatus": 'ACTIVE',
							"studentID": sharedProperties.getStudentID(), 								//'2343245678',
							"imageId": imageId								//'19DEC2015180907002'

						};
						//alert('message= '+JSON.stringify(message));

						$scope.buttonDisabled = true;
						$rootScope.loading = true;

						jsonData = connectHostImageFactory(methodAction, message, destination, file);



						jsonData.returnData(function (value) {


							//document.writeln('Image Value Data= '+JSON.stringify(value))

							//alert('Image Value Data= '+JSON.stringify(value));


							if (value != null) {
								result = value.uploadImageDetails;
								//alert('success= '+ value.success);

								if (value.success == true) {


									if (result.validSession == true && (result.imageDetailsWrapper[0].imageUploadStatus) == true) {

										messageFactory('Image uploaded successfuly');

										//--------Dialog end----------------
									}
									else if (result.validSession == false) {
										messageFactory(appConstants.SYSTEM_INVALIDSESSION);
									}
									else {


										messageFactory('Image upload failed,Try again');

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






						//--------end Upload Image---------
					}
					else {
						messageFactory('file size  should lessthan 30kb');
					}


				}//--end checking for file uploded or not
				else {

					messageFactory('Choose file');

				}

			}

		};  //------------ends uploadFile Function----------------



		//------------start update firestorage Function----------------
		$scope.updateFirestorage = function (deleteFlag) {


			$scope.submitted = true;

			if ($scope.form.$valid) {


				if (document.getElementById("file").value != "") {
					// you have a file


					// var fileName = $scope.getFileName();
					// var fileType = $scope.getFileExtension(fileName);

					//if (fileType != "") {

					//var fileSize = $scope.myFile.size;

					//alert('image filesrc  '+filesrc); 

					//30000 - 30kb; 1024000- 1024kb - 1 mb
					//if (fileSize < 1024000) // filesize validation
					//{

					//$scope.imageSrc = $scope.myFile;


					// ---------- Upload Image ----------

					var content = "Do you want to save?";

					if (deleteFlag == 'Y') {
						content = "Do you want to delete?";
					}

					//var file = $scope.myFile;

					// var monthNames = [
					// 	"JAN", "FEB", "MAR",
					// 	"APR", "MAY", "JUN", "JUL",
					// 	"AUG", "SEP", "OCT",
					// 	"NOV", "DEC"
					// ];
					// var date = new Date();
					// var monthIndex = date.getMonth();

					// var fileName = date.getDate() + monthNames[monthIndex] + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

					// message = {
					// 	"schoolID": sharedProperties.getSchoolID(),
					// 	"academicYearID": $scope.wrapper.academicYearID,
					// 	"gradeID": $scope.wrapper.gradeID,
					// 	"subjectID": $scope.wrapper.subjectID,
					// 	"docID": $scope.wrapper.docID,
					// 	"fileStatus": 'ACTIVE',
					// 	"fileName": fileName,
					// 	"fileType": fileType,
					// 	"userid": $rootScope.userid,
					// 	"timestamp": firebase.firestore.FieldValue.serverTimestamp()

					// };

					$scope.buttonDisabled = true;
					$rootScope.loading = true;


					$scope.uploadFileFirestorge();



					$scope.buttonDisabled = false;
					$rootScope.loading = false;



					// }, function () {

					// 	//$scope.status = 'confirm Result cancel.';


					// });
					//}
					//else {
					//	messageFactory('File size  should lessthan 1MB');
					//}

					//} //check for file extension
					//else {
					//	messageFactory('Invalid file type');
					//}


				}//--end checking for file uploded or not
				else {

					messageFactory('Choose file');

				}

			}//form check
		}
		//---------end update firestorage





		$scope.datepickers = {
			startDate: false,
			endDate: false

		}

		$scope.open = function ($event, which) {

			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which] = true;
		};



		// //------get filename
		// $scope.getFileName = function()
		// {
		// 	var fullPath = document.getElementById('file').value;
		// 	if (fullPath) {
		// 		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		// 		var filename = fullPath.substring(startIndex);
		// 		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
		// 			filename = filename.substring(1);
		// 		}
		// 		console.log(filename);
		// 		return filename;
		// 	}
		// }
		// //--------------


		// //----to get file extension
		// $scope.getFileExtension = function (fileName) {

		// 	var a = fileName.split(".");

		// 	if (a.length === 1 || (a[0] === "" && a.length === 2)) {
		// 		return "";
		// 	}
		// 	return a.pop();    // feel free to tack .toLowerCase() here if you want
		// }
		// //-------------

		//fileName, fileType

		//------------start uploadFile Function----------------
		$scope.uploadFileFirestorge = function () {


			firestorageFactory.fileUploadFirestorage(sharedProperties.getSchoolID() + '/notes/', $scope.myFile, document.getElementById('file').value)
				.then(function (result) {

					//console.log('result ' + result);

					var message = {
						"schoolID": sharedProperties.getSchoolID(),
						"academicYearID": $scope.wrapper.academicYearID,
						"gradeID": $scope.wrapper.gradeID,
						"subjectID": $scope.wrapper.subjectID,
						"docID": $scope.wrapper.docID,
						"title": $scope.wrapper.title,
						"startDate": ($scope.wrapper.startDate != "" ? commonControls.dateFormat($scope.wrapper.startDate) : ""),
						"endDate": ($scope.wrapper.endDate != "" ? commonControls.dateFormat($scope.wrapper.endDate) : ""),
						"fileStatus": 'ACTIVE',
						"fileName": result.fileName,
						"fileType": result.fileType,
						"contentType": result.contentType,
						"userid": $rootScope.userid,
						"timestamp": firebase.firestore.FieldValue.serverTimestamp()

					};


					// $scope.avatar = result;
					// $scope.profileImage=true;

				})
				.catch(function (error) {
					messageFactory(error);
				});


		}

		// //--------------create firestore register after successful server side completion
		// $scope.updateNotes = function(message)
		// {
		// 	//console.log('inside updatefirestore ' +JSON.stringify(message));

		// 	var notesRef = firebase.firestore().collection(sharedProperties.getSchoolID()).doc("notes").collection("notes").doc()

		// 	if(sharedProperties.getActionMode()=='UPDATE'){

		// 		notesRef
		// 		.update(JSON.parse(JSON.stringify(message))) //to avoid error for blank values
		// 		.then(function(docRef) {
		// 			console.log("Document udpated");
		// 		})
		// 		.catch(function(error) {
		// 			console.error("Error adding document: ", error);
		// 		});

		// 	}
		// 	else{

		// 		notesRef
		// 		.set(JSON.parse(JSON.stringify(message))) //to avoid error for blank values
		// 		.then(function(docRef) {
		// 			console.log("Document created");
		// 		})
		// 		.catch(function(error) {
		// 			console.error("Error adding document: ", error);
		// 		});

		// 	}

		// 	notesRef
		// 	.update({latitude:$rootScope.latitude, longitude:$rootScope.longitude, 
		// 		geolocation:$rootScope.geolocation, userid:$rootScope.userid, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
		// 	.then(function(docRef) {

		// 		$scope.clear();
		// 		console.log("Document locaiton created :");


		// 	})
		// 	.catch(function(error) {
		// 		console.error("Error adding document: ", error);
		// 	});


		// }//-------------

		// //--------------create firestore register after successful server side completion
		// $scope.fetchNotes = function()
		// {


		// 	$scope.buttonDisabled = true;
		// 	$rootScope.loading = true;

		// 	var notesRef = firebase.firestore().collection(sharedProperties.getSchoolID()).doc("notes").collection("notes")
		// 	.orderBy('timestamp','desc')
		// 	.onSnapshot(function(querySnapshot) {
		// 		$scope.notesWrapper=[];
		// 		querySnapshot.forEach(function(doc) {

		// 			var data = doc.data();
		// 			data.id = doc.id;
		// 			$scope.notesWrapper.push(data);

		// 		},function(error) {
		// 			//...

		// 			console.log('fetchnotes snapshot error ' + error);

		// 		});
		// 		$scope.$apply();

		// 	});


		// 	// .get()
		// 	// .then(function(querySnapshot) {
		// 	// 	querySnapshot.forEach(function(doc) {
		// 	// 		// doc.data() is never undefined for query doc snapshots
		// 	// 		//console.log(doc.id, " => ", doc.data());

		// 	// 		var data = doc.data();
		// 	// 		data.id = doc.id;
		// 	// 		$scope.notesWrapper.push(data);
		// 	// 		$scope.$apply();

		// 	// 		//console.log(JSON.stringify($scope.notesWrapper));

		// 	// 	});
		// 	// });


		// 	$scope.totalItems = $scope.notesWrapper.length;
		// 	$scope.currentPage = 1;
		// 	$scope.itemsPerPage =5;
		// 	$scope.maxSize = 5; //Number of pager buttons to show


		// 	if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
		// 	{
		// 		$scope.pagination=true;

		// 	}


		// 	$scope.buttonDisabled = false;
		// 	$rootScope.loading = false;



		// }

		//-----------file device download from firestorage-----
		$scope.downloadFile = function (info) {

			//console.log ('inside download ' + sharedProperties.getStudentID());
			// firestorageFactory.fileDeviceDownloadFirestorage(sharedProperties.getSchoolID() + '/notes/'+ fileName)
			// .then(function(downloadURL)
			// {



			var downloadURL = info.imageFileFolder;
			var contentType = info.imageContentType;

			console.log('result downloadFile ' + downloadURL);

			// // This can be downloaded directly:
			// var xhr = new XMLHttpRequest();
			// xhr.responseType = 'arraybuffer';
			// xhr.onload = function(event) {
			// 	var blob = xhr.response;
			// };
			// xhr.open('GET', result);
			// xhr.send();

			if (downloadURL) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", downloadURL);
				xhr.responseType = "arraybuffer";

				xhr.onload = function () {
					if (this.status === 200) {
						var blob = new Blob([xhr.response], { type: contentType });
						var objectUrl = URL.createObjectURL(blob);
						window.open(objectUrl);
					}
				};
				xhr.send();
			}

			// })
			// .catch(function(error)
			// {
			// 	messageFactory(error);
			// });

		}
		//---------end of device download  storage

		// //----------- delete file  from firestorage-----
		// $scope.deleteFile=function(fileName, docID){




		// 			//console.log ('inside download ' + sharedProperties.getStudentID());
		// 			firestorageFactory.fileDeleteFirestorage(sharedProperties.getSchoolID() + '/notes/'+ fileName)
		// 			.then(function(result)
		// 			{

		// 				console.log('result delete ' + result);

		// 				//$scope.deleteNotes(docID);

		// 			})
		// 			.catch(function(error)
		// 			{
		// 				messageFactory(error);
		// 			});


		// }
		//---------end of device download  storage


		$scope.doAdd = function () {
			sharedProperties.setActionMode("ADD");
			var passInfo = ["", "ADD"];
			$ctrl.openModal('sm', '', passInfo);
		}


		//------------start insertImageDetails Function----------------
		$scope.updateImageStatus = function (info) {


			$scope.submitted = true;
			methodAction = "updateImageStatus";

			message = {

				"refNo": info.refNo,
				"imageStatus": (info.imageStatus == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')

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

					result = value.updateImageStatus;
					//alert('success= '+ value.success);

					if (value.success == true) {

						if (result.validSession == true && (result.imageDetailsWrapper[0].recordFound) == true) {

							messageFactory('Circular status changed');
							$scope.dtSearch();

						}
						else if (result.validSession == false) {

							messageFactory(appConstants.SYSTEM_INVALIDSESSION);
						}
						else {
							messageFactory('Image upload failed,Try again');

						}
						//console.log('imageFileName ' + result.imageDetailsWrapper[0].imageFileName);
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

		// //--------------delete notes from firestore
		// $scope.deleteNotes = function(docID)
		// {


		// 	$scope.buttonDisabled = true;
		// 	$rootScope.loading = true;

		// 	console.log('docID ' + docID);

		// 	var notesRef = firebase.firestore().collection(sharedProperties.getSchoolID()).doc("notes").collection("notes").doc(docID)
		// 	.delete().then(function() {
		// 		console.log("Document successfully deleted!");
		// 	}).catch(function(error) {
		// 		console.error("Error removing document: ", error);
		// 		messageFactory("Error removing document: ", error);
		// 	});

		// 	$scope.buttonDisabled = false;
		// 	$rootScope.loading = false;



		// }//----end of delete notes


		/*$scope.upload = function (dataUrl) {
			Upload.upload({
				url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
				data: {
					file: Upload.dataUrltoBlob(dataUrl)
				},
			}).then(function (response) {
				$timeout(function () {
					$scope.result = response.data;
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status 
					+ ': ' + response.data;
			}, function (evt) {
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			});
		}
	*/

	}]);

})();

