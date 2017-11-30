var SkillsCtrl = angular.module('SkillsCtrl', []);

SkillsCtrl.controller('SkillsCtrl', ['$scope','$stateParams', function($scope,$stateParams) {
	$scope.username = $stateParams.username;
	$scope.skills = [
	  	{ 
	  		'text'  :'sewing',
	  	    'size':3
	  	},
	  	{ 
	  		'text'  : 'pattern design',
	  	    'size':5
	  	},
	  	{ 
	  		'text' : 'machine sewing',
	  	    'size'  :8
	  	},
	  	{ 
	  		'text' : 'cutting',
	  	    'size'  : 1
	  	}
	];

}]);

// CloudCtrl = angular.module('CloudCtrl', []);

MvpmApp.controller('CloudCtrl', function($scope, _
	// ,UserFactory
	,CloudFactory
	){
	// $scope.keepArray = false; //{skill:'',value:'0'}
	$scope.debug = 'CloudCtrl';


	// if word inArray is truthy push array to array

	// $scope.activeFilters = [];

	$scope.users = [];
	$scope.activeUsers = []
	$scope.skills = [];
	$scope.filters = [];
	// test 1
	$scope.init = function(){
		CloudFactory.users().then(function(data){
			$scope.users = data.val(); // cache users object
			console.log('--------------users', data.val());
			$scope.gatherSkills(data.val());
		});
	};
	$scope.init();

	// returns array of skill object values
	$scope.gatherSkills = function(users){
		console.log(users)
		// if($scope.filters.length < 0){
		// 	console.log('filterUsers()');
		// } 
		console.log('called');
		$scope.skills = [];
		var gather = function(user){
			var skills = _.map(user.skills, function(value,key){
                return value
            })

            console.log(skills);
			_.each(skills, function(input){
				$scope.countSkills(input.name);
			});
			// console.log($scope.skills);
		}
		_.each(users, gather);
	};

	// Checks to see if the skill exists
	// if false adds the skill to the array
	// if true increments the counter for the skill
	$scope.countSkills = function(input){ 
		var existingSkill = _.contains(_.pluck($scope.skills, 'text'), input);
		var filteredSkill = _.contains($scope.filters, input);

		if(!existingSkill && !filteredSkill){ // 
			var thing = {
				text: input, 
				weight: 1, 
				link: { href: "#", title: input}
			}

			$scope.skills.push(thing);
		}
		else if(!filteredSkill){ // really inefficient i think 
			_.select($scope.skills, function(obj){

			    if (obj.text === input){
			    	obj.weight = ++obj.weight;
			    }; 
					    
			});

		}
	};

	$scope.addFilter = function(filter){
		$scope.filters.push(filter); 
		// console.log('1',$scope.filters);
		$scope.filterUsers($scope.filters);
	}
	$scope.removeFilter = function(filter){
		$scope.filters = _.without($scope.filters, filter);
		// console.log($scope.filters)
		$scope.filterUsers($scope.filters);
		
	}
	$scope.filterUsers = function(filters){
		var users = $scope.users ;
		var result = [];
		
		var numberOfFilters = filters.length;
		// console.log('numberOfFilters',numberOfFilters)
		
		// iterate over user
		_.each(users, function(user){
			// console.log('---------------', user, '------------------')
			var hasSkill = 0; // set skills to zero
			// iterate over skills array	
			_.each(user.skills, function(skill){
				// console.log('4',skill.name)
				// if(_.contains(filters, skill.name)){
				if(_.contains(filters, skill.name)){
					hasSkill = ++hasSkill
					// console.log('true', hasSkill);
				}
			});
			if(hasSkill === numberOfFilters){
					result.push(user)
			}
		})
		$scope.activeUsers = result;
		// console.log('6', $scope.activeUsers)
		$scope.gatherSkills(result);
	}

  
});


// CloudDirective = angular.module('CloudDirective', []);

MvpmApp.directive( 'cloud', function() {
    return {
      	restrict: 'AE',
     	replace: true,
      	template: '<button class="tc tc-{{value}}" ng-click="addFilter(skill)">{{skill}}</button>',
      	scope: {
       		skill: '@skill',
       		value: '@value',
      	},
      	controller:'CloudCtrl',
      	link: function(scope, elem, attrs) {
      		
      		var skill = scope.skill;
      		console.log(skill)
      		var value = scope.value;
      		console.log(value);
      	},
    }
});
// CloudDirective.directive( 'cloud', function() {
//     return {
//       	restrict: 'AE',
//      	replace: true,
//       	template: '<div id="example" style="width: 550px; height: 350px;">{{skills}}</div>',
//       	// scope: {
//        // 		skill: '@skill',
//        // 		value: '@value',
//       	// },
//       	controller:'CloudCtrl',
//       	compile: function(tElem, tAttrs){
//       		console.log(tElem, tAttrs)
      		
//       	},
//       	link: function(scope, elem, attrs) {
//       		// $(element).jQCloud(scope.skills);
//       		console.log(scope.skills);
//       		// $(elem).jQCloud(scope.skills);
//       	// 	var skills = attrs.skills;
//       	// 	console.log(skill)
//       	// 	var value = scope.value;
//       	// 	console.log(value);
//       	},
//     }
// });

// SystemApp.filter('makeLowercase', function(){
// 	return function (item) {
// 		return item.toLowerCase();
// 	};
// });


	/*! A splice of !!!!!
 * Angular jQCloud
 * For jQCloud 2 (https://github.com/mistic100/jQCloud) 
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */ /* !!! and !!! */
 /** Angular Word Cloud
 * Author: Derek Gould
 * Date: 8/29/13
 * Time: 5:34 PM
 */



// CloudDirective.directive('cloud', ['$parse', function($parse) {
//   // get existing options
//   var defaults = jQuery.fn.jQCloud.defaults.get(),
//       jqcOptions = [];
  
//   for (var opt in defaults) {
//     if (defaults.hasOwnProperty(opt)) {
//       jqcOptions.push(opt);
//     }
//   }
  
//   return {
//     restrict: 'E',
//     template: '<div class="junm">test</div>',
//     replace: true,
//     scope: {
//       words: '=words'
//     },
//     link: function($scope, $elem, $attr) {
//       var options = {};
//       console.log($scope.words);
//       console.log();
//       console.log($elem);
      
//       for (var i=0, l=jqcOptions.length; i<l; i++) {
//         var opt = jqcOptions[i];
//         if ($attr[opt] !== undefined) {
//           options[opt] = $parse($attr[opt])();
//         }
//       }
      
//       $elem.jQCloud($scope.words);
      
//       $scope.$watchCollection('words', function() {
//         $scope.$evalAsync(function() {
//           var words = [];
//           $.extend(words,$scope.words);
//           $elem.jQCloud('update', words);
//         });
//       });
    
//       $elem.bind('$destroy', function() {
//         $elem.jQCloud('destroy');
//       });
//     }
//   };
// }]);


/**
 * Author: Derek Gould
 * Date: 7/17/13
 * Time: 10:05 AM
 */

// CloudDirective.directive('cloud', ['$interpolate', function($interpolate) {
// 		return {
// 			restrict: 'EA',
// 			replace: true,
// 			transclude: true,
// 			scope: {
// 				words: '=',
// 				sort: '@'
// 			},
// 			template:
// 				"<div class='word-cloud-group'>" +
// 					"<span class='word-cloud-group-item' ng-repeat='word in mywords | orderBy:param:reverse' ng-transclude>{{word}}</span>" +
// 				"</div>",
// 			controller: ['$scope', '$transclude', function($scope, $transclude) {

// 				// set up the click function
// 				$scope.initClick = function(clickFn) {
// 					$transclude(function(clone,scope) {
// 						// pull the click function from the transcluded scope
// 						$scope.clickFn = scope[clickFn];
// 					});
// 				};
// 			}],
// 			compile: function(elem, attr) {

// 				// extract the type of cloud
// 				var type = angular.isUndefined(attr.type) ? 'list' : attr.type;
// 				switch(type) {
// 					case 'cloud':
// 						elem.children().eq(0).attr('style',"font-size: "+$interpolate.startSymbol()+" fontSize(word.size) "+$interpolate.endSymbol()+";");
// 						break;
// 					case 'list':
// 						break;
// 				}

// 				return function(scope, elem, attr) {

// 					// initialize the click function to nothing
// 					scope.clickFn = function() {};
// 					if(!angular.isUndefined(attr.ngClick)) {
// 						// initialize the click function to whatever we've been given
// 						scope.initClick(attr.ngClick);
// 					}

// 					// normalize the word array
// 					var convertWords = function() {
// 						var words = angular.copy(scope.words);

// 						if(angular.isArray(words) && words.length > 0) {
// 							if(!angular.isObject(words[0])) {
// 								words = words.map(function(e) { return { word: e, size: 1 }});
// 							} else if(angular.isUndefined(words[0].word) || angular.isUndefined(words[0].size)) {
// 								words = [];
// 							}
// 						} else {
// 							words = [];
// 						}

// 						words = words.map(function(e) { return {word: e.word, size: e.size, rawSize: parseFloat(e.size) }; });

// 						scope.mywords = words;
// 					};

// 					scope.fontSize = function(size) {
// 						if((''+size).search("(px|em|in|cm|mm|ex|pt|pc|%)+") == -1) {
// 							return size+'em';
// 						}
// 						return size;
// 					};

// 					scope.$watch('words',function() {
// 						convertWords();
// 					},true);

// 					scope.$watch('sort',function(newVal) {
// 						if(!newVal) { newVal = 'no' }
// 						scope.param = newVal.substr(0,5) == 'alpha' ? 'word' : (newVal == 'no' ? '' : 'rawSize');
// 						scope.reverse = newVal.substr(-4).toLowerCase() == 'desc';
// 					});

// 				}
// 			}
// 		};
// 	}]);


Mvpm.factory("CloudFactory", function($rootScope, $q, $http, $firebase) {

  var factory = {};
  var helper = {};
  var firebase_url = 'https://brilliant-fire-7870.firebaseio.com/';

  factory.users = function () {
		// var endpoint = new Firebase(firebase_url + '/users');
		// var deferred = $q.defer();
		// endpoint.once('value', function(snapshot){
		// 	deferred.resolve(snapshot);
		// });
				var users = [

			{	"username": "franz-kafka",
				"skills": [
				{"name":"polite"},
				{"name":"javascript"},
				{"name":"insurance broker"},
				{"name":"design"}
				]
			},
			{	"username":"me",
				"skills": [
				{"name":"hardworking"},
				{"name":"sewing"},
				{"name":"javascript"},
				{"name":"information architecture"}
				]
			},
			{
				"username": "another-user",
				"skills": [
				{"name":"hardworking"},
				{"name":"design"},
				{"name":"italian"},
				{"name":"javascript"},
				]
			},
			{
				"username": "more-data",
				"skills": [
				{"name":"hardworking"},
				{"name":"design"},
				]
			},
			{
				"username": "even-more",
				"skills": [
				{"name":"javascript"},
				{"name":"design"},
				{"name":"polite"}
				]
			}
		];
		deferred.resolve(users);
		return deferred.promise;
  };

  return factory;

});

// SystemApp.factory('UserFactory', function($q) {
// 	var debug = 'users factory';
// 	var factory = {};

// 	factory.fetchUsers = function(){
// 		var deferred = $q.defer();
// 		var users = [

// 			{	"username": "franz-kafka",
// 				"skills": [
// 				{"name":"polite"},
// 				{"name":"javascript"},
// 				{"name":"insurance broker"},
// 				{"name":"design"}
// 				]
// 			},
// 			{	"username":"me",
// 				"skills": [
// 				{"name":"hardworking"},
// 				{"name":"sewing"},
// 				{"name":"javascript"},
// 				{"name":"information architecture"}
// 				]
// 			},
// 			{
// 				"username": "another-user",
// 				"skills": [
// 				{"name":"hardworking"},
// 				{"name":"design"},
// 				{"name":"italian"},
// 				{"name":"javascript"},
// 				]
// 			},
// 			{
// 				"username": "more-data",
// 				"skills": [
// 				{"name":"hardworking"},
// 				{"name":"design"},
// 				]
// 			},
// 			{
// 				"username": "even-more",
// 				"skills": [
// 				{"name":"javascript"},
// 				{"name":"design"},
// 				{"name":"polite"}
// 				]
// 			}
// 		];
// 		deferred.resolve(users);
// 		return deferred.promise;
// 	};
// 	return factory
// }); 
