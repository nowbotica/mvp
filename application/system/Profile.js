
var ProfileCtrl = angular.module('ProfileCtrl', []);
ProfileCtrl.controller('ProfileCtrl', ['$scope', '$stateParams', 'ProfileFactory', 
  function($scope, $stateParams, ProfileFactory
  ){
  // Use $sce.trustAsHtml() in the controller to convert the html string.
  $scope.loading = true;  

  $scope.edit = false;

  ProfileFactory.getProfile().then(function(profile_details){
    var data = profile_details;
    console.log('dgd', data);
    $scope.data = data;

    $scope.name = data['nicename']//   = data.user_nicename;
    
    $scope.loading = false; 
    // $scope.visible = true;
    
    // $scope.profile = JSON.parse(profile_details['userdata']);    
  });

  $scope.update = function(){
    $u = JSON.stringify($scope.data)
    console.log('sending', $u);

    ProfileFactory.updateProfile($u).then(function(resp){
      console.log('resp', resp);
      $scope.edit = false;
      // $scope.profile = JSON.parse(profile_details['userdata']);    
    });
  }

  $scope.changeView = function(){

  }
}]);


MvpmApp.factory('ProfileFactory', ['$http', '$q', '$stateParams', function($http, $q, $stateParams){
    var factory = {};

    factory.getProfile = function(){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: window.mvpmSystemApiUrl,
            params: {
              action:   "mvpm_get_profile",
              security: window.mvpmSystemSecurity
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
            url: window.mvpmSystemApiUrl,
            params: {
              changes: changes,
              action:   "mvpm_update_profile",
              security: window.mvpmSystemSecurity
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
  // };#

window.toof = {
  contact_info: [
  {
  "id":"best_email",
  "name":"Best Email",
  "icon":"fa-bath",
  "share":"private",
  "info":"me@home.website"
  },
  {
  "id":"work_email",
  "name":"Work Email",
  "icon":"fa-code",
  "share":"private",
  "info":"me@myjob.website"
  },
  {
  "id":"telephone",
  "name":"Telephone",
  "icon":"fa-telephone",
  "share":"private",
  "info":"international phone number"
  },,
  {
  "id":"snapchat",
  "name":"Snapchat",
  "icon":"fa-object-group",
  "share":"private",
  "info":"snapchat phone number"
  },
  {
  "id":"best_email_accessible",
  "name":"Best Email Accessible",
  "icon":"fa-sign-language",
  "share":"private",
  "info":"Me at aria breakdown"
  },
  {
  "id":"online_one",
  "name":"Online One",
  "icon":"fa-coffee",
  "share":"private",
  "info":"@coffee-break"
  },
  {
  "id":"online_two",
  "name":"Online Two",
  "icon":"fa-bug",
  "share":"private",
  "info":"slacking off"
  },
  {
  "id":"Online Three",
  "name":"online_three",
  "icon":"fa-free-code-camp",
  "share":"private",
  "info":"@whereigetthingsdone"
  },
  {
  "id":"snail_mail",
  "name":"SnailMail",
  "icon":"fa-address-card",
  "share":"private",
  "info":"123 Address St, Now Street, Postal Service"
  },
  {
  "id":"lost_connections",
  "name":"LostConnections",
  "icon":"fa-snowflake-o",
  "share":"public",
  "info":"imreadyforthis@shymail.com"
  }
]
}