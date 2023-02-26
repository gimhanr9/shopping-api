const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  displayImageUrl: { type: String, required: true },
  imageUrls: [{ type: String }],
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  sizes: [
    { XS: { type: Number, min: 0 } },
    { S: { type: Number, min: 0 } },
    { M: { type: Number, min: 0 } },
    { L: { type: Number, min: 0 } },
    { XL: { type: Number, min: 0 } },
    { XXL: { type: Number, min: 0 } },
  ],
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, min: 0 },
  orders: { type: Number, min: 0 },
});

module.exports = mongoose.model('Product', ProductSchema);
