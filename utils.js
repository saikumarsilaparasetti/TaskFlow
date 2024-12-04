const utils = {
    successResponse: (res, data, message = "Success") => {
		return res.status(200).json({
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