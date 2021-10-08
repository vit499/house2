const Router = require("express");

const router = new Router();
const freqController = require("../controllers/freqController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), freqController.create);

router.delete("/:id", checkRole("ADMIN"), freqController.delete);

router.get("/", freqController.getAll);

module.exports = router;
