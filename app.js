const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;
app.use("/api/v1/user", require("./v-1.0.0/routes/user.route"));

app.listen(port, () => {
  console.log("Server started at ", port);
});
