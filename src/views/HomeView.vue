<template>
  <div>
    <div class="full-background">
      <div class="container">
        <img v-show="isAnimating" class="moving-image" src="images/icons8-line-80.png" alt="..." />
        <div class="d-flex align-items-center mt-5">
          <div class="company-title text-start">
            My&nbsp;Space
          </div>
          <div v-if="!collapseMenu" class="w-100 text-end">
            <router-link to="/sign-in" class="home-nav-link me-3">Sign&nbsp;In</router-link>
            <router-link to="/register" class="home-nav-link-blue">Registration</router-link>
          </div>
          <div class="collapse" id="navbarToggleExternalContent">
            <div class="row text-end mt-5">
              <router-link to="/sign-in" class="home-nav-link me-3">Sign&nbsp;In</router-link>
              <router-link to="/register" class="home-nav-link">Registration</router-link>
            </div>
          </div>
          <nav v-if="collapseMenu" class="navbar navbar-dark">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </nav>
        </div>
        <div class="slogan">
          You have a reliable tool for every day
        </div>
        <p class="mt-3" style="color: gray;">Build and design faster with My Space — the visual workspace for innovation.</p>
        <div class="fast-sign-up">
          <p style="color: white;">Use work email</p>
          <div class="d-flex justify-content-center">
            <div class="col-12 col-md-4 d-flex">
              <input type="text" class="base-input form-control" placeholder="Email" v-model="email" />
              <router-link to="/register" class="base-btn btn btn-primary btn-lg">Sign&nbsp;Up</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const speed = 25;
let x = -100;
let y = -100;
const isAnimating = ref(false);
let collapseMenu = ref(false);

onMounted(() => {
  setTimeout(() => {
    isAnimating.value = true;
    moveImage();
  }, 5000);
  collapseMenu.value = window.innerWidth <= 768;
});

function moveImage() {
  try {
    const containerWidth = document.querySelector('.container').clientWidth + 100;
    const containerHeight = document.querySelector('.container').clientHeight +100;
    const imageWidth = document.querySelector('.moving-image').clientWidth;
    const imageHeight = document.querySelector('.moving-image').clientHeight;

    let targetX = containerWidth - imageWidth;
    let targetY = containerHeight - imageHeight;

    const moveInterval = setInterval(() => {
      x += speed;
      y += speed;

      document.querySelector('.moving-image').style.left = x + 'px';
      document.querySelector('.moving-image').style.top = y + 'px';

      if (x >= targetX || y >= targetY) {
        clearInterval(moveInterval);
        isAnimating.value = false;
      }
    }, 10);
  } catch {
    console.error('An error occurred');
  }
  
}
</script>

<style scoped>

.navbar {
  position: absolute;
  top: 40px;
  right: 20px;
}

.slogan {
  color: white;
  font-size: 5rem;
  margin-top: 20vh;
}

.home-nav-link {
  font-size: 1.2rem;
  text-decoration: none;
  color: #1B5AAC;
}

.home-nav-link-blue {
  font-size: 1.2rem;
  text-decoration: none;
  color: white;
  background-color: #1B5AAC;
  padding: 8px 10px;
}

.company-title {
  font-size: 1.8rem;
  color: white;
}

.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.fast-sign-up {
  margin-top: 80px;
}

@media only screen and (max-width: 600px) {
  .container {
    overflow-y: auto;
  }
  .company-title {
    font-size: 1.5rem;
  }
  .slogan {
    font-size: 2rem;
  }
}

.moving-image {
  position: absolute;
  left: 0;
  top: 0;
}

.full-background {
  background: url('https://firebasestorage.googleapis.com/v0/b/my-space-602d6.appspot.com/o/nature.jpg?alt=media&token=04cd7bd9-afbd-4910-9f76-97022c1585fa') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100%;
}

</style>
