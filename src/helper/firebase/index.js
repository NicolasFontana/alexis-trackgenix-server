import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.REACT_APP_FIREBASE_TYPE,
    project_id: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    private_key_id: process.env.REACT_APP_FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
    client_id: process.env.REACT_APP_FIREBASE_CLIENT_ID,
    auth_uri: process.env.REACT_APP_FIREBASE_AUTH_URI,
    tokern_uri: process.env.REACT_APP_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.REACT_APP_FIREBASE_AUTH_PROVIDER,
    client_x509_cert_url: process.env.REACT_APP_FIREBASE_CLIENT_URL,
  }),
});

export default firebaseApp;
