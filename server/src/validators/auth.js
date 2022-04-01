const { check } = require("express-validator");
const { compare } = require("bcryptjs");
const db = require("../db");

/**
 *************************************************************************
 * START registration validation
 *************************************************************************
 */

// check first name
const first_name = check("first_name")
	.trim()
	.exists({ checkFalsy: true })
	.withMessage("Please provide your first name.")
	.escape();

// check last name
const last_name = check("last_name")
	.trim()
	.exists({ checkFalsy: true })
	.withMessage("Please provide your last name.")
	.escape();

// check username
const username = check("username")
	.trim()
	.isLength({ min: 3 })
	.withMessage("Username must be greater than 3 characters.")
	.escape();

// check email
const email = check("email")
	.isEmail()
	.withMessage("Please provide a valid email address.")
	.normalizeEmail();

// check password
const password = check("password")
	.trim()
	.isLength({ min: 8, max: 22 })
	.withMessage("Password must be between 8 and 22 characters.");

// check role_type
const role_type = check("role_type")
	.trim()
	.isIn(["Management", "Operations", "Picker", "Forklift"])
	.withMessage("Role type is not valid.")
	.escape();

// check if password and confirm password match
const confirm_password = check("confirm_password")
	.trim()
	.custom(async (confirmPassword, { req }) => {
		const password = req.body.password;
		const confirm_password = req.body.password_confirm;

		if (password !== confirm_password) {
			throw new Error("Your passwords do not match.");
		}
	});

// check if username already exists
const usernameExists = check("username").custom(async (value) => {
	const { rows } = await db.query(
		"select * from users where username = $1 ",
		[value]
	);
	if (rows.length) {
		throw new Error("Username already exists.");
	}
});

// check if email already exists
const emailExists = check("email").custom(async (value) => {
	const { rows } = await db.query("select * from users where email = $1", [
		value,
	]);
	if (rows.length) {
		throw new Error("Email address already exists.");
	}
});

/**
 *************************************************************************
 * END registration validation
 *************************************************************************
 */

/**
 *************************************************************************
 * START login validation
 *************************************************************************

 ******************************************************
 USING EMAIL INSTEAD OF USERNAME AS LOGIN
 ******************************************************
 const loginFields = check("email").custom(async (value), { req }) => {
      const user = await db.query("select * from users where email = $1", [ value ]);
 }
 */
const loginFields = check("username").custom(async (value, { req }) => {
	// check username
	const results = await db.query(
		"select user_id, first_name, last_name, username, email, active, password, role_type from users where username = $1",
		[value]
	);

	// check if no rows were returned - user doesn't exist
	if (!results.rows.length) {
		throw new Error("Username does not exist.");
	}

	// store the first result returned -- there should only be one result returned if the user exists
	const user = results.rows[0];

	// check if user is active
	if (!user.active)
		throw new Error(
			"Your account is not active. Please contact your administrator."
		);

	// check password
	const valid_password = await compare(req.body.password, user.password);
	if (!valid_password) {
		throw new Error("Incorrect username/password combination.");
	}

	// attach user authenticated to request body
	req.user = user;
});

/**
 *************************************************************************
 * END login validation
 *************************************************************************
 */

module.exports = {
	registrationValidation: [
		first_name,
		last_name,
		email,
		username,
		password,
		role_type,
		confirm_password,

		usernameExists,
		emailExists,
	],
	loginValidation: [loginFields],
};
