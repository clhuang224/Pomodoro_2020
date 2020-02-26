import Vue from "vue";
import VueRouter from "vue-router";
import Pomodoro from "@/views/Pomodoro.vue";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard";
import Ringtones from "@/views/Ringtones";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Pomodoro",
    component: Pomodoro,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        children: [
          {
            path: "/todolist",
            name: "Todolist"
          },
          {
            path: "/analytics",
            name: "Analytics"
          },
          {
            path: "/ringtones",
            name: "Ringtones",
            component: Ringtones
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
