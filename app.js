const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const nocache = require("nocache"); // Require nocache middleware
const bcrypt = require("bcrypt");
const User = require("./mongodb");
const otpGen = require("./smaple");
const app = express();
const port = 3001;

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(nocache());

// Session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userdata = await User.findOne({ email: email });
  console.log(password, userdata.password);
  if (userdata.password == password) {
    req.session.isAuth = true;
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  // Extract data from request body
  const { email, password } = req.body;
  console.log(email, password);

  // Create data object to insert into MongoDB
  const data = {
    email: email,
    password: password,
  };

  try {
    // Insert data into MongoDB
    await User.create([data]);

    // Redirect to login page after signup
    res.redirect("/login");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error signing up. Please try again later.");
  }
});

app.get("/home", (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

// app.post("/home", (req, res) => {
//   if (req.session.isAuth) {
//     res.render("home");
//   } else {
//     res.redirect("/login");
//   }
// });

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/forgot-password", (req, res) => {
  res.render("forgot");
});

app.post("/forgot-password", async (req, res) => {
  const otp = await otpGen();
  console.log(otp);
  req.session.userOtp = otp;
  res.redirect("/otp");
});

app.get("/otp", (req, res) => {
  res.render("otp");
});

app.post("/otp", (req, res) => {
  if (req.body.otp === req.session.userOtp) {
    req.session.isAuth = true;
    res.redirect("/");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//hash password
//phone add mongodb
//forgot password
//same user name not allowwd
// router
