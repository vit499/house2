const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./db");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const { fillPurchases } = require("./models/fillPurchases");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.drop();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`app listen on port ${PORT}`);

      // fillPurchases();
    });
  } catch (err) {
    console.log("err", err);
  }
};

start();
