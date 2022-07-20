const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger");
const jsDoc = swaggerJsDoc(swaggerOptions);

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(jsDoc));

//Import Routes
const data = require("./routes/data");
app.use("/", data);

mongoose.connect(process.env.DB_CONNECTION, (err, client) => {
  if (err) return console.log(err);
  console.log("Connected to DB");
});

app.listen(3000);
