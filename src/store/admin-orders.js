
import axios from 'axios';

export default {
  namespaced: true,
  strict: true,
  state: {
    order: {
      user: {}
    },
    prodata: [],
    pagination: {}
  },
  actions: {
    getOrder (context, orderId) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
      axios.get(api).then(response => {
        context.commit('ORDER', response.data.order);
      });
    },
    payOrder (context, orderId) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`;
      axios.post(api).then(response => {
        if (response.data.success) {
          context.dispatch('getOrder', orderId); // 付款完成後重新整理頁面來判斷是否付款
        }
      });
    },
    getProduct (context, page = 1) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      axios.get(api).then(response => {
        context.commit('LOADING', false, { root: true });
        context.commit('PRODATA', response.data.orders);
        context.commit('PAGINATION', response.data.pagination);
      });
    }
  },
  mutations: {
    ORDER (state, status) {
      state.order = status;
    },
    PRODATA (state, status) {
      state.prodata = status;
    },
    PAGINATION (state, status) {
      state.pagination = status;
    }
  },
  getters: {
    order (state) {
      return state.order;
    },
    prodata (state) {
      return state.prodata;
    },
    pagination (state) {
      return state.pagination;
    }
  }
}
