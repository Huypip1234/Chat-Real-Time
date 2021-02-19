// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase.js');

var firebaseConfig = {
    apiKey: "AIzaSyBF23vY3ovSgvfoPr8k8PgYEb5eel0lfHs",
    authDomain: "bruhchatt.firebaseapp.com",
    projectId: "bruhchatt",
    storageBucket: "bruhchatt.appspot.com",
    messagingSenderId: "836575476310",
    appId: "1:836575476310:web:578c1b8b6e501b8fc519f7",
    measurementId: "G-1JEMB07XWV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Bạn có tin nhắn mới nè!!!';
    const notificationOptions = {
      body: payload.data.message,
      icon: payload.data.icon,
    };
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
