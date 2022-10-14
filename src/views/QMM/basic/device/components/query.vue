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
    <a-col :span="4">
      <a-form-item :label="$t('basic.工序')">
        <ProcedureSelect
          ref="procedureSelectRef"
          :ID="formState.workingProcedureId"
          @changeZ="changeProcedure"
        ></ProcedureSelect>
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
import ProcedureSelect from "@/components/form/procedureSelect.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
import IconCom from "@/components/modules/IconCom.vue";
import { FormStateTs } from "@/types/basicTs";
const emits = defineEmits(["searchQuery"]);
const departSelectRef = ref();
const procedureSelectRef = ref();
const formState = reactive<FormStateTs>({
  departmentId: null,
  workingProcedureId: null,
});
onMounted(() => {
  departSelectRef.value.getInit();
});

//重置
const reset = () => {
  public_form_empty(formState); //清空
  departSelectRef.value.reset();
  procedureSelectRef.value.resetList();
};

//部门
const changeDepart = ({ value }) => {
  formState.departmentId = value;
  if (!!!value) {
    procedureSelectRef.value.resetList();
  } else {
    procedureSelectRef.value.getInit({
      departmentId: value,
    });
  }
};

//工序
const changeProcedure = ({ value }) => {
  formState.workingProcedureId = value;
};

//搜索
const search = () => emits("searchQuery", formState);

onActivated(() => search());
</script>
