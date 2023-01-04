import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Skills from "../views/Skills.vue";
import Task from "../views/Task.vue";
import Notes from "../views/Notes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/skills",
    name: "skills",
    component: Skills
  },
  {
    path: "/task",
    name: "task",
    component: Task,
    beforeEnter(to: any, from: any, next: any) {
      if (to.params.id) next();
      else next({ name: "home" });
    }
  },

  {
    path: "/notes",
    name: "notes",
    component: Notes
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
