var User = require("../../models/User");
var assert = require('assert');

var createdId;

describe('createOrUpdateUser', function(){

	var test_user = {
		name : 'A',
		password : 'B',
		email : 'a@b.com',
		auth_user : 0
	}

	it('should create a user correctelly', function(done){
		User.createOrUpdateUser(test_user, function(err, results){
			assert(!err);
			assert(results.affectedRows == 1);
			assert(results.insertId);
			test_user.id = results.insertId;
			createdId = results.insertId;
			done();
		})
	});

	it('should update the user correctelly', function(done){
		test_user.name='C';
		User.createOrUpdateUser(test_user, function(err, results){
			assert(!err);
			User.getUserById(test_user.id, function(err, user){
				assert(!err);
				assert.equal('C', user.name);
				done();
			})
		})
	})
});

describe('getUserById', function(){
	it('should get a user', function(done){
		User.getUserById(createdId, function(err, user){
			assert(!err);
			assert(user);
			done();
		})
	})
})
