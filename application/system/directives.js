
// Console.log('shared directives go here');

MvpmApp.directive('systemLoader', function() {
    return {
        restrict: 'AE',
        replace: true,
        // templateUrl: 'application/system/loader/loader.html',
        template: '<article ng-hide="!isRouteLoading" class="row loader-wrap"><div class="loader">Loading...</div></article>'
    };
});

MvpmApp.directive('imageLock', ['ActionFactory', function(ActionFactory){
    return {
        // restrict: 'AE',
        // controller: 'LockImageCtrl',
        replace: true,
        // template: '<h1>application/system/loader/loader.html</h1>'
        templateUrl: mvpmPartialsPath+'/directives/image-lock.html',
        scope: {
      message: '='
    },
    link: function(scope) {
      
      scope.updateVal = function(updatedVal) {
        scope.message = updatedVal;
      }
      scope.message = window.mvpmImagePath+'default.png';
      
      scope.lockImage = function(file, ref){
          scope.img_url = window.mvpmImagePath+'loading-gears.gif';
          console.log(file)
          var ref = ref;
          var file = file;
          ActionFactory.UploadFile({file: file, 'username': 'scope.username'}).then(function(){
                scope.message = resp.data.file_url
                // CoreReactorChannel.elevatedCoreTemperature(data);

          })
          
          //       url: window.mvpmSystemApiUrl,
          //       params: {
          //       action:   "mvpm_upload_file",
          //       security: window.mvpmSystemSecurity
          // },
          //     file: file,
          //       data: {file: file, 'username': 'scope.username'}
          //   }).then(function (resp) {


                
          //   }, function (resp) {
          //       console.log('Error status: ' + resp.status);
          //   }, function (evt) {
          //       var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          //       console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          //   });
        }
      },
    };
}]);

MvpmApp.directive('inputRating', function() {
    return {
        templateUrl: mvpmPartialsPath+'/directives/input-rating.html',
        scope: {
      		rated: '='
    	},
        controller: function($scope){
		  // hard coded for brevity, we tell our app that max rating is 5
		  $scope.lives = [1,2,3,4,5];
		  $scope.howSmokey = $scope.rated;

		  // smokeHere(smokes) {
		    // this.howSmokey = smokes;//this.currentLife;

		    // console.log('typs', this.howSmokey);
		  // }
        }
    };
});

MvpmApp.directive('filterLocation', function() {
    return {
        templateUrl: mvpmPartialsPath+'/directives/filter-location.html',
        scope: {
          filter: '&' // this binds a named function 
        },
        controller: function($scope){
          $scope.choices = [
            {name:'London',value:'London'},
            {name:'Seoul',value:'Seoul'},
            {name:'Buchurest',value:'Buchurest'}
          ];
          // The function as named in directive template
          $scope.applyFilter = function(location) {
            // triggering the function passed to toggle="scopeFn(args)" 
            // when setting up the directive 
            $scope.filter({
                organon: {
                  callback: 'filterLocation', 
                  args: {location:location}
                }
            });
          };
        }
    };
});

MvpmApp.directive('filterDuration', function() {
    return {
        templateUrl: mvpmPartialsPath+'/directives/filter-duration.html',
        scope: {
          rated: '='
    	},
      controller: function($scope){
			  $scope.durations = [
			  	{name:'20 mins',value:'20 mins'},
			  	{name:'45 mins',value:'45 mins'},
			  	{name:'70 mins',value:'70 mins'},
			  	{name:'120 mins',value:'120 mins'}
			  ];
        }
    };
});

MvpmApp.directive('filterCost', function() {
    return {
        templateUrl: mvpmPartialsPath+'/directives/filter-cost.html',
        scope: {
      		rated: '='
    	},
        controller: function($scope){
			$scope.config = {
				min: 2,
				max: 8,
				step: 2
			}
        }
    };
});

MvpmApp.directive('inputStar', function() {
    return {
        templateUrl: mvpmPartialsPath+'/directives/input-star.html',
        scope: {
      		rated: '='
    	},
        controller: function($scope){
        	var boolgen = Math.round(Math.random());
        	// if (boolgen == 1)
		  	$scope.starRed = boolgen;

		  // starThis() {
		  //   this.starRed = !this.starRed;

		  //   console.log('typs', this.starRed);
		  // }


		  // selectionChange(input: HTMLInputElement) {
		  //   input.checked === true ? this.callApi(true) : this.callApi(false);
		  // }

		  // callApi(value){
		  //   console.log('calling api', value)
		  // }
        }
    };
});


//     trigger('smoke', [
//       transition('*=>*', [
//         query(':enter', style({ opacity: 0, zoom:.05 }), {optional: true}),

//         query(':enter', stagger('300ms', [
//           animate('.6s ease-in', keyframes([
//             style({opacity: 0, zoom: .6,  offset: 0}),
//             style({opacity: .5, zoom: 1.3, offset: .3}),
//             style({opacity: 1, zoom: 1,  offset: 1}),
//           ]))
//         ]), {optional: true})
//         ,
//         query(':leave', stagger('300ms', [
//           animate('.6s ease-out', keyframes([
//             style({opacity: 1, zoom:1, offset: 0}),
//             style({opacity: .5, zoom:1.3,  offset: 0}),
//             style({opacity: 0, zoom:.6, offset: 0}),

// function RatingCtrl(){
// }

  // animations: [
  //   trigger('shine', [
  //     transition('*=>*', [
  //       query(':enter', style({ opacity: 0, zoom:.05 }), {optional: true}),

  //       query(':enter', stagger('300ms', [
  //         animate('.6s ease-in', keyframes([
  //           style({opacity: 0, zoom: .6,  offset: 0}),
  //           style({opacity: .5, zoom: 1.3, offset: .3}),
  //           style({opacity: 1, zoom: 1,  offset: 1}),
  //         ]))
  //       ]), {optional: true})
  //       ,
  //       query(':leave', stagger('300ms', [
  //         animate('.6s ease-out', keyframes([
  //           style({opacity: 1, zoom:1, offset: 0}),
  //           style({opacity: .5, zoom:1.3,  offset: 0}),
  //           style({opacity: 0, zoom:.6, offset: 0}),
  //         ]))
  //       ]), {optional: true})
  //     ])
  //   ])
  // ]