angular.module('AMS', ['ngRoute', 'membersController'])

.config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/members.html',
			controller: 'membersController'
		})

		.when('/members', {
			templateUrl: 'partials/members.html',
			controller: 'membersController'
		})
		.when('/members/new', { // view the detail or create a member, when :id == 'new'
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

         $locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          });
}])

.controller('mainCtrl', ['$scope', function ($scope) {
	$scope.title = 'AMS';
}]);



