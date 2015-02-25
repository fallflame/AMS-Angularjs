angular.module("activitiesController", [])
.controller('activitiesController', ['$scope', '$http', function($scope, $http){

	var apiURL = 'http://168.235.147.241:8080/ams/api';
	var self = this;

	$http.get(apiURL+'/activity')
		.success(function(data){
			$scope.activities = data.content
			console.log(data.content);
		})
		.error(function(){
			window.alert('Load Activities failed');
		});


}])