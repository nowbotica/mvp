/*
* http://natko.com/wordpress-ajax-login-without-a-plugin-the-right-way/
* Directive: directive('userContextMenu', UserDirective);
* Show the login dialog box on click
* $('a#show_login').on('click', function(e){
*     $('body').prepend('<div class="login_overlay"></div>');
*     $('form#login').fadeIn(500);
*     $('div.login_overlay, form#login a.close').on('click', function(){
*         $('div.login_overlay').remove();
*         $('form#login').hide();
*     });
*     e.preventDefault();
* });
* directive must contain

* $('a#show_login').on('click', function(e){
*     console.log()
* });
*/

/*
* Renders a dialog box at the top of the page
* <user-context-menu></user-context-menu>
 */
 MvpmApp.controller("testCtrl", function($scope, UserService) {
    $scope.color1 = "color";
    $scope.formData = {};
    $scope.formLogin = function() {        
        UserService.loginUser('admin', '11').then(function(data) {
            // if (data.result == 'loggedin'){
            if (true){
                scope.parent.system.login = true;
                scope.datamessage = 'login succes'; 
                console.log(data);
            } else {
                scope.datamessage = 'failed to login'; 
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
        controller: 'testCtrl',
        controllerAs: 'test',
        templateUrl: mvpmPartialsPath+'/user/user-login.html',
        // link: function(scope, element, UserService) {
            /* 
             * Binds login form to our backend processing 
            * Binds the user login view with the backend user verification code
             */
            // scope.foo = 'blah';
            // // $('form#login').on('click', function(e){            
            // scope.formLogin = function(){
         
            //     console.log('du', 'look da, no angular');

            //     scope.datamessage = window.mvpmUserLoginloadingmessage;
            //     // Perform AJAX login on form submit
            //   
            // }
        // }
    }
}]);

/*
* User Service
* this could become a system wide resolve object - we need to make the login work first
*
* inject InboxService and bind the
* response to `this.messages`
* function ListingCtrl(listings) {
*     console.log('listings', listings)
*     this.listings = listings;
*     this.foo = 'bar'
* }
* // https://toddmotto.com/resolve-promises-in-angular-routes/
* ListingCtrl.resolve = {
*     listings: function (ListingService) {
*         return ListingService.getListings();
*     }
* }
* MvpmApp.controller('ListingCtrl', UserCtrl);
* MvpmApp.factory('ListingService', UserService);
*/

MvpmApp.service('UserService', UserService);

function UserService($http, $q) {
    function loginUser(username, password) {
        var that = this;
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: window.mvpmSystemApiUrl,
            params: {
                action:   "mvpm_user_login",
                security: window.mvpmSystemSecurity,
                username: that.username,
                password: that.password
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
        loginUser: loginUser
    };
}



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

