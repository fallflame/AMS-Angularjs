angular.module('AMS')

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

				$http.get('/api/activities/' + $routeParams.id + '/sessions')
				.success(function(sessions){
					$scope.activity.sessions = sessions;
				})

				loadAttendance();
			})
		}
	}

	$scope.addNewSession = function(){
		if (!$scope.activity.sessions){
			$scope.activity.sessions = [];
		}
		if ($scope.activity.activity_id){
			var index = $scope.memberNames.indexOf($scope.presenterName);
			
			if (index != -1 ){
				member = $scope.members[index]
				$scope.newSession.presenter = member.member_id;
				$scope.newSession.presenter_last_name = member.last_name;
				$scope.newSession.presenter_first_name = member.first_name;
				$http.post('/api/activities/' + $scope.activity.activity_id + '/sessions', $scope.newSession)
				.success(function(id){
					$scope.newSession.session_id = id;
					$scope.activity.sessions.push($scope.newSession);
					$scope.newSession = {};
				})
			}
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
		console.log("a");
		$http.post('/api/activities', $scope.activity)
		.success(function(insertId){
			if (insertId != 0){
				alert("Action Success");
				$scope.activity.activity_id = insertId;
			}
		})
		.error(function(err){
			alert("Action Failed");
		})
	}

	$scope.deleteActivity = function(){
		if (confirm("are you sure?")){
			if ($scope.activity.activity_id) {
				$http.delete('/api/activities/' + $scope.activity.activity_id)
				.success(function(){
					delete $scope.activity;
					alert("Action Success");
					$location.path("/activities/");
				})
				.error(function(){
					alert("Action Failed");
				})
			} else {
				delete $scope.activity;
				$location.path("/activities/");
			}
		}
	}

	var loadAttendance = function(){
		$http.get('/api/members')
		.success(function(members){
			$scope.members = members;
			$scope.memberNames = members.map(function(member){
				return member.first_name + ' ' + member.last_name + ', id:' + member.member_id;
			})
			if ($routeParams.id) {
				$http.get('/api/activities/' + $routeParams.id + '/attendance')
				.success(function(activityMembers){
					$scope.activity.members = $scope.activity.members || [];
					$scope.members.forEach(function(member){
						if (activityMembers.indexOf(member.member_id) > -1){
							$scope.activity.members.push(member);
						}
					})
				})
			}
		})
	}

	$scope.choosePresenter = function(presenterName){
		console.log(presenterName);
		$scope.presenterName = presenterName;
		/*
		$('#myModal').modal('show')
		$scope.chooseMember = function(member){
			$scope.newSession.presenter = member.member_id;
			$scope.newSession.presenter_name = member.last_name + " " + member.first_name;
			$('#myModal').modal('hide');
		}*/
	}

	$scope.addAttendance = function(selectedMemberName){
		var index = $scope.memberNames.indexOf(selectedMemberName);
		member = $scope.members[index]
		if (index != -1 && $scope.activity.members.indexOf(member) == -1){
			$http.post('/api/activities/' + $routeParams.id + '/attendance/' + member.member_id)
			.success(function(insertId){
				$scope.activity.members.push($scope.members[index]);
				$scope.selectedMemberName = ""
			})
		}
	}

	$scope.deleteAttendance = function(index){
		member = $scope.activity.members[index];
		$http.delete('/api/activities/' + $routeParams.id + '/attendance/' + member.member_id)
		.success(function(){
			$scope.activity.members.splice(index, 1);
		})
	}

/*
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
*/

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
