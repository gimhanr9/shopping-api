const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  productImageUrl: { type: String, required: true },
  productName: { type: String, required: true },
  productSize: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Cart', CartSchema);
