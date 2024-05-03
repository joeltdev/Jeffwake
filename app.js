const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const nocache = require("nocache"); // Require nocache middleware
const collection = require("./mongodb");
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "joelmathew@gmail.com" && password === "1234") {
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

  // Create data object to insert into MongoDB
  const data = {
    email: email,
    password: password,
  };

  try {
    // Insert data into MongoDB
    await collection.insertOne(data);

    // Redirect to home page after signup
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

app.post("/home", (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
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

//if i logout i don't need to go back to the website
//mongo db is not connected with the website
//signup data is not form on mondb  error messae
