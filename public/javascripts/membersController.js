/**
	API
	
	apiURL = 'http://168.235.147.241:8080/ams/api';

	GET /member
		return {content : {memberList}}

	GET /member/:id    -  id must be id not memberId
		return {memberDetail}

*/
angular.module("membersController", [])
.service('Members', ['$http', '$window', '$q', '$location', function($http, $window, $q, $location){

	var apiURL = 'http://168.235.147.241:8080/ams/api';
	var self = this;

	/**
	/* param : callback - function(err, data)
	*/
	this.getMembers = function(callback){
		$http.get(apiURL+'/member')
			.success(function(data){
				callback.call(null, null, data.content);
			})
			.error(function(){
				window.alert('Load Members failed');	
			});
	};

	/**
	* param : id - memberId
	* param : callback - function(err, data)
	*/ 
	this.getMemberById = function(id, callback){

		$http.get(apiURL+'/member/'+id)
			.success(function(data){
				callback.call(null, null, data);
			})
			.error(function(){
				window.alert('Load MemberById failed');	
			});

	}

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
	
	Members.getMembers(function(err, data){
		if(!err){
			$scope.members = data;
		}
	})

}])

.controller('memberDetailsController', ['$scope', '$routeParams', 'Members', 'mode', function($scope, $routeParams, Members, mode){
	
	$scope.mode = mode;
	console.log(mode);

	if (mode === "read" || mode === "edit") {
		Members.getMemberById($routeParams.id, function(err, data){
			if(!err){
				$scope.member = data;
			}
		})
	} else if (mode === "create") {
		$scope.member = {
			sex : 'm',
			memberTypeId : '1',
			effStatus : "A",
			skills : [],
			interests : []
		}
	}

	$scope.createMember = function(){
		Members.createMember($scope.member);
	};

	$scope.addNewSkill = function(){
		$scope.member.skills.push($scope.newSkill);
		$scope.newSkill = {};
	}

	$scope.addNewInterest = function(){
		$scope.member.interests.push($scope.newInterest);
		$scope.newInterest = {};
	}

	// the memberId need to be changed to Id when the server bug fixed -- Yan XU
	$scope.deleteMember = function(){
		Members.deleteMember($scope.member.memberId);
	};

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

