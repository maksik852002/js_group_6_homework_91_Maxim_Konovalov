const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressWs = require('express-ws');

const config = require("./config");

const app = express();
const port = 8000;

expressWs(app);

const users = require("./app/users");
const messages = require("./app/messages");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));


const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use("/users", users);
  app.use("/messages", messages);
 
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(e => {
  console.error(e);
});
