const mongoose = require("mongoose");

const connextDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   
    });
    console.log("Connext Database Successfully^^");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = connextDB;
