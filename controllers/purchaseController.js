import { v4 as uuidv4 } from 'uuid';
const Purchase = require('../models/purchase');
const Product = require('../models/product');
const Rating = require('../models/rating');

const addPurchase = async (req, res) => {
  const id = req.user.id;
  const {
    productId,
    productImageUrl,
    productName,
    productSize,
    quantity,
    price,
    paymentMethod,
  } = req.body;

  try {
    const existingPurchases = await Purchase.findOne({ userId: id });
    if (existingPurchases) {
      await Purchase.updateOne(
        { userId: id },
        {
          $push: {
            purchases: {
              purchaseId: uuidv4(),
              productId,
              productImageUrl,
              productName,
              productSize,
              quantity,
              price,
              paymentMethod,
              rated: false,
            },
          },
        }
      );

      await Product.updateOne({ _id: productId }, { $inc: { orders: 1 } });
      return res.status(201).send({ message: 'Checkout successful' });
    }
    const purchase = await Purchase.create({
      userId: id,
      purchases: [
        {
          purchaseId: uuidv4(),
          productId,
          productImageUrl,
          productName,
          productSize,
          quantity,
          price,
          paymentMethod,
          rated: false,
        },
      ],
    });
    await Product.updateOne({ _id: productId }, { $inc: { orders: 1 } });
    return res.status(201).send({ message: 'Checkout successful' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getPurchases = async (req, res) => {
  const id = req.user.id;
  try {
    const purchases = await Purchase.find(
      { userId: id },
      { purchases: 1, _id: 0, userId: 0 }
    );
    res.status(200).send({ data: purchases });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const ratePurchase = async (req, res) => {
  const { id, name } = req.user;
  const { purchaseId, productId, rating, review, variant, images } = req.body;
  try {
    await Rating.updateOne(
      {
        productId: productId,
      },
      {
        $push: {
          reviews: {
            name,
            rating,
            review,
            variant,
            date: new Date('<YYYY-mm-dd>'),
            images,
          },
        },
      }
    );
    await Purchase.updateOne(
      { userId: id, 'purchases.purchaseId': purchaseId },
      { $set: { 'purchases.$.rated': true } }
    );
    return res.status(201).send({ message: 'Successfully rated purchase' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = { addPurchase, getPurchases, ratePurchase };
