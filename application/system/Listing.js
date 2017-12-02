MvpmApp.controller('ListingCtrl', ListingCtrl)
MvpmApp.factory('ListingService', ListingService);

/* 
 * ListingCtrl
 * Used as parent view controller . handles resolve data for view
 * // inject ListingService and bind the 
 * // response to `this.messages`
 *
 */
function ListingCtrl(listings, FilterService) {
    console.log('listings', listings)
    
    // assigning the return object {data: ourdataset } allows 
    // updates of the view to happen automagikaly when the service updates
    this.listings = FilterService.init(listings, '2354'); // YAGNI

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
            "name":"Bites and PC's",
            "slug":"bites-and-pcs",
            "post_id":"18",
            "author_id":"1",
            "cost":"4",
            "description":"Gamers tapas",
            "duration":"45",
            "last_updated":"2017-11-22 16:38:25",
            "location":"Seoul",
            "rating":"2"
        },
        {
            "name":"SP Internet Cafe",
            "slug":"sp-internet-cafe",
            "post_id":"19",
            "author_id":"1",
            "cost":"4",
            "description":"Check your emails wash your clothes",
            "duration":"70",
            "last_updated":"2017-11-13 16:38:25",
            "location":"Buchurest",
            "rating":"3"
        },
        {
            "name":"Soya Sorcery",
            "slug":"soya-sorcery",
            "post_id":"20",
            "author_id":"1",
            "cost":"4",
            "description":"Dim Sum and Cocktails",
            "duration":"120",
            "last_updated":"2017-10-23 16:38:25",
            "location":"London",
            "rating":"4"
        },
        {
            "name":"Sahara Sandwiches",
            "slug":"sahara-sandwiches",
            "post_id":"21",
            "author_id":"1",
            "cost":"6",
            "description":"",
            "duration":"20",
            "last_updated":"2017-10-13 16:38:25",
            "location":"Seoul",
            "rating":"5"
        },
        {
            "name":"Just Baked",
            "slug":"just-baked",
            "post_id":"22",
            "author_id":"1",
            "cost":"4",
            "description":"Fresh cookie automat",
            "duration":"20",
            "last_updated":"2017-11-23 16:38:25",
            "location":"London",
            "rating":"1"
        },
        {
            "name":"Not Cookied",
            "slug":"not-cookied",
            "post_id":"23",
            "author_id":"1",
            "cost":"6",
            "description":"Cookie Dough while you wait",
            "duration":"45",
            "last_updated":"2017-10-03 16:38:25",
            "location":"Buchurest",
            "rating":"3"
        },
        {
            "name":"Phish and Chips",
            "slug":"phish-and-chips",
            "post_id":"24",
            "author_id":"1",
            "cost":"6",
            "description":"Traditional British Cybercafe",
            "duration":"70",
            "last_updated":"2017-01-23 16:38:25",
            "location":"London",
            "rating":"1"
        },
        {
            "name":"Austerity Xmas Tree Slices",
            "slug":"austerity-xmas-tree-slices",
            "post_id":"25",
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
            "post_id":"26",
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
            "post_id":"27",
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
            "post_id":"27",
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
            "post_id":"29",
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
            "post_id":"30",
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
            "post_id":"31",
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
            "post_id":"32",
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
            "post_id":"33",
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
