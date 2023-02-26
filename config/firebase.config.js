const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'shopping-api-6d9bc.appspot.com',
});

const bucket = getStorage().bucket();

module.exports = bucket;
