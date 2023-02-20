const { productData } = require('./data/productData');

const MongoClient = require('mongodb').MongoClient;

const main = async () => {
  const client = new MongoClient(process.env.DB_URL);

  try {
    await client.connect();
    //const database = client.db(process.env.DB_NAME);
    //const productsCollection = connection.createCollection('products');
    const productsCollection = client
      .db(process.env.DB_NAME)
      .collection('products');
    productsCollection.drop();
    productsCollection.insertMany(productData);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

main();
