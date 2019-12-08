
import axios from 'axios';
import $ from 'jquery';
export default {
  user: null,
  namespaced: true,
  strict: true,
  state: {
    cart: {
      carts: []
    },
    statusid: {
      loadingItem: '' // 存放產品id的值
    },
    cartTotal: '',
    cartFinal_Total: '',
    cartProduct: [],
    messages: [], // coupon infomation
    removemessages: [],
    addmessages: []
  },
  actions: {
    getCartProduct (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then(response => {
        context.commit('CART', response.data.data);
        context.commit('TOTAL', response.data.data.total);
        context.commit('FINALTOTAL', response.data.data.final_total);
        context.commit('CARTPRODUCT', response.data.data.carts);
      });
    },
    addtoCart (context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      context.commit('STATUS', id);
      const cart = {
        product_id: id,
        qty
      };
      axios.post(api, { data: cart }).then(response => {
        context.commit('LOADING', false, { root: true });
        context.commit('STATUS', '');
        if (response.data.success) {
          context.dispatch('getCartProduct');
          $('html,body').animate({ scrollTop: '0px' }, 900);
          // vm.$bus.$emit('cart:push');
          context.dispatch('addupdateMessage', {
            message: response.data.data
          });
          // new Vue().$bus.$emit('message:push', response.data.data, 'info');
          $('.side_icon').toggleClass('animated');
          $('.wrap').toggleClass('active');
          $('.aside').toggleClass('active');
          $('.Screen-modal').toggleClass('cart-modal-open');
          $('.cart-modal').addClass('cart-modal-open');
          $('body').addClass('scrollClose');
        }
      });
    },
    removeCart (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(api).then(response => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('getCartProduct');
        context.dispatch('removeupdateMessage', {
          message: 'Remove item'
        });
      });
    },
    addCouponCode (context, couponCode) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      context.commit('LOADING', true, { root: true });
      const coupon = {
        code: couponCode
      };
      axios.post(api, { data: coupon }).then(response => {
        if (response.data.success === true) {
          context.dispatch('getCartProduct');
          context.commit('LOADING', false, { root: true });
          context.dispatch('updateMessage', {
            message: 'Apply to success'
          });
        } else {
          context.commit('LOADING', false, { root: true });
          context.dispatch('getCartProduct');
          context.dispatch('updateMessage', {
            message: "Can't find Coupon"
          });
        }
      });
    },
    // coupon Information
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
      }, 2000);
    },
    // add Information
    addupdateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      const messages = {
        message,
        status,
        timestamp
      };
      context.commit('ADDMESSAGESPUSH', messages);
      context.dispatch('addremoveMessageWithTiming', timestamp);
    },
    addremoveMessage (context, num) {
      context.commit('ADDMESSAGEREMOVE', num);
    },
    addremoveMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('ADDMESSAGETIMEING', timestamp);
      }, 2000);
    },
    // delete Information
    removeupdateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      const messages = {
        message,
        status,
        timestamp
      };
      context.commit('REMOVESSAGESPUSH', messages);
      context.dispatch('removeupdateMessageremoveMessageWithTiming', timestamp);
    },
    removeupdateMessageremoveMessage (context, num) {
      context.commit('REMOVESSAGEREMOVE', num);
    },
    removeupdateMessageremoveMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVESSAGETIMEING', timestamp);
      }, 2000);
    }
  },
  mutations: {
    CART (state, status) {
      state.cart = status;
    },
    STATUS (state, status) {
      state.statusid.loadingItem = status;
    },
    TOTAL (state, status) {
      state.cartTotal = status;
    },
    FINALTOTAL (state, status) {
      state.cartFinal_Total = status;
    },
    CARTPRODUCT (state, status) {
      state.cartProduct = status;
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
    },
    ADDMESSAGESPUSH (state, payload) {
      state.addmessages.push(payload);
    },
    ADDMESSAGEREMOVE (state, payload) {
      state.addmessages.splice(payload, 1);
    },
    ADDMESSAGETIMEING (state, payload) {
      state.addmessages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.addmessages.splice(i, 1);
        }
      });
    },
    REMOVESSAGESPUSH (state, payload) {
      state.removemessages.push(payload);
    },
    REMOVESSAGEREMOVE (state, payload) {
      state.removemessages.splice(payload, 1);
    },
    REMOVESSAGETIMEING (state, payload) {
      state.removemessages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.removemessages.splice(i, 1);
        }
      });
    }
  },
  getters: {
    cart (state) {
      return state.cart;
    },
    cartTotal (state) {
      return state.cartTotal;
    },
    cartFinal_Total (state) {
      return state.cartFinal_Total;
    },
    cartProduct (state) {
      return state.cartProduct;
    },
    messages (state) {
      return state.messages;
    },
    removemessages (state) {
      return state.removemessages;
    },
    addmessages (state) {
      return state.addmessages;
    }
  }
}
