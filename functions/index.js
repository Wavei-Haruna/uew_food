const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createVendor = functions.https.onCall(async (data, context) => {
  const { email, password, name, phone, address, location } = data;

  // Check if the request is authenticated as an admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can create vendors.'
    );
  }

  try {
    // Create user
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // Set custom user claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'vendor' });

    // Add vendor details to Firestore
    await admin.firestore().collection('vendors').doc(userRecord.uid).set({
      name: name,
      email: email,
      phone: phone,
      address: address,
      location: location,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { message: 'Vendor created successfully' };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});
