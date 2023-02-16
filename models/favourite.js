const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      productImageUrl: { type: String, required: true },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Favourite', PurchaseSchema);
