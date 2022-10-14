<template>
  <a-col>
    <a-button type="primary" @click="search" class="ml10">
      <IconCom type="SearchOutlined" />{{ $t("base.查询") }}
    </a-button>
    <a-button type="default" @click="reset" class="ml10">
      <IconCom type="UndoOutlined" />{{ $t("base.重置") }}
    </a-button>
  </a-col>
</template>
<script lang="ts" setup>
import IconCom from "@/components/modules/IconCom.vue";
const emits = defineEmits();
const search = () => emits("search");
const reset = () => emits("reset");
</script>
