// console.log('shared controllers go here');

var SystemCtrl = angular.module('SystemCtrl', []);
SystemCtrl.controller('SystemCtrl', ['$scope', '$stateParams', 
	// "ActionFactory",
	function($scope, $stateParams
		// , ActionFactory
	){

	// System online message
	this.debug = 'system online';

	// allows application wide access to {{system.image_path}}
	this.image_path = window.mvpmImagePath;
		
	// this.menuState = 'closed';

	// this.triggerMenu = function(state){
	// // show-nav
	// 	// console.log(this.menuState)
	// 	if(state == 'show-nav'){
	// 		this.menuState = 'closed'
	// 	}
	// 	if(state == 'closed'){
	// 		this.menuState = 'show-nav';
	// 	}
	// }
}]);