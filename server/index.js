const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

const db = require("./models");

// routers
const postRouter = require("./routes/Users");
app.use("/users", postRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("running on 3001");
  });
});
