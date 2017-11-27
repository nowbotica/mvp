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

    console.log('yyyyy',this)
    $scope.$on('loggedin', function (event, data) {
        console.log('ZZZ',this)
        doLogin()
	    // this.loggedin = 'loggedin';	
        console.log('logging in to site'); // 'Some data'
        setTimeout(function(){
            this.loggedin = 'loggedin';

        }, 100)
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
