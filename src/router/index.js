import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    /**
     * Render component 'Layout'.
     */
    {
      path: "/",
      name: "LayoutRouter",
      // component: Layout dùng chung có header, sidebar.
      component: () => import("../components/layout/thelayout/TheLayout.vue"),
      /**
       * Render component con của component 'Layout'.
       */
      children: [
        // Render component 'Home'. => URL="/"
        {
          path: "",
          name: "HomeRouter",
          // component: HomeView
          component: () => import("../views/home/Home.vue"),
        },
      ],
    },

    /**
     * Render component 'Login'.
     */
    {
      path: "/login",
      name: "LoginRouter",
      // component: LoginView
      component: () => import("../views/login/Login.vue"),
    },

    /**
     * Render component 'Register'.
     */
    {
      path: "/register",
      name: "RegisterRouter",
      // component: RegisterView
      component: () => import("../views/register/Register.vue"),
    },

    /**
     * Render component 'ForgotPassword'.
     */
    {
      path: "/forgotPassword",
      name: "ForgotPasswordRouter",
      // component: ForgotPasswordView
      component: () => import("../views/forgotpassword/ForgotPassword.vue"),
    },

    /**
     * Render component 'NotFound'.
     */
    {
      path: "/:catchAll(.*)", // Bắt tất cả
      name: "NotFoundRouter",
      // component: NotFound
      component: () => import("../views/notfoundpage/NotfoundPage.vue"),
    },
  ],
});

export default router;
