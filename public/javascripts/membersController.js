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
				window.alert('Load Members failed');	
			});

		return deferred.promise;
	};

	this.createMember = function(newMember){

		var date = new Date(); 
		newMember.effDate = date.getFullYear() + '-' + 
							date.getMonth() + '-' + 
							date.getDay() + ' ' + 
							date.getHours() + ':' + 
							date.getMinutes();

		$http.post(apiURL+'/member', newMember).
			success(function(){
				$window.alert('Save New Member Successed');
				//$location.path('/members');
			}).
			error(function(){
				$window.alert('Save New Member failed');
			});
	};

	this.updateMember = function(Id, modifiedMember){

		$http.put(apiURL+ '/member/' + Id, modifiedMember).
			success(function(){
					$window.alert('Update Member Successed');
					$location.path('/members');
				}).
			error(function(){
					$window.alert('Update Member failed');
				});
	};

	this.deleteMember = function(Id){
		if($window.confirm('Are you sure to DELETE?')){
			$http.delete(apiURL+ '/member/' + Id).
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
		if(member.Id == $routeParams.id){
			$scope.member = member;
		}
	});

	// the memberId need to be changed to Id when the server bug fixed -- Yan XU
	$scope.deleteMember = function(){
		Members.deleteMember($scope.member.memberId);
	};

}])

.controller('memberCreationController', ['$scope', 'Members', function($scope, Members){
	
	$scope.detailsView = 'create';
	$scope.members = Members.members;

	//Default value
	$scope.member = {
		sex : 'm',
		memberTypeId: '1',
		effStatus: "A"
	}

	$scope.createMember = function(){

		Members.createMember($scope.member);
	};

}])

.controller('memberEditController', ['$scope', '$routeParams','Members', function($scope, $routeParams, Members){

	$scope.detailsView = 'edit';
	$scope.members = Members.members;
	Members.members.forEach(function(member){
		if(member.Id == $routeParams.id){
			$scope.member = member;
		}
	});

	var oldRecord = {
		memberTypeId: $scope.member.memberTypeId,
		effStatus: $scope.member.effStatus
	}

	$scope.updateMember = function(){

		if($scope.member.memberTypeId !== oldRecord.memberTypeId 
			|| $scope.member.effStatus !== oldRecord.effStatus) {

			delete $scope.member.Id;
			Members.createMember($scope.member);

		} else {
			Members.updateMember($routeParams.id, $scope.member);
		}
	};

}])

