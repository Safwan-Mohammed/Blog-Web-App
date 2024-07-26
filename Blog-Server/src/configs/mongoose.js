const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.once('open', ()=>{
  console.log("Connected to database")
})

db.on('error', console.error.bind(console, "Error in DB Connection"))

module.exports = db;