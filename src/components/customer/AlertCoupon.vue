<template>
  <div class="coupon-alert">
    <div
      class="alert alert-dismissible d-flex justify-content-center align-items-center rounded-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      <strong class="text-center alert-txt cartProduct_txt">{{ item.message }}</strong>
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span style="font-size:20px; color:#f31e1e" aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('cartsMudules/updateMessage', { message, status });
    },
    removeMessage (num) {
      this.$store.dispatch('cartsMudules/removeMessage', num);
    },
    removeMessageWithTiming (timestamp) {
      this.$store.dispatch('cartsMudules/removeMessageWithTiming', timestamp);
    }
  },
  computed: {
    ...mapGetters('cartsMudules', ['messages'])
  }
  // created () {
  //   const vm = this;
  //   // 自定義名稱 'messsage:push'
  //   // message: 傳入參數
  //   // status: 樣式，預設值為 warning
  //   vm.$bus.$on('coupon:push', (message, status = 'dark') => {
  //     vm.updateMessage(message, status);
  //   });
  //   // vm.$bus.$emit('message:push');
  // }
};
</script>

<style lang="scss" scoped>
.coupon-alert {
  position: fixed;
  width: 250px;
  top: 80px;
  right: 0px;
  z-index: 1100;
}

.alert {
  background-color: rgba(236, 236, 236, 0.6);
  border: 0;
}

.alert-txt {
  font-size: 20px;
  font-family: "Anton", sans-serif;
  color: #f31e1e;
}
</style>
