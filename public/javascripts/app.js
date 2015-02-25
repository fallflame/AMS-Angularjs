angular.module('AMS', ['ngRoute', 'membersController', 'activitiesController'])

.config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode({
	         enabled: true
	});

	$routeProvider
		.when('/members', {
			templateUrl: 'partials/members.html',
			controller: 'membersController'
		})

		.when('/members/new', {
			templateUrl: 'partials/memberDetails.html',
			controller: 'memberDetailsController',
			resolve: {
				mode : function(){return "create";}
			}
		})
		
		.when('/members/:id', { 
			templateUrl: 'partials/memberDetails.html',
			controller: 'memberDetailsController',
			resolve: {
				mode : function(){return "read";}
			}
		})

		.when('/members/:id/edit', {
			templateUrl: 'partials/memberDetails.html',
			controller: 'memberDetailsController',
			resolve: {
				mode : function(){return "edit";}
			}
		})

		.when('/activities', {
			templateUrl: 'partials/activities.html',
			controller: 'activitiesController'
		})

		.when('/activities/new', {
			templateUrl: 'partials/activityDetails.html',
			controller: 'activityDetailsController',
			resolve: {
				mode : function(){return "create";}
			}
		})

		.otherwise({
			templateUrl: 'partials/notFound.html',
		});

}])

.controller('mainCtrl', ['$scope', function ($scope) {
	$scope.title = 'AMS';
}]);



