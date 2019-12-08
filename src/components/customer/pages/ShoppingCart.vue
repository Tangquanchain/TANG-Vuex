<template>
  <div>
    <div class="d-md-flex flex-wrap mt-4 mt-lg-5" style="margin:0 auto;">
      <div class="left_side_menu">
        <div class="select_menu text-center">
          <div class="toptxt bg-dark">
            <h4 class="text-white mb-0">CATEGORY</h4>
          </div>
          <div class="txt">
            <ul class="list-unstyled">
              <li>
                <a @click.prevent="backactive" :class="{'active': KeyTxt === 'all'}" href="#">
                  <i class="fas fa-chevron-left mr-1"></i>
                  BACK TO SHOP
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="topSelect-txt d-md-none">
        <ul class="list-unstyled d-flex justify-content-center align-items-center">
          <li>
            <div class="bg-dark">
              <h4 class="text-white mb-0">CATEGORY</h4>
            </div>
          </li>
          <li>
            <a @click.prevent="backactive" :class="{'active': KeyTxt === 'back'}" href="#">
              <i class="fas fa-chevron-left mr-1"></i>BACK TO SHOP
            </a>
          </li>
        </ul>
      </div>

      <div class="right_side_shop d-md-flex mb-5">
        <div class="productsItem mb-5">
          <div class="newproduct">
            <div class="newproduct_pic">
              <div
                class="newProimg"
                :style="`background: url(${AllProduct.imageUrl}) center / cover no-repeat;`"
              ></div>
              <div
                class="newstamp p-2"
                v-if="AllProduct.category == 'hotman' || AllProduct.category == 'hotproduct'"
              >
                <span>HOT</span>
              </div>
            </div>
          </div>
        </div>
        <div class="product-detail ml-3">
          <div class="text-dark">
            <div class="txt mt-2">
              <h2>{{AllProduct.title}}</h2>
            </div>
            <div class="description mt-3 ml-1">
              <h6 class="">DESCRIPTION</h6>
              <p class="mb-0">{{AllProduct.description}}</p>
            </div>
            <div class="mt-4 d-flex">
              <button class="less" @click="btnChange(-1)">
                <i class="fas fa-minus" aria-hidden="true"></i>
              </button>
              <input type="number" max="10" min="1" v-model="AllNum" />
              <button class="add" @click="btnChange(1)">
                <i class="fas fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <div class="mt-3">
              <strong>{{ AllNum * AllProduct.price | currency }} TW</strong>
            </div>
            <button
              class="btn btn-lg btn-size mt-4"
              type="buttom"
              @click="addtoCart(AllProduct.id,AllNum)"
            >ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      itemId: '',
      AllNum: 1
    };
  },
  methods: {
    ...mapActions('productMudles', ['getProduct']),
    backactive () {
      const vm = this;
      vm.$store.dispatch('productMudles/backactive').then(() => {
        vm.$router.push('/store/allproduct');
      });
    },
    addtoCart (id, qty = 1) {
      this.$store.dispatch('cartsMudules/addtoCart', { id, qty });
    },
    btnChange (value) {
      if (value === -1 && this.AllNum <= 1) {
        this.AllNum = 1;
      } else if (value === 1 && this.AllNum >= 10) {
        this.AllNum = 10;
      } else {
        this.AllNum += value;
      }
    }
  },
  computed: {
    ...mapGetters('productMudles', ['AllProduct']),
    ...mapGetters('productMudles', ['KeyTxt'])
  },
  created () {
    this.itemId = this.$route.params.itemId;
    this.getProduct(this.itemId);
  }
};
</script>

<style lang='scss' scoped>
$black: #000;

//去除input預設樣式
input[type="number"] {
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.left_side_menu {
  position: sticky;
  top: 100px;
  width: 26.66666%;
  padding: 0 40px 40px 40px;
  .txt {
    li {
      margin-top: 1.5rem;
      position: relative;
    }
  }
}

.select_menu {
  position: sticky;
  top: 100px;

  h4 {
    font-family: "Anton", sans-serif;
    font-size: 2.5rem;
    padding: 10px;
  }
  .active {
    color: $black;
  }
  a {
    font-family: "Anton", sans-serif;
    font-size: 2.5rem;
    letter-spacing: 1px;
    color: rgb(153, 153, 153);
    text-decoration: none;
    transition: all 0.3s;
    &:hover {
      color: $black;
    }
  }
}

.topSelect-txt {
  h4 {
    font-family: "Anton", sans-serif;
    font-size: 1.2rem;
    padding: 10px;
  }
  li {
    margin: 0 10px 0 10px;
    .active {
      color: $black;
    }
    a {
      font-family: "Anton", sans-serif;
      font-size: 1.2rem;
      letter-spacing: 1px;
      color: rgb(153, 153, 153);
      text-decoration: none;
      transition: all 0.3s;
      &:hover {
        color: $black;
      }
    }
  }
}

.fa-chevron-left {
  vertical-align: 20%;
  font-size: 30px;
}

.right_side_shop {
  width: 70.33333%;
  border: 3px solid #1c1e1b;
  padding: 50px 30px 0px 30px;
  margin-bottom: 20px;
  display: flex !important;
  justify-content: center;
}

.productsItem {
  width: 33.33333%;
  float: left;
}

.newproduct {
  p {
    font-size: 21px;
    font-family: "Open Sans", sans-serif;
    margin-bottom: 0;
    color: rgba(3, 3, 3, 0.8);
    line-height: 2;
  }
  margin: 0 15px;
  .newProimg {
    display: inline-block;
    width: 100%;
    height: 370px;
    background-color: rgba(165, 165, 165, 0.3);
  }
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

.product-detail {
  h2 {
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    padding-bottom: 7px;
    border-bottom: 2px solid rgba(20, 15, 11, 0.918);
  }
  .less,
  .add {
    font-size: 0.8rem;
    border: 1.2px solid $black;
    background-color: white;
    outline: none;
    width: 40px;
    height: 40px;
  }
  .less {
    border-radius: 2px 0px 0px 2px;
    border-right: 0;
  }
  .add {
    border-radius: 0px 2px 2px 0px;
    border-left: 0;
  }
  input {
    font-size: 1.2rem;
    border: 1.2px solid $black;
    width: auto;
    text-align: center;
    outline: none;
  }
  strong {
    font-size: 24px;
    color: #885d39;
  }
  .description{
    font-family: "Open Sans", sans-serif;
    letter-spacing: 0.5px;
      h6{
      font-weight: bold;
      color:rgb(34, 36, 51);
    }
      p{
      font-weight: bold;
      color:rgb(34, 36, 51);
    }
  }
}

.btn-size {
  border: 1px solid $black;
  margin: 2px 0px;
  border-radius: 0;
  outline: none;
  &:hover {
    background-color: $black;
    color: rgba(251, 251, 251, 0.8);
  }
}

@media (max-width: 992px) {
  .select_menu {
    margin: 30px 0 0 0;
    h4 {
      font-size: 2.4rem;
    }
    a {
      font-size: 1.5rem;
    }
  }
  .productsItem {
    width: 49.33333% !important;
  }
  .left_side_menu {
    width: 29.33333% !important;
    top: -30px;
  }
  .fa-chevron-left {
    vertical-align: 25%;
    font-size: 17px;
  }
  .right_side_shop {
    width: 60% !important;
    margin: 30px 20px 0 40px;
  }
}

@media (max-width: 768px) {
  .select_menu {
    margin: 30px 0 0 0;
    h4 {
      font-size: 1.4rem;
    }
    a {
      font-size: 0.9rem;
    }
  }
  .productsItem {
    width: 99.33333% !important;
  }
  .left_side_menu {
    display: none;
  }
  .fa-chevron-left {
    vertical-align: 10%;
    font-size: 17px;
  }
  .right_side_shop {
    width: 89.33333% !important;
    margin: auto;
  }
}
</style>
