<template>
  <div>
    <div class="wrap">
      <Aside />
      <Navbar />
      <div class="container">
        <header>
          <div class="content_brand">
            <div class="row no-gutters">
              <div class="col-md-4 mt-sm-12 imghw_size">
                <div class="img_banner">
                  <router-link to="/store/shopping_cart/-Lrraw9lf4blwAstA0rg">
                    <a class href="#">
                      <img
                        class="imghw_size1"
                        style="height:581px; width:350px; margin-top:7px;"
                        src="https://images.unsplash.com/photo-1533245270348-821d4d5c7514?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                        alt
                      />
                    </a>
                  </router-link>
                </div>
              </div>
              <div class="col-md-8 col-sm-12 mt-sm-2">
                <div class="row">
                  <div class="col-5 d-none d-sm-block">
                    <div class="img_banner img_side">
                      <router-link to="/store/shopping_cart/-LrrY6aBFKN0dkKrYjXI">
                        <a href="#">
                          <img
                            class="imghw_size2"
                            style="height:238px; width:440px;"
                            src="https://images.unsplash.com/photo-1551491165-d77a9f869e0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
                            alt
                          />
                        </a>
                      </router-link>
                    </div>
                  </div>
                  <div class="col-sm-5 ml-auto">
                    <div class="img_banner d-flex">
                      <div
                        class="text-center imghw_size2"
                        style="background-color:#282828;height:238px; width:100%!important;"
                      >
                        <h4 class="text-white mt-5">HAIR STYLE</h4>
                        <p
                          class="text-white"
                        >Our brand build in 55 years ago,Classic designer will help you decide your hair</p>
                        <button @click="goProducts" class="btn" type="button">PRODUCT</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 mt-2">
                    <div class="img_banner">
                      <router-link to="/store/allproduct">
                        <a href="#">
                          <img
                            style="height:334px; width:100%"
                            src="https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                            alt
                          />
                        </a>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div class="homemenu">
          <div class="row justify-content-center align-items-center f-wrap">
            <div class="col-lg-3 col-md-6 mb-2">
              <div
                class="d-flex justify-content-center align-items-center"
                style="height:326px; width:100% ml-5"
              >
                <h2 class="h4">MANS STYLE</h2>
              </div>
            </div>
            <div class="col-lg-3 col-md-6" v-for="items in Menproducts" :key="items.id">
              <div class="newproduct">
                <div class="newproduct_pic position-relative">
                  <div
                    class="newProimg"
                    :style="`background: url(${items.imageUrl}) center / cover no-repeat;`"
                  ></div>
                  <div class="product_guide text-dark text-center p-3">
                    <h3 class="mb-2">SELECT</h3>
                    <button
                      class="btn btn-size pr-4 pl-4"
                      type="buttom"
                      @click="adddetail(items.id)"
                    >
                      <h5 class="mb-0">DETAIL</h5>
                    </button>
                  </div>
                  <div class="newstamp p-2">
                    <span>HOT</span>
                  </div>
                </div>

                <div class="txt text-center mt-2">
                  <p class="font-weight-bold">{{items.title}}</p>
                  <p class="font-weight-bold">{{items.price | currency}} TW</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="homemenu">
          <div class="row justify-content-center align-items-center f-wrap">
            <div class="col-lg-3 col-md-6 mb-2 order-md-1">
              <div
                class="d-flex justify-content-center align-items-center"
                style="height:326px; width:100% ml-5"
              >
                <h2 class="h4">HAIR TOOLS</h2>
              </div>
            </div>
            <div class="col-lg-3 col-md-6" v-for="items in Toolproducts" :key="items.id">
              <div class="newproduct">
                <div class="newproduct_pic position-relative">
                  <div
                    class="newProimg"
                    :style="`background: url(${items.imageUrl}) center / cover no-repeat;`"
                  ></div>
                  <div class="product_guide text-dark text-center p-3">
                    <h3 class="mb-2">SELECT</h3>
                    <button
                      class="btn btn-size pr-5 pl-5"
                      type="buttom"
                      @click="adddetail(items.id)"
                    >
                      <h5>DETAIL</h5>
                    </button>
                  </div>
                  <div class="newstamp p-2">
                    <span>HOT</span>
                  </div>
                </div>
                <div class="txt text-center mt-2">
                  <p class="font-weight-bold">{{items.title}}</p>
                  <p class="font-weight-bold">{{items.price | currency}} TW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/customer/Navbar';
import Aside from '../../components/customer/Aside';
import Footer from '../../components/customer/Footer';
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';
export default {
  components: {
    Navbar,
    Aside,
    Footer
  },
  methods: {
    ...mapActions('productsMudles', ['getManProducts']),
    ...mapActions('productsMudles', ['getToolProducts']),

    goProducts () {
      this.$router.push('/store/allproduct');
    },

    ...mapActions('cartsMudules', ['getCartProduct']),

    adddetail (id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(`/store/shopping_cart/${response.data.product.id}`);
          $('html,body').animate({ scrollTop: '0px' }, 900);
        }
      });
    }
  },
  computed: {
    ...mapGetters('productsMudles', ['Menproducts', 'Toolproducts'])
  },
  created () {
    this.getManProducts();
    this.getToolProducts();
    this.getCartProduct();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rakkas&display=swap");
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");

$black: #000;
$white: #fff;

.wrap {
  transition: transform 0.3s;
  position: relative;
}

.wrap.active {
  transform: translateX(-450px) !important;
}

.img-container {
  width: 100%;
  height: 100%;
}

.content_brand .img_banner {
  h4 {
    font-family: "Rakkas", cursive;
    font-weight: bold;
  }
  p {
    font-family: "Rakkas", cursive;
  }
  button {
    width: 100px;
    height: 50px;
    background-color: $white;
    color: $black;
    border-radius: 0;
    font-family: "Rakkas", cursive;
    transition: all 0.3s;
    &:hover {
      background-color: $black;
      color: $white;
    }
  }
}

.content_brand .img_banner a {
  display: block;
  margin: 0px auto;
  position: relative;
  text-align: center;
  &::before {
    content: "";
    border: 2px solid $white;
    top: 20px;
    right: 30px;
    bottom: 20px;
    left: 30px;
    position: absolute;
    transition: all 0.3s;
    opacity: 0;
  }
}

.content_brand .img_side a {
  &::before {
    content: "";
    border: 2px solid $white;
    top: 20px;
    right: -110px;
    bottom: 20px;
    left: 30px;
    position: absolute;
  }
}

.content_brand .img_banner a:hover::before {
  opacity: 1;
  top: 30px;
  right: 40px;
  bottom: 30px;
  left: 40px;
}

.content_brand .img_side a:hover::before {
  opacity: 1;
  top: 30px;
  right: -100px;
  bottom: 30px;
  left: 40px;
}

@media (max-width: 1199px) {
  .imghw_size1 {
    width: 290px !important;
  }
  .imghw_size2 {
    width: 370px !important;
  }
  .content_brand .img_side a:hover::before {
    opacity: 1;
    top: 30px;
    right: -90px;
    bottom: 30px;
    left: 40px;
  }
}

@media (max-width: 990px) {
  .imghw_size1 {
    width: 210px !important;
  }
  .imghw_size2 {
    width: 277px !important;
  }
  .content_brand .img_side a:hover::before {
    opacity: 1;
    top: 30px;
    right: -65px;
    bottom: 30px;
    left: 40px;
  }
}

@media (max-width: 767px) {
  .imghw_size {
    display: none;
  }
  .imghw_size2 {
    width: 307px !important;
  }
}

@media (max-width: 576px) {
  .imghw_size2 {
    width: 322px !important;
  }
}

//產品呈現
.homemenu {
  margin: 32px auto;
  width: 100%;
  h2 {
    font-family: "Open Sans", sans-serif;
  }
}

.newproduct {
  p {
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    margin-bottom: 0;
    color: rgba(3, 3, 3, 0.8);
  }
  margin: 0 15px;
  .newProimg {
    width: 100%;
    height: 270px;
    background-color: rgba(165, 165, 165, 0.3);
  }
}

.product_guide {
  width: 100%;
  background-color: rgba(251, 251, 251, 0.6);
  position: absolute;
  bottom: 0;
  opacity: 0;
  transition: all 0.35s;
  h3 {
    font-size: 24px;
    font-family: "Anton", sans-serif;
  }
  h5 {
    font-family: "Open Sans", sans-serif;
  }
  .btn-size {
    border: 1px solid $black;
    margin: 2px 5px;
    border-radius: 0;
    &:hover {
      background-color: $black;
      color: rgba(251, 251, 251, 0.8);
    }
  }
}

.newproduct:hover .product_guide {
  opacity: 1;
}

.newstamp {
  position: absolute;
  top: 0;
  right: 0;
  background-color: $black;
  span {
    color: white;
    font-family: "Open Sans", sans-serif;
  }
}

.content_guide {
  width: 100%;
  background-color: rgba(251, 251, 251, 0.1);
  color: rgba(251, 251, 251, 0.8);
  box-shadow: 20px 20px 30px $black;
  position: absolute;
  bottom: 0;
  top: 0;
  opacity: 1;
  transition: all 0.35s;
  h3 {
    font-size: 16px;
  }
  .btn-size {
    width: 92%;
    height: 92%;
    border: 1px solid rgb(41, 41, 41);
    margin: 2px 5px;
    border-radius: 0;
    background-color: rgba(251, 82, 82, 0.2);
    color: rgba(251, 251, 251, 0.8);
  }
}
</style>
