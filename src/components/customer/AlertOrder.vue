<template>
  <div class="coupon-alert">
    <div
      class="alert d-flex justify-content-center align-items-center rounded-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in formdataerrormessages"
      :key="i"
    >
      <div class="alert-outline">
        <strong class="alert-txt cartProduct_txt">{{ item.message }}</strong>
        <br>
        <button @click="goHome" type="button" class="btn btn-size btn-block mt-2" style="border-radius:20px;">BACK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('orderMudles/formdataerrorupdateMessage', { message, status });
    },
    removeMessageWithTiming (timestamp) {
      this.$store.dispatch('orderMudles/removeMessageWithTiming', timestamp);
    },
    goHome () {
      const vm = this;
      vm.$router.push('/store/allproduct');
      this.$store.dispatch('orderMudles/deleteformdataerrormessages');
      // vm.$store.state.formdataerrormessages.splice(0, 1);
    }
  },
  computed: {
    ...mapGetters('orderMudles', ['formdataerrormessages'])
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000 !important;
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
  font-size: 30px;
  font-family: "Anton", sans-serif;
  color: #080808;
}
</style>
