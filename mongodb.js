const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LoginSignupForm")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // phone: {
  //   type: Number,
  //   required: true,
  // },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
