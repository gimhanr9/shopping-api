const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./models/product');
const app = express();
const PORT = process.env.PORT || 4000;

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const favouriteRouter = require('./routes/favouriteRoutes');
const cartRouter = require('./routes/cartRoutes');
const purchaseRouter = require('./routes/purchaseRoutes');

var corsOptions = {
  origin: process.env.REACT_APP_URL,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.on('error', console.error.bind(console, 'MongoDB connection failed'));

app.listen(PORT, () => {
  console.log('Server started!');
});

app.use('/api/', userRouter);
app.use('/api/', productRouter);
app.use('/api/', favouriteRouter);
app.use('/api/', cartRouter);
app.use('/api/', purchaseRouter);
