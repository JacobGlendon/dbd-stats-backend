// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require('firebase/firestore');


// const firebaseConfig = {
//     apiKey: "AIzaSyDcHDjFghvsJfET8cyDsFwUVDy-vkK-1ZU",
//     authDomain: "dbdhub.firebaseapp.com",
//     projectId: "dbdhub",
//     storageBucket: "dbdhub.appspot.com",
//     messagingSenderId: "871751845958",
//     appId: "1:871751845958:web:daa489c3d6a06ef9166247",
//     measurementId: "G-5NNVTS4Z6P"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// module.exports = getFirestore(firebaseApp);

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Export initialized Firestore instance
module.exports = admin.firestore();