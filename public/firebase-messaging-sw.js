importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDkjJ1mFIgDgUg-j2sT41VHOs-Mn2JyxKc",
  authDomain: "transport-ease-a2183.firebaseapp.com",
  projectId: "transport-ease-a2183",
  storageBucket: "transport-ease-a2183.firebasestorage.app",
  messagingSenderId: "640785840814",
  appId: "1:640785840814:web:cba910609b4ec07f224b3f",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.data;
  const formattedTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const notificationOptions = {
    // body: `${body} at ${new Date(time).toLocaleTimeString()} time:${time} new Date(time): ${new Date(time)}`,
    body: `${body} at ${formattedTime}`,
    icon: icon || "/icon512_rounded.png", // Fallback icon
    tag: Date.now().toString(),
  };
  self.registration.showNotification(title, notificationOptions);
});

// Handle notification click event
self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");
  event.notification.close(); // Close the notification
  const redirectUrl = "/chat"; // Your desired redirect URL
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === redirectUrl && "focus" in client) {
            console.log("Found a matching client:", client);
            return client.focus();
          }
        }
        if (clients.openWindow) {
          console.log("Opening new window with URL:", redirectUrl);
          return clients.openWindow(redirectUrl);
        }
      })
  );
});
