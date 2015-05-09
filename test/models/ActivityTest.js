var Activity = require("../../models/Activity");
var assert = require('assert');

var createdId;

describe('createOrUpdateActivity', function(){

	var test_activity = {
		activity_name : "test activity",
		timestart : new Date('2015-05-01 18:00'),
		timeend : new Date('2015-05-01 21:00')
	}

	it('should create a activity correctelly', function(done){
		Activity.createOrUpdateActivity(test_activity, function(err, results){
			assert(!err);
			assert(results.affectedRows == 1);
			assert(results.insertId);

			test_activity.activity_id = results.insertId;
			createdId = results.insertId;
			done();
		})
	});

	it('should update the activity correctelly', function(done){
		test_activity.activity_name="modifed";
		Activity.createOrUpdateActivity(test_activity, function(err, results){
			assert(!err);
			Activity.getActivityById(test_activity.activity_id, function(err, activity){
				assert(!err);
				assert.equal('modifed', activity.activity_name);
				done();
			})
		})
	})
});

describe('getActivityById', function(){
	it('should get a activity', function(done){
		Activity.getActivityById(createdId, function(err, activity){
			assert(!err);
			assert(activity);
			done();
		})
	})
})

describe('deleteActivityById', function(){
	it('should delete a activity', function(done){
		Activity.deleteActivityById(createdId, function(err, results){
			assert(!err);
			Activity.getActivityById(createdId, function(err, activity){
				assert(!err);
				assert(!activity);
				done();
			})
		})
	})
})

describe('modifyParticipants', function(){
	it('should modifyParticipants', function(done){
		var members = [{member_id:1}, {member_id:2}]

		Activity.modifyParticipants(1, members, function(err, results){
			assert(!err);
			done();
		})
	})
})

describe('getParticipantsById', function(){
	it('should return member list', function(done){
		Activity.getParticipantsById(1, function(err, members){
			try{
				assert(!err);
				assert.equal(members.length, 2);
				assert(members[0].first_name == 'Yan' || members[0].first_name == 'Qianqian');
				done();
			}catch(e){
				return done(e);
			}
		})
	})
})








