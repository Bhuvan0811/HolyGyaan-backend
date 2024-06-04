require('dotenv').config();
const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const JWT_secret = require("./config");
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8000;
app.use("/api/v1", rootRouter);
app.listen(port);