const { check } = require("express-validator");
const { compare } = require("bcryptjs");
const db = require("../db");

// check password 
const password = check("password").isLength({ min: 8, max: 22 }).withMessage("Password must be between 8 and 22 characters.");

const username = check("username").isLength({ min: 3 }).withMessage("Username must be greater than 3 characters.");

// check email
const email = check("email").isEmail().withMessage("Please provide a valid email address.");

// check if username exists
const usernameExists = check("username").custom(async (value) => {
    const { rows } = await db.query("select * from users where username = $1 ", [
        value
    ]); 
    if (rows.length) {
        throw new Error("Username already exists.");
    }
});

// check if email exists
const emailExists = check("email").custom(async (value) => {
    const { rows } = await db.query("select * from users where email = $1", [
        value,
    ]);
    if (rows.length) {
        throw new Error("Email already exists.");
    }
});


/**
 *************************************************************************
 * login validation
 *************************************************************************
 */
// ******************************************************
// USING EMAIL INSTEAD OF USERNAME AS LOGIN
// ******************************************************
// const loginFields = check("email").custom(async (value), { req }) => {
//      const user = await db.query("select * from users where email = $1", [
//            value
//      ]);
// }
const loginFields = check("username").custom(async (value, { req }) => {
    // check username
    const user = await db.query("select * from users where username = $1", [
        value
    ]);

    // check if no rows were returned - user doesn't exist
    if (!user.rows.length) {
        throw new Error("Username does not exist.");
    }

    // check password
    const valid_password = await compare(req.body.password, user.rows[0].password);

    if (!valid_password) {
        throw new Error("Incorrect email/password combination.")
    }

    // attach user authenticated to request body
    req.user = user.rows[0]
});

module.exports = {
    registrationValidation: [
        email, 
        username, 
        password, 
        usernameExists, 
        emailExists
    ],
    loginValidation: [
        loginFields
    ],
}

