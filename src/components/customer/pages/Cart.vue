<template>
  <div>
    <AlertConpon />
    <div class="mt-5 mb-5">
      <div class="container" style="border: 3px solid #1c1e1b;">
        <div class="row">
          <div class="col-md-6 col-12 order-3 order-md-1">
            <div class="main mt-4">
              <ul class="list-unstyled breakcrumb">
                <li class="breakcrumb-txt">
                  <span class="p-5">
                    <i style="line-height:0;" class="fa fa-check text-dark" aria-hidden="true"></i>
                  </span>
                  CART
                </li>
                <li class="breakcrumb-txt">
                  <span class="p-5 text-dark">1</span>
                  INFORMATION
                </li>
                <li class="breakcrumb-txt">
                  <span class="p-5">2</span>
                  COMPLETE
                </li>
              </ul>
            </div>
            <!-- 建立訂單及購物車頁面 -->
            <div class="my-5 row justify-content-center">
              <form class="col-8" @submit.prevent="sendOrder">
                <div class="form-group">
                  <label for="useremail">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{'is-invalid':errors.has('email')}"
                    name="email"
                    id="useremail"
                    v-model="form.user.email"
                    placeholder="Email"
                    v-validate="'required|email'"
                  />
                  <!-- <span class='text-danger' v-if='errors.has('email')'>{{ errors.first('email') }}</span> -->
                  <span class="text-danger" v-if="errors.has('email')">Check Email</span>
                </div>

                <div class="form-group">
                  <label for="username">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{'is-invalid':errors.has('name')}"
                    name="name"
                    id="username"
                    v-model="form.user.name"
                    v-validate="'required'"
                    placeholder="First and Last Name"
                  />
                  <span class="text-danger" v-if="errors.has('name')">Check Name</span>
                </div>

                <div class="form-group">
                  <label for="usertel">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    class="form-control"
                    :class="{'is-invalid':errors.has('phone')}"
                    id="usertel"
                    v-model="form.user.tel"
                    v-validate="'required|digits:10'"
                    placeholder="Phone"
                  />
                  <span class="text-danger" v-if="errors.has('phone')">Check Phone</span>
                </div>

                <div class="form-group">
                  <label for="useraddress">Shopping Address</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{'is-invalid':errors.has('address')}"
                    name="address"
                    id="useraddress"
                    v-model="form.user.address"
                    v-validate="'required'"
                    placeholder="Address"
                  />
                  <span class="text-danger" v-if="errors.has('address')">Check Address</span>
                </div>

                <div class="form-group">
                  <label for="comment">Information</label>
                  <textarea
                    name
                    id="comment"
                    class="form-control"
                    cols="30"
                    rows="10"
                    v-model="form.message"
                  ></textarea>
                </div>
                <div class="text-right" v-if="cartProduct != ''">
                  <button @click="goTop" class="btn btn-continue text-white">CONTINUE</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-6 col-12 order-2">
            <table class="table table-sm mr-5">
              <tbody v-if="cartProduct">
                <tr v-if=" cartProduct == ''">
                  <td class="text-center p-3" colspan="5">
                    <p class="cartProduct_txt mb-0">CART IS EMPTY.</p>
                    <button @click="goshop" class="btn btn-size btn-lg">GO SHOP</button>
                  </td>
                </tr>
                <tr v-for="items in cartProduct" :key="items.id">
                  <td class="align-middle text-center p-3">
                    <div
                      :style="`width:100px; height:100px; background: url(${items.product.imageUrl}) center / cover no-repeat;`"
                    ></div>
                  </td>
                  <td class="align-middle">
                    <p class="cartProduct_txt mb-0">{{items.product.title}}</p>
                  </td>
                  <td class="align-middle">X{{items.qty}}</td>
                  <td class="align-middle text-right">{{items.product.origin_price | currency }} TW</td>
                  <td class="align-middle">
                    <button class="btn" type="button" @click="removeCart(items.id)">
                      <i class="fa fa-trash-alt" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="cartTotal == cartFinal_Total">
                  <td class="text-left pl-3" colspan="2">
                    <p class="cartProduct_txt mb-0" style="font-size:12px; margin-top:7px;">TOTAL</p>
                  </td>
                  <td class="text-right pr-4" colspan="3">
                    <p class="cartProduct_txt mb-0">
                      <strong>{{ cartTotal | currency }} TW</strong>
                    </p>
                  </td>
                </tr>

                <tr v-if="cartTotal !== cartFinal_Total ">
                  <td class="text-left pl-3" colspan="2">
                    <p class="cartProduct_txt mb-0" style="font-size:12px; margin-top:7px;">TOTAL</p>
                  </td>
                  <td class="text-right pr-4" colspan="3" v-if="cartFinal_Total">
                    <p class="cartProduct_txt mb-0" style="color:#faabab;">
                      <strong>{{ cartFinal_Total | currency }} TW</strong>
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="d-flex justify-content-end">
              <input
                type="text"
                style="border:1.5px solid $black;"
                v-model="couponCode"
                placeholder="   Please add the code"
              />
              <button
                class="btn btn-continue btn-sm text-white rounded-0 ml-2"
                type="button"
                @click="addCouponCode(couponCode)"
              >DISCOUNT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertConpon from '../AlertCoupon';
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    AlertConpon
  },
  data () {
    return {
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    };
  },
  methods: {
    ...mapActions('cartsMudules', ['getCartProduct']),
    ...mapActions('cartsMudules', ['removeCart']),
    goshop () {
      this.$router.push('/store/allproduct');
    },
    sendOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: vm.form }).then(response => {
            if (response.data.success) {
              vm.$router.push(`/checkout/formdata/${response.data.orderId}`);
            }
          });
        } else {
          console.log('form is error');
        }
      });
    },
    addCouponCode (couponCode) {
      this.$store.dispatch('cartsMudules/addCouponCode', couponCode);
    },
    goTop () {
      $('body,html').animate({ scrollTop: '0px' }, 900);
    }
  },
  computed: {
    ...mapGetters('cartsMudules', ['cart']),
    ...mapGetters('cartsMudules', ['cartTotal']),
    ...mapGetters('cartsMudules', ['cartFinal_Total']),
    ...mapGetters('cartsMudules', ['cartProduct'])
  },
  created () {
    this.getCartProduct();
  }
};
</script>

<style lang='scss'>
$black: #000;
.breakcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.breakcrumb::before {
  content: "";
  display: block;
  position: absolute;
  width: 60%;
  height: 5px;
  background-color: rgba(221, 217, 217, 0.6);
  z-index: -100;
}

.breakcrumb-txt {
  font-family: "Open Sans", sans-serif;
  background-color: white;
  border: solid 5px rgba(221, 217, 217, 0.6);
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.1px;
  margin: 0 40px 0 40px;
  color: rgba(70, 64, 64, 0.6);
  span {
    color: rgba(221, 217, 217, 0.6);
    font-size: 33px;
    font-weight: bold;
  }
  &:nth-of-type(1),
  &:nth-of-type(2) {
    border-color: $black;
    color: $black;
  }
}

.btn-continue {
  background-color: $black;
  border-radius: 20px;
  transition: all 0.3s;
  font-family: "Open Sans", sans-serif;
  &:hover {
    background-color: rgb(27, 27, 27);
  }
  &:focus {
    display: none;
  }
}

@media (max-width: 992px) {
  .breakcrumb::before {
    width: 90%;
    height: 4px;
  }
  .breakcrumb-txt {
    width: 48px;
    height: 48px;
    border: solid 4px rgba(221, 217, 217, 0.6);
    span {
      font-size: 25px;
    }
  }
}

@media (max-width: 767px) {
  .breakcrumb::before {
    width: 50%;
  }
}

@media (max-width: 449px) {
  .breakcrumb::before {
    width: 100%;
  }
}

@media (max-width: 449px) {
  .breakcrumb::before {
    width: 80%;
  }
}
</style>
