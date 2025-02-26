importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Firebase configuration (replace with your actual Firebase config)
firebase.initializeApp({
    firebase: {
        apiKey: "AIzaSyAdRGAC0pEvIhASdnzFa4j_vIDL-2gueZo",
        authDomain: "tedbus-ee0fe.firebaseapp.com",
        projectId: "tedbus-ee0fe",
        storageBucket: "tedbus-ee0fe.firebasestorage.app",
        messagingSenderId: "732780127025",
        appId: "1:732780127025:web:280c1c470c903d58a1c610",
        measurementId: "G-CRQZWGKG26",
        vapidKey: "BE_JTNxPOVx0NFOk6Q7kdg8Dio784LnuvNTgpfhZlnaPiGZjifr1zXVq4texjRAYL4QZJsCf7iCIJuwzt6HUXHc",
    }
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    });
});
