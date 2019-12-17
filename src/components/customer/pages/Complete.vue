<template>
  <div>
    <div class="mt-5 mb-5">
      <div class="container" style="border: 3px solid #1c1e1b;">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="main mt-4 mb-5">
              <ul class="list-unstyled breakcrumb">
                <li class="breakcrumb-txt">
                  <span class="p-5">
                    <i style="line-height:0;" class="fa fa-check" aria-hidden="true"></i>
                  </span>
                  CART
                </li>
                <li class="breakcrumb-txt">
                  <span class="p-5">1</span>
                  INFORMATION
                </li>
                <li class="breakcrumb-txt">
                  <span class="p-5">2</span>
                  COMPLETE
                </li>
              </ul>
            </div>
            <div class="d-flex justify-content-center">
              <div class="d-flex justify-content-center mb-2 mr-1"></div>
              <div class="d-flex justify-content-center mb-2">
                <button
                  @click="backtoproducts"
                  class="btn-lg btn-size complete-btn-txt"
                  style="border-radius:20px;"
                >CONTINUE TO SHOPING</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backtoproducts () {
      const vm = this;
      vm.$router.push('/store/AllProduct');
      // vm.$store.dispatch('orderMudles/deleteorderdata');
    }
  }
};
</script>

<style  lang='scss' scoped>
$black: #000;
$breakcrumb-color: rgba(221, 217, 217, 0.6);

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
  background-color: $breakcrumb-color;
  z-index: -100;
}

.breakcrumb-txt {
  font-family: "Open Sans", sans-serif;
  background-color: white;
  border: solid 5px $breakcrumb-color;
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
  border-color: $black;
  color: $black;
  span {
    color: $black;
    font-size: 33px;
    font-weight: bold;
  }
}

@media (max-width: 992px) {
  .breakcrumb::before {
    width: 80%;
  }
}

@media (max-width: 767px) {
  .breakcrumb::before {
    width: 50%;
  }
}

@media (max-width: 495px) {
  .breakcrumb::before {
    width: 80%;
  }
}

@media (max-width: 375px) {
  .breakcrumb::before {
    width: 80%;
  }
  .breakcrumb-txt{
    width: 50px;
    height: 50px;
     span{
       font-size: 24px;
     }
  }
}

.complete-btn-txt {
  font-family: "Anton", sans-serif;
  border: none;
}
</style>
