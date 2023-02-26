const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  productId: { type: String, required: true },
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, min: 0, required: true },
      review: { type: String },
      variant: { type: String, required: true },
      date: { type: Date, required: true },
      images: { type: [String] },
    },
  ],
});

module.exports = mongoose.model('Rating', RatingSchema);
