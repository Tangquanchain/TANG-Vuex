<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center;"
            :style="{backgroundImage:`url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
              <del class="h6" v-if="item.price">{{item.origin_price}}</del>
              <div class="h5" v-if="item.price">{{item.price}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click=" getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 查看更多modal -->
    <div
      class="modal fade"
      id="ProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{product.origin_price}}元</div>
              <del class="h6" v-if="product.price">原價{{product.origin_price}}元</del>
              <div class="h4" v-if="product.price">現在只要{{product.price}}元</div>
            </div>
            <select class="0-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
              <!-- {{ product.unit }} 編輯建立產品增加單位選項才會有 unit 屬性 -->
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong>元
            </div>
            <button
              class="btn btn-primary"
              type="button"
              @click="addtoCart(product.id,product.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <table class="table mt-4">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(items) in  carts" :key="items.id">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCart(items.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td>
              {{ items.product.title }}
              <div class="text-success" v-if="items.coupon">已加入優惠卷</div>
            </td>
            <td>{{ items.qty }}/{{items.product.unit }}</td>
            <td class="text-right">{{ items.final_total | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right" v-if="cartTotal">{{ cartTotal }}</td>
          </tr>
          <tr v-if="cartTotal !== cartFinal_Total ">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success" v-if="cartFinal_Total">{{ cartFinal_Total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode()">套用優惠碼</button>
        </div>
      </div>
    </div>
    <!-- 建立訂單及購物車頁面 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="sendOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{'is-invalid':errors.has('email')}"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
          />
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid':errors.has('name')}"
            name="name"
            id="username"
            v-model="form.user.name"
            v-validate="'required'"
            placeholder="輸入姓名"
          />
          <span class="text-danger" v-if="errors.has('name')">請填入正確姓名格式</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            name="phone"
            class="form-control"
            :class="{'is-invalid':errors.has('phone')}"
            id="usertel"
            v-model="form.user.tel"
            v-validate="'required|digits:10'"
            placeholder="請輸入電話"
          />
          <span class="text-danger" v-if="errors.has('phone')">請填入正確電話格式</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid':errors.has('address')}"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
          />
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      product: {},
      status: {
        loadingItem: '' // 存放產品id的值
      },
      coupon_code: '',
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
    ...mapActions('adminproductsMudles', ['getProducts', 'getCartProduct']),
    getProduct (id) {
      // 查看更多
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        $('#ProductModal').modal('show');
        vm.status.loadingItem = '';
        vm.product = response.data.product;
      });
    },
    addtoCart (id, qty = 1) {
      // 加入購物車
      const vm = this;
      vm.status.loadingItem = id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        $('#ProductModal').modal('hide');
        vm.getCartProduct();
        vm.status.loadingItem = '';
      });
    },
    removeCart (id) {
      // 刪除購物車
      this.$store.dispatch('adminproductsMudles/removeCart', id);
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      // this.$store.dispatch('updateLoading', true);
      vm.isLoading = true;
      const coupon = {
        code: vm.coupon_code
      };
      this.$http.post(api, { data: coupon }).then(response => {
        vm.getCartProduct();
        // this.$store.dispatch('updateLoading', false);
        vm.isLoading = false;
      });
    },
    sendOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      // vm.isLoading = true;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: vm.form }).then(response => {
            // vm.isLoading = false;
            if (response.data.success) {
              vm.$router.push(
                `/admin/custom_checkout/${response.data.orderId}`
              );
            }
          });
        } else {
          console.log('表單錯誤');
        }
      });
    }
  },
  computed: {
    ...mapGetters('adminproductsMudles', ['products', 'carts', 'cartTotal', 'cartFinal_Total'])
  },
  created () {
    this.getProducts();
    this.getCartProduct();
  }
};
</script>
