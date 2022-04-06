const { Router } = require("express");
const {
    getUsers,
    register,
    login,
    userData,
    logout,
} = require("../controllers/auth");
const {
    registrationValidation,
    loginValidation,
} = require("../validators/auth");
const {
    validationMiddleware,
} = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/auth-middleware");
const router = Router();

router.get("/get-users", userAuth, getUsers);
router.get("/userData", userAuth, userData);

/**
***************************************************************************************
  START Auth Routes
***************************************************************************************
*/

// POST: /api/accounts/register
router.post(
    "/register",
    registrationValidation,
    validationMiddleware,
    register
);

// POST: /api/accounts/login
router.post("/login", loginValidation, validationMiddleware, login);

// GET: /api/accounts/logout
// userAuth protection not required for logout
// there may be an instance where you might need to force logout a user
router.get("/logout", logout);

/**
***************************************************************************************
  END Auth Routes
***************************************************************************************
*/

module.exports = router;
