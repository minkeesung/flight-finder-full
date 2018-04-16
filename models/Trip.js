const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  ticket_price: String,
  carrier: String,
  arrival_time: String,
  departure_time: String,
  destination: String,
  origin: String
});

const ModelClass = mongoose.model('trip', tripSchema);

module.exports = ModelClass;
