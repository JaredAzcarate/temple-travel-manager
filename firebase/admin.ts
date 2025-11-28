import { getApps, cert, initializeApp, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminFirestore: Firestore | null = null;

export function getFirebaseAdminApp(): App {
  if (adminApp) {
    return adminApp;
  }

  if (getApps().length > 0) {
    adminApp = getApps()[0];
  } else {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    
    if (!projectId) {
      throw new Error("Firebase Admin project ID not configured. Set FIREBASE_ADMIN_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID");
    }

    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      throw new Error(
        "Firebase Admin credentials not configured. " +
        "Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY environment variables, " +
        "or use a service account JSON file."
      );
    }

    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("no configuration corresponding")) {
        throw new Error(
          `Firebase Admin configuration error: The project ID "${projectId}" does not match the service account credentials. ` +
          `Please verify that:\n` +
          `1. FIREBASE_ADMIN_PROJECT_ID matches the "project_id" in your service account JSON\n` +
          `2. FIREBASE_ADMIN_CLIENT_EMAIL matches the "client_email" in your service account JSON\n` +
          `3. FIREBASE_ADMIN_PRIVATE_KEY is correctly formatted with \\n for line breaks\n` +
          `4. All credentials belong to the same Firebase project`
        );
      }
      
      throw new Error(`Firebase Admin initialization failed: ${errorMessage}`);
    }
  }

  return adminApp;
}

export function getFirebaseAdminAuth(): Auth {
  if (adminAuth) {
    return adminAuth;
  }

  const app = getFirebaseAdminApp();
  adminAuth = getAuth(app);
  return adminAuth;
}

export function getFirebaseAdminFirestore(): Firestore {
  if (adminFirestore) {
    return adminFirestore;
  }

  const app = getFirebaseAdminApp();
  adminFirestore = getFirestore(app);
  return adminFirestore;
}

