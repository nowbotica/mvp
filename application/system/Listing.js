MvpmApp.controller('ListingCtrl', ListingCtrl)
MvpmApp.factory('ListingService', ListingService);

// inject InboxService and bind the 
// response to `this.messages`
function ListingCtrl(listings) {
    console.log('listings', listings)
    this.listings = listings;
    this.foo = 'bar'
}
// https://toddmotto.com/resolve-promises-in-angular-routes/
ListingCtrl.resolve = {
  listings: function (ListingService) {
    return ListingService.getListings();
  }
}

function ListingService($http, $q) {
  function getListings() {

        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: window.mvpmSystemApiUrl,
            params: {
              action:   "mvpm_get_listing",
              security: window.mvpmSystemSecurity
            },
            headers : {
                'Content-Type' : 'application/json' 
            },
            }).success(function(data, status) {
                deferred.resolve(data);

            }).error(function(data, status) {
                deferred.reject();
        });
        
        return deferred.promise;
  }
  return {
    getListings: getListings
  };
}
