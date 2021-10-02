const Router = require("express");

const router = new Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddlewre");

router.post("/register", userController.registration);

router.post("/login", userController.login);

router.get("/auth", authMiddleware, userController.auth);

router.get("/dropdb", authMiddleware, userController.dropDb);

module.exports = router;
