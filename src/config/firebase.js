import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

export const FIREBASE_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;

// Initialize Firebase only on the client
let messaging;
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  const app = initializeApp(firebaseConfig);
  // messaging = getMessaging(app);
}

export const requestForToken = () => {
  if (!messaging) return Promise.resolve(null); // Prevent execution on server

  return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        // console.log("No registration token available. Request permission to generate one.");
        return null;
      }
    })
    .catch((err) => {
      // console.log("An error occurred while retrieving token - " + err);
      return null;
    });
};

// Handle foreground messages silently
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  // onMessage(messaging, (payload) => {
  //   // console.log("Foreground message received:", payload);
  //   // Handle the payload silently (e.g., update UI)
  //   // Do not show a notification here
  // });
}

export { messaging };