const Favourite = require('../models/favourite');

const getFavourites = async (req, res) => {
  try {
    const id = req.user.id;
    const favourites = await Favourite.find(
      { _id: id },
      { products: 1, _id: 0, userId: 0 }
    );
    res.status(200).send({ data: favourites });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const addFavourite = async (req, res) => {
  try {
    const id = req.user.id;
    const { productId, productImageUrl, productName, price } = req.body;

    const existingFavourites = await Favourite.findOne({ userId: id });
    if (existingFavourites) {
      const existingProduct = existingFavourites.products.some((product) => {
        if (product.productId == productId) {
          return true;
        } else {
          return false;
        }
      });
      if (existingProduct) {
        await Favourite.updateOne(
          { userId: id },
          { $pull: { products: { productId: productId } } }
        );
        return res
          .status(200)
          .send({ message: 'Item deleted from favourites' });
      } else {
        await Favourite.updateOne(
          { userId: id },
          {
            $push: {
              products: {
                productId,
                productImageUrl,
                productName,
                price,
              },
            },
          }
        );

        return res.status(200).send({ message: 'Added item to favourites' });
      }
    }
    const newFavourite = await Favourite.create({
      userId: id,
      products: [
        {
          productId,
          productImageUrl,
          productName,
          price,
        },
      ],
    });
    res.status(201).send({ message: 'Added item to favourites' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = { getFavourites, addFavourite };
