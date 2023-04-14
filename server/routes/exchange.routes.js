const { Exchange } = require("../models/Exchange.model");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    const exchange = await Exchange.find().sort({ volume_1day_usd: -1 });
    res.send(exchange);
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const exchange = new Promise((res, rej) => {
      const data = axios({
        method: "GET",
        url: "https://rest.coinapi.io/v1/exchanges",
        headers: {
          "X-CoinAPI-Key": "265BDEF5-7867-4189-B932-BC76FA5ACD1C",
        },
      });

      res(data);
    });
    const icons = new Promise((res, rej) => {
      const data = axios({
        method: "GET",
        url: "https://rest.coinapi.io/v1/exchanges/icons/32",
        headers: {
          "X-CoinAPI-Key": "265BDEF5-7867-4189-B932-BC76FA5ACD1C",
        },
      });
      res(data);
    });

    const [allExchange, allIcons] = await Promise.all([exchange, icons]);

    const response = allExchange.data.map((exchange) => {
      const icon = allIcons.data.find(
        (icon) => icon.exchange_id === exchange.exchange_id
      );

      return {
        name: exchange?.name,
        imageUrl: icon?.url,
        volume_1day_usd: exchange?.volume_1day_usd,
      };
    });

    const oldExchange = await Exchange.findOne();
    if (oldExchange) {
      await Exchange.collection.drop();
    }
    await Exchange.insertMany(response);
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
