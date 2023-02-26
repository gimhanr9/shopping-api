const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  productId: { type: String, required: true },
  questions: [
    {
      name: { type: String },
      question: { type: String },
      answer: { type: String },
      date: { type: Date },
    },
  ],
});

module.exports = mongoose.model('Question', RatingSchema);
