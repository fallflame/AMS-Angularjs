var express = require('express');
var router = express.Router();
var Member = require('../models/Member')
var Activity = require('../models/Activity')

router.get('/members', function(req, res) {
	Member.getMembers(function(err, members){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(members);
		}
	})
});

router.get('/members/:id', function(req, res){
	Member.getMemberById(req.params.id, function(err, member){
		if (err){
			res.status(400);
			res.end();
		} else if (!member) {
			res.status(404);
			res.end();
		} else {
			res.json(member);
		}
	})
})

router.get('/members/:id/attendances', function(req, res){
	Member.getMemberAttendancesById(req.params.id, function(err, attendances){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(attendances);
		}
	})
})

router.post('/members', function(req, res){
	Member.createOrUpdateMember(req.body, function(err, id){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(id);
		}
	})
})

router.get('/members/:id/skills', function(req, res){
	Member.getMemberSkillsById(req.params.id, function(err, skills){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(skills);
		}
	})
})

router.post('/members/:id/skills', function(req, res){

	var skill = req.body;
	skill.member_id = req.params.id;

	Member.createMemberSkill(skill, function(err, id){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(id);
		}
	})
})

router.delete('/members/:memberid/skills/:id', function(req, res){
	Member.deleteMemberSkillById(req.params.id, function(err, results){
		if (err){
			res.status(400);
			res.end();
		} else if (results.affectedRows == 0){
			res.status(404);
			res.end();
		} else {
			res.status(200);
			res.end();
		}
	})
})

router.get('/activities', function(req, res){
	Activity.getActivities(function(err, activities){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(activities)
		}
	})
})

router.get('/activities/:id', function(req, res){
	Activity.getActivityById(req.params.id, function(err, activity){
		if (err){
			res.status(400);
			res.end();
		} else if (!activity) {
			res.status(404);
			res.end();
		} else {
			res.json(activity);
		}
	})
})

router.get('/activities/:id/attendance', function(req, res){
	Activity.getAttendanceById(req.params.id, function(err, members){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(members);
		}
	})
})

router.post('/activities/:id/attendance', function(req, res){
	Activity.modifyAttendanceById(req.params.id, req.body, function(err){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.status(200);
			res.end();
		}
	})
})

router.get('/activities/:id/sessions', function(req, res){
	Activity.getSessionsById(req.params.id, function(err, sessions){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(sessions);
		}
	})
})

router.post('/activities/:id/sessions', function(req, res){
	var session = req.body;
	session.activity_id = req.params.id;
	Activity.createSession(session, function(err, id){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(id);
		}
	})
})

router.delete('/activities/:activityId/sessions/:id', function(req, res){
	Activity.deleteSessionById(req.params.id, function(err, results){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.status(200);
			res.end();
		}
	})
})

router.post('/activities', function(req, res){
	Activity.createOrUpdateActivity(req.body, function(err, activityId){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.json(activityId);
		}
	})
})

router.delete('/activities/:id', function(req, res){
	Activity.deleteActivityById(req.params.id, function(err, results){
		if (err){
			res.status(400);
			res.end();
		} else {
			res.status(200);
			res.end();
		}
	})
})

module.exports = router;








