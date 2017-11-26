
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

SystemApp.factory('ProfileFactory', ['$http', '$q', '$stateParams', function($http, $q, $stateParams){
    var factory = {};

    factory.getProfile = function(){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: window.TzuSystemApiUrl,
            params: {
              action:   "tzu_get_profile",
              security: window.TzuSystemSecurity
            },
            headers : {
                'Content-Type' : 'application/json'
            }
            }).success(function(data, status) {
                deferred.resolve(data);

            }).error(function(data, status) {
                deferred.reject();
        });
        return deferred.promise;

    }
    factory.updateProfile = function(changes){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: window.TzuSystemApiUrl,
            params: {
              changes: changes,
              action:   "tzu_update_profile",
              security: window.TzuSystemSecurity
            },
            headers : {
                'Content-Type' : 'application/json'
            }
            }).success(function(data, status) {
                deferred.resolve(data);
                console.log('res', data)

            }).error(function(data, status) {
                deferred.reject();
        });
        return deferred.promise;

    }

    return factory;
}]);


  // var reportView = { 
  //     name: 'report.view',  //mandatory
  //     url: '/report/:type/:love',
  //     params: {
  //      type: {
  //      value: null,
  //      squash: true
  //      },
  //    love: {
  //      value: null,
  //      squash: true
  //    }
  //  },
  //     views:{
  //      'left-menu':{
 //                templateUrl: template_path+'templates/left-menu.html'
 //            },
 //            'main': {

  //        templateUrl: function($stateParams) { // Can not inject dependencies
  //        // console.log('sdf', $stateParams.type)
  //        return template_path + 'reports/' + $stateParams.type+'.html';
  //      },
  //      controller: 'ReportCtrl'

 //            },
 //            'controls': {
 //             templateUrl: template_path+'templates/report-controls.html',
  //      controller: 'ActionCtrl'
 //            }
 //        }
  // };

    // var profile_edit = { 
  //     name: 'system.profile.edit',  //mandatory
  //     url: '/edit',
  //     // params: {
  //      // type: {
  //      // value: null,
  //      // squash: true
  //      // }
  //  // },
  //     views:{
  //      'form-header' : {
  //      // template: '<h5>Form Header</h5>' 
  //      },  
  //    'form-main' : {
  //        controller: 'FormCtrl',
 //                templateUrl: function($stateParams) { // Can not inject dependencies
  //        console.log('form main state param type', $stateParams.type)
  //        return template_path + 'templates/forms/' + $stateParams.type+'.html';
  //      }
  //    },
  //    'form-controls' : {
  //      // template: '<h5>Form Controls</h5>' 
  //    }
 //        }
  // };