import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/direction', 
    name: 'direction',
    component: () => import(/* webpackChunkName: "direction" */ '../components/list/DirectionList.vue')
  },
  {
    path: '/pupil',
    name: 'pupil',
    component: () => import(/* webpackChunkName: "pupil" */ '../components/list/PupilList.vue')
  },
  {
    path: '/group',
    name: 'group',
    component: () => import(/* webpackChunkName: "group" */ '../components/list/GroupList.vue')
  },
  {
    path: '/worker',
    name: 'worker',
    component: () => import(/* webpackChunkName: "group" */ '../components/list/WorkerList.vue')
  },
  {
    path: '/spending',
    name: 'spending',
    component: () => import(/* webpackChunkName: "spending" */ '../components/list/SpendingList.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import(/* webpackChunkName: "payment" */ '../components/list/PaymentList.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
