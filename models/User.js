var db = require('./db');

exports.getUser = function(username, password, callback){
	db.query("SELECT username FROM User WHERE username=? AND password=PASSWORD(?)", [username, password])
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
