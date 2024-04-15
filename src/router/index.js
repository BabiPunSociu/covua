import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomeRouter",
      // component: Home
      // component: () => import("../views/home/Home.vue"),

      children: [
        {
          path: "",
          name: "HomeRouter",
          component: () => import("../views/home/Home.vue"),
        },
      ],
    },

    {
      path: "/login",
      name: "LoginRouter",
      // component: LoginView
      component: () => import("../views/login/Login.vue"),
    },

    {
      path: "/register",
      name: "RegisterRouter",
      // component: RegisterView
      component: () => import("../views/register/Register.vue"),
    },

    {
      path: "/forgotPassword",
      name: "ForgotPasswordRouter",
      // component: ForgotPasswordView
      component: () => import("../views/forgotpassword/ForgotPassword.vue"),
    },

    {
      path: "/:catchAll(.*)", // Bắt tất cả
      name: "NotFoundRouter",
      // component: NotFound
      component: () => import("../views/notfoundpage/NotfoundPage.vue"),
    },
  ],
});

export default router;
