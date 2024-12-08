import * as admin from "firebase-admin";

let app: admin.app.App | null = null;

function initializeApp(): admin.app.App {
  if (!app) {
    if (!admin.apps.length) {
      const serviceAccountJson = JSON.stringify({
        project_id: process.env.FIREBASE_PROJECT_ID!,
        private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/gm, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL!,
      });
      const serviceAccount: admin.ServiceAccount =
        JSON.parse(serviceAccountJson);

      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      app = admin.app();
    }
  }
  return app;
}

export { initializeApp };
