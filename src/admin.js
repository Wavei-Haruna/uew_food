// admin.js
import admin from 'firebase-admin';
import serviceAccount from './svak.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://online-food-74ff3.firebaseio.com'
});

const db = admin.firestore();

export { admin, db };
