const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  volume_1day_usd: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
});

const Exchange = mongoose.model("exchange", exchangeSchema);

exports.Exchange = Exchange;
