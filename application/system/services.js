

// console.log('system wide services here, for now filtering component');
MvpmApp.directive('sortByFilterBy', ['$parse', '_', 'FilterService', function($parse, _, FilterService){
    return {
        replace: true,
        templateUrl: mvpmPartialsPath+'/directives/sort-by-filter-by.html',
        // restrict: 'EA',
        scope: {
            searchid: '=',
            dataset: '=',
            filter: '@'
        },
        // transclude: true,
        // controllerAs: 'fjkCtrl',
        controller: function($scope){

            this.controlFilter = function(dataObj){
                $scope.applyFilter(dataObj)
            }
        },
        link: function(scope, element, attr) {

            // // store original dataset
            var dataset;
            var searchId;

            scope.filter = {};
            console.log('bubbling down', FilterService)

            // FilterService.go(scope, 'bar');
            scope.changeSomething = function(){
            	console.log('click')
            	FilterService.changeSomething();
            }

            // this 'works' as init callback
            // setTimeout(function(){
                /* 
                / Init
                */
                // dataset = scope.dataset;
                // searchId = scope.searchId;
                // console.log('init with: ', dataset);
                // we set an inital value of cached data
                // FilterService.init(dataset, searchId);
                
                // scope.$apply(function(){
                // FilterService.setFilters(type, field){ 
                    
                    // search
                    // scope.filter.Name     = 'Elasticy Search';
                    // radio
                    // scope.filter.Stars    = FilterService.setFilters('optionsArray', 'Stars');
                    // checkbox
                    // scope.filter.Location = FilterService.setFilters('checkboxArray', 'Location');
                    // select
                    // scope.filter.Distance = FilterService.setFilters('numericalSelectArray', 'Distance');
                    // range
                    // scope.filter.MinCost  = FilterService.setFilters('minMax', 'MinCost');
                // });
            // }, 2000);

            scope.applySort = function(category, direction){
                // we want to sort only filtered items
                scope.dataset = FilterService.sort(scope.dataset, category, direction)
            }
            scope.applyFilter = function(dataObj){
                scope.dataset = FilterService.filter(dataset, dataObj)
            }

        }
    };
}]);

// Provides asychronious call to api returning search query
MvpmApp.factory('FilterFactory', ['$http', '$q', function($http, $q){
    
    // factory returns an object
    // you can run some code before

    var factory = {};

    factory.tzuReturnData = function(subscription_type){
        var deferred = $q.defer();
        var foo;
        var file = 'hotels.json';
        $http.get(file)
            .success(function(response)
                {
                    foo = response;
                    console.log(foo)
            deferred.resolve(foo);
                }
            );
        // setTimeout(function(){
        // }, 200)

        return deferred.promise;
    }

    return factory;
}]);

MvpmApp.service('FilterService', ['_', function(_) {
    // service is just a constructor function
    // that will be called with 'new'
    // a namespace for our private methods
    var private = {};
    // a static contain
    // var dataset;
    this.originalDataset = [];
    this.dataset = [];
    this.searchId = '';

    // this.appliedSort = [];

    this.init = function(dataset, searchId){
        this.originalDataset = dataset;
        
        this.dataset = {
        	data: this.originalDataset
        }
        this.searchId = searchId;

        return this.dataset;
    };

    this.changeSomething = function(callback){
    	var something = this.originalDataset;
    	something.splice(2, 10);
    	this.dataset.data = something;
    	console.log(callback)
    }


    private.callback = function(){
    	console.log('working')
    }
    // this.setFilters = function(type, field){
    //   if(type == 'minMax'){
    //     return private.setMinMax(field);
    //   }
    //   if(type == 'optionsArray'){
    //     return private.setOptionsArray(field);
    //   }
    //   if(type == 'numericalSelectArray'){
    //     return private.setNumericalSelectArray(field);
    //   }
    //   if(type == 'checkboxArray'){
    //     return private.setCheckboxArray(field);
    //   }
    // }
    

    // private.setMinMax = function(field){
    //   return {
    //     min: '100',
    //     max: '900'
    //   }
    // }
    // private.setOptionsArray = function(field){
    //   // this.originalDataset 
    //   return [
    //     '1','2','3','4','5'
    //   ]
    // }
    // private.setNumericalSelectArray = function(field, optionCount){
    //   // this.originalDataset 
    //   var value = 'min-total-over-option-count'; 
    //   var optionDivision = new Object; 
    //   // optionDivision['range-count'] = 100; 
    //   // optionDivision['range-auto'] = true; 
    //   value = 100; // optionCount
       
    //   return [
    //     {name:'< 1 km', value:"1"}, 
    //     {name:'< 5 km', value:"5"},
    //     {name:'< 10 km', value:"10"},
    //     {name:'< 25 km', value:"25"},
    //     {name:'> 25 km', value:"9999"}
    //   ]
    // }
    // private.setCheckboxArray = function(field, optionCount){
    //   let answer = _.chain(d).pluck('Location').uniq().value();
    //   // we make it shorter
    //   return [ answer[0], answer[1],answer[2] ];
    // }
    // private.setRange = function(){
    //   // _.range(5);
    //   // var scores = [84, 99, 91, 65, 87, 55, 72, 68, 95, 42], 
    //   // topScorers = [], scoreLimit = 90;
       
    //   // topScorers = _.select(scores, function(score){ return score > scoreLimit;});
       
    //   // console.log(topScorers);
            
    //   //       var array_of_functions = [
    //   //     first_function,
    //   //     second_function,
    //   //     third_function,
    //   //     forth_function
    //   // ]
    //   // and then when you want to execute a given function in the array:

    //   // array_of_functions[0]('a string');
    // }

    // this.sort = function(dataset, field, direction) {
    //   var dataset = dataset;
    //   var sortedDataset = _.sortBy(dataset, field)

    //   if(field = 'desc'){
    //       sortedDataset.reverse();
    //   }
    //   return sortedDataset;
    // };

    // this.filter = function(dataset, data){
    //   var type = data.type;
    //   // if(type == 'minMax'){
    //     // return private.filterMinMax(data.field);
    //   // }
    //   if(type == 'optionsArray'){
    //     return private.filterOptionsArray(dataset, data.field, data.value);
    //   }
    //   if(type == 'numericalSelectArray'){
    //     console.log('hi', dataset, data)
    //     return private.filterNumericalSelectArray(dataset, data.field, data.value);
    //   }
    // }

    // private.filterMinMax =function(){

    // }
    // private.filterOptionsArray =function(dataset, field, value){
    //   var ball = dataset;
    //   var filteredDataset = [];
    //   for (var i = ball.length - 1; i >= 0; i--) {
    //       if( ball[i]['Stars'] >= value ){
    //         filteredDataset.push(ball[i])
    //       }
    //   }
    //   return filteredDataset;
    // }
    // private.filterNumericalSelectArray =function(dataset, field, value){
    //   var ball = dataset;
    //   var filteredDataset = [];
    //   for (var i = ball.length - 1; i >= 0; i--) {
    //     if(ball[i]['Distance'] <= value){
    //       filteredDataset.push(ball[i])

    //     }
    //   }
    //   return filteredDataset;
    // }
    // this.search
    // this.exclude
    
    // this.subscribe = function(scope, callback) {
    // 	var t = function(){
    // 		console.log('subscribed')
    // 	}
    //     var handler = $rootScope.$on('notifying-service-event', t);
    //     // var handler = $rootScope.$on('notifying-service-event', callback);
    //     scope.$on('$destroy', handler);
    // }
    // this.notify = function(scope, callback) {
    //     $rootScope.$emit('notifying-service-event');
    // }

}]);

// angular.module('app').controller('TheCtrl', function($scope, NotifyingService) {
//     // ... stuff ...
//     NotifyingService.subscribe($scope, function somethingChanged() {
//         // Handle notification
//     });
// });

// angular.module('app').factory('NotifyingService', function($rootScope) {
//     return {
//         subscribe: function(scope, callback) {
//             var handler = $rootScope.$on('notifying-service-event', callback);
//             scope.$on('$destroy', handler);
//         },

//         notify: function() {
//             $rootScope.$emit('notifying-service-event');
//         }
//     };
// });
// location is drop down