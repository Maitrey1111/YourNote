import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDknoUcgkOR9TNBYsv-rl7XfIgrxhgO9t0",
  authDomain: "login-proj-2b2c0.firebaseapp.com",
  projectId: "login-proj-2b2c0",
  storageBucket: "login-proj-2b2c0.appspot.com",
  messagingSenderId: "991252849124",
  appId: "1:991252849124:web:8bd8e9946699e1e514a7f1",
  measurementId: "G-YYTLB937RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

