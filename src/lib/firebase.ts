import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDVIXTrWOz_cLxNY0qpfm337cM_Y6YZix8",
    authDomain: "forsee-ai-e4b28.firebaseapp.com",
    projectId: "forsee-ai-e4b28",
    storageBucket: "forsee-ai-e4b28.firebasestorage.app",
    messagingSenderId: "682369861755",
    appId: "1:682369861755:web:9a9dd6caf12c273fc7bade",
    measurementId: "G-1QYK4V1HDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
