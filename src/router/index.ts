import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createMemoryHistory
} from 'vue-router'
import type { Router } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

function getRouterByEntry (isClient: boolean): Router {
  return createRouter({
    history: isClient ? createWebHistory() : createMemoryHistory(),
    routes
  })
}

export default getRouterByEntry
