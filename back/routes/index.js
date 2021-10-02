const Router = require("express");

const freqRouter = require("./freqRouter");
const needRouter = require("./needRouter");
const purchaseRouter = require("./purchaseRouter");
const tagRouter = require("./tagRouter");
const userRouter = require("./userRouter");

const router = new Router();

router.use("/freq", freqRouter);
router.use("/need", needRouter);
router.use("/tag", tagRouter);
router.use("/purchase", purchaseRouter);
router.use("/user", userRouter);

module.exports = router;
