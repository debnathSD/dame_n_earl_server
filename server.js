const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const auth = require("./routes/api/auth");
const user = require("./routes/api/user");
const address = require("./routes/api/address");
const product = require("./routes/api/product");
const cart = require("./routes/api/cart");

const app = express();

// Middleware: Parse the Request Body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Configuration
const db = require("./config/keys").mongoURI;

// Connect to MongoDB via Mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB Connected!`))
  .catch((err) => console.log(`Uh-Oh! ${err}`));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Sample Route
app.get("/", (req, res) => res.send(`Hey Base Route!!!`));

// Use Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/auth", user);
app.use("/api/v1/user", address);
app.use("/api/v1/products", product);
app.use("/api/v1/cart", cart);

// PORTs
const PORT = 5000;
const port = process.env.PORT || PORT;

// Spin Up API Server to PORT number
app.listen(port, () => console.log(`Server Running On PORT ${port}`));
