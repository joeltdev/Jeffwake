const express = require("express");
const path = require("path");
const app = express();
const port = 3001;

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  } else {
    res.render("login");
  }
});

app.get("/login", (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  } else {
    res.render("login");
  }
});

app.post("/login", (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  } else {
    res.render("login");
  }
});

app.post("/signup", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/home");
  } else {
    res.render("signup");
  }
});

app.get("/home", (req, res) => {
  res.render("home");
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
