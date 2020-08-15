const express = require("express");

const app = express();

app.get("/", (req, res) => res.send(`Hey Base Route!!!`));

const PORT = 5000;

const port = process.env.PORT || PORT;

app.listen(port, () => console.log(`Server Running On PORT ${port}`));
