const express = require("express");
const app = express();
const port = 2000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
require("./models/model");
require("./models/post");
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("successfully connected to mongo");
});

mongoose.connection.on("error", () => {
  console.log("not connected to mongodb");
});

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});
