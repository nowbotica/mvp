/*
* http://natko.com/wordpress-ajax-login-without-a-plugin-the-right-way/
/*
* Renders a dialog box at the top of the page
* <user-context-menu></user-context-menu>
*/
MvpmApp.controller("testUserCtrl", function($scope, UserService, LoggedinService) {
    $scope.formData = {};
    // console.log($scope.$parent);
    $scope.$parent
    $scope.formLogin = function() { 
        $scope.dataMessage = window.mvpmUserLoginloadingmessage;       
        UserService.loginUser($scope.formData.username, $scope.formData.password).then(function(data) {
            console.log('new',data)
            if (data.loggedin){
                $scope.$parent.system.loggedin = true;
                $scope.dataMessage = 'login succes'; 
                console.log(data);
            } else {
                $scope.dataMessage = 'failed to login'; 
            }
        });
    }
});

MvpmApp.directive('userLogin', ['UserService', function(UserService) {
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

MvpmApp.controller("UserActionsCtrl", function($scope, UserService, LoggedinService) {
    $scope.showLogin = function(){
        console.log('show login', $scope.$parent.system.loggedin)
    };
    $scope.showRegister = function(){
        console.log('register')

    };
    $scope.userLogout = function(){
        UserService.logoutUser().then(function(data) {
            $scope.$parent.system.loggedin = 'loggedout';
        });  
    }
});

MvpmApp.directive('loginModalLauncher', ['$parse', 'UserService', function($parse, UserService){
    return {
        replace: true,
       templateUrl: mvpmPartialsPath+'/user/user-login-modal.html',
        scope: {
          reportid: '@',
          pdf: '@'
        },
        link: function(scope, element, attr) {
        //https://gist.github.com/CMCDragonkai/6282750
           
            // scope.urlDomainPath = window.TzuUrlDomainPath;

            // attr.$observe('pdf', function(value){
            //     if(value){
            //         console.log('p', value);
            //         scope.pdf = value
            //     }
            // });
            //  attr.$observe('reportid', function(value){
            //     if(value){
            //         console.log('c',value)
            //         scope.reportid = value
            //     }
            // });
            // scope.createPDF = function(g){
            //     console.log(g)

            //     ActionFactory.createPdf(g).then(function(resp){
            //     //     // console.log('resdss', resp);
            //     //     // scope.report_id = resp;//'/wp-content/uploads/pdfs/2017-04-03 16:53:10_92_cp-17.pdf';
            //         scope.pdf = resp; //return value' //scope.report_id;
            //     //     // scope.report_id 
            //     });   
            // }
            scope.openModal = function(g){
                scope.actionStatus = 'loading';
                // ActionFactory.createPdf(g).then(function(resp){
                    // scope.pdf = resp; //return value' //scope.report_id;
                    window.setTimeout(function(){
                        scope.modalStatus  = 'loading';
                        scope.$apply();
                    }, 10)
                // }); 
            }

            scope.closeModal = function(){
                scope.modalStatus  = '';
                window.setTimeout(function(){
                    scope.actionStatus = '';
                    scope.$apply();
                }, 100)
            }
        }
    };
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
                username: that.username,
                password: that.password,
                remember: true
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
    function logoutUser(){

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: window.mvpmSystemApiUrl,
            params: {
                action:   "mvpm_user_logout",
                security: window.mvpmSystemSecurity,
            },
            headers : {
                'Content-Type' : 'application/json'
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
        loginUser: loginUser,
        logoutUser: logoutUser
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
