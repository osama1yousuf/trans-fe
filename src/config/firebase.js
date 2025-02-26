// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// export const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

// export const FIREBASE_VAPID_KEY = process.env.VAPID_KEY;

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const requestForToken = () => {
//   return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
//     .then((currentToken) => {
//       if (currentToken) {
//         return currentToken;
//       } else {
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//         return null;
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token - " + err);
//       return null;
//     });
// };

// onMessage(messaging, ({ notification }) => {
//   new Notification(notification.title, {
//     body: notification.body,
//     icon: notification.icon,
//   });
// });

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
  messaging = getMessaging(app);
}

export const requestForToken = () => {
  if (!messaging) return Promise.resolve(null); // Prevent execution on server

  return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token - " + err);
      return null;
    });
};

// Ensure onMessage runs only in browser
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  onMessage(messaging, ({ notification }) => {
    new Notification(notification.title, {
      body: notification.body,
      icon: notification.icon,
    });
  });
}

export { messaging };
