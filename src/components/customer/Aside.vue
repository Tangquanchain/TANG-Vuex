<template>
  <div>
    <div class="aside">
      <AlertAside />
      <div class="aside_title d-flex justify-content-center align-items-center text-center">
        <p class="mb-0 mr-1">CART LIST</p>
        <span class="badge badge-pill badge-danger" style="font-size:15px">
          {{ cart.carts.length }}
        </span>
      </div>

      <div
        class="d-flex justify-content-center align-items-center text-center"
        style="height:75%;"
        v-if=" cart.carts == ''"
      >
        <div class="text-center p-3">
          <p class="cartProduct_txt mb-0">CART IS EMPTY.</p>
          <button @click="goshop" class="btn btn-size btn-lg">GO SHOP</button>
        </div>
      </div>

      <table class="table table-sm mr-5">
        <tbody v-if="cart.carts">
          <tr v-for="items in cart.carts" :key="items.id">
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
        <tfoot v-if=" cart.carts != ''">
          <tr>
            <td class="text-left pl-3" colspan="2">
              <p class="cartProduct_txt mb-0">TOTAL</p>
            </td>
            <td class="text-right pr-4" colspan="3">
              <p class="cartProduct_txt mb-0">{{ cartTotal | currency }} TW</p>
            </td>
          </tr>
        </tfoot>
      </table>
      <a
        href="#"
        v-if=" cart.carts != ''"
        class="btn checkout btn-primary btn-block mt-2"
        style="border-radius:20px"
        @click.prevent="checkout"
      >
        <p class="cartProduct_txt mb-0">CHECKOUT</p>
      </a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import AlertAside from './AlertAside';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    AlertAside
  },
  data () {
    return {
      insidecart: false
    };
  },
  methods: {
    ...mapActions('cartsMudules', ['getCartProduct']),
    ...mapActions('cartsMudules', ['removeCart']),

    goshop () {
      this.$router.push('/store/allproduct');
    },

    managerurl () {
      this.$router.push('/dashboard');
    },

    checkout () {
      this.$router.push('/checkout/cart');
      $('body').removeClass('scrollClose');
    }
  },
  computed: {
    ...mapGetters('cartsMudules', ['cart', 'cartTotal'])
  }
};
</script>

<style lang='scss'>
$black: #000;
$side-white: rgba(212, 212, 212, 0.8);

body {
  overflow-x: hidden;
  position: relative;
}

.aside {
  left: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: rgba(241, 238, 238, 0.6);
  width: 450px;
  height: 100vh;
  border-right: 1px solid $side-white;
  display: none;
  // transform: translateX(450px);
  left: auto;
  transition: transform 0.3s;
  &.active {
    transform: translateX(450px);
    overflow-y: scroll;
    display: block;
  }
}

@media (max-width:375px) {
  .aside{
    &.active{
      width:300px;
      transform: translateX(300px);
    }
  }
}

.aside_title {
  margin-top: 30px;
  font-family: "Open Sans", sans-serif;
  padding-bottom: 28px;
  border-bottom: 1px solid $side-white;
  p {
    font-size: 30px;
  }
}

.cartProduct_txt {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.btn-size {
  border: 1px solid $black;
  margin: 7px 0px;
  border-radius: 0;
  outline: none;
  &:hover {
    background-color: $black;
    color: rgba(251, 251, 251, 0.8);
  }
}

.btn-block {
  width: 95%;
  margin: auto;
}
</style>
