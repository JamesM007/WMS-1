const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

// GET: /api/accounts/get-users
exports.getUsers = async (req, res) => {
	try {
		const { rows } = await db.query(
			"select user_id, first_name, last_name, username, email, role_type from users"
		);

		return res.status(200).json({
			success: true,
			users: rows,
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);

		return res.status(500).json({
			error: error.message,
		});
	}
};

// POST: /api/accounts/register
exports.register = async (req, res) => {
	const {
		first_name,
		last_name,
		username,
		email,
		role_type,
		password,
		confirm_password,
	} = req.body;
	try {
		const hashed_password = await hash(password, 10);

		await db.query(
			"insert into users(first_name, last_name, username, email, password, role_type) values ($1, $2, $3, $4, $5, $6)",
			[first_name, last_name, username, email, hashed_password, role_type]
		);

		return res.status(201).json({
			success: true,
			message: "Your account has been created.",
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);

		return res.status(500).json({
			error: error.message,
		});
	}
};

// POST: /api/accounts/login
exports.login = async (req, res) => {
	let user = req.user;

	payload = {
		id: user.user_id,
		username: user.username,
	};

	try {
		// create token
		const token = sign(payload, SECRET);

		// TODO: httpOnly cookie -> understand more about SSL usage
		return res.status(200).cookie("token", token, { httpOnly: true }).json({
			success: true,
			message: "Logged in!",
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);

		return res.status(500).json({
			error: error.message,
		});
	}
};

// GET: /api/accounts/logout
exports.logout = async (req, res) => {
	try {
		return res.status(200).clearCookie("token", { httpOnly: true }).json({
			success: true,
			message: "Logged out!",
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);

		return res.status(500).json({
			error: error.message,
		});
	}
};

// GET: /api/accounts/userData
exports.userData = async (req, res) => {
	console.log("providing data");
	try {
		console.log(req.user);
		return res.status(200).json({
			user: req.user,
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
};
