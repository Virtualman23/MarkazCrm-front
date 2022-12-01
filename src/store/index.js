import { createStore } from 'vuex'

import helper from './helpers'
import direction from './moduls/direction'
import pupil from './moduls/pupil'
import group from './moduls/group'
import worker from './moduls/worker'
import spending from './moduls/spending'
import payment from './moduls/payment'

export default createStore({
  state: {
    url:'http://localhost:5070',
    i:0
  },
  getters: {
    url(state){
      return state.url
    },
    i(state){
      return state.i
    }
  },
  mutations: {
    i(state,payload){
      state.i = payload
    }
  },
  actions: {
    i(context,payload){
      context.commit('i',payload)
    }
  },
  modules: {
    helper,
    direction,
    pupil,
    group,
    worker,
    spending,
    payment
  }
})
