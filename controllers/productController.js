const Product = require('../models/product');
const Question = require('../models/question');

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(8);
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const askQuestion = async (req, res) => {
  try {
    const { id, name } = req.user;
    const { productId, question } = req.body;

    if (!productId || !question) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    await Question.updateOne(
      { productId: productId },
      {
        $push: {
          questions: {
            userId: id,
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
