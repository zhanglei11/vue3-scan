<template>
  <Scaner
    v-if="showScaner"
    v-on:codeScanned="codeScanned"
    v-on:errorCaptured="errorCaptured"
  />
  <a-col :span="24">
    <a-button type="primary" @click="startScan()">开始扫描</a-button>
  </a-col>
</template>
<script lang="ts" setup>
import { ref, nextTick } from "vue";
import Scaner from "@/components/Qrcode.vue";
const showScaner = ref(false);
// 扫码成功
const codeScanned = (code) => {
  showScaner.value = false;
  alert(`扫码成功----${code}`);
};
// 扫码失败
const errorCaptured = (error) => {
  showScaner.value = false;
  alert(`扫码失败----${code}`);
};

const startScan = () => {
  showScaner.value = true;
};
</script>
