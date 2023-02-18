const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

module.exports = { url: DB_URL + DB_NAME };
