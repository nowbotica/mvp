// console.log('shared directives go here');
MvpmApp.directive('systemLoader', function() {
    return {
        restrict: 'AE',
        replace: true,
        // templateUrl: 'application/system/loader/loader.html',
        template: '<article ng-hide="!isRouteLoading" class="row loader-wrap"><div class="loader">Loading...</div></article>'
    };
});