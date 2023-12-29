const mongoose = require("mongoose");

const ClientsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

const Clients = mongoose.model("Clients", ClientsSchema);

module.exports = Clients;
