<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible d-flex justify-content-center rounded-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in addmessages"
      :key="i"
    >
      <strong class="alert-txt text-dark text-center">Added {{ item.message.product.title }} X {{ item.message.qty }}</strong>
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span class="text-dark" style="font-size:20px;" aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('cartsMudules/addupdateMessage', { message, status });
    },
    removeMessage (num) {
      this.$store.dispatch('cartsMudules/addremoveMessage', num);
    },
    removeMessageWithTiming (timestamp) {
      this.$store.dispatch('cartsMudules/addupdateMessageremoveMessageWithTiming', timestamp);
    }
  },
  computed: {
    ...mapGetters('cartsMudules', ['addmessages'])
  },
  create () {
    console.log(this.addmessages);
  }
};
</script>

<style scoped>
.message-alert {
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
}
</style>
