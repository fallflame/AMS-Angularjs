var pool = require('mysql').createPool({
	connectionLimit : 20,
	host     : '104.167.100.143',
	user     : 'ams',
	password : 'z(VtFJ+Xbt',
	database : 'ams'
});

exports.query = function(query, inserts){
	return new Promise(function(resolve, reject){
		pool.getConnection(function(err, connection){
			if (err){
				console.log(err);
				reject(err);
			} else {
				connection.query(query, inserts, function(err, results){
					if (err){
						console.log(err);
						reject(err);
					} else {
						resolve(results);
					}
					connection.release();
				})
			}
		})
	})
}

exports.pool = pool;

