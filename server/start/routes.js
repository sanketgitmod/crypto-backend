const express = require("express");

const exchange = require("../routes/exchange.routes");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/exchange-list", exchange);
};
