angular.module('AMS', ['ngRoute', 'membersController'])

.config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode({
	         enabled: true,
	         requireBase: false
	});

	$routeProvider
		.when('/members', {
			templateUrl: 'partials/members.html',
			controller: 'membersController'
		})
		.when('/members/new', {
			templateUrl: 'partials/members.html',
			controller: 'memberCreationController'
		})
		.when('/members/:id', { 
			templateUrl: 'partials/members.html',
			controller: 'memberDetailsController'
		})
		.when('/members/:id/edit', {
			templateUrl: 'partials/members.html',
			controller: 'memberEditController'
		})

		.otherwise({
			templateUrl: 'partials/notFound.html',
		});

}])

.controller('mainCtrl', ['$scope', function ($scope) {
	$scope.title = 'AMS';
}]);



