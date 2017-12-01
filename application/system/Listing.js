MvpmApp.controller('ListingCtrl', ListingCtrl)
MvpmApp.factory('ListingService', ListingService);

// inject InboxService and bind the 
// response to `this.messages`
function ListingCtrl(listings, FilterService) {
    console.log('listings', listings)
    this.listings = listings;
    FilterService.init(listings, '2354')
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
                console.log('testable data', data)
                deferred.resolve(data);

            }).error(function(data, status) {
                deferred.reject();
        });
        var j = {
    "data": [
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"4",
            "description":"Lorem",
            "duration":"20",
            "last_updated":"2017-11-23 16:38:25",
            "location":"London",
            "rating":"1"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"4",
            "description":"Lorem",
            "duration":"45",
            "last_updated":"2017-11-22 16:38:25",
            "location":"Seoul",
            "rating":"2"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"4",
            "description":"Lorem",
            "duration":"70",
            "last_updated":"2017-11-13 16:38:25",
            "location":"Buchurest",
            "rating":"3"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"4",
            "description":"Lorem",
            "duration":"120",
            "last_updated":"2017-10-23 16:38:25",
            "location":"London",
            "rating":"4"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"6",
            "description":"Lorem",
            "duration":"20",
            "last_updated":"2017-10-13 16:38:25",
            "location":"Seoul",
            "rating":"5"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"6",
            "description":"Lorem",
            "duration":"45",
            "last_updated":"2017-10-03 16:38:25",
            "location":"Buchurest",
            "rating":"3"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"6",
            "description":"Lorem",
            "duration":"70",
            "last_updated":"2017-01-23 16:38:25",
            "location":"London",
            "rating":"1"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"6",
            "description":"Lorem",
            "duration":"120",
            "last_updated":"2017-02-23 16:38:25",
            "location":"Seoul",
            "rating":"2"
        },
            {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"8",
            "description":"Lorem",
            "duration":"20",
            "last_updated":"2017-03-23 16:38:25",
            "location":"Buchurest",
            "rating":"3"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"8",
            "description":"Lorem",
            "duration":"45",
            "last_updated":"2017-04-23 16:38:25",
            "location":"London",
            "rating":"4"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"8",
            "description":"Lorem",
            "duration":"70",
            "last_updated":"2016-11-23 16:38:25",
            "location":"Seoul",
            "rating":"4"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"8",
            "description":"Lorem",
            "duration":"120",
            "last_updated":"2016-10-23 16:38:25",
            "location":"Buchurest",
            "rating":"4"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"10",
            "description":"Lorem",
            "duration":"20",
            "last_updated":"2016-10-22 16:38:25",
            "location":"Buchurest",
            "rating":"5"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"10",
            "description":"Lorem",
            "duration":"45",
            "last_updated":"2016-11-21 16:38:25",
            "location":"London",
            "rating":"2"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"10",
            "description":"Lorem",
            "duration":"70",
            "last_updated":"2017-11-10 16:38:25",
            "location":"London",
            "rating":"4"
        },
        {
            "name":"Toasted Bread Van",
            "slug":"toasted-bread-van",
            "post_id":"18",
            "author_id":"1",
            "cost":"10",
            "description":"Lorem",
            "duration":"120",
            "last_updated":"2017-10-12 16:38:25",
            "location":"London",
            "rating":"3"
        }
    ]
}
deferred.resolve(j['data']);
        return deferred.promise;
  }
  return {
    getListings: getListings
  };
}
