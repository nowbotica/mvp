window.mvpmSystemApiUrl   = mvpm_api_object.ajax_url;
window.mvpmUrlDomainPath  = mvpm_api_object.url_domain_path;
window.mvpmPartialsPath   = mvpm_api_object.partials_path;
window.mvpmImagePath      = mvpm_api_object.image_path;
// window.mvpmImagePath   = '/wp-content/plugins/mvp-mechanic/application/build/images/';
window.mvpmFormPath       = mvpm_api_object.form_path;
window.mvpmSystemSecurity = mvpm_api_object.ajax_nonce;

/* User module*/
window.mvpmUserRedirecturl = mvpm_user_object.mvpm_redirecturl;
window.mvpmUserPasswordreseturl = mvpm_user_object.mvpm_passwordreseturl;
window.mvpmUserRegisterurl = mvpm_user_object.mvpm_registerurl;
window.mvpmUserLoginloadingmessage = mvpm_user_object.mvpm_loginloadingmessage;


var toType = function(obj) {

    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
console.log('MvpmApp running on Angular', toType(angular) )

// Declare app level module which depends on filters, and services
var MvpmApp = angular.module('MvpmApp',
    [
    	'ui.router'
        ,'ngAnimate'
        ,'SystemCtrl'
        // ,'ListingCtrl'
        ,'ProfileCtrl'
    ]);

// http://stackoverflow.com/questions/31266566/angular-ui-sref-not-working-with-touch-events
MvpmApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider ) {

        var template_path = window.mvpmPartialsPath

        var system = {
            name: 'system',  //mandatory
            abstract: true,
            templateUrl: template_path+ '/system.html',
            controller: 'SystemCtrl as system',
            resolve: SystemCtrl.resolve
        };

        // first resolve a named service to cache listings from server
        var systemListing = {
            name: 'system.listing',  //mandatory
            abstract: true,
            // url: '/',
            parent: 'system',
            controller: 'ListingCtrl as listing',
            resolve: ListingCtrl.resolve,
            templateUrl: mvpmPartialsPath+'/listing/view.html'
        }
        
        var systemListingAll = {
            name: 'system.listing.all',  //mandatory
            url: '/',
            parent: 'system.listing',
        
            views:{
                'context-display' : {
                    templateUrl: mvpmPartialsPath+'/listing/context-display.html',
                },
                'filters' : {
                    templateUrl: mvpmPartialsPath+'/listing/filters.html',
                },
                'list' : {
                    templateUrl: mvpmPartialsPath+'/listing/list.html',
                } 
            }
        }
        
        // second resolve a factory service wich maniplates listings
        var systemAbout = {
            name: 'system.about',  //mandatory
            url: '/about',
            parent: 'system',
            templateUrl: mvpmPartialsPath+'/about.html'
            // controller: 'ListingCtrl as listing',
            // resolve: ListingCtrl.resolve
        };

        var systemProfile = { 
            name: 'system.profile',  //mandatory
            url: '/profile',
            parent: 'system',
            templateUrl: mvpmPartialsPath+ '/profile/manage-profile.html'
        };

        // var systemProfilePublic = {
        //     name: 'system.profile.public',
        //     url: '^/public/:owner',
        //     params: {
        //         owner: {
        //             value: null,
        //             squash: true
        //         },
        //     },
        //     controller: 'PublicProfileCtrl',
        //     templateUrl: function($stateParams) { // Can not inject dependencies
        //                 // console.log('sdf', $stateParams.type)
        //                 // return template_path + 'templates/reports/' + $stateParams.type+'.html';
        //     },
        // };
    
        $stateProvider
            .state(system)
            .state(systemListing)
            .state(systemListingAll)
            .state(systemAbout)
            .state(systemProfile)

        $urlRouterProvider.otherwise('/');
    }
]);

MvpmApp.run(['$rootScope', function($rootScope) {
    console.log('initroot')
    $rootScope.$on('$stateChangeStart', function(e, curr, prev) {
        // if (curr.$$route && curr.$$route.resolve) {
        // Show a loading message until promises are not resolved
        $rootScope.isRouteLoading = true;
        console.log('on')
        // }
    });
    $rootScope.$on('$stateChangeSuccess', function(e, curr, prev) {
        // Hide loading message
        $rootScope.isRouteLoading = false;
        console.log('routing route loading')
        console.log('off')
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        // Hide loading message
        $rootScope.isRouteLoading = false;

    })
}]);



   /**
 * form focusable directive
 */
// MvpmApp.directive('focusableForm', ['$animate', '$timeout', function ($animate, $timeout) {
//         return {
//             restrict: 'A',
//             link: function (scope, element, attr) {
//                 var FOCUSED_CLASS = 'focused',
//                         elements = element.find('input');
//                 angular.forEach(elements, function (value, key) {
//                     angular.element(value).on('focus', function () {
//                         $timeout(function () {
//                             $animate.setClass(element, FOCUSED_CLASS, '');
//                         }, 0);
//                     }).on('blur', function () {
//                         $timeout(function () {
//                             $animate.setClass(element, '', FOCUSED_CLASS);
//                         }, 0);
//                     });
//                 });
//             }
//         };
//     }]);