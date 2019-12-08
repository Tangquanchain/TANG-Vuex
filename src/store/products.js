
import axios from 'axios';

export default {
  namespaced: true,
  strict: true,
  state: {
    Menproducts: [],
    Toolproducts: [],
    KeyTxt: 'all',
    AllProduct: []
  },
  actions: {
    // home.vue
    getManProducts (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then(response => {
        context.commit('HOTMAN', response.data.products);
      });
    },
    getToolProducts (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then(response => {
        context.commit('HOTTOOL', response.data.products);
      });
    },
    // AllProduct.vue
    Hotactive (context) {
      context.commit('KEYTXT', 'hot');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then(response => {
        context.commit('HOTPRODUCT', response.data.products);
      });
    },
    Styleactive (context) {
      context.commit('KEYTXT', 'style');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then(response => {
        context.commit('STYLEPRODUCT', response.data.products);
      });
    },
    Toolsactive (context) {
      context.commit('KEYTXT', 'tools');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then(response => {
        context.commit('TOOLSPRODUCT', response.data.products);
      });
    },
    getAllProduct (context) {
      context.commit('KEYTXT', 'all');
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then(response => {
        context.commit('ALLPRODUCT', response.data.products);
      });
    }
  },
  mutations: {
    HOTMAN (state, status) {
      state.Menproducts = status.filter(
        item => item.category === 'hotman'
      );
    },
    HOTTOOL (state, status) {
      state.Toolproducts = status.filter(
        item => item.category === 'hotproduct'
      );
    },
    KEYTXT (state, status) {
      state.KeyTxt = status;
    },
    ALLPRODUCT (state, status) {
      state.AllProduct = status;
    },
    HOTPRODUCT (state, status) {
      state.AllProduct = status.filter(
        item => item.category === 'hotman' || item.category === 'hotproduct'
      );
    },
    STYLEPRODUCT (state, status) {
      state.AllProduct = status.filter(
        item => item.category === 'style'
      );
    },
    TOOLSPRODUCT (state, status) {
      state.AllProduct = status.filter(
        item => item.category === 'tools'
      );
    }
  },
  getters: {
    Menproducts (state) {
      return state.Menproducts;
    },
    Toolproducts (state) {
      return state.Toolproducts;
    },
    KeyTxt (state) {
      return state.KeyTxt;
    },
    AllProduct (state) {
      return state.AllProduct;
    }
  }
}
