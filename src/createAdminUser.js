import admin from 'firebase-admin';
import { promises as fs } from 'fs';
import path from 'path';

const serviceAccountPath = path.resolve('./svak.json');
const serviceAccount = JSON.parse(await fs.readFile(serviceAccountPath, 'utf-8'));

// Initialize the admin app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function createAdminUser() {
  try {
    // Create a new user
    const userRecord = await admin.auth().createUser({
      email: 'admin@gmail.com',
      password: '000000',
      displayName: 'Admin',
      phoneNumber: '+233551837449', // Ensure the phone number is in E.164 format
    });

    console.log('Successfully created new user:', userRecord.uid);

    // Set the user's custom claims to give them the admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });

    // Add user data to Firestore
    const userDocRef = db.collection('users').doc(userRecord.uid);
    await userDocRef.set({
      email: 'admin@gmail.com',
      name: 'Admin',
      phone: +233551837449,
      role: 'admin',
    });

    console.log('Successfully set admin role and added user to Firestore');
  } catch (error) {
    console.error('Error creating new user:', error);
  }
}

createAdminUser();
