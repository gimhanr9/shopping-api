const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  productId: { type: String, required: true },
  questions: [
    {
      userId: { type: String },
      name: { type: String },
      question: { type: String },
      answer: { type: String },
      date: { type: Date },
    },
  ],
});

module.exports = mongoose.model('Question', RatingSchema);
