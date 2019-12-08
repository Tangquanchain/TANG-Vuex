<template>
  <div>
    <footer class="footer d-flex justify-content-center align-items-center py-5 bg-sm-dark">
      <div class="container text-white mt-5">
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <div class="d-flex flex-column align-items-center">
              <div class="d-flex justify-content-center m-4">
                <a href="#">
                  <img style="height:67.2px" src="../../../static/images/TagLogo.png" />
                </a>
              </div>
              <div class="contact_page">
                <ul class="list-unstyled">
                  <li>
                    <i class="fa fa-map-marker footer_logo" aria-hidden="true"></i>
                    <span>Xinxing Dist., Kaohsiung City 800</span>
                  </li>
                  <li>
                    <i class="fa fa-mobile footer_logo" aria-hidden="true"></i>
                    <span>+(07)7726338</span>
                  </li>
                  <li>
                    <i class="fa fa-envelope footer_logo" aria-hidden="true"></i>
                    <span>Tagoldschool.gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="account_side d-flex justify-content-center m-4">
              <a class="display-4 text-white" href="#">ACCOUNT</a>
            </div>
            <div class="contact_page text-center">
              <ul class="list-unstyled">
                <li class="pt-2 pb-2">
                  <a href="#" @click.prevent="AllProduct">
                    <span>Account</span>
                  </a>
                </li>
                <li class="pt-2 pb-2">
                  <a href="#" @click.prevent="Manager">
                    <span>Manager</span>
                  </a>
                </li>
                <li class="pt-2 pb-2">
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="d-flex flex-column align-items-center">
              <div class="follow_side d-flex justify-content-center m-4">
                <a class="display-4 text-white" href="#">FOLLOW</a>
              </div>
              <div class="contact_page">
                <ul class="list-unstyled">
                  <li class="pt-2 pb-2">
                    <a href="#">
                      <img
                        src="../../../static/images/fb_like.png"
                        style="width:30px; height:30px;"
                      />
                      <span class="ml-1">Facebook</span>
                    </a>
                  </li>
                  <li class="pt-2 pb-2">
                    <a href="#">
                      <img
                        src="../../../static/images/line_like.png"
                        style="width:30px; height:30px;"
                      />
                      <span class="ml-1">Line</span>
                    </a>
                  </li>
                  <li class="pt-2 pb-2">
                    <a href="#">
                      <img
                        src="../../../static/images/twitter_like.png"
                        style="width:30px; height:30px;"
                      />
                      <span class="ml-1">Twitter</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12">
            <section class="mt-auto">
              <div class="container text-white text-center" style="border-top:1px solid white">
                <p class="sectxt mt-4">©Copright 2019 Tang-yung-chain</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    AllProduct () {
      const vm = this;
      vm.$router.push('/store/allproduct');
    },
    Manager () {
      const vm = this;
      vm.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
.footer {
  background-image: url("../../../static/images/footer2.png");
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-attachment: fixed;
}

@media (max-width: 767px) {
  .footer {
    background-image: none;
    height: 100%;
    background-color: black;
  }
}

.contact_page ul li {
  .footer_logo {
    line-height: 30px;
    text-align: center;
    width: 30px;
    height: 30px;
    border: 1px solid white;
    border-radius: 20px;
    margin-right: 10px;
    margin-top: 10px;
  }
  span {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    vertical-align: middle;
    font-weight: bold;
  }
  a {
    text-decoration: none;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: bold;
  }
}

.account_side,
.follow_side {
  a {
    text-decoration: none;
    font-family: "Anton", sans-serif;
    font-weight: bold;
    font-size: 60px;
  }
}

.sectxt {
  font-family: "Anton", sans-serif;
}
</style>
