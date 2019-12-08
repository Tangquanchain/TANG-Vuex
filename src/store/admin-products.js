
import axios from 'axios';
export default {
  namespaced: true,
  strict: true,
  state: {
    products: [],
    carts: [],
    cartTotal: '', // 加入購物車總價格
    cartFinal_Total: '', // 折扣價
    coupon_code: '',
    pagination: {},
    adminproducts: [],
    messages: []
  },
  actions: {
    getProducts (context, page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page${page}`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then(response => {
        context.commit('LOADING', false, { root: true });
        context.commit('PRODUCTS', response.data.products);
      });
    },
    // products.vue
    getCartProduct (context) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then(response => {
        context.commit('LOADING', false, { root: true });
        context.commit('CARTS', response.data.data.carts);
        context.commit('CARTTOTAL', response.data.data.total);
        context.commit('CARTFINIAL_TOTAL', response.data.data.final_total);
      });
    },
    removeCart (context, id) {
    // 刪除購物車
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(api).then(() => {
        context.dispatch('getCartProduct');
        context.commit('LOADING', false, { root: true });
      });
    },
    // Products.vue
    getadminProducts (context, page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then(response => {
        context.commit('LOADING', false, { root: true });
        context.commit('ADMINPRODUCTS', response.data.products);
        context.commit('PAGINATION', response.data.pagination);
      });
    },
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      const messages = {
        message,
        status,
        timestamp
      };
      context.commit('MESSAGESPUSH', messages);
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessage (context, num) {
      context.commit('MESSAGEREMOVE', num);
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('MESSAGETIMEING', timestamp);
      }, 5000);
    }
  },
  mutations: {
    PRODUCTS (state, status) {
      state.products = status;
    },
    CARTS (state, status) {
      state.carts = status;
    },
    CARTTOTAL (state, status) {
      state.cartTotal = status;
    },
    CARTFINIAL_TOTAL (state, status) {
      state.cartFinal_Total = status;
    },
    ADMINPRODUCTS (state, status) {
      state.adminproducts = status;
    },
    PAGINATION (state, status) {
      state.pagination = status;
    },
    MESSAGESPUSH (state, payload) {
      state.messages.push(payload);
    },
    MESSAGEREMOVE (state, payload) {
      state.messages.splice(payload, 1);
    },
    MESSAGETIMEING (state, payload) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.messages.splice(i, 1);
        }
      });
    }
  },
  getters: {
    products (state) {
      return state.products;
    },
    carts (state) {
      return state.carts;
    },
    cartTotal (state) {
      return state.cartTotal;
    },
    cartFinal_Total (state) {
      return state.cartFinal_Total;
    },
    adminproducts (state) {
      return state.adminproducts;
    },
    pagination (state) {
      return state.pagination;
    },
    messages (state) {
      return state.messages;
    }
  }
}
