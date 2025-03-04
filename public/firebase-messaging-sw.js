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
    console.log("Received background message:", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/icon.png", // Path to your notification icon
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  // fetch("/firebase-config.json")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((jsContent) => {
  //     const config = eval(jsContent);
  //     firebase.initializeApp(config.firebaseConfig);
  //     firebase.messaging();
  //   })
  //   .catch((error) => {
  //     console.error("Error initializing Firebase in service worker:", error);
  //   });
