var db = require('./db');
var Transaction = require('./db-transaction');

exports.getActivities = function(callback){
	db.query('SELECT * FROM Activity')
	.then(function(rows){
		callback(null, rows);
	}, function(err){
		callback(err);
	})
}

exports.getActivityById = function(id, callback){
	db.query('SELECT * FROM Activity WHERE activity_id = ?', id)
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

exports.getAttendanceById = function(activityId, callback){
	db.query('SELECT member_id FROM Attendance WHERE activity_id=?', activityId)
	.then(function(rows){
		var members = [];
		rows.forEach(function(row){
			members.push(row.member_id);
		})
		callback(null, members);
	}, function(err){
		callback(err);
	})
}

/*
exports.modifyAttendanceById = function(activityId, members, callback){
	var t = new Transaction(callback);
	var promise = t.beginTransaction()
	.then(function(){
		return t.query('DELETE FROM Attendance WHERE activity_id=?', activityId);
	});
	members.forEach(function(member){
		var attendance = {
			activity_id : activityId,
			member_id : member.member_id
		}
		promise = promise.then(function(){
			return t.query('INSERT INTO Attendance SET ?', attendance);
		});
	})
	promise.then(function(){
		return t.commit();
	}).catch(function(err){
		return t.rollback(err);
	})
}
*/

exports.addAttendance = function(activityId, memberId, callback){
	db.query('INSERT INTO Attendance VALUE(?, ?, ?)', [null, activityId, memberId])
	.then(function(results){
		callback(null, results.insertId);
	}, function(err){
		callback(err);
	})
}

exports.deleteAttendance = function(activityId, memberId, callback){
	db.query('DELETE FROM Attendance WHERE activity_id=? AND member_id = ?', [activityId, memberId])
	.then(function(results){
		callback(null, results.affectedRows);
	}, function(err){
		callback(err);
	})
}

exports.getSessionsById = function(id, callback){
	db.query('SELECT s.*, m.first_name as presenter_first_name, m.last_name as presenter_last_name FROM Session s, Member m WHERE activity_id = ? AND s.presenter = m.member_id', id)
	.then(function(rows){
		callback(null, rows);
	}, function(err){
		callback(err);
	})
}

exports.createOrUpdateActivity = function(activity, callback){

	validFiels = ['activity_id', 'activity_name', 'description', 'address', 
				  'timestart', 'timeend', 'activity_status'];
	for (field in activity){
		if (validFiels.indexOf(field) == -1){
			delete activity[field];
		}
	}
	if (activity.timestart){
		activity.timestart = new Date(activity.timestart);
	}
	if (activity.timeend){
		activity.timeend = new Date(activity.timeend);
	}

	db.query('INSERT INTO Activity SET ? ON DUPLICATE KEY UPDATE ?', [activity, activity])
	.then(function(results){
		callback(null, results.insertId);
	}, function(err){
		callback(err);
	})
}

exports.deleteActivityById = function(id, callback){
	db.query('DELETE FROM Activity WHERE activity_id= ?', id)
	.then(function(results){
		callback(null, results);
	}, function(err){
		callback(err);
	})
}

exports.createSession = function(session, callback){
	validFiels = ['activity_id', 'session_type', 'session_name', 
				  'presenter', 'sequence'];
	for (field in session){
		if (validFiels.indexOf(field) == -1){
			delete session[field];
		}
	}

	db.query('INSERT INTO Session SET ?', session)
	.then(function(results){
		callback(null, results.insertId);
	}, function(err){
		callback(err);
	})
}

exports.deleteSessionById = function(id, callback){
	db.query('DELETE FROM Session WHERE session_id=?', id)
	.then(function(results){
		callback(null, results);
	}, function(err){
		callback(err);
	})
}





