const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema(
  {
    userId: { type: String, required: true },
    purchases: [
      {
        productId: { type: String, required: true },
        productImageUrl: { type: String, required: true },
        productName: { type: String, required: true },
        productSize: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        rated: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Purchase', PurchaseSchema);
