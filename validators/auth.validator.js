const { check, validationResult } = require("express-validator");

const validate = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorObj = {};
		errors.array().forEach((e) => {
			errorObj[e.path] = (errorObj[e.path] || []).concat([e.msg]);
		});

		return res.status(400).json({
			status: "error",
			message: "validation failed",
			data: errorObj,
		});
	}
	next();
};

const validateSignUp = [
	check("fullname").notEmpty().withMessage("full name is required"),
	check("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("invalid email format"),
	check("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 8 })
		.withMessage("password must be at least 8 characters long"),
	validate,
];

const validateLogin = [
	check("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("invalid email format"),
	check("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 8 })
		.withMessage("password must be at least 8 characters long"),
	validate,
];

module.exports = { validateSignUp, validateLogin };
