ams.controller('membersCtrl', ['$http', '$scope', '$window', function($http, $scope, $window) {

	var apiURL = 'http://0.0.0.0:8080/api';

	$scope.loadMembers = function (){
		$http.get(apiURL+'/member').
			success(function(data){
				this.members = JSON.parse(data);
			}).
			error(function(){

				$scope.members = 
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
							sex: 'male',
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
							sex: 'male',
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
							sex: 'female',
							description: 'This is phi'
						},
					];
				
			});
		};
	
	$scope.showMemberDetail = function(id){
		$scope.members.forEach(function(member){
			if (member.memberId === id){
				$scope.detailedMember = member;
			}
		});
	};

	$scope.hideMemberDetail = function(){
		$scope.detailedMember = {};
	};

	$scope.createMember = function(){
		$scope.newMember = {
			sex : 'M',
			memberTypeId: '0'
		};
	};

	$scope.stopCreatingMember = function(){
		$scope.newMember = {};
	};

	$scope.saveNewMember = function(){
		$http.post(apiURL+'/member', $scope.newMember).
			success(function(){
				$window.alert('Save New Member Successed');
				$.scope.loadMembers();
			}).
			error(function(){
				$window.alert('Save New Member failed');
			});
	};
	
	$scope.deleteMember = function(){
		if($window.confirm('Are you sure to delete?')){
			$http.delete(apiURL+'/member'+'/'+detailedMember.memberId).
				success(function(){
					$window.alert('Delete Member Successed');
					$.scope.loadMembers();
				}).
				error(function(){
					$window.alert('Delete New Member failed');
				});
		}
	}

}]);