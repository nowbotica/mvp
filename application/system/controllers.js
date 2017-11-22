console.log('shared controllers go here');

var SystemCtrl = angular.module('SystemCtrl', []);
SystemCtrl.controller('SystemCtrl', ['$scope', '$stateParams', 
	// "ActionFactory",
	function($scope, $stateParams
		// , ActionFactory
	){
	$scope.debug = 'system';

	$scope.go = function(destination){
		console.log('goingTo', destination);
		$stateProvider.state(destination, {});
	}

	this.image_path = window.TzuImagePath;
	
	this.menuState = 'closed';

	this.triggerMenu = function(state){
	// show-nav
		// console.log(this.menuState)
		if(state == 'show-nav'){
			this.menuState = 'closed'
		}
		if(state == 'closed'){
			this.menuState = 'show-nav';
		}
	}
}]);