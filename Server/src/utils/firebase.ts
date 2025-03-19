import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(require('../../serviceAccountKey.json')),
    databaseURL: 'https://milim-app.firebaseapp.com',
});

export const db = admin.firestore();
export const auth = admin.auth();
