const MongoClient = require('mongodb').MongoClient;

const main = async () => {
  const url = process.env.DB_URL;
  const dbName = process.env.DB_NAME;
  const client = new MongoClient(url);

  try {
    await client.connect();
  } catch (err) {}
};
