const { Router } = require("express");
const { saveObjects, clearObjects } = require("../controllers/objects");
const { saveObjectsValidation } = require("../validators/objects");
const {
    validationMiddleware,
} = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/auth-middleware");
const router = Router();
//
// POST: /api/objects/save
router.post("/save", saveObjectsValidation, validationMiddleware, saveObjects);


router.delete("", clearObjects);
module.exports = router;
