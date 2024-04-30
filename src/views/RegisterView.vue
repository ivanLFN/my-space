<template>
  <div>
    <div class="container base-container">
      <div class="nav-menu pt-3">
        <div class="d-flex align-items-center">
          <img class="default-logo" src="images/logo.png" alt="logo" />
          <router-link to="/sign-in" class="nav-item text-end w-100">
            Sign In
          </router-link>
        </div>
        <div class="register-form d-flex justify-content-center">
          <div class="default-form">
            <div class="input-itmes">
              <p><input type="text" class="base-input form-control" placeholder="Email" v-model="email" /></p>
              <input type="password" class="base-input form-control" placeholder="Password" v-model="password" />
            </div>
            <div class="d-flex justify-content-end">
              <button class="base-btn-white me-1" @click="signInWithGoogle">
                <img style="width: 30px; height: auto;" src="/images/icons8-google-64.png" alt="..." />
              </button>
              <button class="base-btn btn btn-primary btn-lg" @click="register">Register</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="errMsg" class="position-fixed end-0 p-3" style="z-index: 11; bottom: 100px;">
        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <img src="/images/logo.png" style="width: 25px; height: auto;" class="rounded me-2" alt="...">
            <strong class="me-auto">Error</strong>
            <button type="button" class="btn-close" @click="errMsg = ''" aria-label="Close"></button>
          </div>
          <div class="toast-body text-start">
            {{ errMsg }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer-position">
      <FooterComponent />
    </div>
  </div>
  
</template>

<script setup>
import FooterComponent from "@/components/FooterComponent.vue"
import { ref } from "vue"
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter()
const errMsg = ref() // ERROR MESSAGE

const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
      console.log("Successfully registered!");
      console.log(auth.currentUser)
      router.push('/user-board')
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/missing-password":
          errMsg.value = "Create a password";
          break;
        case "auth/missing-email":
          errMsg.value = "Enter email";
          break;
        default:
          errMsg.value = "Incorrect email";
          break;
      }
    })
}

// eslint-disable-next-line no-unused-vars
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      router.push('/user-board')
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/popup-closed-by-user":
          errMsg.value = "Popup window closed by user";
          break;
        default:
          errMsg.value = "Google authorization error";
          break;
      }
    })
}

</script>

<style scoped>

.register-form {
  margin-top: 20vh
}

</style>