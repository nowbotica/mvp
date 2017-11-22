console.log('system wide factories here');
MvpmApp.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});