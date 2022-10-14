<template>
  <SearchQuery>
    <a-col :span="4">
      <a-form-item :label="$t('setting.部门名称')">
        <a-input
          type="text"
          v-model:value="formState.deptName"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script lang="ts" setup>
interface FormStateTs {
  deptName: string | null;
}
import { public_form_empty, getPlaceholder, filterOption } from "@/pages/utils";
import { reactive, ref, onActivated } from "vue";
import IconCom from "@/components/modules/IconCom.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
const emits = defineEmits();
const formState = reactive<FormStateTs>({
  deptName: null,
});

//重置
const reset = () => public_form_empty(formState);
//搜索
const search = () => emits("searchQuery", formState);

onActivated(() => search());
</script>
