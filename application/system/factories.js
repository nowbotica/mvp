// console.log('system wide factories here');
MvpmApp.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});

MvpmApp.factory("ActionFactory", ['$http', '$q', '$stateParams', function($http, $q, $stateParams) {

	var factory = {};

	factory.uploadFile = function(fileData){
		var deferred = $q.defer();
		console.log('sdfsdf', JSON.stringify(fileData) )
		$http({
            method: 'POST',
            url: window.TzuSystemApiUrl+'?'+ fileData,
            params: {
	          action:   "tzu_upload_file",
	          entity:   JSON.stringify(fileData),
	          security: window.TzuSystemSecurity
			},
			headers : {
				'Content-Type' : undefined
				// 'Content-Type' : 'x-www-form-urlencoded' 
			},
			transformRequest: angular.identity
            }).success(function(data, status) {
            	var file = data;
    			console.log('return', data)
            	deferred.resolve(file);

            }).error(function(data, status) {
            	console.log(data);
            	deferred.reject();
        });
        return deferred.promise;
	}

    // factory.sendEmail = function(report_id, mailto){ //, pdf_only, recipient, message){
    //     var deferred = $q.defer();
    //     var uid = uid;
    //     $http({
    //         method: 'POST',
    //         url: window.TzuSystemApiUrl,
    //         params: {
    //           action   : "tzu_send_email",
    //           uid      : report_id,
    //           mailto   : mailto,
    //           // name     : name,
    //           // message  : message,
    //           security : window.TzuSystemSecurity
    //         },
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }).success(function(data, status) {
    //             // var dat = JSON.stringify(data);
    //             console.log('ajax',data)
    //             deferred.resolve(data);

    //     }).error(function(data, status) {
    //             console.log(data);
    //             deferred.reject();
    //     });
    //     return deferred.promise;
    //     // createPDF()
    // }

 //  	factory.getFile = function(file_id){
	// 	var deferred = $q.defer();
	// 	$http({
 //            method: 'POST',
 //            url: window.TzuSystemApiUrl,
 //            params: {
	//           action:   "tzu_get_file",
	//           entity:   file_id,
	//           security: window.TzuSystemSecurity
	// 		},
	// 		headers : {
	// 			'Content-Type' : 'x-www-form-urlencoded' 
	// 		},
 //            }).success(function(data, status) {
 //    			console.log('return', data)
 //            	deferred.resolve(file);

 //            }).error(function(data, status) {
 //            	deferred.reject();
 //        });
 //        return deferred.promise;
	// }
  	return factory;
}]);

