var errorHandler = function(err, req, res, next) {
	// Do logging and user-friendly error message display
	console.log('ERROR');
	console.error(err);
	res.status(500).send({
		status: 500, 
		message: err.message,
		error: err
	});
};

module.exports = errorHandler;
