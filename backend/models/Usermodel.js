const mongoose = require("mongoose");
const { number } = require("yup");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    birthDate: {
      type: Date,
    },
    profilePhoto: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: { type: Boolean, default: 0 },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("userSchema", userSchema);
