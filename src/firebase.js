import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAb2HF71QYwFfd3-hDOIThNA8wp10cSFcQ',
  authDomain: 'online-food-74ff3.firebaseapp.com',
  projectId: 'online-food-74ff3',
  storageBucket: 'online-food-74ff3.appspot.com',
  messagingSenderId: '649937243425',
  appId: '1:649937243425:web:c4813fa277b0ec83550260',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
