// import dependencies
const express = require("express");
const path = require("path");
const pages = require("./pages");

// create server
const server = express();

// define static routes
server.use(express.static("public"));

// configure template engine
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "hbs");

// create routes
server.get("/", pages.index);
server.get("/orphanage", pages.orphanage);
server.get("/orphanages", pages.orphanages);
server.get("/createOrphanage", pages.createOrphanage);

// start server
server.listen(7500);
