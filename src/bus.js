import Vue from 'vue';

Vue.prototype.$bus = new Vue(); // 再 Vue 的 prototype 下新增一個 $bus 屬性，而且指向一個物件

// Event Bus 跨元件通訊
// Message
// this.$bus.$emit('message:push',message,status);
// message('String ') :訊息內容
// status('String') :Alert 樣式
