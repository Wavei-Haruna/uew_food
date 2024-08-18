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

async function deleteAdminUser(email) {
  try {
    // Find the user by email
    const userRecord = await admin.auth().getUserByEmail(email);

    // Delete the user from Firebase Authentication
    await admin.auth().deleteUser(userRecord.uid);
    console.log(`Successfully deleted user with email: ${email}`);

    // Remove the user from Firestore
    const userDocRef = db.collection('users').doc(userRecord.uid);
    await userDocRef.delete();
    console.log('Successfully deleted user data from Firestore');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

async function createAdminUser(newAdminEmail, newAdminPassword, newAdminDisplayName, newAdminPhoneNumber) {
  try {
    // Create a new user
    const userRecord = await admin.auth().createUser({
      email: newAdminEmail,
      password: newAdminPassword,
      displayName: newAdminDisplayName,
      phoneNumber: newAdminPhoneNumber, // Ensure the phone number is in E.164 format
    });

    console.log('Successfully created new user:', userRecord.uid);

    // Set the user's custom claims to give them the admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });

    // Add user data to Firestore
    const userDocRef = db.collection('users').doc(userRecord.uid);
    await userDocRef.set({
      email: newAdminEmail,
      name: newAdminDisplayName,
      phone: newAdminPhoneNumber,
      role: 'admin',
    });

    console.log('Successfully set admin role and added user to Firestore');
  } catch (error) {
    console.error('Error creating new user:', error);
  }
}

async function updateAdminUser() {
  // Step 1: Delete the old admin user
  await deleteAdminUser('admin@gmail.com'); // Replace with the email of the old admin

  // Step 2: Create the new admin user
  await createAdminUser('admin1@gmail.com', 'newPwd', 'New Admin', '+233551837449');
}

updateAdminUser();
