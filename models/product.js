const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({ name: { type: String, required: true } });

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Float, required: true },
  category: { type: String, required: true },
  size: [
    { xsmall: { type: Number, required: true } },
    { small: { type: Number, required: true } },
    { medium: { type: Number, required: true } },
    { large: { type: Number, required: true } },
    { xlarge: { type: Number, required: true } },
    { xxlarge: { type: Number, required: true } },
  ],
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
