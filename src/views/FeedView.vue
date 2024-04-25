<template>
  <div>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const auth = getAuth();
const isLoggedIn = ref(false)
const router = useRouter(); // Get reference to vue router

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  })

}

</script>