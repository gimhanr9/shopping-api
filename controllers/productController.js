const Product = require('../models/product');
const Question = require('../models/question');

const getProductsByCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const products = await Product.find({ category: category });
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getPopularProducts = async (req, res) => {
  const { category } = req.body;
  try {
    const products = await Product.find({ category: category });
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const askQuestion = async (req, res) => {
  const { id, name } = req.user;
  const { productId, question } = req.body;

  try {
    await question.updateOne(
      { productId: productId },
      {
        $push: {
          questions: {
            name,
            question,
            answer: null,
            date: new Date('<YYYY-mm-dd>'),
          },
        },
      }
    );
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = { getProductsByCategory, getPopularProducts, askQuestion };
