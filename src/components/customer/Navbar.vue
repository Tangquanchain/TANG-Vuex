<template>
  <div>
    <div class="Screen-modal" @click="scrollClose"></div>

    <nav class="navbar navbar-expand-md navbar-light">
      <a href="#" class="side_icon d-md-none d-sm-block" @click.prevent="siderOpen">
        <span></span>
        <span></span>
        <span></span>
      </a>
      <router-link to="/home">
        <a class href="#">
          <img class="d-none d-md-inline-block" src="../../../static/images/TagLogo.png" />
          <img
            class="d-inline-block d-md-none"
            src="../../../static/images/TagLogo.png"
            style="width: 60px"
            height="40px"
          />
        </a>
      </router-link>
      <!-- 手機管理 -->
      <div class="d-md-none">
        <a
          data-toggle="modal"
          data-target="#orderModal"
          class="nav-link text-dark order-md-1"
          href="#"
        >
          <i
            aria-hidden="true"
            class="far fa-edit align-baseline text-white"
            style="font-size: 26px;"
          ></i>
        </a>
      </div>

      <div class="collapse navbar-collapse d-none d-md-block" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link style="text-decoration:none" to="/home">
              <a class="nav-item nav-link text-white mr-5 font-weight-bold" href="#">Home</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link style="text-decoration:none" to="/store/allproduct">
              <a class="nav-item nav-link text-white mr-5 font-weight-bold" href="#">PRODUCTS</a>
            </router-link>
          </li>
          <li class="nav-item">
            <a
              data-toggle="modal"
              data-target="#orderModal"
              class="nav-item nav-link text-white mr-5 font-weight-bold d-sm-block d-md-none"
            >
              <i
                class="fas fa-user-cog align-baseline text-white"
                aria-hidden="true"
                style="font-size:26px"
              ></i>
            </a>
          </li>
        </ul>

        <ul class="navbar-nav cartbrowser ml-auto">
          <li class="nav-item d-flex">
            <!-- 網頁購物車 -->
            <a
              class="nav-link text-dark"
              style="cursor:pointer"
              data-toggle="modal"
              data-target="#orderModal"
            >
              <i
                class="far fa-edit align-baseline text-white"
                aria-hidden="true"
                style="font-size:26px"
              ></i>
            </a>
            <div style="positon:relative">
              <a @click.prevent="getCartScreen" class="nav-link text-dark ml-4" href="#">
                <i
                  class="fa fa-shopping-bag align-baseline text-white"
                  aria-hidden="true"
                  style="font-size:26px"
                ></i>
                <span
                  class="badge badge-pill badge-danger"
                  style="position:absolute; left:25px; top:7px; font-size:10px;"
                >
                  {{cart.carts.length}}
                </span>
              </a>
            </div>
          </li>
        </ul>
        <div class="cart-modal" @click="removeScreen"></div>
      </div>
    </nav>

    <div class="site_header">
      <div class="container">
        <div class="row">
          <div class="top_side col-12">
            <div class="d-flex justify-content-center align-items-center py-4">
              <P>COPY DISCOUNT CODE</P>
              <button @click="BtnCoupon" class="btn btn-coupon" data-clipboard-text="Tom1111">
                <strong class="text-success orderquestion-flash">Tom1111</strong>
              </button>
            </div>
          </div>
          <div class="left_side col-6">
            <div class="d-flex justify-content-center align-items-center">
              <router-link to="/home">
                <a href="#">HOME</a>
              </router-link>
            </div>
          </div>
          <div class="right_side col-6">
            <div class="d-flex justify-content-center align-items-center">
              <router-link to="/store/allproduct">
                <a href="#">PRODUCTS</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 訂單查詢 Modal -->
    <AlertConpon />
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 768px;">
        <div class="modal-content">
          <button
            type="button"
            class="btn modal-close position-absolute rounded-circle d-none d-md-block"
            style="top: -15px; right: -25px;"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i class="fas fa-times position-absolute text-white" style="bottom: 3px; right: 7px;"></i>
          </button>
          <div class="row">
            <div class="col-6">
              <img
                class="serchModal-img"
                src="https://images.unsplash.com/photo-1559895166-835a49fb90d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
                alt
              />
            </div>

            <div class="col-6" style="background-color:#212529;">
              <div class="row h-100 align-items-center">
                <div class="col-12">
                  <div class="modal-title text-center h1 text-white">ORDER SERCH</div>
                </div>
                <div class="col-12">
                  <div class="modal-body">
                    <div class="form-group text-center">
                      <label class for="ordernumber"></label>
                      <input
                        type="text"
                        name="ordernum"
                        class="form-control p-2 form-input rounded-0"
                        :class="{'is-invalid':errors.has('ordernum')}"
                        id="ordernumber"
                        v-model="number"
                        v-validate="'required'"
                        placeholder="Order Number"
                      />
                      <span class="text-danger" v-if="errors.has('ordernum')">about 20 words</span>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="modal-footer border-0 justify-content-center">
                    <button
                      type="button"
                      class="btn btn-serch text-white"
                      style="font-size:30px"
                      @click.prevent="OrderBtn"
                    >SERCH</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import AlertConpon from '../customer/AlertCoupon';
import { mapGetters, mapActions } from 'vuex';
export default {
  // props: ['carts'],
  components: {
    AlertConpon
  },
  data () {
    return {
      number: '' // order number
    };
  },
  methods: {
    ...mapActions('cartsMudules', ['getCartProduct']),

    BtnCoupon () {
      this.$store.dispatch('cartsMudules/updateMessage', {
        message: 'COPY'
      });
    },

    getCartScreen () {
      const vm = this;
      $('.cart-modal').addClass('cart-modal-open');
      $('body').addClass('scrollClose');
      $('.side_icon').toggleClass('animated');
      $('.wrap').toggleClass('active');
      $('.aside').toggleClass('active');
      $('.Screen-modal').toggleClass('cart-modal-open');
      vm.getCartProduct();
    },

    removeScreen () {
      $('.cart-modal').removeClass('cart-modal-open');
      $('body').removeClass('scrollClose');
      $('.side_icon').toggleClass('animated');
      $('.wrap').toggleClass('active');
      $('.aside').toggleClass('active');
      $('.Screen-modal').toggleClass('cart-modal-open');
    },

    OrderBtn () {
      const vm = this;
      if (vm.number !== '') {
        this.$router.push(`/checkout/formdata/${vm.number}`);
        $('#orderModal').modal('hide');
        // window.location.reload(); 按下 continue to pay 之後 要將vuex-order資料刪除
      } else {
        this.$store.dispatch('cartsMudules/updateMessage', {
          message: 'ERROR　NUMBER'
        });
      }
    },

    siderOpen () {
      $('.side_icon').toggleClass('animated');
      $('.wrap').toggleClass('active');
      $('.aside').toggleClass('active');
      $('.Screen-modal').toggleClass('cart-modal-open');
    },
    scrollClose () {
      $('.Screen-modal').toggleClass('cart-modal-open');
      $('.wrap').removeClass('active');
      $('.aside').removeClass('active');
      $('.side_icon').removeClass('animated');
    }
  },
  computed: {
    ...mapGetters('cartsMudules', ['cart'])
  },
  created () {
    $(function () {
      new ClipboardJS(".btn-coupon"); // eslint-disable-line
    });
    this.getCartProduct();
  }
};
</script>

<style lang="scss">
$side-header: #ececec;
$white: #fff;

.scrollClose {
  overflow-y: hidden;
}

.cart-modal-open {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100 !important;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.navbar {
  background-color: rgb(10, 8, 10);
  border-bottom: 1px solid $side-header;
  // position: fixed;
  width: 100%;
  z-index: 999;
  padding: 20px;
}

.navbar-nav li a {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  transform: translateY(0px);
  transition: 0.35s;
}

.navbar-nav li a:hover {
  transform: translateY(-5px);
}

.site_header {
  background-color: rgba(236, 236, 236, 0.6);
  border-left: 1px solid $side-header;
  border-right: 1px solid $side-header;
  border-bottom: 1px solid$side-header;
  // padding-top: 76px;
  p {
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    color: rgba(10, 8, 10, 0.9);
    margin-bottom: 0;
    margin-top: 6px;
  }
  .right_side {
    border-left: 1.5px solid $side-header;
    padding: 0;
  }
}

.site_header .right_side a,
.site_header .left_side a {
  text-decoration: none;
  color: rgb(129, 129, 129);
  font-family: "Anton", sans-serif;
  font-weight: bold;
  font-size: 21px;
  letter-spacing: 1.5px;
  transition: color 0.3s;
  cursor: pointer;
  &:hover {
    color: black;
  }
}

@media (max-width: 767px) {
  .cartbrowser {
    display: none;
  }
  .site_header .top_side {
    display: none;
  }
}

@media (min-width: 768px) {
  .site_header .right_side,
  .site_header .left_side {
    display: none;
  }
}

.side_icon {
  display: block;
  position: relative;
  width: 48px;
  height: 48px;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
}

.side_icon > span {
  display: block;
  width: 32px;
  height: 1.5px;
  background-color: $white;
  position: absolute;
  opacity: 1;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  transition: all 0.3s;
}

/*第一條線*/
.side_icon > span:nth-child(1) {
  transform: translateY(-10px);
}

/*最下面線*/
.side_icon > span:nth-child(3) {
  transform: translateY(10px);
}

/*JQ動態加入*/
.side_icon.animated > span:nth-child(1) {
  transform: rotate(220deg);
}
.side_icon.animated > span:nth-child(2) {
  opacity: 0;
}
.side_icon.animated > span:nth-child(3) {
  transform: rotate(-220deg);
}

//查詢訂單

.modal-close {
  width: 35px;
  height: 35px;
  background-color: rgb(27, 27, 27);
  border: 5px double $white;
  z-index: 101;
}
.position-absolute {
  position: absolute !important;
}

@media (max-width:375px) {
 .serchModal-img{
   width: 250px;
 }
}

.form-group {
  .form-input {
    background-color: #212529;
    font-family: "Open Sans", sans-serif;
    outline: none;
    width: 100%;
    border: 3px solid #35addc;
  }

  .form-input[placeholder] {
    color: $white;
  }

  span {
    font-family: "Open Sans", sans-serif;
    font-size: 18px;
  }
}

.btn-serch {
  border: 1px solid $white;
  background-color: rgb(27, 27, 27);
  transition: all 0.3s;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
  transition: all 0.3s;
  &:hover {
    background-color: $white;
    color: rgb(27, 27, 27) !important;
    border: 1px solid rgb(27, 27, 27);
  }
  &:focus {
    display: none;
  }
}

.btn-coupon {
  strong {
    font-size: 30px;
  }
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
}

.orderquestion-flash {
  animation: orderquestion-flash 3.5s infinite;
}

@keyframes orderquestion-flash {
  0% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
