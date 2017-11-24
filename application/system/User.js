/*
* http://natko.com/wordpress-ajax-login-without-a-plugin-the-right-way/
/*
* Renders a dialog box at the top of the page
* <user-context-menu></user-context-menu>
*/
MvpmApp.controller("testUserCtrl", function($scope, UserService) {
    $scope.formData = {};
    // console.log($scope.$parent);
    $scope.$parent
    $scope.formLogin = function() { 
        console.log($scope.formData)
        $scope.dataMessage = window.mvpmUserLoginloadingmessage;       
        UserService.loginUser($scope.formData.username, $scope.formData.password).then(function(data) {
            console.log('new',data)
            if (data.Loggedin){
                $scope.$parent.system.loggedin = true;
                $scope.dataMessage = 'login succes'; 
                console.log(data);
            } else {
                $scope.dataMessage = 'failed to login'; 
            }
        });
    }
});
MvpmApp.directive('userContextMenu', ['UserService', function(UserService) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            'username': '&',
            'password': '&',
            'form': '&'
        },
        controller: 'testUserCtrl',
        templateUrl: mvpmPartialsPath+'/user/user-login.html',
    }
}]);

/*
* User Service
* this could become a system wide resolve object - we need to make the login work first
* MvpmApp.controller('ListingCtrl', UserCtrl);
* MvpmApp.factory('ListingService', UserService);
*/

MvpmApp.service('UserService', UserService);

function UserService($http, $q) {
    function loginUser(username, password) {
        var that = this;

        var deferred = $q.defer();
        console.log(username, password)
        that.username = username;
        that.password = password;

        $http({
            method: 'POST',
            url: window.mvpmSystemApiUrl,
            params: {
                action:   "mvpm_user_login",
                security: window.mvpmSystemSecurity,
                username: 'username',
                password: 'password',
                remember: true
            },
            headers : {
                'Content-Type' : 'application/json',
                'Data-Type': 'json'
            }
        }).success(function(data, status) {
            console.log('testable data', data);
            deferred.resolve(data);

        }).error(function(data, status) {
            console.log('error data', data);
            deferred.reject();
        });

        return deferred.promise;
    }
    // would a factory return loginUser()?
    return {
        loginUser: loginUser
    };
}
// http://code.realcrowd.com/on-the-bleeding-edge-advanced-angularjs-form-validation/



// // UserLoginShow();
// // $('a#show_login').on('click', function(e){
// //     $('body').prepend('<div class="login_overlay"></div>');
// //     $('form#login').fadeIn(500);
// //     $('div.login_overlay, form#login a.close').on('click', function(){
// //         $('div.login_overlay').remove();
// //         $('form#login').hide();
// //     });
// //     e.preventDefault();
// // });


// /*
// * UserService($http, $q)
// *$.ajax({
// *    type: 'POST',
// *    dataType: 'json',
// *    url: window.mvpmSystemApiUrl+'/',
// *    data: {
// *        'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
// *        'username': $('form#login #username').val(),
// *        'password': $('form#login #password').val(),
// *        'security': $('form#login #security').val() },
// *    }
// *});
// *loginUser(username, $('form#login #password').val()
// *username, password
// */

// function createOverlay(){
// $('body').prepend('<div class="login_overlay"></div>');
// $('form#login').fadeIn(500);
// $('div.login_overlay, form#login a.close').on('click', function(){
//     $('div.login_overlay').remove();
//     $('form#login').hide();
// });
// }
// #
// #//
// app.directive('myChange_user_usernameinput', function() {
//     return {
//         link:  function link(scope, element) {
//             element.bind('change', function() {
//                 alert('change on ' + element);
//             });
//         }
//         template: '<div class="mvpm-input"><input type="text" ng-model="" placeholder></div>';
//     }
// });
//
// app.directive('myChange_passwordinput', function() {
//     return {
//         link:  function link(scope, element) {
//             element.bind('change', function() {
//                 alert('change on ' + element);
//             });
//         }
//     }
// });
//
//
// app.directive('myChange_loginsubmitinput', function() {
//     return {
//         link:  function link(scope, element) {
//             element.bind('change', function() {
//                 alert('change on ' + element);
//             });
//         }
//     }
// });
// The above directive can be used as follows:

