window.mvpmSystemApiUrl   = mvpm_api_object.ajax_url;
window.mvpmUrlDomainPath  = mvpm_api_object.url_domain_path;
window.mvpmPartialsPath   = mvpm_api_object.partials_path;
window.mvpmImagePath      = mvpm_api_object.image_path;
// window.mvpmImagePath      = '/wp-content/plugins/mvp-mechanic/application/build/images/';
window.mvpmFormPath       = mvpm_api_object.form_path;
window.mvpmSystemSecurity = mvpm_api_object.ajax_nonce;

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
    ]);

// http://stackoverflow.com/questions/31266566/angular-ui-sref-not-working-with-touch-events
MvpmApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider ) {

        var template_path = window.mvpmPartialsPath

        var system = {
            name: 'system',  //mandatory
            controller: 'SystemCtrl',
            url: '/',
            templateUrl: template_path+ '/system.html',
        };

        $stateProvider
            .state(system)

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
