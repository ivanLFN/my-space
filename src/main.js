import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_j-Ir45JRR2df0jP2Hf3ooH4LeLqe7nQ",
  authDomain: "my-space-602d6.firebaseapp.com",
  projectId: "my-space-602d6",
  storageBucket: "my-space-602d6.appspot.com",
  messagingSenderId: "646450159721",
  appId: "1:646450159721:web:b73877751c9bc30aaec2f8"
};

initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
