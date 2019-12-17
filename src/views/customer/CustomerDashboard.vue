<template>
  <div>
    <Alert />
    <div class="wrap">
      <Aside />
      <Navbar />
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/customer/Navbar';
import Aside from '../../components/customer/Aside';
import Footer from '../../components/customer/Footer';
import Alert from '../../components/customer/AlertMessage';
import { mapActions } from 'vuex';
export default {
  components: {
    Alert,
    Navbar,
    Aside,
    Footer
  },
  methods: {
    ...mapActions('productMudles', ['getProduct'])
  }
};
</script>

<style lang='scss'>
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");

.wrap {
  transition: transform 0.3s;
  position: relative;
}

.wrap.active {
  transform: translateX(-450px)!important;
}

@media (max-width:375px) {
  .wrap.active{
    transform: translateX(-300px)!important;
  }
}
</style>
