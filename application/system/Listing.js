MvpmSystem.factory("ListingFactory", ['$http', '$q', '$stateParams', function($http, $q, $stateParams) {

	var factory = {};

	factory.getListing = function(form_type){
		var deferred = $q.defer();
		$http({
            method: 'GET',
            url: mvpmFormPath+'/'+form_type+'.json',
			headers : {
				'Content-Type' : 'application/json'
			}
            }).success(function(data, status) {
            	console.log('returned', typeof data);
            	deferred.resolve(data);

            }).error(function(data, status) {
            	console.log('returned', data);
            	deferred.reject();
        });
        return deferred.promise;
	}
  	return factory;
}]);
