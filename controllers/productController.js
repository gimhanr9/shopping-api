const Product = require('../models/product');

const getProductsByCategory = async (req, res) => {
  const { category } = req.body;

  try {
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const askQuestion = async (req, res) => {
  const { id, name } = req.user;
  const { productId, question } = req.body;

  try {
    await Product.updateOne(
      { _id: productId },
      { $push: { questions: { name, question, answer, date } } }
    );
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = { getProductsByCategory, askQuestion };
