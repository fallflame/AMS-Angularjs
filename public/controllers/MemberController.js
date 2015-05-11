angular.module('AMS')

.controller('MemberController', function($location, $scope, $http, $routeParams) {

	$scope.member = {};
	
	$scope.loadMembers = function(){
		$http.get('/api/members')
		.success(function(members){
			$scope.members = members;
		})
	}

	$scope.editMember = function(memberId){
		$location.path("/members/" + memberId);
	}

	$scope.loadMember = function(){
		if ($routeParams.id) {
			$http.get('/api/members/' + $routeParams.id)
			.success(function(member){
				member.is_active = !!member.is_active
				$scope.member = member;

				$http.get('/api/members/' + $routeParams.id + '/skills')
				.success(function(skills){
					$scope.member.skills = skills;
				})

				$http.get('/api/members/' + $routeParams.id + '/attendances')
				.success(function(attendances){
					$scope.member.attendances = attendances;
				})
			})
		}
	}

	$scope.addNewSkill = function(){
		$http.post('/api/members/' + $scope.member.member_id+ '/skills', $scope.newSkill)
		.success(function(id){
			$scope.newSkill.id = id;
			$scope.member.skills.push($scope.newSkill);
			$scope.newSkill = {};
		})
		.error(function(){
			alert("Action Failed");
		})
	}

	$scope.deleteSkill = function(skill){
		$http.delete('/api/members/' + $routeParams.id + '/skills/' + skill.id)
		.success(function(){
			var index = $scope.member.skills.indexOf(skill);
			$scope.member.skills.splice(index, 1);
		})
	}

	$scope.saveMember = function(){
		$http.post('/api/members', $scope.member)
		.success(function(insertId){
			if (insertId != 0){
				alert("member saved.");
				$scope.member.member_id = insertId;
			}
		})
		.error(function(err){
			alert("Action Failed");
		})
	}

	$scope.deleteMember = function(){
		if(confirm("Are you sure?")){
			$http.delete('/api/members/' +  $routeParams.id)
			.success(function(){
				alert("Action Success");
				$location.path("/members/");
			})
			.error(function(){
				alert("Action Failed");
			})
		} 
	}
})