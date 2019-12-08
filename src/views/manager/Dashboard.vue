<template>
  <div>
    <Alert />
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <!-- router-view 外區域為固定樣板 -->
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
          <!-- products 的路由，內為每個頁面切換的內容 -->
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/manager/Navbar';
import Sidebar from '../../components/manager/Sidebar';
import Alert from '../../components/manager/AlertMessage';
export default {
  // 當有需要使用到 script 的元件 ，匯出元件來做編譯
  components: {
    Navbar,
    Sidebar,
    Alert
  }
};
</script>>
