"use strict";

//require the express module
const express = require("express");

//create a new router object
const routes = express.Router();

const cart = [
  {
    product: "lipstick",
    price: 18,
    quantity: 2,
    id: 1,
  },
  {
    product: "eyeshadow palette",
    price: 46,
    quantity: 1,
    id: 2,
  },
  {
    product: "mascara",
    price: 30,
    quantity: 1,
    id: 3,
  },
  {
    product: "eyeliner",
    price: 14,
    quantity: 4,
    id: 4,
  },
];

let nextId = 5;

routes.get("/cart-items", (req, res) => {
  if (req.query.maxPrice) {
    let filteredArray = cart.filter((item) => {
      return item.price <= parseFloat(req.query.maxPrice);
    });
    res.json(filteredArray);
  } else if (req.query.prefix) {
    let filteredArray = cart.filter((item) => {
      let currentitem = item.product.toLowerCase();
      return currentitem.startsWith(req.query.prefix.toLowerCase());
    });
    res.json(filteredArray);
  } else if (req.query.pageSize) {
    let filteredArray = cart.filter((item) => {
      return item.id <= parseFloat(req.query.pageSize);
    });
    res.json(filteredArray);
  } else {
    res.status(200);
    res.json(cart);
  }
});

routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let found = cart.find((item) => {
    return item.id === id;
  });
  if (found) {
    res.json(found);
  } else {
    res.status(404);
    res.send("ID Not Found");
  }
});

routes.post("/cart-items", (req, res) => {
  let newItem = req.body;
  newItem.id = nextId++;
  cart.push(newItem);
  res.status(201);
  res.json(cart);
});

routes.put("/cart-items/:id", (req, res) => {
  const newItem = req.body;
  const id = parseInt(req.params.id);
  const index = cart.findIndex((item) => {
    return item.id === id;
  });
  newItem.id = id;
  if (index !== -1) {
    cart.splice(index, 1, newItem);
  }
  res.status(200);
  res.json(cart);
});

routes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  res.status(204);
  res.send();
});

//export routes to use in server.js
module.exports = routes;
