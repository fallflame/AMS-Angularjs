var db = require('./db');

exports.getMembers = function(callback){
	db.query('SELECT * FROM Member WHERE is_delete <> 1')
	.then(function(rows){
		callback(null, rows);
	}, function(err){
		callback(err);
	})
}

exports.getMemberById = function(id, callback){
	db.query('SELECT * FROM Member WHERE member_id = ? AND is_delete <> 1', id)
	.then(function(rows){
		if (rows.length == 0){
			callback(null, null)
		} else {
			callback(null, rows[0]);
		}
	}, function(err){
		callback(err);
	})
}

exports.getMemberAttendancesById = function(id, callback){
	db.query('SELECT * FROM Attendance at, Activity ac WHERE at.member_id = ? AND ac.activity_id=at.activity_id', id)
	.then(function(rows){
		callback(null, rows);
	}, function(err){
		callback(err);
	})
}

exports.createOrUpdateMember = function(member, callback){

	validFiels = ['member_id', 'member_type', 'first_name', 'last_name', 'email', 'nickname', 'address', 'phone', 'sex', 'description', 'is_active'];
	for (field in member){
		if (validFiels.indexOf(field) == -1){
			delete member[field];
		}
	}

	db.query('INSERT INTO Member SET ? ON DUPLICATE KEY UPDATE ?', [member, member])
	.then(function(results){
		callback(null, results.insertId);
	}, function(err){
		callback(err);
	})
}

exports.deleteMember = function(memberId, callback){
	db.query('UPDATE Member SET is_delete=1 WHERE member_id=?', memberId)
	.then(function(results){
		callback(null, results);
	}, function(err){
		callback(err);
	})
}

exports.getMemberSkillsById = function(id, callback){
	db.query('SELECT * FROM Member_Skill WHERE member_id=?', id)
	.then(function(rows){
		callback(null, rows);
	}, function(err){
		callback(err);
	})
}

exports.createMemberSkill = function(skill, callback){
	db.query('INSERT INTO Member_Skill SET ?', skill)
	.then(function(results){
		callback(null, results.insertId);
	}, function(err){
		callback(err);
	})
}

exports.deleteMemberSkillById = function(id, callback){
	db.query('DELETE FROM Member_Skill WHERE id=?', id)
	.then(function(results){
		callback(null, results);
	}, function(err){
		callback(err);
	})
}







