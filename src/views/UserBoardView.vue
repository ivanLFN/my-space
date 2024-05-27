<template>
  <div>
    <div class="px-4">
      <a type="button" class="d-flex text-start mt-3" @click="toggleOffcanvas">
        <img src="/images/icons8-double-arrow-50-right.png" alt="..." />
      </a>
    </div> 
    <div :class="['offcanvas', 'offcanvas-start', { show: isOffcanvasVisible }]" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-body">
        <div class="d-flex align-items-center justify-content-end">
          <div class="w-100 text-start">
            <div class="dropdown">
              <a type="button" class="d-flex align-items-center currentUserData" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                <div>
                  <img class="userImageURL" :src="getUserPhotoURL()" alt="photoURL"/>
                </div>
                <div class="currentUserName">
                  {{ getUserDisplayName() }}
                </div>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><div class="d-flex">
                  <div>
                    <img class="userImage" :src="getUserPhotoURL()" alt="photoURL"/>
                  </div>
                  <div>
                    <div class="user-email">{{ getUserEmail() }}</div>
                    <div class="user-plan">Free Plan: Dev Mode</div>
                    <hr style="text-align:left;">
                    <div class="d-flex justify-content-end">
                      <a type="button" class="sign-out text-end" @click="handleSignOut" v-if="isLoggedIn">Sign out</a>
                    </div>
                  </div>
                </div></li>
              </ul>
            </div>
          </div>
          <div>
            <a type="button" @click="toggleOffcanvas">
              <img src="/images/icons8-double-arrow-50.png" alt="..." />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const auth = getAuth();
const isLoggedIn = ref(false);
const isOffcanvasVisible = ref(true);
const router = useRouter();

const checkMobileMode = () => {
  return window.innerWidth > 768;
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });

  isOffcanvasVisible.value = checkMobileMode();
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  })
}

const toggleOffcanvas = () => {
  isOffcanvasVisible.value = !isOffcanvasVisible.value;
}

const getUserPhotoURL = () => {
  return auth.currentUser?.photoURL || '/images/icons8-avatar-50.png';
}

const getUserDisplayName = () => {
  return auth.currentUser?.displayName || '';
}

const getUserEmail = () => {
  return auth.currentUser?.email || '';
}

</script>

<style scoped>
  .userImage {
    width: 60px;
    height: auto;
  }
  .userImageURL {
    width: 40px;
    height: 40px;
    border: 2px solid black;
  }

  .currentUserData {
    text-decoration: none;
    color: black;
  }

  .currentUserName {
    font-size: 1.3rem;
    margin-left: 15px;
  }

  .dropdown-menu {
    border: 2px solid rgb(209, 209, 209);
    border-radius: 0px;
    padding: 10px;
  }
  .user-email {
    font-size: 0.9rem;
    margin-left: 10px;
  }
  .user-plan {
    font-size: 0.8rem;
    color: #1B5AAC;
    margin-left: 10px;
  }
  .sign-out {
    border-radius: 0px;
    background-color: #1B5AAC;
    border: none;
    font-size: 1rem;
    color: white;
    padding: 5px 20px;
    text-decoration: none;
    margin-left: 10px;
  }
</style>