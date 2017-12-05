/*
* http://natko.com/wordpress-ajax-login-without-a-plugin-the-right-way/
* // http://code.realcrowd.com/on-the-bleeding-edge-advanced-angularjs-form-validation/
/*
* Renders a dialog box at the top of the page
* <user-context-menu></user-context-menu>
*/


/*
* Handles the user interaction with the create membership form 
// console.log('parent scope', $scope.$parent) //.system.loggedin = true;
*/
MvpmApp.controller("createMembershipCtrl", function($scope, UserService, LoggedinService) {
    $scope.formData = {};
    console.log($scope.$parent)
    $scope.doingsomething = false;
    $scope.step = 'one';
    $scope.createMember = function() { 
        console.log('dsdfds',$scope.formData)
        $scope.dataMessage = 'Validating Membership'; 
        $scope.doingsomething = true;
        UserService.createUser($scope.formData.username, $scope.formData.email, $scope.formData.password).then(function(data) {
            if (!data.registered ){
                $scope.doingsomething = false;
                $scope.dataMessage = data.message;
            } 
            else if (!data.loggedin) {
                $scope.doingsomething = false;
                $scope.dataMessage = data.message; 
            } else {
                $scope.step = 'two';
                // $scope.$parent.closeModal();
            }
        });
    }
});

/*
* Renders the create membership form 
* <create-membership></create-membership>
*/
MvpmApp.directive('createMembership', ['UserService', function(UserService) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            'username': '&',
            'password': '&',
            'form': '&'
        },
        controller: 'createMembershipCtrl',
        templateUrl: mvpmPartialsPath+'/user/create-membership.html',
    }
}]);

/*
* Renders a dialog box at the top of the page
* <create-membership-modal></create-membership-modal>
*/
MvpmApp.directive('createMembershipModal', ['$parse', 'UserService', function($parse, UserService){
    return {
        replace: true,
        templateUrl: mvpmPartialsPath+'/user/create-membership-modal.html',
        scope: {
          reportid: '@',
          pdf: '@'
        },
        link: function(scope, element, attr) {
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
                // going up!

                scope.modalStatus  = '';
                // consoloe
                window.setTimeout(function(){
                    scope.$emit('loggedin', 'loggedin');
                    scope.actionStatus = '';
                    scope.$apply();
                }, 100)
            }
        }
    };
}]);


/*
* Handles the user interaction with the login form 
*/
MvpmApp.controller("userLoginCtrl", function($scope, UserService, LoggedinService) {
    $scope.formData = {};
    // console.log($scope.$parent);
    $scope.$parent
    $scope.formLogin = function() { 
        $scope.dataMessage = window.mvpmUserLoginloadingmessage; 
        setTimeout(function(){
            $scope.dataMessage = window.mvpmUserLoginloadingmessage; 

        },100)      
        UserService.loginUser($scope.formData.username, $scope.formData.password).then(function(data) {
            // console.log('new',data, 
                $scope.$parent.closeModal();
            if (data.loggedin ){
                console.log('parent scope', $scope.$parent) //.system.loggedin = true;
                $scope.dataMessage = 'login succes, close modal below'; 
                console.log(data);
            } else {
                $scope.dataMessage = 'failed to login'; 
            }
        });
    }
});

/*
* Renders a dialog box at the top of the page
* <user-login></user-login>
*/
MvpmApp.directive('userLogin', ['UserService', function(UserService) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            'username': '&',
            'password': '&',
            'form': '&'
        },
        controller: 'userLoginCtrl',
        templateUrl: mvpmPartialsPath+'/user/user-login.html',
    }
}]);

/*
* Renders a dialog box at the top of the page
* <login-modal-launcher></login-modal-launcher>
*/
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
                  // going up!

                scope.modalStatus  = '';
                // consoloe
                window.setTimeout(function(){
                    scope.$emit('loggedin', 'loggedin');
                    scope.actionStatus = '';
                    scope.$apply();
                }, 100)
            }
        }
    };
}]);

/*
* Legacy handling of user actions
*/
MvpmApp.controller("UserActionsCtrl", function($scope, UserService, LoggedinService) {
    // $scope.showLogin = function(){
    //     console.log('show login', $scope.$parent.system.loggedin)
    // };
    // $scope.showRegister = function(){
    //     console.log('register')

    // };
    $scope.userLogout = function(){
        UserService.logoutUser().then(function(data) {
            $scope.$parent.system.loggedin = 'loggedout';
        });  
    }
});


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
    function createUser(username, email, password) {
        var that = this;
        var deferred = $q.defer();
        console.log('creating with', username, email, password)
        that.username = username;
        that.email    = email;
        that.password = password;

        $http({
            method: 'POST',
            url: window.mvpmSystemApiUrl,
            params: {
                action:   "mvpm_user_create",
                security: window.mvpmSystemSecurity,
                username: that.username,
                email:    that.email,
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
    return {
        loginUser: loginUser,
        logoutUser: logoutUser,
        createUser: createUser
    };
}