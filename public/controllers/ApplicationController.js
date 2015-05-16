angular.module('AMS', ['ngRoute', 'autocomplete'])

.config(function ($routeProvider, $locationProvider) {	

	$routeProvider
		.when('/members', {
			templateUrl: 'partials/members.html',
			controller: 'MemberController'
		})

		.when('/members/new', {
			templateUrl: 'partials/member-details.html',
			controller: 'MemberController',
		})
		
		.when('/members/:id', { 
			templateUrl: 'partials/member-details.html',
			controller: 'MemberController',
		})

		.when('/activities', {
			templateUrl: 'partials/activities.html',
			controller: 'ActivityController'
		})

		.when('/activities/new', {
			templateUrl: 'partials/activity-details.html',
			controller: 'ActivityController',
		})

		.when('/activities/:id', {
			templateUrl: 'partials/activity-details.html',
			controller: 'ActivityController',
		})

		.otherwise({
			templateUrl: 'partials/not-found.html',
		});
})

.controller('ApplicationController', function($scope, $http){
	$scope.loginInfo={};

	$scope.login = function(){
		$http.post('/api/login', $scope.loginInfo)
		.success(function(user){
			$scope.user = user;
		})
	}

	$scope.logout = function(){
		$http.post('/api/logout')
		.success(function(user){
			delete $scope.user;
		})
	}
});









