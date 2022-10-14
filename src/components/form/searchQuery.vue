<template>
  <a-form :wrapperCol="{ span: 20 }" >
    <a-row :gutter="{ xs: 8, sm: 16, md: 24}">
      <slot></slot>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped>
.col-block {
  display: none;
}
:deep(.ant-form-item) {
  margin-bottom: 5px !important;
}
</style>
