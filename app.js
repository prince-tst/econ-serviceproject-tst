const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;

const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
const syncModels = require("./config/syncFunction");
syncModels();
//merge this routes in index.js TODO
app.use("/api", mainRoutes);

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on ${port}!`));
