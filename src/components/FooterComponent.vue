<template>
  <div class="container">
    <div class="footer">
      <hr class="mt-1 mb-3"/>
      <div class="row d-flex align-items-center">
        <div class="col-12 col-md-4 mobile-mode">
          <div style="font-size: 0.9rem;" class="text-md-start text-center">
            © 2024 My Space, Inc
          </div>
        </div>
        <div class="col-12 col-md-4 mobile-mode">
          <div class="justify-content-center text-center">
            <img style="width: 80px; height: auto;" src="/images/logo.png" alt="..." />
          </div>
        </div>
        <div class="col-12 col-md-4 mobile-mode">
          <div class="text-md-end text-center">
            <div class="footer-nav-links">
              <router-link class="footer-link" to="/">Card board</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}

</script>

<style scoped>

.footer-nav-links {
  font-size: 0.9rem;
}

.footer-link {
  text-decoration: none;
  color: #1B5AAC;
}

@media only screen and (max-width: 600px) {
  .mobile-mode {
    margin-top: 15px;
  }
}

</style>
