<template>
  <div>
    <div class="wrap">
      <Aside />
      <Navbar />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/customer/Navbar';
import Aside from '../../components/customer/Aside';
import Footer from '../../components/customer/Footer';
export default {
  components: {
    Navbar,
    Aside,
    Footer
  }
};
</script>

<style lang='scss'>
.wrap {
  transition: transform 0.3s;
  position: relative;
}

.wrap.active {
  transform: translateX(450px);
}
</style>
