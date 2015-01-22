angular.module("membersController", [])
.service('Members', ['$http', '$window', '$q', '$location', function($http, $window, $q, $location){

	var apiURL = 'http://168.235.147.241:8080/ams/api';
	var self = this;

	this.getMembers = function(){
		if (this.members) return $q.when(this.members);

		var deferred = $q.defer();

		$http.get(apiURL+'/member')
			.success(function(data){
				self.members = data.content;
				deferred.resolve(self.members);
			})
			.error(function(){
				self.members = 
					[
						{
							memberId: 501,
							memberTypeId: 1,
							firstName: 'John',
							lastName: 'Doe',
							email: 'john.doe@gmail.com',
							nickName: 'John',
							address: '100 av. Five',
							phone: '514-000-0000',
							sex: 'Male',
							description: 'This is John'
						},

						{
							memberId: 502,
							memberTypeId: 3,
							firstName: 'Steven',
							lastName: 'Haper',
							email: 'steven.haper@gmail.com',
							nickName: 'steve',
							address: '100 av. Six',
							phone: '514-000-1234',
							sex: 'Male',
							description: 'This is Steve'
						},

						{
							memberId: 503,
							memberTypeId: 1,
							firstName: 'Philippe',
							lastName: 'Couillard',
							email: 'philippe.couillard@hotmail.com',
							nickName: 'phi',
							address: '800 av. Seven',
							phone: '514-000-8888',
							sex: 'Female',
							description: 'This is phi'
						},
					];
				deferred.resolve(self.members);		
			});

		return deferred.promise;
	};

	this.createMember = function(newMember){
		$http.post(apiURL+'/member', newMember).
			success(function(){
				$window.alert('Save New Member Successed');
				$location.path('/members');
			}).
			error(function(){
				$window.alert('Save New Member failed');
			});
	};

	this.updateMember = function(memberId, modifiedMember){
		$http.put(apiURL+ '/member/' + memberId).
			success(function(){
					$window.alert('Update Member Successed');
					$location.path('/members');
				}).
				error(function(){
					$window.alert('Update Member failed');
				});
	};

	this.deleteMember = function(memberId){
		if($window.confirm('Are you sure to DELETE?')){
			$http.delete(apiURL+ '/member/' + memberId).
				success(function(){
					$window.alert('Delete Member Successed');
					$location.path('/members');
				}).
				error(function(){
					$window.alert('Delete Member failed');
				});
		}
	};

}])

.controller('membersController', ['$scope', 'Members', function($scope, Members) {
	
	$scope.detailsView = false;
	Members.getMembers().then(function(members){
		$scope.members = members;
	})

}])

.controller('memberDetailsController', ['$scope', '$routeParams', 'Members', function($scope, $routeParams, Members){
	
	$scope.detailsView = 'read';
	$scope.members = Members.members;

	Members.members.forEach(function(member){
		if(member.memberId == $routeParams.id){
			$scope.member = member;
		}
	});

	$scope.deleteMember = function(){
		Members.deleteMember($scope.member.memberId);
	};

}])

.controller('memberCreationController', ['$scope', 'Members', function($scope, Members){
	
	$scope.detailsView = 'create';
	$scope.members = Members.members;

	//Default value
	$scope.member = {
		sex : 'Male',
		memberTypeId: '1'
	}

	$scope.createMember = function(){
		Members.createMember($scope.member);
	};

}])

.controller('memberEditController', ['$scope', '$routeParams','Members', function($scope, $routeParams, Members){

	$scope.detailsView = 'edit';
	$scope.members = Members.members;
	Members.members.forEach(function(member){
		if(member.memberId == $routeParams.id){
			$scope.member = member;
		}
	});

	$scope.updateMember = function(){
		Members.updateMember($routeParams.id, $scope.member)
	};

}])

