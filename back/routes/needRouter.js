const Router = require("express");

const router = new Router();
const needController = require("../controllers/needController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), needController.create);

router.get("/", needController.getAll);

module.exports = router;
