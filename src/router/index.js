import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomePage.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.data[0].is_verified == "false") {
            next({ name: "Unverified" });
          } else {
            next();
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
    },
  },
  {
    path: "/report",
    name: "Report",
    component: () => import("../views/ReportPage.vue"),
    beforeEnter: (to, from, next) => {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.data[0].is_verified == "false") {
            next({ name: "Unverified" });
          } else {
            next();
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
    },
  },

  {
    path: "/forgot-password",
    name: "ForgetPasswordPage",
    component: () => import("../views/ForgetPasswordPage.vue"),
  },

  {
    path: "/cms",
    name: "Cms",
    component: () => import("../views/CmsPage.vue"),
    beforeEnter: (to, from, next) => {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.data[0].is_verified == "false") {
            next({ name: "Unverified" });
          } else if (response.data[0].role != "admin") {
            alert("Anda tidak memiliki akses!");
            next({ name: "Home" });
          } else {
            next();
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
    },
  },

  {
    path: "/manage-account",
    name: "ManageAccount",
    component: () => import("../views/ManageAccount.vue"),
    beforeEnter: (to, from, next) => {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.data[0].is_verified == "false") {
            next({ name: "Unverified" });
          } else if (response.data[0].role != "admin") {
            alert("Anda tidak memiliki akses!");
            next({ name: "Home" });
          } else {
            next();
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
    beforeEnter: (to, from, next) => {
      const session = localStorage.getItem("access_token");
      if (to.name == "Login" && session) next({ name: "Home" });
      else next();
    },
  },

  {
    path: "/reset-password",
    name: "ResetPasswordPage",
    component: () => import("../views/ResetPasswordPage.vue"),
  },

  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/RegistrationPage.vue"),
    beforeEnter: (to, from, next) => {
      const session = localStorage.getItem("access_token");
      if (to.name == "Registration" && session) next({ name: "Home" });
      else next();
    },
  },

  {
    path: "/unverified",
    name: "Unverified",
    component: () => import("../views/UnverifyPage.vue"),
    beforeEnter: (to, from, next) => {
      axios
        .get(`${process.env.VUE_APP_SERVER_URL}me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.data[0].is_verified == "false") {
            next();
          } else {
            next({ name: "Home" });
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
