<template>
  <div class="coupon-alert">
    <div
      class="alert alert-dismissible d-flex justify-content-center align-items-center rounded-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in removemessages"
      :key="i"
    >
      <strong class="text-center alert-txt cartProduct_txt">{{ item.message}}</strong>
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span style="font-size:20px; color:#faabab;" aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('cartsMudules/removeupdateMessage', { message, status });
    },
    removeMessage (num) {
      this.$store.dispatch('cartsMudules/removeupdateMessageremoveMessage', num);
    },
    removeMessageWithTiming (timestamp) {
      this.$store.dispatch('cartsMudules/removeupdateMessageremoveMessageWithTiming', timestamp);
    }
  },
  computed: {
    ...mapGetters('cartsMudules', ['removemessages'])
  }
};
</script>

<style lang='scss' scoped>
.coupon-alert {
  position: fixed;
  width: 450px;
  top: 0px;
  right: 0px;
  z-index: 1100;
}

.alert {
  background: rgb(228, 226, 226);
  border: 0;
  padding: 30px;
}

.alert-txt {
  font-size: 30px;
  font-family: "Anton", sans-serif;
  color: #f31e1e;
}
</style>
