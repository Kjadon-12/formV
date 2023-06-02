const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  isoCode: {
    type: String,
    required: true,

  }
});

const States = mongoose.model('State', stateSchema);

module.exports = States;
