// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDMXvHN_RVMfJ9M_8wLEQXzg9PPLP5Mq9g',
    authDomain: 'healthygeneration-ff496.firebaseapp.com',
    projectId: 'healthygeneration-ff496',
    storageBucket: 'healthygeneration-ff496.appspot.com',
    messagingSenderId: '282008668197',
    appId: '1:282008668197:web:980ebd32ef8227b93697cc',
    measurementId: 'G-MQLN70HTMF',
    databaseURL: 'https://healthygeneration-ff496-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
