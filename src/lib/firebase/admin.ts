import * as admin from "firebase-admin";

import serviceAccount from "../../../share-expenses-f6d36-firebase-adminsdk-fbsvc-f87418be54.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export const firestoreAdmin = admin.firestore();
export const adminSdk = admin;
