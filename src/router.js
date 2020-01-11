import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import Settings from "@/views/Settings";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/dashboard"
    },
    {
      path: "/",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: Login
      //component: () =>
      //  import(/* webpackChunkName: "about" */ "./viewss/About.vue")
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/plants",
      name: "Plants",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/plants/plants.vue"),
      meta: {
        requiresAuth: true
      }
    },{
      path: "/strains", // GET index
      name: "Strains",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/strains/list.vue"),
      meta: {
        requiresAuth: true
      }
    },
    
    {
      path: "/strains/edit/:id?", // EDIT by Id or ADD
      name: "Strains - Edit",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/strains/edit.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/strains/:id", // GET one by id
      name: "Strain - Single",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/strains/single.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/addEditPlant/:id?",
      name: "Add Edit Plant",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/plants/addEditPlant.vue"
        ),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
