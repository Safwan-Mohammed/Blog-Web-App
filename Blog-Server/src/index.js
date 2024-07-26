require('dotenv').config();
const express = require("express");
const mongoose = require("./configs/mongoose");
const cors = require('cors')

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors())
app.use('/', require("./routes/index"));

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
})