const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

// GET: /api/get-users
exports.getUsers = async (req, res) => {
	try {
		// TODO: change query for first_name, last_name
		const { rows } = await db.query(
			"select user_id, username, email, role_type from users"
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

// POST: /api/register
exports.register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const hashed_password = await hash(password, 10);

		// TODO: must provide first_name, last_name, role type from user entered form
		const role_type = "management";

		await db.query(
			"insert into users(username, email, password, role_type) values ($1, $2, $3, $4)",
			[username, email, hashed_password, role_type]
		);

		return res.status(201).json({
			success: true,
			message: "The user has been created.",
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);

		return res.status(500).json({
			error: error.message,
		});
	}
};

// POST: /api/login
exports.login = async (req, res) => {
	let user = req.user;
	payload = {
		id: user.user_id,
		username: user.username,
	};
	try {
		const token = sign(payload, SECRET);

		// TODO: httpOnly cookie -> understand more about SSL usage
		return res.status(200).cookie("token", token, { httpOnly: true }).json({
			success: true,
			message: "Logged in successfully",
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);

		return res.status(500).json({
			error: error.message,
		});
	}
};

// GET: /api/logout
exports.logout = async (req, res) => {
	try {
		return res.status(200).clearCookie("token", { httpOnly: true }).json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);

		return res.status(500).json({
			error: error.message,
		});
	}
};

/**
 ************************************************************************
 // TODO : TEMPORARY TESTING PROTECTED ROUTE
 ************************************************************************
 */
exports.protected = async (req, res) => {
	try {
		return res.status(200).json({
			user: req.user,
			info: "protected information -- This is the testing ground for the canvas",
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
};
