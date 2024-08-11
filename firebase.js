// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAJTtoqqA8cz0FxJFvZ1BS6D4UPtE4SZaU",
  authDomain: "pantry-tracker-f306d.firebaseapp.com",
  projectId: "pantry-tracker-f306d",
  storageBucket: "pantry-tracker-f306d.appspot.com",
  messagingSenderId: "461783114707",
  appId: "1:461783114707:web:21cbd58e8d6b5d2e22c526",
  measurementId: "G-6X1H5V3KXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

// export { app, firestore};
// export {firestore };

