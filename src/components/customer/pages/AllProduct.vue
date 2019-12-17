<template>
  <div>
    <div class="d-md-flex flex-wrap mt-3" style="margin:0 auto;">
      <div class="left_side_menu">
        <div class="select_menu text-center">
          <div class="toptxt bg-dark">
            <h4 class="text-white mb-0">CATEGORY</h4>
          </div>
          <div class="txt">
            <ul class="list-unstyled">
              <li>
                <a @click.prevent="allactive" :class="{'active': KeyTxt === 'all'}" href="#">ALL</a>
              </li>
              <li>
                <a @click.prevent="Hotactive" :class="{'active': KeyTxt === 'hot'}" href="#">HOT</a>
              </li>
              <li>
                <a
                  @click.prevent="Styleactive"
                  :class="{'active': KeyTxt === 'style'}"
                  href="#"
                >HAIR STYLE</a>
              </li>
              <li>
                <a
                  @click.prevent="Toolsactive"
                  :class="{'active': KeyTxt === 'tools'}"
                  href="#"
                >HAIR TOOLS</a>
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
            <a @click.prevent="allactive" :class="{'active': KeyTxt === 'all'}" href="#">ALL</a>
          </li>
          <li>
            <a @click.prevent="Hotactive" :class="{'active': KeyTxt === 'hot'}" href="#">HOT</a>
          </li>
          <li>
            <a
              @click.prevent="Styleactive"
              :class="{'active': KeyTxt === 'style'}"
              href="#"
            >HAIR STYLE</a>
          </li>
          <li>
            <a
              @click.prevent="Toolsactive"
              :class="{'active': KeyTxt === 'tools'}"
              href="#"
            >HAIR TOOLS</a>
          </li>
        </ul>
      </div>

      <div class="right_side_shop">
        <div class="productsItem mb-5" v-for="item in AllProduct" :key="item.id">
          <div class="newproduct">
            <div class="newproduct_pic position-relative">
              <div
                class="newProimg"
                :style="`background: url(${item.imageUrl}) center / cover no-repeat;`"
              ></div>
              <div class="product_guide text-dark text-center p-3">
                <h3 class="mb-2">SELECT</h3>
                <!-- <button class='btn btn-size' type='buttom' @click='addtoCart(item.id)'>ADD TO CART</button> -->
                <button
                  class="btn btn-size pr-4 pl-4"
                  type="buttom"
                  @click="adddetail(item.id)"
                  style
                >
                  <h5 class="mb-0">DETAIL</h5>
                </button>
              </div>
              <div
                class="newstamp p-2"
                v-if="item.category === 'hotman' || item.category === 'hotproduct'"
              >
                <span>HOT</span>
              </div>
            </div>

            <div class="txt text-center mt-2">
              <p class="font-weight-bold">{{item.title}}</p>
              <p class="font-weight-bold">{{item.price | currency}} TW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
export default {
  methods: {
    // side_menu
    allactive () {
      const vm = this;
      vm.$store.state.KeyTxt = 'all';
      vm.getAllProduct();
    },
    adddetail (id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(`/store/shopping_cart/${response.data.product.id}`);
          $('body,html').animate({ scrollTop: '0px' }, 900);
        }
      });
    },
    ...mapActions('productsMudles', ['Hotactive', 'Styleactive', 'Toolsactive', 'getAllProduct'])
  },
  computed: {
    ...mapGetters('productsMudles', ['KeyTxt', 'AllProduct'])
  },
  created () {
    this.getAllProduct();
  }
};
</script>

<style lang='scss' scoped>
$black: #000;

.left_side_menu {
  position: sticky;
  top: 100px;
  width: 26.66666%;
  height: 100vh;
  padding: 30px 40px 40px 40px;
  .txt {
    li {
      margin-top: 1.5rem;
      position: relative;
    }
    // a.active::before {
    //   content: '\2022';
    //   display: block;
    //   font-size: 2.4rem;
    //   line-height: 1.1;
    //   position: absolute;
    //   width: auto;
    //   bottom: 12px;
    // }
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

.right_side_shop {
  width: 70.33333%;
  height: 100%;
  // border: 3px solid #1c1e1b;
  padding: 30px 30px 20px 30px;
  margin-bottom: 20px;
}

.productsItem {
  width: 33.33333%;
  float: left;
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

  .right_side_shop {
    width: 89.33333% !important;
    // height: 9200px;
    margin: auto;
  }
}

.newproduct {
  border: 4px solid rgba(28, 30, 27, 0.9);
  p {
    font-size: 21px;
    font-family: "Open Sans", sans-serif;
    margin-bottom: 0;
    color: rgba(3, 3, 3, 0.8);
    line-height: 2;
  }
  margin: 0 15px;
  .newProimg {
    width: 100%;
    height: 370px;
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
    font-size: 26px;
    font-family: "Anton", sans-serif;
  }
  h5 {
    font-family: "Open Sans", sans-serif;
  }
  .btn-size {
    border: 1px solid $black;
    margin: 2px 5px;
    border-radius: 0;
    outline: none;
    &:hover {
      background-color: $black;
      color: rgba(251, 251, 251, 0.8);
    }
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

.newproduct:hover .product_guide {
  opacity: 1;
}
</style>
