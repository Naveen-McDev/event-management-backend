// importing mongoose package
const mongoose = require("mongoose");

// function expression for connecting the mongodb database
const dbConnection = async () => {
  try {
    // connecting with the mongodbURL
    await mongoose.connect(process.env.MONGODB_CNN);
    // response if success
    console.log("MongoDB database connection established successfully!");
  } catch (error) {
    // response if error
    throw new Error("Database initialization error");
  }
};

// export
module.exports = dbConnection;
