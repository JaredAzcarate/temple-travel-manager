import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getFirebaseClientConfig } from "./config/client.config";

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function initializeFirebaseClient(): void {
  if (getApps().length === 0) {
    const config = getFirebaseClientConfig();
    app = initializeApp(config);
  } else {
    app = getApps()[0];
  }

  auth = getAuth(app);
  firestore = getFirestore(app);
}

if (typeof window !== "undefined") {
  initializeFirebaseClient();
}

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    initializeFirebaseClient();
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    initializeFirebaseClient();
  }
  return auth;
}

export function getFirebaseFirestore(): Firestore {
  if (!firestore) {
    initializeFirebaseClient();
  }
  return firestore;
}

