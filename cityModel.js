const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  stateCode: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  }
});

const Cities = mongoose.model('City', citySchema);

module.exports = Cities;
