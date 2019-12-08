
import axios from 'axios';
export default {
  namespaced: true,
  strict: true,
  state: {
    order: {
      user: {}
    },
    finishmessages: [],
    formdataerrormessages: []
  },
  actions: {
    //  清空order資料
    // deleteorderdata (context) {
    //   context.commit('DELETEOEDER')
    // },
    //  避免重複觸發formdataerrormessages訊息內容
    deleteformdataerrormessages (context) {
      context.commit('DELETEFORM');
    },
    getOrder (context, orderId) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
      axios.get(api).then(response => {
        // console.log(response.data.order);
        if (response.data.order) {
          context.commit('LOADING', false, { root: true });
          context.commit('ORDER', response.data.order);
        } else {
          context.commit('LOADING', false, { root: true });
          context.dispatch('formdataerrorupdateMessage', {
            message: `Wrong Number.`
          });
          // new Vue().$bus.$emit(
          //   'order:push',
          //   `Wrong Number.`
          // );
        }
      });
    },
    payOrder (context, orderId) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`;
      axios.post(api).then(response => {
        if (response.data.success) {
          context.commit('LOADING', false, { root: true });
          context.dispatch('updateMessage', {
            message: `Thanks for your shopping,your order is completed to be ready.`
          });
          context.dispatch('getOrder', orderId);
        }
      });
    },
    // finishorder Infomation
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
    // removeMessage (context, num) {
    //   context.commit('MESSAGEREMOVE', num);
    // },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('MESSAGETIMEING', timestamp);
      }, 3000);
    },
    // error orderId Information
    formdataerrorupdateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      const messages = {
        message,
        status,
        timestamp
      };
      context.commit('FORMMESSAGESPUSH', messages);
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    formdataerrorremoveMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('FORMMESSAGETIMEING', timestamp);
      }, 150000);
    }
  },
  mutations: {
    // DELETEOEDER (state) {
    //   delete state.order.user;
    // },
    DELETEFORM (state) {
      state.formdataerrormessages.splice(0, 1);
    },
    ORDER (state, status) {
      state.order = status;
    },
    MESSAGESPUSH (state, payload) {
      state.finishmessages.push(payload);
    },
    MESSAGETIMEING (state, payload) {
      state.finishmessages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.finishmessages.splice(i, 1);
        }
      });
    },
    FORMMESSAGESPUSH (state, payload) {
      state.formdataerrormessages.push(payload);
    },
    FORMMESSAGETIMEING (state, payload) {
      state.finishmessages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.formdataerrormessages.splice(i, 1);
        }
      });
    }
  },
  getters: {
    order (state) {
      return state.order;
    },
    finishmessages (state) {
      return state.finishmessages;
    },
    formdataerrormessages (state) {
      return state.formdataerrormessages
    }
  }
};
