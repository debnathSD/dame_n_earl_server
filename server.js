const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB Configuration
const db = require("./config/keys").mongoURI;

// Connect to MongoDB via Mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB Connected!`))
  .catch((err) => console.log(`Uh-Oh! ${err}`));

app.get("/", (req, res) => res.send(`Hey Base Route!!!`));

const PORT = 5000;

const port = process.env.PORT || PORT;

app.listen(port, () => console.log(`Server Running On PORT ${port}`));
