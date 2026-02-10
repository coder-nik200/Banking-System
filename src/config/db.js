const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MogoDB connected ✅");
    })
    .catch((err) => {
      console.log("Error connecting to DB ❌", err.message);
      process.exit(1); //Stop the program right now and tell the system that something went wrong.
    });
}

module.exports = connectToDB;
