angular.module('AMS', ['ngRoute'])

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

.controller('MemberController', function($location, $scope, $http, $routeParams) {
	
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
			})
		}
	}

	$scope.loadMemberAttendances = function(){
		if ($routeParams.id) {
			$http.get('/api/members/' + $routeParams.id + '/attendances')
			.success(function(attendances){
				$scope.member.attendances = attendances;
			})
		}
	}

	$scope.loadMemberSkills = function(){
		if ($routeParams.id) {
			$http.get('/api/members/' + $routeParams.id + '/skills')
			.success(function(skills){
				$scope.member.skills = skills;
			})
		}
	}

	$scope.addNewSkill = function(){
		if ($scope.member.member_id){
			$http.post('/api/members/' + $scope.member.member_id+ '/skills', $scope.newSkill)
			.success(function(id){
				$scope.newSkill.id = id;
				$scope.member.skills.push($scope.newSkill);
				$scope.newSkill = {};
			})
		}
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
			alert("error, modification not saved");
		})
	}
})

.controller('ActivityController', function($location, $http, $scope, $routeParams){
	
	$scope.loadActivities = function(){
		$http.get('/api/activities')
		.success(function(activities){
			$scope.activities = activities;
		})
	}

	$scope.editActivity = function(activityId){
		$location.path("/activities/" + activityId);
	}

	$scope.loadActivity = function(){
		if ($routeParams.id) {
			$http.get('/api/activities/' + $routeParams.id)
			.success(function(activity){
				activity.timestart = new Date(activity.timestart);
				activity.timeend = new Date(activity.timeend);
				$scope.activity = activity;
			})
		}
	}

	$scope.loadSessions = function(){
		if ($routeParams.id) {
			$http.get('/api/activities/' + $routeParams.id + '/sessions')
			.success(function(sessions){
				$scope.activity.sessions = sessions;
			})
		}
	}

	$scope.addNewSession = function(){
		if (!$scope.activity.sessions){
			$scope.activity.sessions = [];
		}
		if ($scope.activity.activity_id){
			$http.post('/api/activities/' + $scope.activity.activity_id + '/sessions', $scope.newSession)
			.success(function(id){
				$scope.newSession.session_id = id;
				$scope.activity.sessions.push($scope.newSession);
				$scope.newSession = {};
			})
		}
	}

	$scope.deleteSession = function(session){
		$http.delete('/api/activities/' + $routeParams.id + '/sessions/' + session.session_id)
		.success(function(){
			var index = $scope.activity.sessions.indexOf(session);
			$scope.activity.sessions.splice(index, 1);
		})
	}

	$scope.saveActivity = function(){
		$http.post('/api/activities', $scope.activity)
		.success(function(insertId){
			if (insertId != 0){
				alert("activity saved.");
				$scope.activity.activity_id = insertId;
			}
		})
		.error(function(err){
			alert("error, modification not saved");
		})
	}

	$scope.deleteActivity = function(){
		if (confirm("are you sure?")){
			if ($scope.activity.activity_id) {
				$http.delete('/api/activities/' + $scope.activity.activity_id)
				.success(function(){
					delete $scope.activity;
				})
			} else {
				delete $scope.activity;
			}
		}
	}

	$scope.loadMembers = function(){
		$http.get('/api/members')
		.success(function(members){
			$scope.members = members;
			if ($routeParams.id) {
				$http.get('/api/activities/' + $routeParams.id + '/attendance')
				.success(function(activityMembers){
					console.log(activityMembers.length);

					if (!$scope.activity.members) {$scope.activity.members=[]}
					$scope.members.forEach(function(member){
						if (activityMembers.indexOf(member.member_id) > -1){
							member.isChoosen = true;
							$scope.activity.members.push(member);
						}
					})

				})
			}
		})
	}

	$scope.choosePresenter = function(){
		$('#myModal').modal('show')
		$scope.chooseMember = function(member){
			$scope.newSession.presenter = member.member_id;
			$scope.newSession.presenter_name = member.last_name + " " + member.first_name;
			$('#myModal').modal('hide');
		}
	}

	$scope.editAttendance = function(){
		$('#myModal').modal('show')
		$scope.chooseMember = function(member){
			if (!$scope.activity.members){
				$scope.activity.members = [];
			}
			if (member.isChoosen){
				member.isChoosen = false;
				var i = $scope.activity.members.indexOf(member);
				$scope.activity.members.splice(i, 1);
			} else {
				member.isChoosen = true;
				$scope.activity.members.push(member);
			}
		}
	}

	$scope.saveAttendance = function(){
		$http.post('/api/activities/' + $scope.activity.activity_id + '/attendance', $scope.activity.members)
		.success(function(){
			$('#myModal').modal('hide');
		})
		.error(function(){
			alert("action failed");
		})
	}
})







