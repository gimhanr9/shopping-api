const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  displayImageUrl: { type: String, required: true },
  imageUrls: [{ type: String }],
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  size: [
    { xsmall: { type: Number, min: 0 } },
    { small: { type: Number, min: 0 } },
    { medium: { type: Number, min: 0 } },
    { large: { type: Number, min: 0 } },
    { xlarge: { type: Number, min: 0 } },
    { xxlarge: { type: Number, min: 0 } },
  ],
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, min: 0 },
  reviews: [
    {
      name: { type: String },
      rating: { type: Number, min: 0 },
      review: { type: String },
      date: { type: Date },
      images: [{ imageUrl: { type: String } }],
    },
  ],

  questions: [
    {
      name: { type: String },
      question: { type: String },
      answer: { type: String },
      date: { type: Date },
    },
  ],
});

module.exports = mongoose.model('Product', ProductSchema);
