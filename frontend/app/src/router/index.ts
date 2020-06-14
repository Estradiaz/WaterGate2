import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from "@/views/Home.vue";
import JobsView from "@/views/Jobs.vue";
import Devices from "@/views/Devices.vue";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: ()=> import("@/views/Dashboard.vue"),
    name: "Dashboard"
  },
  {
    path: '/jobs',
    component: JobsView,
    name: "Jobs"
  },
  {
    path: '/devicestate',
    component: ()=>import("@/views/DeviceState.vue"),
    name: "DeviceState"
  },
  {
    path: '/devices',
    component: Devices,
    name: "Device"
  },
  {
    path: '/hardware',
    component: ()=>import("@/views/Hardware.vue"),
    name: "Hardware"
  }
  
]

const router = new VueRouter({
  routes
})

export default router
