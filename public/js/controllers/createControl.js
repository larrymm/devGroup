var app = angular.module('groupDropper');

app.controller('createControl', function($rootScope, $scope, productService, $location, userService){

  var fileArr = [];
  $scope.onFileSelect = function($files){
	 fileArr = $files;
  }

	$scope.product = {
		productTitle: '',
		startingPrice: '',
		minimumPrice: '',
		reductionAmount: '',
		peopleThreshold: '',
		productPic: ''
	};

	$scope.createProduct = function() {
		productService.addProduct($scope.product)
		$scope.product = {
			productTitle: '',
			startingPrice: '',
			minimumPrice: '',
			reductionAmount: '',
			peopleThreshold: '',
      productPic: ''
		};
		
		$location.path('/products');
	}


/* Uploading with jQuery File Upload */
    
    $scope.updateTitle = function(){
      var uploadParams = $scope.widget.fileupload('option', 'formData');
      uploadParams["context"] = "photo=" + $scope.title;
      $scope.widget.fileupload('option', 'formData', uploadParams);
    };
    
    $scope.widget = $(".cloudinary_fileupload")
      .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {tags: 'groupDropper', context:'photo='}, { 
        // Uncomment the following lines to enable client side image resizing and valiation.
        // Make sure cloudinary/processing is included the js file
        //disableImageResize: false,
        //imageMaxWidth: 800,
        //imageMaxHeight: 600,
        //acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
        //maxFileSize: 20000000, // 20MB
        dropZone: "#direct_upload",
        start: function (e) {
          $scope.status = "Starting upload...";
          $scope.$apply();
        },
        fail: function (e, data) {
          $scope.status = "Upload failed";
          $scope.$apply();
        }
      })
      .on("cloudinaryprogressall", function (e, data) {
        $scope.progress = Math.round((data.loaded * 100.0) / data.total);
        $scope.status = "Uploading... " + $scope.progress + "%";
        $scope.$apply();
      })
      .on("cloudinarydone", function (e, data) {
        $scope.product.productPic = data.result;
        $rootScope.photos = $rootScope.photos || [];
        data.result.context = {custom: {photo: $scope.title}};
        $scope.result = data.result;
        $rootScope.photos.push(data.result);
        $scope.$apply();
      });

});




