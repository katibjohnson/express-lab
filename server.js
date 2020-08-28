"use strict";

//require the exxpress module
const express = require("express");

//require the router object (with all the defined routes) to be used in this file
const routes = require("./routes");

// require the cors module
const cors = require("cors");

//create an instance of an express server
const app = express();

//enable Cross Origin Resource Sharing so this API can be used from web apps on other domains
app.use(cors());

//allow POST and PUT request to use JSON bodies
app.use(express.json());

//use the router object (with all the defined routes)
app.use("/", routes);

//define the port
const port = 3000;

//run the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
