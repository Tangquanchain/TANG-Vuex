
import axios from 'axios';

export default {
  namespaced: true,
  strict: true,
  state: {
    AllProduct: [],
    KeyTxt: ''
  },
  actions: {
    getProduct (context, id) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      axios.get(api).then(response => {
        context.commit('GETPRODUCT', response.data.product);
        context.commit('LOADING', false, { root: true });
      });
    },
    backactive (context) {
      context.commit('BACK', 'back');
    }
  },
  mutations: {
    GETPRODUCT (state, status) {
      state.AllProduct = status;
    },
    BACK (state, status) {
      state.KeyTxt = status;
    }
  },
  getters: {
    AllProduct (state) {
      return state.AllProduct;
    },
    KeyTxt (state) {
      return state.KeyTxt;
    }
  }
}
