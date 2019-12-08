<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view> </router-view>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="scss"> //啟用Sass功能
@import './assets/all';
</style>
