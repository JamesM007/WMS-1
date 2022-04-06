const { check } = require("express-validator");
const { compare } = require("bcryptjs");
const db = require("../db");

// check id
const id = check("id")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Please provide an ID.")
    .escape();

// check type
const type = check("type")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Please provide a type.")
    .escape();

// check x value
const x = check("x")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("Please provide an x value greater than 0.");

// check y value
const y = check("y")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("Please provide an y value greater than 0.");

// check width of object
const width = check("width")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("Please provide an width value greater than 0.");

// check height of object
const height = check("height")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("Please provide an height value greater than 0.");

module.exports = {
    saveObjectsValidation: [id, type, x, y, width, height],
};
