import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCd67UogtOvMbkCuKHAjf3_9xuwKCKcwY4",
    authDomain: "spot-52579.firebaseapp.com",
    projectId: "spot-52579",
    storageBucket: "spot-52579.appspot.com",
    messagingSenderId: "1085672998588",
    appId: "1:1085672998588:web:b79f9b49adfe87077c72b9",
    measurementId: "G-3KF7VVYBT5"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);