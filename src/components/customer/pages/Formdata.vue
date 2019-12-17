<template>
  <div>
    <AlertFinishOrder />
    <AlertOrder />
    <div class="container mt-5 mb-5" style="border: 3px solid #1c1e1b;">
      <div class="row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
          <div class="main mt-4 mb-5">
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

          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Acount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody v-if="order">
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right font-weight-bold">TOTAL</td>
                <td v-if="order.total" class="text-right font-weight-bold">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Order id</th>
                <td>
                  {{ this.orderId }}
                  <i
                    class="far fa-question-circle text-warning ml-2 orderquestion-flash"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    data-html="true"
                    title="<div>COPY</div>"
                  ></i>
                </td>
              </tr>
              <tr></tr>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>payment status</th>
                <td>
                  <span v-if="!order.is_paid" style="color:#faabab;">UNPAID</span>
                  <span v-else class="text-success">PAID</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-size" style="border-radius:20px;">CONFIRM TO PAY</button>
          </div>
          <!-- <div class="text-right" v-if="order.is_paid === true">
            <button @click="next" class="btn btn-size" style="border-radius:20px;">NEXT</button>
          </div> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import AlertFinishOrder from '../AlertFinishOrder';
import AlertOrder from '../AlertOrder';
import { mapGetters } from 'vuex';
export default {
  components: {
    AlertFinishOrder,
    AlertOrder
  },
  data () {
    return {
      orderId: ''
    };
  },
  methods: {
    getOrder () {
      this.$store.dispatch('orderMudles/getOrder', this.orderId);
    },
    payOrder () {
      const vm = this;
      vm.$store.dispatch('orderMudles/payOrder', this.orderId).then(() => {
        window.setTimeout(() => {
          vm.$router.push('/checkout/complete');
        }, 15000);
      });
    }
  },
  computed: {
    ...mapGetters('orderMudles', ['order'])
  },
  created () {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.orderId = this.$route.params.orderId; // 取得網址上orderId的參數
    this.getOrder();
  }
};
</script>

<style lang="scss">

.breakcrumb::before {
  width: 100% !important;
}

.breakcrumb-txt {
  margin: 0 85px 0 85px !important;
}

@media (max-width: 1199px) {
  .breakcrumb::before {
    width: 90% !important;
  }
  .breakcrumb-txt {
    margin: 0 62px 0 62px !important;
  }
}

@media (max-width: 991px) {
  .breakcrumb-txt {
    margin: 0 43px 0 43px !important;
  }
}

@media (max-width: 767px) {
  .breakcrumb-txt {
    margin: 0 88px 0 88px !important;
  }
}

@media (max-width: 575px) {
  .breakcrumb::before {
    width: 70% !important;
  }
  .breakcrumb-txt {
    margin: 0 48px 0 46px !important;
  }
}

@media (max-width: 375px) {
  .breakcrumb::before {
    width: 70% !important;
  }
  .breakcrumb-txt {
    margin: 0 42px 0 42px !important;
  }
}

.orderquestion-flash {
  animation: orderquestion-flash 4.2s infinite;
  vertical-align: middle;
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
