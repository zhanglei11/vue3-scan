<template>
  <Scaner
      v-if="showScaner"
      v-on:close="close"
      v-on:code-scanned="codeScanned"
      v-on:error-captured="errorCaptured"
      :stop-on-scanned="true"
      :draw-on-found="true"
      :responsive="false"
    />
</template>
<script>
import Scaner from "./GetQrcode.vue";
export default {
  components: { Scaner },
  data() {
    return {
      showScaner: true,
    };
  },
  methods: {
    // 关闭扫码
    close() {
      console.log("33333")
      this.showScaner = false;
    },
    // 扫码成功
    codeScanned(code) {
      console.log("code",code)

    },
    // 扫码失败
    errorCaptured(error) {
      console.log("error",error)
    },
  },
  mounted() {
  },
};
</script>
