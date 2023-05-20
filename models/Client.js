const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  reservation: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  accommodation: {
    type: String,
  },
  breakfast: {
    type: String,
  },
  activities: {
    type: String,
  },
  passport: {
    type: String,
  },
  duration: {
    type: String,
    default: function() {
      return this.departure - this.arrival;
    }
  },
  passportNumber: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
});

module.exports = mongoose.model('Client', ClientSchema);;