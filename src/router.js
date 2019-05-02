import Vue from "vue";
import Router from "vue-router";
import Layout from "./views/Layout.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout
    },
    {
      path: "/:destination_id",
      name: "destination",
      component: Layout
    }
  ]
});
