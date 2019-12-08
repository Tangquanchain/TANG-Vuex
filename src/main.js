// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import './bus' // event bus
import router from './router';
import axios from 'axios' // 主要Ajax套件
import VueAxios from 'vue-axios'; // 將他轉為Vue的套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap' // bootstrap 必須仰賴 jQuery 、 popper才能運行
// import 'jquery'; 如果要全域使用 不過在此會有另外的 ESLint 提示說明（不建議用全域）
// 可以直接在 main.js 下 import $ from 'jquery'，然後也需要在要使用的元件內 import $ from 'jquery' 才能使用喔。
import currencyFilter from './filters/currency'; // 千分號
import VeeValidate from 'vee-validate'; // 表單驗證套件
import zhTW from 'vee-validate/dist/locale/zh_TW'; // 中文格式
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import store from './store/index';
Vue.use(Vuex);
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', // 觸發離開焦點事件
  i18n,
  dictionary: {
    zhTW
  }
})

Vue.component('Loading', Loading) // 啟用全域元件
Vue.use(VueAxios, axios) // 必須要在 Vue 設定的進入點(main.js)內使用，外部插件要使用的話都需要用Vue.use
Vue.config.productionTip = false
axios.defaults.withCredentials = true // 每次發送API時，將sectionCookie 存入 Cookie內
Vue.filter('currency', currencyFilter) // 註冊在全域的filter

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => { // 切換頁面觸發router.beforeEach()
  // console.log('to', to, 'from', from, 'next', next)

  if (to.meta.requiresAuth) { // 判斷假如已經登入過，就可以直接貼login網址進入
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      console.log(response.data)
      if (response.data.success) {
        // vm.$router.push('/');
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
    console.log('這裡需要驗證')
  } else {
    next() // 避免被導航守衛擋下來
  }
})
