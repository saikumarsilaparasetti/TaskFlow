const utils = {
    successResponse: ( res, data, message = "Success",  status = 200) => {
		return res.status(status).json({
			message,
			data,
		});
	},
	errorResponse: (res, err, message = "Internal Server Error") => {
		console.error(err);
		return res.status(400).json({
			message,
			data: err,
		});
	},
}
module.exports = utils