var pool = require('./db').pool;

module.exports = Transaction;

function Transaction(callback){
	this.callback = callback;
	this.connection = null;
	this.callbackData = null;
}

Transaction.prototype.beginTransaction = function(){
	console.log("beginTransaction");
	var self = this;
	return new Promise(function(resolve, reject){
		pool.getConnection(function(err, connection){
			if (err){
				reject(err);
			} else {
				self.connection = connection;
				connection.beginTransaction(function(err){
					if (err){
						reject(err);
					}else{
						resolve();
					}
				})
			}
		})
	});
}

Transaction.prototype.query = function(query, inserts){
	console.log("query");
	var self = this;
	return new Promise(function(resolve, reject){
		self.connection.query(query, inserts, function(err, results){
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
}


Transaction.prototype.commit = function() {
	console.log("commit");
	var self = this;
	return new Promise(function(resolve, reject){
		self.connection.commit(function(err){
			if (err) {
				reject (err)
			} else {
				self.callback(null, self.callbackData);
				self.connection.release();
			}
		});
	});
}


Transaction.prototype.rollback = function(err) {
	console.log("rollback");
	console.log(err);
	var self = this;
	return new Promise(function(resolve, reject){
		self.connection.rollback(function(err2){
			self.callback(err);
			self.connection.release();
		});
	});
}