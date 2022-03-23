const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) token = req.cookies["token"];
	return token;
};

const options = {
	secretOrKey: SECRET,
	jwtFromRequest: cookieExtractor,
};

// create new passport stategy
passport.use(
	new Strategy(options, async ({ id }, done) => {
		try {
			const { rows } = await db.query(
				"select user_id, username, role_type from users where user_id = $1",
				[id]
			);

			if (!rows.length) {
				throw new Error("401 - Not Authorized");
			}

			let user = {
				id: rows[0].user_id,
				username: rows[0].username,
				role_type: rows[0].role_type,
			};

			return done(null, user);
		} catch (error) {
			console.log(`Error: ${error.message}`);
			done(null, false);
		}
	})
);
