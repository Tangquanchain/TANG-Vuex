<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="items in prodata" :key="items.id">
          <td>{{new Date( items.create_at*1000).getFullYear()}}/{{ new Date( items.create_at*1000).getMonth()+1 }}/{{ new Date( items.create_at*1000).getDate() }}</td>
          <td v-if="items.user">{{items.user.email}}</td>
          <td>
            <div v-for="goods in items.products" :key="goods.id">
              <p>{{ goods.product.category }} : {{ goods.qty }} {{ goods.product.unit }}</p>
            </div>
          </td>
          <td class="text-center">{{ items.total | currency }}</td>
          <td>
            <span class="text-danger" v-if="!items.is_paid">尚未付款</span>
            <!-- 產品如果付款 -->
            <span class="text-success" v-else>結帳完成</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pagination="pagination" @getPage="getProduct"></Pagination>
  </div>
</template>

<script>
import Pagination from '../Pagination';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    Pagination
  },

  methods: {
    ...mapActions('adminordersMudles', ['getProduct'])
  },
  computed: {
    ...mapGetters('adminordersMudles', ['prodata', 'pagination'])
  },
  created () {
    this.getProduct();
  }
};
</script>
