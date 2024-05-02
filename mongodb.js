const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LoginSignupForm")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Collection1 = mongoose.model("Collection1", LoginSchema);

module.exports = Collection1;
