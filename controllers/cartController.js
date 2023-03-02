const Cart = require('../models/cart');

const addToCart = async (req, res) => {
  try {
    const id = req.user.id;
    const {
      productId,
      productImageUrl,
      productName,
      productSize,
      quantity,
      price,
    } = req.body;

    if (
      !productId ||
      !productImageUrl ||
      !productName ||
      !productSize ||
      !quantity ||
      !price
    ) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const existingCart = await Cart.findOne({ userId: id });

    if (existingCart) {
      const existingProduct = existingCart.products.find((product) => {
        if (
          product.productId == productId &&
          product.productSize == productSize
        ) {
          return true;
        } else {
          return false;
        }
      });

      if (existingProduct) {
        await Cart.updateOne(
          { userId: id, 'products.productId': productId },
          {
            $inc: {
              'products.$.quantity': 1,
            },
          }
        );
        return res.status(201).send({ message: 'Updated cart' });
      }

      await Cart.updateOne(
        { userId: id },
        {
          $push: {
            products: {
              productId,
              productImageUrl,
              productName,
              productSize,
              quantity,
              price,
            },
          },
        }
      );

      return res.status(201).send({ message: 'Item added to cart' });
    }

    const cart = await Cart.create({
      userId: id,
      products: [
        {
          productId,
          productImageUrl,
          productName,
          productSize,
          quantity,
          price,
        },
      ],
    });

    return res.status(201).send({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getCart = async (req, res) => {
  try {
    const id = req.user.id;
    const cartItems = await Cart.find(
      { userId: id },
      { products: 1, _id: 0, userId: 0 }
    );
    res.status(200).send({ data: cartItems });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const updateCart = async (req, res) => {
  try {
    const id = req.user.id;
    const { productId, productSize, updateType } = req.body;

    if (!productId || !productSize || !updateType) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    if (updateType == 'ADD') {
      await Cart.updateOne(
        {
          userId: id,
          'products.productId': productId,
          'products.productSize': productSize,
        },
        {
          $inc: {
            'products.$.quantity': 1,
          },
        }
      );
      return res.status(201).send({ message: 'Cart updated' });
    } else {
      await Cart.updateOne(
        {
          userId: id,
          'products.productId': productId,
          'products.productSize': productSize,
        },
        {
          $inc: {
            'products.$.quantity': -1,
          },
        }
      );
      return res.status(201).send({ message: 'Cart updated' });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = req.user.id;
    const { productId, productSize } = req.body;

    if (!productId || !productSize) {
      return res.status(400).send({ error: 'All fields are required' });
    }
    await Cart.updateOne(
      {
        userId: id,
      },
      {
        $pull: { products: { productId: productId, productSize: productSize } },
      }
    );
    return res.status(200).send({ message: 'Deleted item from cart' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const deleteAll = async (req, res) => {
  try {
    const id = req.user.id;
    await Cart.updateOne(
      { userId: id },
      { $set: { products: [] } },
      { multi: true }
    );

    return res.status(200).send({ message: 'Deleted all cart items' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = { addToCart, getCart, updateCart, deleteItem, deleteAll };
