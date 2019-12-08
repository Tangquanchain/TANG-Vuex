// 放路由的配置檔

// 官方的元件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 會在 Vue 中增加<router-view/> 與 <router-link/> 這兩個組件
// 啟用它

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/customer/Homeheader.vue')
  },
  // 將前台作為預設首頁
  {
    path: '*', //* 代表任意值
    redirect: '/home' // 使用 redirect 是將用戶導回正確的路徑 ，避免用戶進入不存在的頁面
  },

  // customer路由

  {
    name: 'customer_dashboard',
    path: '/store',
    component: () => import('@/views/customer/CustomerDashboard.vue'),
    children: [
      {
        name: 'AllProduct',
        path: 'allproduct',
        component: () => import('@/components/customer/pages/AllProduct.vue')
      },
      {
        name: 'ShoppingCart',
        path: 'shopping_cart/:itemId',
        component: () => import('@/components/customer/pages/ShoppingCart.vue')
      }
    ]
  },

  // checkout 路由
  {
    name: 'checkout',
    path: '/checkout',
    component: () => import('@/views/customer/Checkout.vue'),
    children: [
      {
        name: 'cart',
        path: 'cart',
        component: () => import('@/components/customer/pages/Cart.vue')
      },
      {
        name: 'formdata',
        path: 'formdata/:orderId',
        component: () => import('@/components/customer/pages/Formdata.vue')
      },
      {
        name: 'complete',
        path: 'complete',
        component: () => import('@/components/customer/pages/Complete.vue')
      }
    ]
  },

  // manager路由
  {
    name: 'Login', // 元件呈現的名稱
    path: '/login', // 對應的虛擬路徑
    component: () => import('@/views/manager/Login.vue')
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('@/views/manager/Dashboard.vue'),
    children: [
      {
        name: 'Products', // 產品列表
        path: 'products',
        component: () => import('@/components/manager/pages/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Products_list', // 訂單列表
        path: 'products_list',
        component: () => import('@/components/manager/pages/Prolist.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Coupon', // 優惠卷
        path: 'coupon',
        component: () => import('@/components/manager/pages/Coupon.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },

  {
    name: 'admin',
    path: '/admin',
    component: () => import('@/views/manager/Dashboard.vue'),
    children: [
      {
        name: 'CustomOrder',
        path: 'custom_order',
        component: () => import('@/components/manager/pages/Customorder.vue')
      },
      {
        name: 'CustomCheckout',
        path: 'custom_checkout/:orderId', // 最終結帳頁面
        component: () => import('@/components/manager/pages/CustomCheckout.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
