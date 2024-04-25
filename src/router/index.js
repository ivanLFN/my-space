import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {  path: "/", component: () => import("../views/HomeView.vue") },
  {  path: "/register", component: () => import("../views/RegisterView.vue") },
  {  path: "/sign-in", component: () => import("../views/SignInView.vue") },
  {
    path: "/feed",
    component: () => import("../views/FeedView.vue"),
    meta: {
      requireAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You don't have access!");
      next("/sign-in");
    }
  } else {
    next();
  }
});

export default router
