const Router = require("express");

const router = new Router();

const purchaseController = require("../controllers/purchaseController");

router.post("/", purchaseController.create); // checkRole("USER"),

router.get("/", purchaseController.getAll);

router.get("/:id", purchaseController.getOne);

router.put("/:id", purchaseController.update);

router.delete("/:id", purchaseController.delete);

module.exports = router;
