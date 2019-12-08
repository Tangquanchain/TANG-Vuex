
import axios from 'axios';

export default {
  namespaced: true,
  strict: true,
  state: {
    coupon_code: [],
    pagination: {}
  },
  actions: {
    getCoupon (context, page) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then(response => {
        context.commit('LOADING', false, { root: true });
        context.commit('COUPONCODE', response.data.coupons);
        context.commit('PAGINATION', response.data.pagination);
      });
    }
  },
  mutations: {
    COUPONCODE (state, status) {
      state.coupon_code = status;
    },
    PAGINATION (state, status) {
      state.pagination = status;
    }
  },
  getters: {
    coupon_code (state) {
      return state.coupon_code;
    },
    pagination (state) {
      return state.pagination;
    }
  }
}
