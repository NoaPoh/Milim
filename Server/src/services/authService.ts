import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (this is required for backend authentication)
admin.initializeApp();

const auth = admin.auth();

export { auth };
