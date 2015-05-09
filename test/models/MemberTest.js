var Member = require("../../models/Member");
var assert = require('assert');

var createdId;

describe('createOrUpdateMember', function(){

	var test_member = {
		member_type_id : 1,
		first_name : 'Yan',
		last_name : 'Xu',
		email : 'xuyantc@msn.com'
	}

	it('should create a member correctelly', function(done){
		Member.createOrUpdateMember(test_member, function(err, results){
			assert(!err);
			assert(results.affectedRows == 1);
			assert(results.insertId);
			test_member.member_id = results.insertId;
			createdId = results.insertId;
			done();
		})
	});

	it('should update the member correctelly', function(done){
		test_member.member_type_id=2;
		Member.createOrUpdateMember(test_member, function(err, results){
			assert(!err);
			Member.getMemberById(test_member.member_id, function(err, member){
				assert(!err);
				assert.equal(2, member.member_type_id);
				done();
			})
		})
	})
});

describe('getMemberById', function(){
	it('should get a member', function(done){
		Member.getMemberById(createdId, function(err, member){
			assert(!err);
			assert(member);
			done();
		})
	})
})
