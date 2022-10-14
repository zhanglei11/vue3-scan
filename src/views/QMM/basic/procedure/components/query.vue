<template>
  <SearchQuery>
    <a-col :span="4">
      <a-form-item :label="$t('basic.部门')">
        <DepartSelect
          ref="departSelectRef"
          :ID="formState.departmentId"
          @changeZ="changeDepart"
        ></DepartSelect>
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script lang="ts" setup>
import { public_form_empty } from "@/pages/utils";
import {
  reactive,
  onMounted,
  ref,
  onActivated,
} from "vue";
import DepartSelect from "@/components/form/departSelect.vue";
import IconCom from "@/components/modules/IconCom.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
import { FormStateTs } from "@/types/basicTs";
const emits = defineEmits();
const departSelectRef = ref();
const formState = reactive<FormStateTs>({
  departmentId: null,
});

onMounted(() => {
  departSelectRef.value.getInit();
});

//重置
const reset = () => {
  public_form_empty(formState); //清空
  departSelectRef.value.reset();
};

//部门
const changeDepart = ({ value }) => {
  formState.departmentId = value;
};

//搜索
const search = () => emits("searchQuery", formState);

onActivated(() => search());
</script>
