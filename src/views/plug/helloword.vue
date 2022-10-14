<template>
  <Scaner
    v-if="showScaner"
    v-on:codeScanned="codeScanned"
    v-on:errorCaptured="errorCaptured"
  />
</template>
<script lang="ts" setup>
import { ref  } from "vue";
import Scaner from "./GetQrcode.vue";
const showScaner = ref(true)
// 扫码成功
const codeScanned = (code) => {
  console.log("扫码成功", code);
};
// 扫码失败
const errorCaptured = (error) => {
  console.log("扫码失败", error);
};
</script>
