import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import cartsMudules from './carts';
import productsMudles from './products';
import productMudles from './product';
import orderMudles from './order';
import admincouponMudles from './admin-coupon';
import adminordersMudles from './admin-orders';
import adminproductsMudles from './admin-products';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING');
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status;
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading;
    }
  },
  modules: {
    productsMudles,
    cartsMudules,
    productMudles,
    orderMudles,
    admincouponMudles,
    adminordersMudles,
    adminproductsMudles
  }
})
