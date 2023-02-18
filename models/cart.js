const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      productImageUrl: { type: String, required: true },
      productName: { type: String, required: true },
      productSize: { type: String },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
});

module.exports = mongoose.model('Cart', CartSchema);
