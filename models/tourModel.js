// čia turi būti schema ir module
const mongoose = require("mongoose");
const validator = require("validator");

// sukuriame schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true,
    maxlength: [40, "A tour name must have less or equal 40 characters"],
    minlength: [10, "A tour name must have more or equal 10 characters"],
    validate: [
      validator.isAlpha,
      "Tour name must only contain characters without spaces",
    ], //tinka tik tekstai be tarpų
  },
  duration: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
  },
  difficulty: {
    type: String,
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "Difficulty is either: easy, medium or difficult",
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    //šis validatorius gali dirbti su datomis
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  ratingsQuantity: {
    type: Number,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  //custom validator, val - vartotojo įvesta nuolaidos suma
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price; // return false trigger validation error, "this" rodo į KURIAMĄ dokumentą, ant update neveiks, galima naudoti library validator.js https://github.com/validatorjs/validator.js
      },
      message: "Discount price ({VALUE}) should be below regular price",
    },
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
  },
  images: [String],
  startDates: [Date],
});

// sukuriame modelį, modulio vardas rašomas didžiąja raide, modulis kuriamas iš schemos
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
