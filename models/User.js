var db = require('./db');

exports.getUsers = function(callback){
	db.query('SELECT * FROM User')
	.then(function(rows){
		callback(null, rows);
	}, function(err){
		callback(err);
	})
}

exports.getUserById = function(id, callback){
	db.query('SELECT * FROM User WHERE id = ?', id)
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

exports.createOrUpdateUser = function(user, callback){

	validFiels = ['id', 'name', 'password', 'email', 'auth_user'];
	for (field in user){
		if (validFiels.indexOf(field) == -1){
			delete user[field];
		}
	}

	db.query('INSERT INTO User SET ? ON DUPLICATE KEY UPDATE ?', [user, user])
	.then(function(results){
		callback(null, results);
	}, function(err){
		callback(err);
	})
}