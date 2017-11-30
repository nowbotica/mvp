var SystemCtrl = angular.module('SystemCtrl', []);
SystemCtrl.controller('SystemCtrl', ['$scope', '$stateParams', 'loggedin',
	// "ActionFactory",
	function($scope, $stateParams, loggedin
		// , ActionFactory
	){

	// System online message
	this.debug = 'system online';

	// allows application wide access to {{system.image_path}}
	this.image_path = window.mvpmImagePath;
		
    this.loggedin = loggedin;   

    var that = this;

    function doLogin(){
        console.log('do', that, that.loggedin)
        that.loggedin = 'loggedin';
    }

    // console.log('yyyyy',this)
    $scope.$on('loggedin', function (event, data) {
        doLogin()
    });

	// this.contextview = 'default'; 
		// console.log('boom',loggedin)
	// this.menuState = 'closed';

	// this.triggerMenu = function(state){
	// // show-nav
	// 	// console.log(this.menuState)
	// 	if(state == 'show-nav'){
	// 		this.menuState = 'closed'
	// 	}
	// 	if(state == 'closed'){
	// 		this.menuState = 'show-nav';
	// 	}
	// }
}]);

SystemCtrl.resolve = {
  loggedin: function (LoggedinService) {
    return LoggedinService.loggedIn();
  }
}

MvpmApp.service('LoggedinService', LoggedinService);
function LoggedinService($http, $q) {
    function loggedIn() {
        
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: window.mvpmSystemApiUrl,
            params: {
                action:   "mvpm_user_check",
                security: window.mvpmSystemSecurity
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).success(function(data, status) {
            console.log('testable data', data);
            deferred.resolve(data);

        }).error(function(data, status) {
            // console.log('error data', data);
            deferred.reject();
        });

        return deferred.promise;
    }
    // would a factory return loginUser()?
    return {
        loggedIn: loggedIn
    };
}


var ClientCtrl = angular.module('ClientCtrl', []);
ClientCtrl.controller('ClientCtrl', ['$scope', '$stateParams', 'ClientFactory', 
  function($scope, $stateParams, ClientFactory
  ){

//    function validateCompanyName(s) {
//     if (/^(\w+\s?)*\s*$/.test(s)) {
//         return s.replace(/\s+$/, '');
//     }
//     return 'NOT ALLOWED';
// }

  $scope.createClient = function(data){
    console.log('creating')
    var company_name = data.companyName;
    var client_email = data.clientEmail;
    
    ClientFactory.createClient(company_name, client_email).then(function(client_id){
      var client_id = client_id;
    });
  }
}]); 



var SkillsCtrl = angular.module('SkillsCtrl', []);

SkillsCtrl.controller('SkillsCtrl', ['$scope','$stateParams', function($scope,$stateParams) {
    $scope.username = $stateParams.username;
    $scope.skills = [
        { 
            'text'  :'sewing',
            'size':3
        },
        { 
            'text'  : 'pattern design',
            'size':5
        },
        { 
            'text' : 'machine sewing',
            'size'  :8
        },
        { 
            'text' : 'cutting',
            'size'  : 1
        }
    ];

}]);

// CloudCtrl = angular.module('CloudCtrl', []);

MvpmApp.controller('CloudCtrl', function($scope, _
    // ,UserFactory
    ,CloudFactory
    ){
    // $scope.keepArray = false; //{skill:'',value:'0'}
    $scope.debug = 'CloudCtrl';


    // if word inArray is truthy push array to array

    // $scope.activeFilters = [];

    $scope.users = [];
    $scope.activeUsers = []
    $scope.skills = [];
    $scope.filters = [];
    // test 1
    $scope.init = function(){
        CloudFactory.users().then(function(data){
            // $scope.users = data.val(); // cache users object
            $scope.users = data;//.val(); // cache users object
            console.log('--------------users', data);
            $scope.gatherSkills(data);
        });
    };
    $scope.init();

    // returns array of skill object values
    $scope.gatherSkills = function(users){
        console.log(users)
        // if($scope.filters.length < 0){
        //  console.log('filterUsers()');
        // } 
        console.log('called');
        $scope.skills = [];
        var gather = function(user){
            var skills = _.map(user.skills, function(value,key){
                return value
            })

            console.log(skills);
            _.each(skills, function(input){
                $scope.countSkills(input.name);
            });
            // console.log($scope.skills);
        }
        _.each(users, gather);
    };

    // Checks to see if the skill exists
    // if false adds the skill to the array
    // if true increments the counter for the skill
    $scope.countSkills = function(input){ 
        var existingSkill = _.contains(_.pluck($scope.skills, 'text'), input);
        var filteredSkill = _.contains($scope.filters, input);

        if(!existingSkill && !filteredSkill){ // 
            var thing = {
                text: input, 
                weight: 1, 
                link: { href: "#", title: input}
            }

            $scope.skills.push(thing);
        }
        else if(!filteredSkill){ // really inefficient i think 
            _.select($scope.skills, function(obj){

                if (obj.text === input){
                    obj.weight = ++obj.weight;
                }; 
                        
            });

        }
    };

    $scope.addFilter = function(filter){
        $scope.filters.push(filter); 
        // console.log('1',$scope.filters);
        $scope.filterUsers($scope.filters);
    }
    $scope.removeFilter = function(filter){
        $scope.filters = _.without($scope.filters, filter);
        // console.log($scope.filters)
        $scope.filterUsers($scope.filters);
        
    }
    $scope.filterUsers = function(filters){
        var users = $scope.users ;
        var result = [];
        
        var numberOfFilters = filters.length;
        // console.log('numberOfFilters',numberOfFilters)
        
        // iterate over user
        _.each(users, function(user){
            // console.log('---------------', user, '------------------')
            var hasSkill = 0; // set skills to zero
            // iterate over skills array    
            _.each(user.skills, function(skill){
                // console.log('4',skill.name)
                // if(_.contains(filters, skill.name)){
                if(_.contains(filters, skill.name)){
                    hasSkill = ++hasSkill
                    // console.log('true', hasSkill);
                }
            });
            if(hasSkill === numberOfFilters){
                    result.push(user)
            }
        })
        $scope.activeUsers = result;
        // console.log('6', $scope.activeUsers)
        $scope.gatherSkills(result);
    }

  
});


MvpmApp.directive( 'cloud', function() {
    return {
        restrict: 'AE',
        replace: true,
        template: '<button class="tc tc-{{value}}" ng-click="addFilter(skill)">{{skill}}</button>',
        scope: {
            skill: '@skill',
            value: '@value',
        },
        controller:'CloudCtrl',
        link: function(scope, elem, attrs) {
            
            var skill = scope.skill;
            console.log(skill)
            var value = scope.value;
            console.log(value);
        },
    }
});
MvpmApp.filter('makeLowercase', function(){
    return function (item) {
        return item.toLowerCase();
    };
});



MvpmApp.factory("CloudFactory", function($rootScope, $q, $http) {

  var factory = {};
  var helper = {};
  var firebase_url = 'https://brilliant-fire-7870.firebaseio.com/';

  factory.users = function () {
        // var endpoint = new Firebase(firebase_url + '/users');
        var deferred = $q.defer();
        // endpoint.once('value', function(snapshot){
        //  deferred.resolve(snapshot);
        // });
                var users = [

            {   "username": "franz-kafka",
                "skills": [
                {"name":"polite"},
                {"name":"javascript"},
                {"name":"insurance broker"},
                {"name":"design"}
                ]
            },
            {   "username":"me",
                "skills": [
                {"name":"hardworking"},
                {"name":"sewing"},
                {"name":"javascript"},
                {"name":"information architecture"}
                ]
            },
            {
                "username": "another-user",
                "skills": [
                {"name":"hardworking"},
                {"name":"design"},
                {"name":"italian"},
                {"name":"javascript"},
                ]
            },
            {
                "username": "more-data",
                "skills": [
                {"name":"hardworking"},
                {"name":"design"},
                ]
            },
            {
                "username": "even-more",
                "skills": [
                {"name":"javascript"},
                {"name":"design"},
                {"name":"polite"}
                ]
            }
        ];
        deferred.resolve(users);
        return deferred.promise;
  };

  return factory;

});
