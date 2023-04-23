const router = require("express").Router();
const { sessionCreate, sessionDelete } = require("../controllers/auth.controller")

router.post("/", sessionCreate)
router.delete("/", sessionDelete)

module.exports = router;