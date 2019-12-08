<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(items) in adminproducts" :key="items.id">
          <td>{{ items.category }}</td>
          <td>{{ items.title }}</td>
          <td class="text-right">{{ items.origin_price | currency }}</td>
          <td class="text-right">{{ items.price | currency }}</td>
          <td>
            <span v-if="items.is_enabled==1" class="text-success">啟用</span>
            <!-- 產品如果為啟用 -->
            <span v-else>未啟用</span>
          </td>

          <td class="d-flex">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,items)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="delModal(items)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pagination="pagination" @getPage="getadminProducts"></Pagination>

    <!--Modal-->
    <div
      class="modal fade"
      id="productsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    v-model="tempProducts.imageUrl"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img :src="tempProducts.imageUrl" class="img-fluid" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    v-model="tempProducts.title"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      v-model="tempProducts.category"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      v-model="tempProducts.unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      v-model="tempProducts.origin_price"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      v-model="tempProducts.price"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    v-model="tempProducts.description"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    v-model="tempProducts.content"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProducts.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!--刪除Modal-->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProducts.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="readydelModal">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';
import { mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      tempProducts: {}, // 要送出的欄位內容，對應的欄位名稱是(商品建立)API的參數內容，藉由post將tempProducts新增到資料庫裏面去
      isNew: false,
      useSlot: true, // 自訂義loading樣式
      status: {
        fileUploading: false
      }
    };
  },

  components: {
    Pagination
  },

  methods: {
    ...mapActions('adminproductsMudles', ['getadminProducts']),
    openModal (isNew, items) {
      if (isNew) {
        this.tempProducts = {};
        this.isNew = true;
      } else {
        this.tempProducts = Object.assign({}, items); // items 和 tempProducts指向同一個物件，使用Object.assign 避免傳參考，像是我改了其中一個{}資料，另一個{}也會更動到
        this.isNew = false;
      }
      $('#productsModal').modal('show');
    },
    updateProduct () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      const vm = this;
      let httpMethod = 'post';
      if (!vm.isNew) {
        // false變成true執行
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProducts.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempProducts }).then(response => {
        if (response.data.success) {
          $('#productsModal').modal('hide');
          vm.getadminProducts();
        } else {
          $('#productsModal').modal('hide');
          vm.getadminProducts();
        }
      });
    },

    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]; // 上傳到表單的圖片資料
      const vm = this;
      // const id = this.$refs.files.id;
      vm.status.fileUploading = true;
      const formData = new FormData(); // 建立一個新的 FormData 物件。
      formData.append('file-to-upload', uploadedFile); // 追加新值到 FormData 物件已有的對應鍵上；若該鍵不存在，則為其追加新的鍵。
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          } // 傳送「檔案」必須使用表單的格式，將格式改成form-data的格式
        })
        .then(response => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.tempProducts.imageUrl = response.data.imageUrl; //部分的變數如 imageUrl 由於 “未事先定義”所以需要使用 $set 的方式寫入
            vm.$set(vm.tempProducts, 'imageUrl', response.data.imageUrl); // 強制將imageUrl:response.data.imageUrl掛載到tempProduct內，以達到雙向綁定
            // document.getElementById(id).value=""; 上傳檔案欄位中的值清空
          } else {
            this.$store.dispatch('adminproductsMudles/updateMessage', { message: response.data.message });
          }
        });
    },

    delModal (items) {
      this.tempProducts = items; // 將點到的地方傳入tempProducts來作為刪除的預備
      $('#delProductModal').modal('show'); // 打開刪除模板
    },
    readydelModal () {
      let vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProducts.id}`;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.getadminProducts(); // 刪除了資料庫資料所以要重新抓取資料刷新
        } else {
          $('#delProductModal').modal('hide');
          vm.getadminProducts();
        }
      });
    }
  },
  computed: {
    ...mapGetters('adminproductsMudles', ['adminproducts', 'pagination'])
  },
  created () {
    this.getadminProducts();
  }
};
</script>
