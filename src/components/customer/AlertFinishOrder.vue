<template>
  <div class="coupon-alert">
    <div
      class="alert d-flex justify-content-center align-items-center rounded-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in finishmessages"
      :key="i"
    >
      <div class="alert-outline">
        <strong class="text-center alert-txt cartProduct_txt">{{ item.message}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('orderMudles/updateMessage', { message, status });
    },
    removeMessageWithTiming (timestamp) {
      this.$store.dispatch('orderMudles/removeMessageWithTiming', timestamp);
    }
  },
  computed: {
    ...mapGetters('orderMudles', ['finishmessages'])
  }
  // created () {
  //   const vm = this;
  //   // 自定義名稱 'messsage:push'
  //   // message: 傳入參數
  //   // status: 樣式，預設值為 warning
  //   vm.$bus.$on('finish:push', (message, status = 'dark') => {
  //     vm.updateMessage(message, status);
  //   });
  //   // vm.$bus.$emit('message:push');
  // }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100 !important;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.alert-outline {
  padding: 55px;
  background-color: #fff;
  border-radius: 10px;
}

.alert-txt {
  font-size: 25px;
  font-family: "Anton", sans-serif;
  color: #080808;
}
</style>
