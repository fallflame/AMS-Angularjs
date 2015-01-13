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



